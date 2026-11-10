import bpy
from math import radians
from pathlib import Path

BLEND = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref\dragon-hero-mesh.blend")
OUT = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref\fidelity-preview.png")
bpy.ops.wm.open_mainfile(filepath=str(BLEND))

# Camera front view
cam_data = bpy.data.cameras.new("PrevCam")
cam = bpy.data.objects.new("PrevCam", cam_data)
bpy.context.collection.objects.link(cam)
cam.location = (0, -3.6, 0.4)
cam.rotation_euler = (radians(90), 0, 0)
bpy.context.scene.camera = cam

# Lights
for name, loc, energy in (("K",(2, -2, 3), 400), ("R",(-1, 2, 2), 120)):
    ld = bpy.data.lights.new(name, type="AREA")
    ld.energy = energy
    ld.size = 2
    o = bpy.data.objects.new(name, ld)
    bpy.context.collection.objects.link(o)
    o.location = loc

scene = bpy.context.scene
scene.render.engine = "BLENDER_EEVEE_NEXT" if "BLENDER_EEVEE_NEXT" in dir(bpy.types) else "BLENDER_EEVEE"
scene.render.resolution_x = 1024
scene.render.resolution_y = 768
scene.render.filepath = str(OUT)
scene.render.film_transparent = True
bpy.ops.render.render(write_still=True)
print("RENDERED", OUT, OUT.exists())
