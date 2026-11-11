"""Sculpt one or more creatures from their concept pictures with Hunyuan3D-2mini,
the same generator and settings that made the dragon (generate_dragon_hunyuan_v3.py).

    tools/hy3d-venv/Scripts/python.exe tools/generate_creature_hunyuan.py name[:seed] [name[:seed] ...]

Reads  tools/ref/creature-<name>-ref.png   (transparent ground, see tools/shoot_reference.mjs)
Writes tools/ref/creature-<name>-raw.glb   (raw sculpt; the site model is built from it in Blender)

Environment: HY_OCTREE (512), HY_STEPS (50), HY_FACES (200000).
The model weights load once for all names. Fetch them first: tools/fetch_hunyuan_weights.py
"""
from __future__ import annotations

import os
import sys
import time
from pathlib import Path

import torch
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
REF = ROOT / "tools" / "ref"
OCTREE = int(os.environ.get("HY_OCTREE", "512"))
STEPS = int(os.environ.get("HY_STEPS", "50"))
FACES = int(os.environ.get("HY_FACES", "200000"))


def main() -> int:
    jobs = []
    for arg in sys.argv[1:]:
        name, _, seed = arg.partition(":")
        jobs.append((name, int(seed) if seed else 7))
    if not jobs:
        print(__doc__)
        return 2

    from hy3dgen.shapegen import (
        DegenerateFaceRemover,
        FaceReducer,
        FloaterRemover,
        Hunyuan3DDiTFlowMatchingPipeline,
    )

    t0 = time.time()
    pipeline = Hunyuan3DDiTFlowMatchingPipeline.from_pretrained(
        "tencent/Hunyuan3D-2mini",
        subfolder="hunyuan3d-dit-v2-mini",
    )
    print(f"PIPELINE_READY {time.time() - t0:.0f}s", flush=True)

    for name, seed in jobs:
        ref = REF / f"creature-{name}-ref.png"
        out = REF / f"creature-{name}-raw.glb"
        image = Image.open(ref).convert("RGBA")
        t1 = time.time()
        gen = torch.Generator(device="cuda").manual_seed(seed)
        mesh = pipeline(
            image=image,
            num_inference_steps=STEPS,
            octree_resolution=OCTREE,
            guidance_scale=5.5,
            generator=gen,
            num_chunks=20000,
        )[0]
        print(f"{name}: SHAPE verts={len(mesh.vertices)} faces={len(mesh.faces)} {time.time() - t1:.0f}s", flush=True)
        mesh = FloaterRemover()(mesh)
        mesh = DegenerateFaceRemover()(mesh)
        mesh = FaceReducer()(mesh, max_facenum=FACES)
        mesh.export(str(out))
        print(f"{name}: EXPORTED {out} faces={len(mesh.faces)} size={out.stat().st_size} seed={seed}", flush=True)
    print(f"DONE {time.time() - t0:.0f}s", flush=True)
    return 0


if __name__ == "__main__":
    sys.exit(main())
