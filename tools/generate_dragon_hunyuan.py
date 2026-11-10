"""
Generate a volumetric dragon GLB from the exact hero reference via Hunyuan3D.
"""
from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

ROOT = Path(r"c:\Users\Admin\Documents\Safwan\portfolio")
REF = ROOT / "tools" / "ref" / "hunyuan-primary.png"
OUT_RAW = ROOT / "tools" / "ref" / "dragon-hunyuan-raw.glb"
OUT_FINAL = ROOT / "public" / "models" / "dragon-hero.glb"

# Mini shape model — fits 16GB with room for cleanup
SHAPE_REPO = "tencent/Hunyuan3D-2mini"
SHAPE_SUBFOLDER = "hunyuan3d-dit-v2-mini-turbo"
# Full paint model for reference-aligned texture
PAINT_REPO = "tencent/Hunyuan3D-2"


def main() -> int:
    if not REF.exists():
        print(f"MISSING_REF={REF}")
        return 1

    from hy3dgen.rembg import BackgroundRemover
    from hy3dgen.shapegen import (
        DegenerateFaceRemover,
        FaceReducer,
        FloaterRemover,
        Hunyuan3DDiTFlowMatchingPipeline,
    )

    print(f"LOAD_IMAGE={REF}")
    image = Image.open(REF).convert("RGBA")
    # Ensure clean alpha (reference already transparent / black bg)
    rembg = BackgroundRemover()
    image = rembg(image)
    image.save(ROOT / "tools" / "ref" / "hunyuan-primary-nobg.png")
    print("REMBG_OK")

    print(f"LOAD_SHAPE={SHAPE_REPO}/{SHAPE_SUBFOLDER}")
    pipeline = Hunyuan3DDiTFlowMatchingPipeline.from_pretrained(
        SHAPE_REPO,
        subfolder=SHAPE_SUBFOLDER,
    )
    print("SHAPE_PIPELINE_READY")
    mesh = pipeline(
        image=image,
        num_inference_steps=30,
        octree_resolution=256,
        guidance_scale=5.5,
    )[0]
    print(f"SHAPE_OK verts={len(mesh.vertices)} faces={len(mesh.faces)}")

    mesh = FloaterRemover()(mesh)
    mesh = DegenerateFaceRemover()(mesh)
    mesh = FaceReducer()(mesh)
    print(f"CLEAN_OK verts={len(mesh.vertices)} faces={len(mesh.faces)}")

    # Texture from reference for closer visual match (may OOM — catch and continue)
    try:
        from hy3dgen.texgen import Hunyuan3DPaintPipeline

        print(f"LOAD_PAINT={PAINT_REPO}")
        paint = Hunyuan3DPaintPipeline.from_pretrained(PAINT_REPO)
        mesh = paint(mesh, image=image)
        print("PAINT_OK")
    except Exception as exc:
        print(f"PAINT_SKIP={exc!r}")

    OUT_RAW.parent.mkdir(parents=True, exist_ok=True)
    OUT_FINAL.parent.mkdir(parents=True, exist_ok=True)
    mesh.export(str(OUT_RAW))
    mesh.export(str(OUT_FINAL))
    print(f"EXPORTED_RAW={OUT_RAW} size={OUT_RAW.stat().st_size}")
    print(f"EXPORTED_FINAL={OUT_FINAL} size={OUT_FINAL.stat().st_size}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
