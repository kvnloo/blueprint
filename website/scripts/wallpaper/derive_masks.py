#!/usr/bin/env python3
"""Deterministically derive wallpaper masks from an ORIGINAL base plate.

Usage (from repo root):
  uv run --with numpy --with pillow website/scripts/wallpaper/derive_masks.py \
      --plate website/art/living-ruins/base.png \
      --river website/art/living-ruins/river.json \
      --out   website/art/living-ruins/masks

Outputs (1024x576 by default, 8-bit PNG, no randomness):
  water.png    L   water body (turquoise HSV range, cleaned, intersected with the river corridor)
  foliage.png  L   greens; 1.0 at leaf/grass tips fading to 0.0 at the base of each vertical run
  light.png    L   bright desaturated upper region where god-rays are anchored
  depth.png    L   0 = far, 1 = near (vertical gradient + atmospheric luminance heuristic)
  flow.png     RGB R,G = flow direction (0.5 = zero, uv space, +y down), B = strength
  stats.json       coverage percentages (mean luminance and fraction > 0.5)

river.json format (all coordinates normalised 0..1, origin top-left):
  {"corridor": 0.05,
   "polylines": [{"name": "river", "width": 0.03, "speed": 1.0, "points": [[x,y], ...]},
                 {"name": "fall",  "width": 0.02, "speed": 2.0, "points": [[x,y], ...]}]}
Points run in the direction the water flows. "width" is the half-width of the flow lane.
"corridor" (optional) dilates the union of lanes; the water mask is clipped to it so blue
sky or glass roofs are never picked up. Use --no-corridor to disable.
"""
import argparse, json, sys
from pathlib import Path
import numpy as np
from PIL import Image, ImageFilter


def to_hsv(rgb):
    return np.asarray(Image.fromarray(rgb, "RGB").convert("HSV"), dtype=np.float32) / 255.0


def blur(a, r):
    im = Image.fromarray((np.clip(a, 0, 1) * 255).astype(np.uint8), "L")
    return np.asarray(im.filter(ImageFilter.GaussianBlur(r)), dtype=np.float32) / 255.0


def morph(a, open_px, close_px):
    im = Image.fromarray((a > 0.5).astype(np.uint8) * 255, "L")
    if open_px:
        k = open_px * 2 + 1
        im = im.filter(ImageFilter.MinFilter(k)).filter(ImageFilter.MaxFilter(k))
    if close_px:
        k = close_px * 2 + 1
        im = im.filter(ImageFilter.MaxFilter(k)).filter(ImageFilter.MinFilter(k))
    return np.asarray(im, dtype=np.float32) / 255.0


def remove_small(a, min_px):
    """Drop connected components under min_px (4-neighbour flood fill, iterative)."""
    h, w = a.shape
    seen = np.zeros_like(a, dtype=bool)
    out = np.zeros_like(a)
    on = a > 0.5
    for y0 in range(h):
        for x0 in np.flatnonzero(on[y0] & ~seen[y0]):
            if seen[y0, x0]:
                continue
            stack, comp = [(y0, x0)], []
            seen[y0, x0] = True
            while stack:
                y, x = stack.pop()
                comp.append((y, x))
                for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                    if 0 <= ny < h and 0 <= nx < w and on[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        stack.append((ny, nx))
            if len(comp) >= min_px:
                ys, xs = zip(*comp)
                out[list(ys), list(xs)] = 1.0
    return out


def edge_fade(a, frac=0.01):
    h, w = a.shape
    m = max(2, int(round(w * frac)))
    a = a.copy()
    a[:m, :] = 0; a[-m:, :] = 0; a[:, :m] = 0; a[:, -m:] = 0
    return a


def lanes(river, h, w):
    """Return (corridor 0/1, flow vec field HxWx2, strength HxW) from polylines."""
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    px, py = (xx + 0.5) / w, (yy + 0.5) / h
    best = np.full((h, w), 1e9, np.float32)
    vec = np.zeros((h, w, 2), np.float32)
    strength = np.zeros((h, w), np.float32)
    aspect = w / h  # measure distances in a square space so lanes are round
    for pl in river["polylines"]:
        pts = np.asarray(pl["points"], np.float32)
        hw, spd = float(pl["width"]), float(pl.get("speed", 1.0))
        for a, b in zip(pts[:-1], pts[1:]):
            ax, ay, bx, by = a[0] * aspect, a[1], b[0] * aspect, b[1]
            dx, dy = bx - ax, by - ay
            L2 = dx * dx + dy * dy + 1e-12
            t = np.clip(((px * aspect - ax) * dx + (py - ay) * dy) / L2, 0, 1)
            d = np.hypot(px * aspect - (ax + t * dx), py - (ay + t * dy))
            upd = (d < best) & (d < hw)
            n = np.hypot(dx / aspect, dy)  # direction in uv space, normalised
            dirx, diry = (dx / aspect) / (n + 1e-9), dy / (n + 1e-9)
            fall = np.clip(1.0 - (d / hw) ** 2, 0, 1)  # soft lane edge
            vec[upd] = (dirx, diry)
            # strength encodes lane softness scaled by speed (speed 3+ saturates)
            strength[upd] = (fall * np.clip(0.35 + 0.65 * spd / 3.0, 0, 1))[upd]
            best[upd] = d[upd]
    cor = float(river.get("corridor", 0.0))
    near = np.zeros((h, w), np.float32)
    if cor > 0:
        # corridor = wider tube around every polyline
        big = {"polylines": [dict(pl, width=float(pl["width"]) + cor) for pl in river["polylines"]]}
        _, _, s = lanes_simple(big, h, w)
        near = (s > 0).astype(np.float32)
    return near, vec, strength


def lanes_simple(river, h, w):
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float32)
    px, py = (xx + 0.5) / w, (yy + 0.5) / h
    aspect = w / h
    s = np.zeros((h, w), np.float32)
    for pl in river["polylines"]:
        pts = np.asarray(pl["points"], np.float32)
        for a, b in zip(pts[:-1], pts[1:]):
            ax, ay, bx, by = a[0] * aspect, a[1], b[0] * aspect, b[1]
            dx, dy = bx - ax, by - ay
            t = np.clip(((px * aspect - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy + 1e-12), 0, 1)
            d = np.hypot(px * aspect - (ax + t * dx), py - (ay + t * dy))
            s = np.maximum(s, (d < pl["width"]).astype(np.float32))
    return None, None, s


def save_l(a, path):
    Image.fromarray((np.clip(a, 0, 1) * 255 + 0.5).astype(np.uint8), "L").save(path, optimize=True)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--plate", required=True, help="base plate image (any size, 16:9 expected)")
    ap.add_argument("--river", help="river polyline JSON (default: river.json next to the plate)")
    ap.add_argument("--out", help="output dir (default: masks/ next to the plate)")
    ap.add_argument("--size", default="1024x576")
    ap.add_argument("--no-corridor", action="store_true")
    # tunables, all with sane defaults for turquoise water / green foliage
    ap.add_argument("--water-hue", default="150,215", help="degrees lo,hi")
    ap.add_argument("--water-sat", type=float, default=0.28)
    ap.add_argument("--water-val", type=float, default=0.38)
    ap.add_argument("--foliage-hue", default="55,175")
    ap.add_argument("--foliage-sat", type=float, default=0.18)
    ap.add_argument("--foliage-val", type=float, default=0.07)
    ap.add_argument("--light-val", type=float, default=0.72)
    ap.add_argument("--light-sat", type=float, default=0.38)
    a = ap.parse_args()

    plate = Path(a.plate)
    out = Path(a.out) if a.out else plate.parent / "masks"
    river_p = Path(a.river) if a.river else plate.parent / "river.json"
    out.mkdir(parents=True, exist_ok=True)
    w, h = (int(v) for v in a.size.split("x"))
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
    ys = np.linspace(0, 1, h, dtype=np.float32)[:, None] * np.ones((1, w), np.float32)

    river = json.loads(river_p.read_text()) if river_p.exists() else None
    if river is None:
        print(f"warning: {river_p} missing, flow map will be empty and water unclipped", file=sys.stderr)

    # ---- water
    wlo, whi = (float(v) for v in a.water_hue.split(","))
    water = ((H >= wlo) & (H <= whi) & (S >= a.water_sat) & (V >= a.water_val)).astype(np.float32)
    cor = None
    if river and not a.no_corridor and river.get("corridor"):
        cor, _, _ = lanes(river, h, w)
        water *= cor
    water = morph(water, 1, 3)
    water = remove_small(water, int(0.0004 * w * h))
    water = edge_fade(blur(water, 1.2))

    # ---- foliage (greens) with tip-weighted vertical gradient
    flo, fhi = (float(v) for v in a.foliage_hue.split(","))
    fol = ((H >= flo) & (H <= fhi) & (S >= a.foliage_sat) & (V >= a.foliage_val)).astype(np.float32)
    fol *= (1.0 - (water > 0.3))
    fol = morph(fol, 1, 2)
    fol = remove_small(fol, int(0.0003 * w * h))
    tip = np.zeros_like(fol)
    L = max(8, h // 12)
    for x in range(w):
        col = fol[:, x] > 0.5
        run = 0
        for y in range(h):
            if col[y]:
                tip[y, x] = max(0.0, 1.0 - run / L)
                run += 1
            else:
                run = 0
    foliage = edge_fade(blur(fol * tip, 1.5))

    # ---- light / sky
    top = np.clip(1.0 - (ys - 0.45) / 0.25, 0, 1)  # fully on above 45% height, gone by 70%
    light = ((V >= a.light_val) & (S <= a.light_sat)).astype(np.float32)
    light = morph(light, 1, 4) * top
    light = edge_fade(blur(light, 4.0))

    # ---- depth: gradient + luminance heuristic (distant = lighter, lower contrast)
    lum_b = blur(lum, 12)
    depth = np.clip(0.7 * ys + 0.3 * (1.0 - lum_b), 0, 1)
    depth = blur(depth, 6)
    d0, d1 = float(depth.min()), float(depth.max())
    depth = (depth - d0) / max(d1 - d0, 1e-6)

    # ---- flow map
    flow = np.zeros((h, w, 3), np.float32) + np.array([0.5, 0.5, 0.0], np.float32)
    if river:
        _, vec, st = lanes(river, h, w)
        if not a.no_corridor:
            # keep flow only where it overlaps (slightly grown) water, plus waterfall lanes untouched
            grown = blur(morph(water, 0, 0), 6) > 0.02
            st = st * np.where(grown, 1.0, 0.35)
        vx, vy = blur(vec[..., 0] * st, 2.0), blur(vec[..., 1] * st, 2.0)
        sm = blur(st, 2.0)
        flow[..., 0] = np.clip(0.5 + 0.5 * vx / np.maximum(sm, 1e-3) * (sm > 0.01), 0, 1)
        flow[..., 1] = np.clip(0.5 + 0.5 * vy / np.maximum(sm, 1e-3) * (sm > 0.01), 0, 1)
        flow[..., 2] = sm
    Image.fromarray((flow * 255 + 0.5).astype(np.uint8), "RGB").save(out / "flow.png", optimize=True)

    for name, arr in (("water", water), ("foliage", foliage), ("light", light), ("depth", depth)):
        save_l(arr, out / f"{name}.png")

    stats = {}
    for name, arr in (("water", water), ("foliage", foliage), ("light", light), ("depth", depth), ("flow_strength", flow[..., 2])):
        stats[name] = {"mean": round(float(arr.mean()), 4), "coverage_gt_0.5_pct": round(float((arr > 0.5).mean() * 100), 2)}
    stats["_meta"] = {"plate": str(plate), "size": f"{w}x{h}", "river": str(river_p) if river else None}
    (out / "stats.json").write_text(json.dumps(stats, indent=2) + "\n")
    print(json.dumps(stats, indent=2))


if __name__ == "__main__":
    main()
