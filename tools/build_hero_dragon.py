"""
Build a faceted white low-poly dragon matching the portfolio hero reference,
then export dragon-hero.glb for the interactive Three.js hero.
"""
from __future__ import annotations

import math
from pathlib import Path

import bmesh
import bpy
from mathutils import Matrix, Vector

OUT = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\public\models\dragon-hero.glb")
BLEND_OUT = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref\dragon-hero.blend")


def clear_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def new_mesh_object(name: str, bm: bmesh.types.BMesh) -> bpy.types.Object:
    mesh = bpy.data.meshes.new(name)
    bm.to_mesh(mesh)
    bm.free()
    obj = bpy.data.objects.new(name, mesh)
    bpy.context.collection.objects.link(obj)
    return obj


def add_box(bm, center, size, mat_index=0):
    cx, cy, cz = center
    sx, sy, sz = size
    hx, hy, hz = sx / 2, sy / 2, sz / 2
    coords = [
        (cx - hx, cy - hy, cz - hz),
        (cx + hx, cy - hy, cz - hz),
        (cx + hx, cy + hy, cz - hz),
        (cx - hx, cy + hy, cz - hz),
        (cx - hx, cy - hy, cz + hz),
        (cx + hx, cy - hy, cz + hz),
        (cx + hx, cy + hy, cz + hz),
        (cx - hx, cy + hy, cz + hz),
    ]
    verts = [bm.verts.new(c) for c in coords]
    faces = [
        (0, 1, 2, 3),
        (4, 7, 6, 5),
        (0, 4, 5, 1),
        (1, 5, 6, 2),
        (2, 6, 7, 3),
        (3, 7, 4, 0),
    ]
    for f in faces:
        face = bm.faces.new([verts[i] for i in f])
        face.material_index = mat_index
    return verts


def add_pyramid(bm, base_center, base_size, tip, mat_index=0):
    cx, cy, cz = base_center
    sx, sy = base_size
    hx, hy = sx / 2, sy / 2
    base = [
        bm.verts.new((cx - hx, cy - hy, cz)),
        bm.verts.new((cx + hx, cy - hy, cz)),
        bm.verts.new((cx + hx, cy + hy, cz)),
        bm.verts.new((cx - hx, cy + hy, cz)),
    ]
    tip_v = bm.verts.new(tip)
    faces = [
        (base[0], base[1], base[2], base[3]),
        (base[0], base[1], tip_v),
        (base[1], base[2], tip_v),
        (base[2], base[3], tip_v),
        (base[3], base[0], tip_v),
    ]
    for f in faces:
        face = bm.faces.new(list(f))
        face.material_index = mat_index


def add_wing(bm, side: float):
    """Bat-like low-poly wing: membrane + finger spines. side = +1 right / -1 left."""
    s = side
    root = Vector((0.15 * s, 0.05, 0.55))
    # Wing tips / finger ends
    tips = [
        Vector((1.55 * s, -0.15, 1.15)),
        Vector((2.05 * s, -0.05, 0.75)),
        Vector((1.85 * s, 0.05, 0.25)),
        Vector((1.15 * s, 0.1, -0.05)),
    ]
    elbow = Vector((0.85 * s, -0.05, 0.95))
    knuckle = Vector((1.25 * s, -0.08, 0.55))

    verts_root = bm.verts.new(root)
    verts_elbow = bm.verts.new(elbow)
    verts_knuckle = bm.verts.new(knuckle)
    tip_vs = [bm.verts.new(t) for t in tips]

    # Membrane panels
    panels = [
        (verts_root, verts_elbow, tip_vs[0]),
        (verts_root, tip_vs[0], tip_vs[1], verts_knuckle),
        (verts_root, verts_knuckle, tip_vs[1], tip_vs[2]),
        (verts_root, tip_vs[2], tip_vs[3]),
    ]
    for panel in panels:
        face = bm.faces.new(list(panel))
        face.material_index = 0

    # Spine thickness as thin boxes along fingers
    spine_pts = [root, elbow, tips[0], knuckle, tips[1], tips[2], tips[3]]
    for i in range(len(spine_pts) - 1):
        a, b = spine_pts[i], spine_pts[i + 1]
        mid = (a + b) * 0.5
        length = (b - a).length
        if length < 1e-4:
            continue
        # Approximate thin box along X mostly — enough for facet look
        add_box(
            bm,
            (mid.x, mid.y, mid.z),
            (0.04 + abs(b.x - a.x) * 0.15, 0.05, 0.04 + abs(b.z - a.z) * 0.12),
            0,
        )


def build_dragon_mesh() -> bpy.types.Object:
    bm = bmesh.new()

    # Torso (faceted)
    add_box(bm, (0, 0, 0.35), (0.55, 0.7, 0.85), 0)
    add_box(bm, (0, 0.05, 0.85), (0.45, 0.55, 0.45), 0)  # chest upper
    add_box(bm, (0, -0.05, 0.05), (0.5, 0.55, 0.35), 0)  # belly

    # Belly scale ridges
    for i, z in enumerate((0.15, 0.35, 0.55, 0.7)):
        w = 0.38 - i * 0.03
        add_box(bm, (0, 0.32, z), (w, 0.12, 0.1), 0)

    # Neck
    add_box(bm, (0, 0.12, 1.15), (0.32, 0.38, 0.35), 0)
    add_box(bm, (0, 0.22, 1.4), (0.28, 0.32, 0.28), 0)

    # Head
    add_box(bm, (0, 0.35, 1.65), (0.42, 0.48, 0.38), 0)
    add_box(bm, (0, 0.55, 1.55), (0.28, 0.35, 0.22), 0)  # snout
    add_pyramid(bm, (0, 0.72, 1.52), (0.18, 0.12), (0, 0.95, 1.48), 0)  # beak tip

    # Jaw under
    add_box(bm, (0, 0.5, 1.42), (0.22, 0.28, 0.1), 0)

    # Crown horns
    for x in (-0.12, 0.12, -0.22, 0.22, 0.0):
        tip_z = 2.05 if abs(x) < 0.05 else 1.95
        add_pyramid(bm, (x, 0.28, 1.82), (0.08, 0.08), (x, 0.2, tip_z), 0)

    # Cheek spikes
    for s in (-1, 1):
        add_pyramid(bm, (0.22 * s, 0.4, 1.62), (0.06, 0.06), (0.42 * s, 0.45, 1.58), 0)

    # Eyes (material index 1 = emissive cyan)
    for s in (-1, 1):
        add_box(bm, (0.16 * s, 0.52, 1.68), (0.1, 0.06, 0.08), 1)

    # Front legs / claws raised
    for s in (-1, 1):
        add_box(bm, (0.28 * s, 0.25, 0.55), (0.14, 0.16, 0.35), 0)  # upper
        add_box(bm, (0.38 * s, 0.4, 0.35), (0.12, 0.14, 0.28), 0)  # forearm
        add_box(bm, (0.45 * s, 0.55, 0.22), (0.18, 0.2, 0.08), 0)  # paw
        for dx in (-0.05, 0.0, 0.05):
            add_pyramid(
                bm,
                (0.45 * s + dx, 0.65, 0.2),
                (0.04, 0.04),
                (0.45 * s + dx * 1.4, 0.78, 0.15),
                0,
            )

    # Hind legs tucked
    for s in (-1, 1):
        add_box(bm, (0.22 * s, -0.15, 0.2), (0.16, 0.2, 0.35), 0)
        add_box(bm, (0.28 * s, -0.05, -0.05), (0.14, 0.18, 0.22), 0)
        add_box(bm, (0.3 * s, 0.1, -0.15), (0.16, 0.22, 0.08), 0)

    # Tail segments curving down-right then up
    tail = [
        ((0.05, -0.45, 0.25), (0.22, 0.28, 0.22)),
        ((0.12, -0.75, 0.05), (0.18, 0.24, 0.18)),
        ((0.28, -0.95, -0.15), (0.14, 0.2, 0.14)),
        ((0.48, -1.05, -0.05), (0.12, 0.16, 0.12)),
        ((0.65, -0.95, 0.15), (0.1, 0.14, 0.1)),
        ((0.78, -0.75, 0.35), (0.08, 0.12, 0.08)),
    ]
    for center, size in tail:
        add_box(bm, center, size, 0)
    add_pyramid(bm, (0.85, -0.6, 0.45), (0.1, 0.08), (0.98, -0.45, 0.62), 0)

    # Back spine plates
    for i, z in enumerate((0.5, 0.75, 1.0, 1.2)):
        add_pyramid(bm, (0, -0.32, z), (0.08, 0.08), (0, -0.55, z + 0.12), 0)

    # Wings
    add_wing(bm, 1.0)
    add_wing(bm, -1.0)

    # Cleanup
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=0.001)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)

    obj = new_mesh_object("HeroDragon", bm)
    return obj


def make_materials(obj: bpy.types.Object):
    body = bpy.data.materials.new("DragonBody")
    body.use_nodes = True
    nt = body.node_tree
    bsdf = nt.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.92, 0.93, 0.95, 1.0)
    bsdf.inputs["Roughness"].default_value = 0.55
    if "Specular IOR Level" in bsdf.inputs:
        bsdf.inputs["Specular IOR Level"].default_value = 0.35
    elif "Specular" in bsdf.inputs:
        bsdf.inputs["Specular"].default_value = 0.35
    # Flat shading feel — no subsurface
    if "Metallic" in bsdf.inputs:
        bsdf.inputs["Metallic"].default_value = 0.05

    eye = bpy.data.materials.new("DragonEye")
    eye.use_nodes = True
    nt = eye.node_tree
    bsdf = nt.nodes.get("Principled BSDF")
    bsdf.inputs["Base Color"].default_value = (0.1, 0.85, 1.0, 1.0)
    if "Emission Color" in bsdf.inputs:
        bsdf.inputs["Emission Color"].default_value = (0.15, 0.95, 1.0, 1.0)
        bsdf.inputs["Emission Strength"].default_value = 12.0
    else:
        # Older Blender: Emission socket
        if "Emission" in bsdf.inputs:
            bsdf.inputs["Emission"].default_value = (0.15, 0.95, 1.0, 1.0)

    obj.data.materials.append(body)
    obj.data.materials.append(eye)

    # Ensure face material indices stick; flat shade
    for poly in obj.data.polygons:
        poly.use_smooth = False


def setup_rig_idle(obj: bpy.types.Object):
    """Simple object-level idle: gentle bob + wing-ish roll via keyframes on empty parent."""
    root = bpy.data.objects.new("DragonRoot", None)
    bpy.context.collection.objects.link(root)
    obj.parent = root

    # Center and scale to a unit-ish bounding box for web
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="BOUNDS")
    # Fit height ~2 units
    dims = obj.dimensions
    scale = 2.0 / max(dims.z, 0.001)
    root.scale = (scale, scale, scale)
    root.location = (0, 0, 0)
    # Face camera (+Y forward in our build → rotate to face +Z camera in three.js typically looks -Z)
    root.rotation_euler = (math.radians(90), 0, math.radians(180))

    scene = bpy.context.scene
    scene.frame_start = 1
    scene.frame_end = 120
    scene.render.fps = 30

    root.rotation_mode = "XYZ"
    # Idle sway
    for frame, dz, ry in ((1, 0.0, 0.0), (30, 0.04, 0.03), (60, 0.0, 0.0), (90, -0.03, -0.03), (120, 0.0, 0.0)):
        scene.frame_set(frame)
        root.location = (0, 0, dz)
        root.rotation_euler = (math.radians(90), ry, math.radians(180))
        root.keyframe_insert(data_path="location", index=2)
        root.keyframe_insert(data_path="rotation_euler", index=1)

    # Linear interpolation (Blender 5.x actions may expose fcurves via layers)
    action = root.animation_data.action if root.animation_data else None
    if action is not None:
        fcurves = getattr(action, "fcurves", None)
        if fcurves is None and hasattr(action, "layers"):
            fcurves = []
            for layer in action.layers:
                for strip in getattr(layer, "strips", []):
                    ch = getattr(strip, "channelbag", None) or getattr(strip, "channels", None)
                    if ch is not None and hasattr(ch, "fcurves"):
                        fcurves.extend(list(ch.fcurves))
        for fcurve in fcurves or []:
            for kp in fcurve.keyframe_points:
                kp.interpolation = "LINEAR"

    return root


def setup_lights_camera():
    light_data = bpy.data.lights.new(name="Key", type="AREA")
    light_data.energy = 120
    light_data.size = 3
    key = bpy.data.objects.new("Key", light_data)
    bpy.context.collection.objects.link(key)
    key.location = (1.5, -2.0, 2.5)
    key.rotation_euler = (math.radians(50), math.radians(15), math.radians(20))

    fill_data = bpy.data.lights.new(name="Fill", type="AREA")
    fill_data.energy = 40
    fill_data.size = 4
    fill = bpy.data.objects.new("Fill", fill_data)
    bpy.context.collection.objects.link(fill)
    fill.location = (-2.0, -1.0, 1.5)

    rim_data = bpy.data.lights.new(name="Rim", type="AREA")
    rim_data.energy = 60
    rim_data.size = 2
    rim = bpy.data.objects.new("Rim", rim_data)
    bpy.context.collection.objects.link(rim)
    rim.location = (0.5, 2.5, 1.8)

    cam_data = bpy.data.cameras.new("HeroCam")
    cam_data.lens = 50
    cam = bpy.data.objects.new("HeroCam", cam_data)
    bpy.context.collection.objects.link(cam)
    cam.location = (0, -3.2, 0.9)
    cam.rotation_euler = (math.radians(78), 0, 0)
    bpy.context.scene.camera = cam


def export_glb(path: Path):
    path.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=str(path),
        export_format="GLB",
        use_selection=False,
        export_animations=True,
        export_apply=False,
        export_lights=False,
        export_cameras=False,
    )
    print(f"EXPORTED={path} size={path.stat().st_size}")


def main():
    clear_scene()
    dragon = build_dragon_mesh()
    make_materials(dragon)
    setup_rig_idle(dragon)
    setup_lights_camera()
    BLEND_OUT.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(BLEND_OUT))
    export_glb(OUT)
    print("DONE")


if __name__ == "__main__":
    main()
