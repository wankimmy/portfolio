"""
Same crystalline dragon for every section — densify once, fork pose/style variants.

Outputs:
  public/models/dragon-hero.glb
  public/models/scroll/dragon-skills.glb
  public/models/scroll/dragon-about.glb
  public/models/scroll/dragon-projects.glb
  public/models/scroll/dragon-experience.glb
"""
from __future__ import annotations

from math import radians
from pathlib import Path

import bpy
from mathutils import Vector

ROOT = Path(r"c:\Users\Admin\Documents\Safwan\portfolio")
SRC = ROOT / "tools" / "ref" / "dragon-hunyuan-raw-v2.glb"
MASTER_BLEND = ROOT / "tools" / "ref" / "dragon-master.blend"
OUT_HERO = ROOT / "public" / "models" / "dragon-hero.glb"
OUT_SCROLL = ROOT / "public" / "models" / "scroll"

VOXEL = 0.016
SOLIDIFY = 0.012
TARGET_SIZE = 2.0

BASE_COLOR = (0.90, 0.92, 0.96, 1.0)
BELLY_COLOR = (0.78, 0.84, 0.92, 1.0)
EYE_EMISSION = (0.05, 0.85, 1.0, 1.0)


def set_input(bsdf, names, value):
    for name in names:
        sock = bsdf.inputs.get(name)
        if sock is not None:
            sock.default_value = value
            return True
    return False


def make_skin_material(name="DragonBodyCrystal", roughness=0.32, specular=0.62, coat=0.45):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    set_input(bsdf, ["Base Color"], BASE_COLOR)
    set_input(bsdf, ["Roughness"], roughness)
    set_input(bsdf, ["Metallic"], 0.18)
    set_input(bsdf, ["Specular IOR Level", "Specular"], specular)
    set_input(bsdf, ["Coat Weight", "Clearcoat"], coat)
    return mat


def make_belly_material(name="DragonBellyCool"):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    set_input(bsdf, ["Base Color"], BELLY_COLOR)
    set_input(bsdf, ["Roughness"], 0.4)
    set_input(bsdf, ["Metallic"], 0.1)
    set_input(bsdf, ["Coat Weight", "Clearcoat"], 0.3)
    return mat


def make_eye_material(name="DragonEyeCyan", strength=10.0):
    mat = bpy.data.materials.new(name)
    mat.use_nodes = True
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    set_input(bsdf, ["Base Color"], (0.02, 0.35, 0.55, 1.0))
    set_input(bsdf, ["Roughness"], 0.18)
    set_input(bsdf, ["Emission Color"], EYE_EMISSION)
    set_input(bsdf, ["Emission"], EYE_EMISSION)
    set_input(bsdf, ["Emission Strength"], strength)
    return mat


def bump_edge_emission(mat, color=(0.15, 0.55, 0.85, 1.0), strength=0.35):
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    set_input(bsdf, ["Emission Color"], color)
    set_input(bsdf, ["Emission"], color)
    set_input(bsdf, ["Emission Strength"], strength)


def cooler_specular(mat, specular=0.72, roughness=0.32):
    bsdf = mat.node_tree.nodes.get("Principled BSDF")
    set_input(bsdf, ["Specular IOR Level", "Specular"], specular)
    set_input(bsdf, ["Roughness"], roughness)


def apply_modifier(obj, name):
    bpy.ops.object.select_all(action="DESELECT")
    obj.select_set(True)
    bpy.context.view_layer.objects.active = obj
    bpy.ops.object.modifier_apply(modifier=name)


def densify(dragon, voxel=VOXEL, solidify=SOLIDIFY):
    remesh = dragon.modifiers.new("Remesh", "REMESH")
    remesh.mode = "VOXEL"
    remesh.voxel_size = voxel
    remesh.use_smooth_shade = False
    apply_modifier(dragon, "Remesh")
    print(f"AFTER_REMESH verts={len(dragon.data.vertices)} voxel={voxel}")

    solid = dragon.modifiers.new("Solidify", "SOLIDIFY")
    solid.thickness = solidify
    solid.offset = 0.0
    solid.use_even_offset = True
    apply_modifier(dragon, "Solidify")
    print(f"AFTER_SOLIDIFY verts={len(dragon.data.vertices)}")

    for p in dragon.data.polygons:
        p.use_smooth = False


def normalize(dragon):
    bpy.ops.object.select_all(action="DESELECT")
    dragon.select_set(True)
    bpy.context.view_layer.objects.active = dragon
    bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="BOUNDS")
    dragon.location = (0.0, 0.0, 0.0)
    dims = dragon.dimensions
    scale = TARGET_SIZE / max(dims.x, dims.y, dims.z, 0.001)
    dragon.scale = (scale, scale, scale)
    bpy.ops.object.transform_apply(location=True, rotation=False, scale=True)


def face_forward(dragon):
    coords = [dragon.matrix_world @ v.co for v in dragon.data.vertices]
    mid_x = (min(c.x for c in coords) + max(c.x for c in coords)) * 0.5
    mid_y = (min(c.y for c in coords) + max(c.y for c in coords)) * 0.5
    min_z = min(c.z for c in coords)
    max_z = max(c.z for c in coords)
    sz = max(max_z - min_z, 1e-6)
    upper = [c for c in coords if (c.z - min_z) / sz > 0.55 and abs(c.x - mid_x) < 0.35]
    if not upper:
        upper = coords
    snout = max(upper, key=lambda c: abs(c.y - mid_y))
    if snout.y < mid_y:
        dragon.rotation_euler[2] = radians(180.0)
        bpy.ops.object.select_all(action="DESELECT")
        dragon.select_set(True)
        bpy.context.view_layer.objects.active = dragon
        bpy.ops.object.transform_apply(location=False, rotation=True, scale=False)
        print("FACE_FORWARD rotated 180 around Z")
    else:
        print("FACE_FORWARD already +Y")


def assign_belly(dragon, skin, belly):
    mesh = dragon.data
    mesh.materials.clear()
    mesh.materials.append(skin)
    mesh.materials.append(belly)
    coords = [dragon.matrix_world @ v.co for v in mesh.vertices]
    min_z = min(c.z for c in coords)
    max_z = max(c.z for c in coords)
    min_y = min(c.y for c in coords)
    max_y = max(c.y for c in coords)
    span_z = max(max_z - min_z, 1e-6)
    span_y = max(max_y - min_y, 1e-6)
    for poly in mesh.polygons:
        center = Vector((0, 0, 0))
        for vi in poly.vertices:
            center += mesh.vertices[vi].co
        center /= max(len(poly.vertices), 1)
        w = dragon.matrix_world @ center
        z_t = (w.z - min_z) / span_z
        y_t = (w.y - min_y) / span_y
        poly.material_index = 1 if (z_t < 0.42 and y_t > 0.45) else 0


def place_eyes(dragon, eye_mat):
    from mathutils.bvhtree import BVHTree

    coords = [dragon.matrix_world @ v.co for v in dragon.data.vertices]
    xs, ys, zs = [c.x for c in coords], [c.y for c in coords], [c.z for c in coords]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    min_z, max_z = min(zs), max(zs)
    mid_x = (min_x + max_x) * 0.5
    mid_y = (min_y + max_y) * 0.5
    sx = max(max_x - min_x, 1e-6)
    sy = max(max_y - min_y, 1e-6)
    sz = max(max_z - min_z, 1e-6)

    head = [
        c
        for c in coords
        if abs(c.x - mid_x) < sx * 0.22
        and (c.y - min_y) / sy > 0.62
        and (c.z - min_z) / sz > 0.35
    ]
    if len(head) < 12:
        head = [c for c in coords if (c.y - min_y) / sy > 0.7]
    snout = max(head, key=lambda c: c.y)
    crown_z = max(c.z for c in head)
    eye_y = snout.y - sy * 0.05
    eye_z = crown_z - sz * 0.05
    eye_r = max(sx, sy, sz) * 0.025
    eye_sep = sx * 0.055

    depsgraph = bpy.context.evaluated_depsgraph_get()
    bvh = BVHTree.FromObject(dragon, depsgraph)
    eyes = []
    for side, sign in (("L", -1.0), ("R", 1.0)):
        guess = Vector((mid_x + sign * eye_sep * 0.5, eye_y, eye_z))
        near = bvh.find_nearest(guess)
        if near[0] is None:
            continue
        near_co, normal = near[0], near[1]
        n = normal.normalized()
        center = Vector((mid_x, mid_y, (min_z + max_z) * 0.5))
        if (near_co - center).dot(n) < 0:
            n = -n
        eye_world = near_co - n * (eye_r * 0.28)
        bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=eye_r, location=(0, 0, 0))
        eye = bpy.context.active_object
        eye.name = f"DragonEye_{side}"
        eye.matrix_world.translation = eye_world
        for p in eye.data.polygons:
            p.use_smooth = False
        eye.data.materials.clear()
        eye.data.materials.append(eye_mat)
        eyes.append(eye)
        print(f"EYE_{side}={tuple(round(v, 3) for v in eye_world)} r={eye_r:.4f}")

    for eye in eyes:
        mw = eye.matrix_world.copy()
        eye.parent = dragon
        eye.matrix_world = mw
    return eyes


def add_wing_shape_keys(dragon):
    mesh = dragon.data
    if mesh.shape_keys is None:
        dragon.shape_key_add(name="Basis")

    coords = [v.co.copy() for v in mesh.vertices]
    xs = [c.x for c in coords]
    zs = [c.z for c in coords]
    mid_x = (min(xs) + max(xs)) * 0.5
    min_z, max_z = min(zs), max(zs)
    sx = max(max(xs) - min(xs), 1e-6)
    sz = max(max_z - min_z, 1e-6)

    def wing_delta(co, lift_sign):
        x_n = (co.x - mid_x) / (sx * 0.5)
        z_n = (co.z - min_z) / sz
        if z_n > 0.30 and abs(x_n) > 0.22:
            lift = 0.12 * (abs(x_n) - 0.22) / 0.78 * lift_sign
            flare = 0.04 * abs(x_n) * (1.0 if lift_sign > 0 else -0.5)
            return Vector((co.x + (1.0 if x_n > 0 else -1.0) * flare, co.y, co.z + lift))
        return co.copy()

    up = dragon.shape_key_add(name="wingUp")
    up.value = 0.0
    down = dragon.shape_key_add(name="wingDown")
    down.value = 0.0
    up_count = down_count = 0
    for i, v in enumerate(mesh.vertices):
        co = coords[i]
        up_co = wing_delta(co, 1.0)
        down_co = wing_delta(co, -1.0)
        up.data[i].co = up_co
        down.data[i].co = down_co
        if up_co != co:
            up_count += 1
        if down_co != co:
            down_count += 1
    print(f"SHAPEKEY wingUp verts={up_count} wingDown verts={down_count}")
    return up, down


def find_dragon():
    for o in bpy.context.scene.objects:
        if o.type == "MESH" and o.name.startswith("HeroDragon"):
            return o
    meshes = [o for o in bpy.context.scene.objects if o.type == "MESH" and "Eye" not in o.name]
    return meshes[0] if meshes else None


def select_exportables(dragon):
    bpy.ops.object.select_all(action="DESELECT")
    dragon.select_set(True)
    for child in dragon.children:
        child.select_set(True)
    bpy.context.view_layer.objects.active = dragon


def export_glb(path: Path, morph=False, draco=False):
    path.parent.mkdir(parents=True, exist_ok=True)
    kwargs = dict(
        filepath=str(path),
        export_format="GLB",
        use_selection=True,
        export_animations=False,
        export_morph=morph,
        export_lights=False,
        export_cameras=False,
    )
    # Blender 4+/5: Draco mesh compression for web-sized downloads
    if draco:
        kwargs["export_draco_mesh_compression_enable"] = True
        kwargs["export_draco_mesh_compression_level"] = 10
    try:
        bpy.ops.export_scene.gltf(**kwargs)
    except TypeError:
        # Older exporter kw names
        if draco:
            kwargs.pop("export_draco_mesh_compression_enable", None)
            kwargs.pop("export_draco_mesh_compression_level", None)
            kwargs["export_draco_mesh_compression"] = True
        bpy.ops.export_scene.gltf(**kwargs)
    print(f"EXPORTED={path} size={path.stat().st_size} draco={draco}")


def bake_shape_keys(dragon, wing_up=0.0, wing_down=0.0):
    keys = dragon.data.shape_keys
    if keys is None:
        return
    for kb in keys.key_blocks:
        if kb.name == "wingUp":
            kb.value = wing_up
        elif kb.name == "wingDown":
            kb.value = wing_down
        elif kb.name != "Basis":
            kb.value = 0.0
    # Apply as shape (collapse to mesh)
    bpy.ops.object.select_all(action="DESELECT")
    dragon.select_set(True)
    bpy.context.view_layer.objects.active = dragon
    bpy.ops.object.shape_key_remove(all=True, apply_mix=True)


def crop_to_head(dragon):
    """Keep head/neck (+Y forward half-upper); delete body verts."""
    mesh = dragon.data
    coords = [v.co.copy() for v in mesh.vertices]
    ys = [c.y for c in coords]
    zs = [c.z for c in coords]
    xs = [c.x for c in coords]
    min_y, max_y = min(ys), max(ys)
    min_z, max_z = min(zs), max(zs)
    sy = max(max_y - min_y, 1e-6)
    sz = max(max_z - min_z, 1e-6)
    mid_x = (min(xs) + max(xs)) * 0.5
    half_x = max(max(xs) - min(xs), 1e-6) * 0.5
    # Keep forward head/neck (generous so orbit reads as same dragon)
    keep = []
    for i, co in enumerate(coords):
        y_t = (co.y - min_y) / sy
        z_t = (co.z - min_z) / sz
        x_n = abs(co.x - mid_x) / half_x
        if y_t > 0.42 and z_t > 0.18 and x_n < 0.55:
            keep.append(i)
    if len(keep) < 400:
        keep = [i for i, co in enumerate(coords) if (co.y - min_y) / sy > 0.40]
    keep_set = set(keep)
    bpy.ops.object.select_all(action="DESELECT")
    dragon.select_set(True)
    bpy.context.view_layer.objects.active = dragon
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="DESELECT")
    bpy.ops.object.mode_set(mode="OBJECT")
    for i, v in enumerate(mesh.vertices):
        v.select = i not in keep_set
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.delete(type="VERT")
    bpy.ops.object.mode_set(mode="OBJECT")
    normalize(dragon)
    print(f"SKILLS_HEAD verts={len(dragon.data.vertices)}")


def sharpen_horns(dragon, scale_z=1.18):
    """Mild vertical stretch on upper/forward verts (horn region)."""
    mesh = dragon.data
    coords = [v.co for v in mesh.vertices]
    ys = [c.y for c in coords]
    zs = [c.z for c in coords]
    min_y, max_y = min(ys), max(ys)
    min_z, max_z = min(zs), max(zs)
    sy = max(max_y - min_y, 1e-6)
    sz = max(max_z - min_z, 1e-6)
    mid_z = (min_z + max_z) * 0.5
    for v in mesh.vertices:
        y_t = (v.co.y - min_y) / sy
        z_t = (v.co.z - min_z) / sz
        if y_t > 0.55 and z_t > 0.72:
            v.co.z = mid_z + (v.co.z - mid_z) * scale_z
    mesh.update()


def apply_curl_lattice(dragon):
    """Bone-free curl via Simple Deform bend for experience pose."""
    bpy.ops.object.select_all(action="DESELECT")
    dragon.select_set(True)
    bpy.context.view_layer.objects.active = dragon
    mod = dragon.modifiers.new("CurlBend", "SIMPLE_DEFORM")
    mod.deform_method = "BEND"
    mod.angle = radians(38.0)
    mod.deform_axis = "Z"
    apply_modifier(dragon, "CurlBend")
    normalize(dragon)


def build_master():
    if not SRC.exists():
        raise SystemExit(f"missing {SRC}")

    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=str(SRC))

    meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
    if not meshes:
        raise SystemExit("no mesh")
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
    print(f"BODY verts={len(dragon.data.vertices)}")

    normalize(dragon)
    densify(dragon, VOXEL, SOLIDIFY)
    normalize(dragon)
    face_forward(dragon)
    normalize(dragon)

    skin = make_skin_material()
    belly = make_belly_material()
    assign_belly(dragon, skin, belly)
    place_eyes(dragon, make_eye_material(strength=10.0))
    add_wing_shape_keys(dragon)

    MASTER_BLEND.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(MASTER_BLEND))
    print(f"MASTER_SAVED={MASTER_BLEND}")
    return dragon


def open_master():
    bpy.ops.wm.open_mainfile(filepath=str(MASTER_BLEND))
    dragon = find_dragon()
    if dragon is None:
        raise SystemExit("master dragon missing")
    return dragon


def variant_hero():
    dragon = open_master()
    # Runtime only needs wingUp; drop wingDown to cut morph payload ~half
    keys = dragon.data.shape_keys
    if keys is not None:
        for kb in list(keys.key_blocks):
            if kb.name == "wingDown":
                dragon.shape_key_remove(kb)
    select_exportables(dragon)
    export_glb(OUT_HERO, morph=True, draco=True)


def main():
    OUT_SCROLL.mkdir(parents=True, exist_ok=True)
    build_master()
    variant_hero()
    print("HERO_VARIANTS_DONE")
    print(f"CHECK {OUT_HERO.name} exists={OUT_HERO.exists()} size={OUT_HERO.stat().st_size if OUT_HERO.exists() else 0}")


if __name__ == "__main__":
    main()
