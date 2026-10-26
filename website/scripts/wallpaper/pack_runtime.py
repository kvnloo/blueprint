#!/usr/bin/env python3
"""Pack the derived Living Ruins masks into the small runtime textures the WebGL player loads.

Usage (from repo root):
  uv run --with numpy --with pillow website/scripts/wallpaper/pack_runtime.py

Reads  website/art/living-ruins/masks/{water,foliage,light,depth,flow}.png
Writes website/src/public/wallpaper/living-ruins/
  masks.webp  RGB lossless  R = water, G = foliage (tip weighted), B = light
  flow.webp   RGB lossless  R,G = flow direction (0.5 = zero, +y down), B = strength
  depth.webp  RGB lossy     depth in all channels (0 = far, 1 = near), blurred for smooth parallax
and refreshes the "depth" field of website/src/data/wallpaper-hotspots.json.

Lossless WebP is used for the packed masks because lossy WebP subsamples chroma, which
would bleed one packed channel into another.
"""
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parents[2]  # website/
SRC = ROOT / "art" / "living-ruins" / "masks"
OUT = ROOT / "src" / "public" / "wallpaper" / "living-ruins"
HOTSPOTS = ROOT / "src" / "data" / "wallpaper-hotspots.json"


def gray(name: str) -> Image.Image:
    return Image.open(SRC / name).convert("L")


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    masks = Image.merge("RGB", (gray("water.png"), gray("foliage.png"), gray("light.png")))
    masks.save(OUT / "masks.webp", lossless=True, quality=100, method=6)

    Image.open(SRC / "flow.png").convert("RGB").save(OUT / "flow.webp", lossless=True, quality=100, method=6)

    depth = gray("depth.png").filter(ImageFilter.GaussianBlur(3))
    Image.merge("RGB", (depth, depth, depth)).save(OUT / "depth.webp", quality=88, method=6)

    d = np.asarray(depth, np.float32) / 255.0
    h, w = d.shape
    data = json.loads(HOTSPOTS.read_text())
    for hs in data["hotspots"]:
        x = min(w - 1, max(0, int(hs["x"] * w)))
        y = min(h - 1, max(0, int(hs["y"] * h)))
        hs["depth"] = round(float(d[y, x]), 3)
    HOTSPOTS.write_text(json.dumps(data, indent=2) + "\n")

    for f in ("masks.webp", "flow.webp", "depth.webp", "base.webp", "base.jpg"):
        p = OUT / f
        if p.exists():
            print(f"{f:12s} {p.stat().st_size / 1024:7.1f} KB")


if __name__ == "__main__":
    main()
