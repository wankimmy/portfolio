"""Third Hunyuan pass: higher octree + more faces so spikes, claws and wing
fingers survive. Writes only to tools/ref - the public GLB is rebuilt by
build_hero_dragon_v4.py after Blender cleanup/baking."""
from __future__ import annotations

import sys
import time
from pathlib import Path

import torch
from PIL import Image

ROOT = Path(r"c:\Users\Admin\Documents\Safwan\portfolio")
REF = ROOT / "tools" / "ref" / "hunyuan-primary-square.png"
OUT = ROOT / "tools" / "ref" / "dragon-hunyuan-raw-v3.glb"

OCTREE = int(sys.argv[1]) if len(sys.argv) > 1 else 512
STEPS = int(sys.argv[2]) if len(sys.argv) > 2 else 50
FACES = int(sys.argv[3]) if len(sys.argv) > 3 else 200_000
SEED = int(sys.argv[4]) if len(sys.argv) > 4 else 7


def main() -> int:
    from hy3dgen.shapegen import (
        DegenerateFaceRemover,
        FaceReducer,
        FloaterRemover,
        Hunyuan3DDiTFlowMatchingPipeline,
    )

    image = Image.open(REF).convert("RGBA")
    print("IMG", image.size, flush=True)
    t0 = time.time()
    pipeline = Hunyuan3DDiTFlowMatchingPipeline.from_pretrained(
        "tencent/Hunyuan3D-2mini",
        subfolder="hunyuan3d-dit-v2-mini",
    )
    print(f"PIPELINE_READY {time.time() - t0:.0f}s", flush=True)
    gen = torch.Generator(device="cuda").manual_seed(SEED)
    mesh = pipeline(
        image=image,
        num_inference_steps=STEPS,
        octree_resolution=OCTREE,
        guidance_scale=5.5,
        generator=gen,
        num_chunks=20000,
    )[0]
    print(f"SHAPE_OK verts={len(mesh.vertices)} faces={len(mesh.faces)} {time.time() - t0:.0f}s", flush=True)
    mesh = FloaterRemover()(mesh)
    mesh = DegenerateFaceRemover()(mesh)
    mesh = FaceReducer()(mesh, max_facenum=FACES)
    print(f"CLEAN_OK verts={len(mesh.vertices)} faces={len(mesh.faces)}", flush=True)
    mesh.export(str(OUT))
    print(f"EXPORTED={OUT} size={OUT.stat().st_size} total={time.time() - t0:.0f}s", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
