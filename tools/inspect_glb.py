import bpy
import json
path = r"c:\Users\Admin\Documents\Safwan\portfolio\public\models\dragon_exact_billboard.glb"
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.ops.import_scene.gltf(filepath=path)
objs = []
for o in bpy.context.scene.objects:
    info = {"name": o.name, "type": o.type, "verts": 0, "mats": []}
    if o.type == "MESH" and o.data:
        info["verts"] = len(o.data.vertices)
        info["mats"] = [m.name for m in (o.data.materials or []) if m]
        # check for image textures
        imgs = []
        for m in o.data.materials or []:
            if not m or not m.use_nodes: continue
            for n in m.node_tree.nodes:
                if n.type == "TEX_IMAGE" and n.image:
                    imgs.append({"name": n.image.name, "size": list(n.image.size)})
        info["images"] = imgs
    objs.append(info)
print("GLB_INFO=" + json.dumps(objs))
