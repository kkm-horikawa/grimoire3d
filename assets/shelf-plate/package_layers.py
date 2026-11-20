"""Package web assets from the Blender shelf plate layers."""
from pathlib import Path

from PIL import Image

directory = Path(__file__).resolve().parent
size = (640, 176)


def load_render(filename):
    with Image.open(directory / filename) as source:
        return source.convert("RGBA").resize(size, Image.Resampling.LANCZOS)


frame = load_render("frame-master.png")
frame.save(directory / "plate-frame.webp", method=6, quality=92)

screws = load_render("screws-master.png")
for side, left in (("left", 22), ("right", 570)):
    cutout = screws.crop((left, 64, left + 48, 112))
    cutout.save(directory / f"plate-screw-{side}.webp", lossless=True, method=6)
