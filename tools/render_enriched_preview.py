"""Still render enriched dragon for visual verification."""
from pathlib import Path

import bpy

BLEND = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref\dragon-hero-enriched.blend")
OUT = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref\hero-enriched-preview.png")


def main():
    bpy.ops.wm.open_mainfile(filepath=str(BLEND))
    scene = bpy.context.scene
    scene.render.engine = "BLENDER_EEVEE"
    # Bloom helps cyan eye emission read in stills
    if hasattr(scene, "eevee"):
        try:
            scene.eevee.use_bloom = True
            scene.eevee.bloom_intensity = 0.4
            scene.eevee.bloom_threshold = 0.6
        except Exception:
            pass

    scene.render.resolution_x = 1280
    scene.render.resolution_y = 720
    scene.render.filepath = str(OUT)
    scene.render.image_settings.file_format = "PNG"

    # Side/front camera so head and eyes are visible
    bpy.ops.object.camera_add(location=(0.4, -3.2, 0.9))
    cam = bpy.context.active_object
    scene.camera = cam
    target = bpy.data.objects.new("LookAt", None)
    bpy.context.collection.objects.link(target)
    target.location = (0, -0.35, 0.25)
    cam_constraint = cam.constraints.new(type="TRACK_TO")
    cam_constraint.target = target
    cam_constraint.track_axis = "TRACK_NEGATIVE_Z"
    cam_constraint.up_axis = "UP_Y"

    # Lights matching hero rim
    bpy.ops.object.light_add(type="AREA", location=(2.2, 3.4, 2.6))
    key = bpy.context.active_object
    key.data.energy = 400
    key.data.color = (1.0, 0.96, 0.88)

    bpy.ops.object.light_add(type="AREA", location=(0.1, -3.2, 1.8))
    rim = bpy.context.active_object
    rim.data.energy = 550
    rim.data.color = (0.35, 0.85, 1.0)

    world = bpy.data.worlds.new("PreviewWorld")
    scene.world = world
    world.use_nodes = True
    bg = world.node_tree.nodes.get("Background")
    if bg:
        bg.inputs[0].default_value = (0.04, 0.06, 0.09, 1.0)
        bg.inputs[1].default_value = 0.4

    bpy.ops.render.render(write_still=True)
    print(f"PREVIEW={OUT} size={OUT.stat().st_size}")


if __name__ == "__main__":
    main()
