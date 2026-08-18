from __future__ import annotations

import base64
from pathlib import Path

import pillow_avif  # noqa: F401 - registers AVIF support in Pillow
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE_B64 = ROOT / "scripts" / "v3-atlas.b64"
SOURCE_AVIF = ROOT / ".tmp-v3-atlas.avif"
OUTPUT = ROOT / "public" / "assets" / "art" / "v4"

EXPECTED_SIZE = (1000, 496)

ASSETS: dict[str, tuple[int, int, int, int]] = {
    # Character states - 200x180
    "dog-idle.png": (0, 0, 200, 180),
    "dog-happy.png": (200, 0, 400, 180),
    "dog-waiting.png": (400, 0, 600, 180),
    "dog-curious.png": (600, 0, 800, 180),
    "dog-sleeping.png": (800, 0, 1000, 180),

    # Care actions - 96x96
    "care-feed.png": (0, 180, 96, 276),
    "care-water.png": (96, 180, 192, 276),
    "care-walk.png": (192, 180, 288, 276),
    "care-play.png": (288, 180, 384, 276),
    "care-training.png": (384, 180, 480, 276),
    "care-groom.png": (480, 180, 576, 276),
    "care-photo.png": (576, 180, 672, 276),

    # Currency + navigation - 80x80
    "ui-bone.png": (0, 276, 80, 356),
    "ui-coin.png": (80, 276, 160, 356),
    "ui-heart.png": (160, 276, 240, 356),
    "nav-home.png": (240, 276, 320, 356),
    "nav-training.png": (320, 276, 400, 356),
    "nav-adventures.png": (400, 276, 480, 356),
    "nav-history.png": (480, 276, 560, 356),
    "nav-more.png": (560, 276, 640, 356),

    # Room - 180x140
    "room-window.png": (0, 356, 180, 496),
    "room-sofa.png": (180, 356, 360, 496),
    "room-rug.png": (360, 356, 540, 496),
    "room-bed.png": (540, 356, 720, 496),
    "room-table-lamp.png": (720, 356, 900, 496),
}


def main() -> None:
    encoded = "".join(SOURCE_B64.read_text(encoding="utf-8").split())
    SOURCE_AVIF.write_bytes(base64.b64decode(encoded, validate=True))

    OUTPUT.mkdir(parents=True, exist_ok=True)
    with Image.open(SOURCE_AVIF) as source:
        image = source.convert("RGBA")
        if image.size != EXPECTED_SIZE:
            raise RuntimeError(f"Unexpected atlas size: {image.size}, expected {EXPECTED_SIZE}")

        for filename, box in ASSETS.items():
            crop = image.crop(box)
            crop.save(OUTPUT / filename, format="PNG", optimize=True)

    SOURCE_AVIF.unlink(missing_ok=True)
    print(f"Created {len(ASSETS)} lossless PNG assets in {OUTPUT}")


if __name__ == "__main__":
    main()
