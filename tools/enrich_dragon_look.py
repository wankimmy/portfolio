"""Thin entry: hero dragon is produced by build_dragon_variants.py (same master)."""
from __future__ import annotations

import runpy
from pathlib import Path

SCRIPT = Path(__file__).with_name("build_dragon_variants.py")

if __name__ == "__main__":
    # Prefer full variant suite so hero stays in sync with section dragons.
    runpy.run_path(str(SCRIPT), run_name="__main__")
