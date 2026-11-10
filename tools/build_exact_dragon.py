"""
Build dragon-hero.glb from the exact hero dragon PNG (alpha cutout),
with thickness so orbit still reads as a 3D object.
"""
from __future__ import annotations

import math
from pathlib import Path

import bpy

TEX = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref\billboard_Image_0.png")
OUT = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\public\models\dragon-hero.glb")
BLEND = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref\dragon-hero-exact.blend")


def clear_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def make_exact_dragon():
    # Load image
    img = bpy.data.images.load(str(TEX))
    w, h = img.size
    aspect = w / max(h, 1)

    # Plane sized to image aspect (height = 2)
    height = 2.0
    width = height * aspect
    bpy.ops.mesh.primitive_plane_add(size=1, location=(0, 0, 0))
    plane = bpy.context.active_object
    plane.name = "HeroDragonExact"
    plane.scale = (width, height, 1)
    bpy.ops.object.transform_apply(scale=True)

    # Rotate to stand facing +Y (Three.js camera looks toward origin from +Z by default in our viewer)
    plane.rotation_euler = (math.radians(90), 0, 0)
    bpy.ops.object.transform_apply(rotation=True)

    # Material with alpha clip — exact pixels from the PNG
    mat = bpy.data.materials.new("DragonExactMaterial")
    mat.use_nodes = True
    mat.blend_method = "CLIP"
    if hasattr(mat, "shadow_method"):
        mat.shadow_method = "CLIP"
    nt = mat.node_tree
    nodes = nt.nodes
    links = nt.links
    nodes.clear()

    out = nodes.new("ShaderNodeOutputMaterial")
    out.location = (600, 0)
    bsdf = nodes.new("ShaderNodeBsdfPrincipled")
    bsdf.location = (300, 0)
    tex = nodes.new("ShaderNodeTexImage")
    tex.location = (0, 0)
    tex.image = img
    tex.interpolation = "Closest"  # keep facet edges crisp

    links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
    links.new(tex.outputs["Alpha"], bsdf.inputs["Alpha"])
    links.new(bsdf.outputs["BSDF"], out.inputs["Surface"])

    # Slight emission from bright cyan in texture via base; bump roughness low for crystal facets
    if "Roughness" in bsdf.inputs:
        bsdf.inputs["Roughness"].default_value = 0.45
    if "Specular IOR Level" in bsdf.inputs:
        bsdf.inputs["Specular IOR Level"].default_value = 0.4
    elif "Specular" in bsdf.inputs:
        bsdf.inputs["Specular"].default_value = 0.4

    plane.data.materials.append(mat)

    # Give slight thickness so orbit doesn't vanish to a line
    solid = plane.modifiers.new("Solidify", "SOLIDIFY")
    solid.thickness = 0.045
    solid.offset = 0.0
    bpy.ops.object.modifier_apply(modifier="Solidify")

    # Flat shade
    for p in plane.data.polygons:
        p.use_smooth = False

    # Root empty + idle sway
    root = bpy.data.objects.new("DragonRoot", None)
    bpy.context.collection.objects.link(root)
    plane.parent = root

    scene = bpy.context.scene
    scene.frame_start = 1
    scene.frame_end = 120
    scene.render.fps = 30
    for frame, dz, ry in (
        (1, 0.0, 0.0),
        (30, 0.03, math.radians(2)),
        (60, 0.0, 0.0),
        (90, -0.02, math.radians(-2)),
        (120, 0.0, 0.0),
    ):
        scene.frame_set(frame)
        root.location = (0, 0, dz)
        root.rotation_euler = (0, 0, ry)
        root.keyframe_insert(data_path="location", index=2)
        root.keyframe_insert(data_path="rotation_euler", index=2)

    return root, plane


def export_glb():
    OUT.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=str(OUT),
        export_format="GLB",
        export_animations=True,
        export_lights=False,
        export_cameras=False,
        export_image_format="AUTO",
    )
    print(f"EXPORTED={OUT} size={OUT.stat().st_size}")


def main():
    clear_scene()
    make_exact_dragon()
    BLEND.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(BLEND))
    export_glb()
    print("DONE")


if __name__ == "__main__":
    main()
