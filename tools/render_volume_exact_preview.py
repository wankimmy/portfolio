"""Render front view of volume+projected dragon for verification."""
from pathlib import Path

import bpy

BLEND = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref\dragon-hero-volume.blend")
OUT = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref\hero-volume-exact-preview.png")


def main():
    bpy.ops.wm.open_mainfile(filepath=str(BLEND))
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE"
    scene.render.resolution_x = 1280
    scene.render.resolution_y = 720
    scene.render.filepath = str(OUT)
    scene.render.image_settings.file_format = "PNG"

    # Side camera so projected YZ albedo reads clearly
    bpy.ops.object.camera_add(location=(3.6, 0.2, 0.7))
    cam = bpy.context.active_object
    scene.camera = cam
    target = bpy.data.objects.new("LookAt", None)
    bpy.context.collection.objects.link(target)
    target.location = (0, 0, 0.15)
    cns = cam.constraints.new(type="TRACK_TO")
    cns.target = target
    cns.track_axis = "TRACK_NEGATIVE_Z"
    cns.up_axis = "UP_Y"

    bpy.ops.object.light_add(type="AREA", location=(2.0, -2.0, 3.0))
    key = bpy.context.active_object
    key.data.energy = 350
    key.data.color = (1.0, 0.96, 0.9)

    bpy.ops.object.light_add(type="AREA", location=(0.0, 3.0, 1.5))
    rim = bpy.context.active_object
    rim.data.energy = 500
    rim.data.color = (0.35, 0.85, 1.0)

    world = bpy.data.worlds.new("PreviewWorld")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs[0].default_value = (0.04, 0.06, 0.09, 1.0)
        bg.inputs[1].default_value = 0.35

    bpy.ops.render.render(write_still=True)
    print(f"PREVIEW={OUT} size={OUT.stat().st_size}")


if __name__ == "__main__":
    main()
