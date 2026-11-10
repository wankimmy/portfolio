import bpy
from pathlib import Path
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=r"c:\Users\Admin\Documents\Safwan\portfolio\public\models\dragon_exact_billboard.glb")
out = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref")
for img in bpy.data.images:
    if img.size[0] > 0:
        path = out / f"billboard_{img.name}.png"
        img.filepath_raw = str(path)
        img.file_format = "PNG"
        img.save()
        print("SAVED", path, img.size[:])
