"""Second Hunyuan attempt — keep alpha, no rembg, non-turbo mini."""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(r"c:\Users\Admin\Documents\Safwan\portfolio")
REF = ROOT / "tools" / "ref" / "hunyuan-primary.png"
OUT = ROOT / "tools" / "ref" / "dragon-hunyuan-raw-v2.glb"
OUT_FINAL = ROOT / "public" / "models" / "dragon-hero.glb"


def main() -> int:
    from hy3dgen.shapegen import (
        DegenerateFaceRemover,
        FaceReducer,
        FloaterRemover,
        Hunyuan3DDiTFlowMatchingPipeline,
    )

    image = Image.open(REF).convert("RGBA")
    # Crop to non-transparent bbox for cleaner conditioning
    bbox = image.getbbox()
    if bbox:
        image = image.crop(bbox)
    # Pad square on black
    w, h = image.size
    side = max(w, h)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    canvas.paste(image, ((side - w) // 2, (side - h) // 2), image)
    canvas.save(ROOT / "tools" / "ref" / "hunyuan-primary-square.png")
    print("PREP_OK", canvas.size)

    pipeline = Hunyuan3DDiTFlowMatchingPipeline.from_pretrained(
        "tencent/Hunyuan3D-2mini",
        subfolder="hunyuan3d-dit-v2-mini",  # non-turbo
    )
    print("PIPELINE_READY")
    mesh = pipeline(
        image=canvas,
        num_inference_steps=40,
        octree_resolution=384,
        guidance_scale=6.0,
    )[0]
    print(f"SHAPE_OK verts={len(mesh.vertices)} faces={len(mesh.faces)}")
    mesh = FloaterRemover()(mesh)
    mesh = DegenerateFaceRemover()(mesh)
    mesh = FaceReducer()(mesh)
    print(f"CLEAN_OK verts={len(mesh.vertices)} faces={len(mesh.faces)}")
    mesh.export(str(OUT))
    mesh.export(str(OUT_FINAL))
    print(f"EXPORTED={OUT} size={OUT.stat().st_size}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
