"""
DEPRECATED: scroll props replaced by same-dragon pose variants.

Use:
  blender --background --python tools/build_dragon_variants.py

Outputs: dragon-skills / dragon-about / dragon-projects / dragon-experience
"""
from __future__ import annotations

import runpy
from pathlib import Path

SCRIPT = Path(__file__).with_name("build_dragon_variants.py")

if __name__ == "__main__":
    print("build_scroll_assets.py redirects to build_dragon_variants.py")
    runpy.run_path(str(SCRIPT), run_name="__main__")
