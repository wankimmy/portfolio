"""Fetch the Hunyuan3D-2mini shape model into the folder hy3dgen looks in first.

Only the two files the pipeline loads: config.yaml and model.fp16.safetensors
(3.82 GB). hy3dgen's own download would also pull the 3.82 GB .ckpt twin.

    tools/hy3d-venv/Scripts/python.exe tools/fetch_hunyuan_weights.py
"""
from __future__ import annotations

import os
import shutil
from pathlib import Path

from huggingface_hub import hf_hub_download

REPO = "tencent/Hunyuan3D-2mini"
SUB = "hunyuan3d-dit-v2-mini"
DEST = Path(os.path.expanduser(os.environ.get("HY3DGEN_MODELS", "~/.cache/hy3dgen"))) / REPO / SUB


def main() -> None:
    DEST.mkdir(parents=True, exist_ok=True)
    for name in ("config.yaml", "model.fp16.safetensors"):
        target = DEST / name
        if target.exists() and target.stat().st_size > 0:
            print(f"HAVE {target} {target.stat().st_size}", flush=True)
            continue
        cached = hf_hub_download(repo_id=REPO, filename=f"{SUB}/{name}")
        shutil.copyfile(cached, target)
        print(f"FETCHED {target} {target.stat().st_size}", flush=True)
    print("DONE", flush=True)


if __name__ == "__main__":
    main()
