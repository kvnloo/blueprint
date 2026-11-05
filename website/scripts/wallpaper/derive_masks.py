#!/usr/bin/env python3
"""Deterministically derive wallpaper masks from an ORIGINAL base plate.

Usage (from repo root):
  uv run --with numpy --with pillow --with scipy website/scripts/wallpaper/derive_masks.py \
      --plate website/art/living-ruins/base.png \
      --river website/art/living-ruins/river.json \
      --out   website/art/living-ruins/masks

Outputs (8-bit PNG, no randomness). Water and foliage are built at --size (default 2048x1152,
2x the 1024x576 runtime grid) so their edges are smooth; light, depth and flow are smooth
fields and are written at half that size.
  water.png    L   water body: cyan/teal HSV segmentation (+ white foam in falls and rapids),
                   morphological close, small-hole fill, intersected with the river corridor,
                   2 px feather
  foliage.png  L   per-pixel foliage weight: green hue + leaf texture, minus a stone/ruin mask
                   (low saturation, grey-brown) and the hand-placed rigid boxes, ~2.5 px blur.
                   This is a "may sway" weight, not a tip gradient: the player scales sway by
                   the root-to-tip gradient in the shader.
  light.png    L   bright desaturated upper region where god-rays are anchored
  depth.png    L   0 = far, 1 = near (vertical gradient + atmospheric luminance heuristic)
  flow.png     RGB R,G = flow direction (0.5 = zero, uv space, +y down), B = strength
  stats.json       coverage percentages (mean and fraction > 0.5)

No mask is zeroed at the frame edge: the player samples with CLAMP_TO_EDGE, so a hard
black border would show up as a seam where an effect stops.

river.json format (all coordinates normalised 0..1, origin top-left):
  {"corridor": 0.05,
   "polylines": [{"name": "river", "width": 0.03, "speed": 1.0, "points": [[x,y], ...]},
                 {"name": "fall",  "width": 0.02, "speed": 2.0, "fill": true, "points": [[x,y], ...]}],
   "rigid": [{"name": "greenhouse", "box": [x0, y0, x1, y1]}, ...]}
Points run in the direction the water flows. "width" is the half-width of the flow lane.
"corridor" (optional) dilates the union of lanes; the water mask is clipped to it so blue
sky or glass roofs are never picked up. Use --no-corridor to disable. "fill": true closes
every hole in the water mask inside that lane (waterfalls). "pad" overrides the corridor
for one lane (0 = clip that lane's water to the lane itself). "rigid" boxes are architecture
that must never sway (foliage is forced to 0 inside them).
"""
import argparse, json, sys
from pathlib import Path

import numpy as np
from PIL import Image
from scipy import ndimage as ndi


def to_hsv(rgb):
    return np.asarray(Image.fromarray(rgb, "RGB").convert("HSV"), dtype=np.float32) / 255.0


def blur(a, r):
    return ndi.gaussian_filter(a.astype(np.float32), r, mode="nearest") if r > 0 else a.astype(np.float32)


def disk(r):
    y, x = np.ogrid[-r:r + 1, -r:r + 1]
    return x * x + y * y <= r * r


def close(m, r):
    return ndi.binary_closing(np.pad(m, r, mode="edge"), structure=disk(r))[r:-r, r:-r]


def opening(m, r):
    return ndi.binary_opening(np.pad(m, r, mode="edge"), structure=disk(r))[r:-r, r:-r]


def remove_small(m, min_px):
    lab, n = ndi.label(m)
    if n == 0:
        return m
    sizes = ndi.sum(m, lab, index=np.arange(1, n + 1))
    keep = np.concatenate([[False], sizes >= min_px])
    return keep[lab]


def fill_small_holes(m, max_px):
    holes = ndi.binary_fill_holes(m) & ~m
    lab, n = ndi.label(holes)
    if n == 0:
        return m
    sizes = ndi.sum(holes, lab, index=np.arange(1, n + 1))
    small = np.concatenate([[False], sizes <= max_px])
    return m | small[lab]


def grid(h, w):
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    return (xx + 0.5) / w, (yy + 0.5) / h


def seg_dist(px, py, a, b, aspect):
    ax, ay, bx, by = a[0] * aspect, a[1], b[0] * aspect, b[1]
    dx, dy = bx - ax, by - ay
    t = np.clip(((px * aspect - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy + 1e-12), 0, 1)
    return np.hypot(px * aspect - (ax + t * dx), py - (ay + t * dy)), dx, dy


def lanes(river, h, w):
    """Return (flow vec field HxWx2, strength HxW) from polylines."""
    px, py = grid(h, w)
    best = np.full((h, w), 1e9, np.float32)
    vec = np.zeros((h, w, 2), np.float32)
    strength = np.zeros((h, w), np.float32)
    aspect = w / h  # measure distances in a square space so lanes are round
    for pl in river["polylines"]:
        pts = np.asarray(pl["points"], np.float32)
        hw, spd = float(pl["width"]), float(pl.get("speed", 1.0))
        for a, b in zip(pts[:-1], pts[1:]):
            d, dx, dy = seg_dist(px, py, a, b, aspect)
            upd = (d < best) & (d < hw)
            n = np.hypot(dx / aspect, dy)  # direction in uv space, normalised
            dirx, diry = (dx / aspect) / (n + 1e-9), dy / (n + 1e-9)
            fall = np.clip(1.0 - (d / hw) ** 2, 0, 1)  # soft lane edge
            vec[upd] = (dirx, diry)
            # strength encodes lane softness scaled by speed (speed 3+ saturates)
            strength[upd] = (fall * np.clip(0.35 + 0.65 * spd / 3.0, 0, 1))[upd]
            best[upd] = d[upd]
    return vec, strength


def tube(river, h, w, extra=0.0, only=None):
    """Union of lanes (half-width + extra, or the lane's own "pad") as a boolean mask."""
    px, py = grid(h, w)
    aspect = w / h
    s = np.zeros((h, w), bool)
    for pl in river["polylines"]:
        if only and not only(pl):
            continue
        pts = np.asarray(pl["points"], np.float32)
        for a, b in zip(pts[:-1], pts[1:]):
            d, _, _ = seg_dist(px, py, a, b, aspect)
            s |= d < float(pl["width"]) + (float(pl.get("pad", extra)) if extra else 0.0)
    return s


def boxes(river, h, w, feather_px):
    """Rigid boxes as a 0..1 mask: 1 inside, soft falloff of feather_px OUTSIDE the box."""
    px, py = grid(h, w)
    m = np.zeros((h, w), np.float32)
    fx, fy = feather_px / w, feather_px / h
    for b in (river or {}).get("rigid", []):
        x0, y0, x1, y1 = b["box"]
        dx = np.maximum(np.maximum(x0 - px, px - x1), 0) / max(fx, 1e-6)
        dy = np.maximum(np.maximum(y0 - py, py - y1), 0) / max(fy, 1e-6)
        m = np.maximum(m, np.clip(1.0 - np.hypot(dx, dy), 0, 1))
    return m


def save_l(a, path, size=None):
    im = Image.fromarray((np.clip(a, 0, 1) * 255 + 0.5).astype(np.uint8), "L")
    if size and im.size != size:
        im = im.resize(size, Image.LANCZOS)
    im.save(path, optimize=True)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--plate", required=True, help="base plate image (any size, 16:9 expected)")
    ap.add_argument("--river", help="river polyline JSON (default: river.json next to the plate)")
    ap.add_argument("--out", help="output dir (default: masks/ next to the plate)")
    ap.add_argument("--size", default="2048x1152", help="water/foliage size; smooth fields get half")
    ap.add_argument("--no-corridor", action="store_true")
    # tunables, all with sane defaults for turquoise water / green foliage
    ap.add_argument("--water-hue", default="160,215", help="degrees lo,hi")
    ap.add_argument("--water-sat", type=float, default=0.25)
    ap.add_argument("--water-val", type=float, default=0.36)
    ap.add_argument("--foliage-hue", default="62,170")
    ap.add_argument("--foliage-sat", type=float, default=0.22)
    ap.add_argument("--foliage-val", type=float, default=0.08)
    ap.add_argument("--stone-sat", type=float, default=0.24, help="below this saturation = stone")
    ap.add_argument("--light-val", type=float, default=0.72)
    ap.add_argument("--light-sat", type=float, default=0.38)
    a = ap.parse_args()

    plate = Path(a.plate)
    out = Path(a.out) if a.out else plate.parent / "masks"
    river_p = Path(a.river) if a.river else plate.parent / "river.json"
    out.mkdir(parents=True, exist_ok=True)
    w, h = (int(v) for v in a.size.split("x"))
    half = (w // 2, h // 2)
    k = w / 1024.0  # pixel radii below are given for the 1024-wide grid
    img = Image.open(plate).convert("RGB")
    # cover-fit crop to target aspect so any 16:9-ish candidate works
    tw = img.height * w / h
    if img.width > tw:
        x0 = (img.width - tw) / 2
        img = img.crop((int(x0), 0, int(x0 + tw), img.height))
    img = img.resize((w, h), Image.LANCZOS)
    rgb = np.asarray(img, np.uint8)
    hsv = to_hsv(rgb)
    H, S, V = hsv[..., 0] * 360, hsv[..., 1], hsv[..., 2]
    lum = (0.2126 * rgb[..., 0] + 0.7152 * rgb[..., 1] + 0.0722 * rgb[..., 2]) / 255.0
    _, ys = grid(h, w)

    river = json.loads(river_p.read_text()) if river_p.exists() else None
    if river is None:
        print(f"warning: {river_p} missing, flow map will be empty and water unclipped", file=sys.stderr)

    # ---- water: cyan/teal hue band, plus white foam where the lanes run fast
    wlo, whi = (float(v) for v in a.water_hue.split(","))
    water = (H >= wlo) & (H <= whi) & (S >= a.water_sat) & (V >= a.water_val)
    if river:
        fast = tube(river, h, w, only=lambda pl: float(pl.get("speed", 1)) >= 1.4)
        foam = (S < 0.32) & (V > 0.72) & fast
        water |= foam
        if not a.no_corridor and river.get("corridor"):
            water &= tube(river, h, w, extra=float(river["corridor"]))
    water = opening(water, max(1, int(round(1 * k))))
    water = close(water, max(1, int(round(3 * k))))
    water = remove_small(water, int(0.0004 * w * h))
    water = fill_small_holes(water, int(0.00012 * w * h))  # glints and foam specks, not rocks
    if river:
        falls = tube(river, h, w, only=lambda pl: pl.get("fill"))
        water |= ndi.binary_fill_holes(water & falls) & falls
    water_f = blur(water.astype(np.float32), 2.0 * k / 2)  # ~2 px feather at 2x

    # ---- foliage: green hue + leaf texture, stone and architecture subtracted
    flo, fhi = (float(v) for v in a.foliage_hue.split(","))
    green = (H >= flo) & (H <= fhi) & (S >= a.foliage_sat) & (V >= a.foliage_val)
    hp = np.abs(lum - blur(lum, 1.5 * k))
    tex = blur(hp, 2.0 * k)
    leafy = tex > 0.012
    stone = (S < a.stone_sat) | ((H >= 15) & (H < flo) & (S < 0.5)) | ((H > fhi) & (S < 0.45))
    stone = opening(stone, max(1, int(round(1 * k))))  # ignore single grey leaf pixels
    stone = ndi.binary_dilation(stone, structure=disk(max(1, int(round(1.5 * k)))))
    fol = green & leafy & ~stone & ~(blur(water_f, 2 * k) > 0.05)
    fol = opening(fol, max(1, int(round(0.75 * k))))
    fol = remove_small(fol, int(0.00015 * w * h))
    foliage = blur(fol.astype(np.float32), 2.5 * k)
    rigid = boxes(river, h, w, 3 * k)
    foliage *= 1.0 - rigid
    foliage = np.clip(foliage * 1.25, 0, 1)

    # ---- light / sky (smooth field, half size)
    top = np.clip(1.0 - (ys - 0.45) / 0.25, 0, 1)  # fully on above 45% height, gone by 70%
    light = (V >= a.light_val) & (S <= a.light_sat)
    light = close(opening(light, max(1, int(k))), max(1, int(4 * k))) * top
    light = blur(light.astype(np.float32), 4.0 * k)

    # ---- depth: gradient + luminance heuristic (distant = lighter, lower contrast)
    lum_b = blur(lum, 12 * k)
    depth = np.clip(0.7 * ys + 0.3 * (1.0 - lum_b), 0, 1)
    depth = blur(depth, 6 * k)
    d0, d1 = float(depth.min()), float(depth.max())
    depth = (depth - d0) / max(d1 - d0, 1e-6)

    # ---- flow map (half size)
    fw, fh = half
    flow = np.zeros((fh, fw, 3), np.float32) + np.array([0.5, 0.5, 0.0], np.float32)
    if river:
        vec, st = lanes(river, fh, fw)
        if not a.no_corridor:
            # flow only where there is water: the player treats flow strength as water too,
            # so a lane wider than the river must not leak ripples onto banks and rocks
            wsmall = np.asarray(Image.fromarray((water_f * 255).astype(np.uint8)).resize(half, Image.BILINEAR)) / 255.0
            st = st * np.clip(wsmall * 1.5, 0, 1)
        vx, vy = blur(vec[..., 0] * st, 1.0), blur(vec[..., 1] * st, 1.0)
        sm = blur(st, 1.0)
        flow[..., 0] = np.clip(0.5 + 0.5 * vx / np.maximum(sm, 1e-3) * (sm > 0.01), 0, 1)
        flow[..., 1] = np.clip(0.5 + 0.5 * vy / np.maximum(sm, 1e-3) * (sm > 0.01), 0, 1)
        flow[..., 2] = sm
    Image.fromarray((flow * 255 + 0.5).astype(np.uint8), "RGB").save(out / "flow.png", optimize=True)

    save_l(water_f, out / "water.png")
    save_l(foliage, out / "foliage.png")
    save_l(light, out / "light.png", half)
    save_l(depth, out / "depth.png", half)

    stats = {}
    for name, arr in (("water", water_f), ("foliage", foliage), ("light", light), ("depth", depth), ("flow_strength", flow[..., 2])):
        stats[name] = {"mean": round(float(arr.mean()), 4), "coverage_gt_0.5_pct": round(float((arr > 0.5).mean() * 100), 2)}
    stats["_meta"] = {"plate": plate.name, "size": f"{w}x{h}", "smooth_size": f"{fw}x{fh}", "river": river_p.name if river else None}
    (out / "stats.json").write_text(json.dumps(stats, indent=2) + "\n")
    print(json.dumps(stats, indent=2))


if __name__ == "__main__":
    main()
