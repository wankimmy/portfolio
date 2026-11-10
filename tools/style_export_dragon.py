"""Style Hunyuan raw GLB and export final dragon-hero.glb via Blender CLI."""
from __future__ import annotations

from pathlib import Path

import bpy

RAW = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref\dragon-hunyuan-raw.glb")
OUT = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\public\models\dragon-hero.glb")
BLEND = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref\dragon-hero-mesh.blend")


def main():
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=str(RAW))

    meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
    print("MESHES", [(o.name, len(o.data.vertices)) for o in meshes])
    if not meshes:
        raise SystemExit("no mesh imported")

    bpy.ops.object.select_all(action="DESELECT")
    for o in meshes:
        o.select_set(True)
        for p in o.data.polygons:
            p.use_smooth = False
    bpy.context.view_layer.objects.active = meshes[0]
    if len(meshes) > 1:
        bpy.ops.object.join()

    dragon = bpy.context.view_layer.objects.active
    dragon.name = "HeroDragonMesh"

    body = bpy.data.materials.new("DragonBodyWhite")
    body.use_nodes = True
    bsdf = body.node_tree.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.92, 0.93, 0.95, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.48
    if "Metallic" in bsdf.inputs:
        bsdf.inputs["Metallic"].default_value = 0.05

    dragon.data.materials.clear()
    dragon.data.materials.append(body)

    bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="BOUNDS")
    dims = dragon.dimensions
    scale = 2.0 / max(dims.x, dims.y, dims.z, 0.001)
    dragon.scale = (scale, scale, scale)
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)

    root = bpy.data.objects.new("DragonRoot", None)
    bpy.context.collection.objects.link(root)
    dragon.parent = root

    scene = bpy.context.scene
    scene.frame_start = 1
    scene.frame_end = 120
    for frame, dz, ry in (
        (1, 0.0, 0.0),
        (40, 0.03, 0.04),
        (80, -0.02, -0.03),
        (120, 0.0, 0.0),
    ):
        scene.frame_set(frame)
        root.location = (0.0, 0.0, dz)
        root.rotation_euler = (0.0, 0.0, ry)
        root.keyframe_insert(data_path="location", index=2)
        root.keyframe_insert(data_path="rotation_euler", index=2)

    BLEND.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(BLEND))
    bpy.ops.export_scene.gltf(
        filepath=str(OUT),
        export_format="GLB",
        export_animations=True,
        export_lights=False,
        export_cameras=False,
    )
    print(f"EXPORTED={OUT} size={OUT.stat().st_size}")
    print(f"VERTS={len(dragon.data.vertices)} DIMS={list(dragon.dimensions)}")


if __name__ == "__main__":
    main()
