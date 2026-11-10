"""Hero dragon v4 - detail-preserving build with baked surface maps.

The v3 pipeline voxel-remeshed the AI mesh (blurring every spike, claw and
wing finger) and then decimated it to 8k tris, which is why the hero read as a
smooth blob. This build keeps the raw Hunyuan geometry as a high-res source,
derives an adaptive low-poly from it (big facets on the wings and torso, dense
at the spikes) and bakes the high-res detail plus procedural crystal facets into
textures the site loads straight from the GLB:

  base color  - near-white plate colour, edges lit / creases cooled (Pointiness)
  ORM         - R ambient occlusion, G roughness (edges glossier), B metallic=1
  normal      - tangent-space: hi-res curvature + crystal facet bump

Then the flight cycle from rig_export_hero_dragon.py is rebuilt on the new mesh
(three chained wing hinges with a travelling lag, tail sway, body bob).

Run headless:
    blender -b -P tools/build_hero_dragon_v4.py -- [raw.glb] [tris] [tex] [out.glb]

Axis note: the raw mesh comes out of Hunyuan with the snout toward Blender -Y,
which the glTF exporter maps to +Z where the site camera sits. Checked and
corrected at import (see orient_forward).
"""
from __future__ import annotations

import math
import sys
import time
from pathlib import Path

import bpy
import numpy as np
from mathutils import Matrix, Vector
from mathutils.bvhtree import BVHTree

ROOT = Path(r"c:\Users\Admin\Documents\Safwan\portfolio")
ARGS = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
RAW = Path(ARGS[0]) if len(ARGS) > 0 else ROOT / "tools" / "ref" / "dragon-hunyuan-raw-v3.glb"
TARGET_TRIS = int(ARGS[1]) if len(ARGS) > 1 else 24000
TEX = int(ARGS[2]) if len(ARGS) > 2 else 2048
OUT_GLB = Path(ARGS[3]) if len(ARGS) > 3 else ROOT / "public" / "models" / "dragon-hero.glb"
EXPORT_TEX = 1024  # bake at TEX, ship at this size
BLEND = ROOT / "tools" / "ref" / "dragon-hero-v4.blend"
PREVIEW = ROOT / "tools" / "ref" / "hero-v4-preview.png"

TARGET_SIZE = 2.0  # wingspan in scene units; the site refits the camera anyway

# --- region heuristics (normalized mesh: x = span, -Y = snout, +Z = up) -----
ROOT_X = 0.30  # |x| where the wing leaves the torso
FRONT_Y = 0.05  # wings sit in the front (-Y) half; excludes the tail
TAIL_Y0 = 0.18  # tail starts here going +Y

# --- flight cycle (measured off the reference hover clip, see rig script) ---
FPS = 24
CYCLE = 42
SEGMENTS = [
    dict(tag="A", x=0.30, blend=0.15, up=21.0, down=-15.0, twist=8.0, lag=0.0),
    dict(tag="B", x=0.52, blend=0.15, up=15.0, down=-10.0, twist=11.0, lag=2.5),
    dict(tag="C", x=0.74, blend=0.15, up=11.0, down=-8.0, twist=13.0, lag=5.0),
]
BILLOW = 0.055
SWEEP_UP = -0.024
SWEEP_DOWN = 0.018
TAIL_SWING = 14.0
FLAP_PROFILE = [
    (0, 0.00), (6, 0.00), (8, 0.51), (10, 0.81), (12, 0.96), (14, 0.99),
    (16, 1.00), (20, 1.00), (24, 0.93), (26, 0.73), (28, 0.59), (30, 0.47),
    (32, 0.38), (34, 0.31), (36, 0.15), (38, 0.02), (40, 0.00), (42, 0.00),
]
BOB_AMPLITUDE = 0.075
BOB_PROFILE = [
    (0, 0.86), (6, 0.93), (12, 0.50), (18, 0.21), (22, 0.00),
    (26, 0.00), (32, 0.36), (38, 0.64), (42, 0.86),
]

T0 = time.time()


def log(*a):
    print(f"[{time.time() - T0:6.1f}s]", *a, flush=True)


def smoothstep(t: float) -> float:
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def profile_at(t: float) -> float:
    t %= CYCLE
    for (t0, p0), (t1, p1) in zip(FLAP_PROFILE, FLAP_PROFILE[1:]):
        if t0 <= t <= t1:
            return p0 if t1 == t0 else p0 + (p1 - p0) * (t - t0) / (t1 - t0)
    return FLAP_PROFILE[-1][1]


def select_only(*objs):
    bpy.ops.object.select_all(action="DESELECT")
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]


def apply_modifier(obj, name):
    select_only(obj)
    bpy.ops.object.modifier_apply(modifier=name)


def set_input(bsdf, names, value):
    for n in names:
        s = bsdf.inputs.get(n)
        if s is not None:
            s.default_value = value
            return True
    return False


# ---------------------------------------------------------------------------
# 1. import + normalize
# ---------------------------------------------------------------------------
def import_hi() -> bpy.types.Object:
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=str(RAW))
    meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
    if not meshes:
        raise SystemExit(f"no mesh in {RAW}")
    select_only(*meshes)
    if len(meshes) > 1:
        bpy.ops.object.join()
    hi = bpy.context.view_layer.objects.active
    hi.name = "HeroDragonHi"
    hi.data.name = "HeroDragonHi"
    log("imported", RAW.name, "verts", len(hi.data.vertices), "faces", len(hi.data.polygons))
    return hi


def normalize(obj):
    select_only(obj)
    bpy.ops.object.origin_set(type="ORIGIN_GEOMETRY", center="BOUNDS")
    obj.location = (0.0, 0.0, 0.0)
    obj.rotation_euler = (0.0, 0.0, 0.0)
    d = obj.dimensions
    s = TARGET_SIZE / max(d.x, d.y, d.z, 1e-6)
    obj.scale = (s, s, s)
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)


def orient_forward(obj):
    """Make sure the snout points -Y (glTF +Z, toward the site camera)."""
    co = np.empty(len(obj.data.vertices) * 3)
    obj.data.vertices.foreach_get("co", co)
    co = co.reshape(-1, 3)
    x, y, z = co[:, 0], co[:, 1], co[:, 2]
    zt = (z - z.min()) / max(np.ptp(z), 1e-6)
    head = co[(zt > 0.6) & (np.abs(x) < 0.25 * np.ptp(x))]
    if len(head) < 10:
        head = co
    ymid = (y.min() + y.max()) * 0.5
    snout_y = head[np.argmax(np.abs(head[:, 1] - ymid)), 1]
    if snout_y > ymid:
        obj.rotation_euler[2] = math.radians(180.0)
        select_only(obj)
        bpy.ops.object.transform_apply(rotation=True)
        log("orient: rotated 180 so snout faces -Y")
    else:
        log("orient: snout already -Y")


# ---------------------------------------------------------------------------
# 2. low-poly derivation
# ---------------------------------------------------------------------------
def make_low(hi) -> bpy.types.Object:
    low = hi.copy()
    low.data = hi.data.copy()
    low.name = "HeroDragonMesh"
    low.data.name = "HeroDragonMesh"
    bpy.context.collection.objects.link(low)

    tris = sum(len(p.vertices) - 2 for p in low.data.polygons)
    dec = low.modifiers.new("Decimate", "DECIMATE")
    dec.decimate_type = "COLLAPSE"
    dec.ratio = max(0.01, min(1.0, TARGET_TRIS / max(tris, 1)))
    dec.use_collapse_triangulate = True
    apply_modifier(low, "Decimate")

    select_only(low)
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.mesh.quads_convert_to_tris(quad_method="BEAUTY", ngon_method="BEAUTY")
    bpy.ops.mesh.normals_make_consistent(inside=False)
    bpy.ops.object.mode_set(mode="OBJECT")
    for p in low.data.polygons:
        p.use_smooth = False
    log("low-poly verts", len(low.data.vertices), "tris", len(low.data.polygons))
    return low


def unwrap(low):
    select_only(low)
    bpy.ops.object.mode_set(mode="EDIT")
    bpy.ops.mesh.select_all(action="SELECT")
    bpy.ops.uv.smart_project(angle_limit=math.radians(66.0), island_margin=0.004, scale_to_bounds=False)
    bpy.ops.object.mode_set(mode="OBJECT")
    log("uv islands unwrapped:", [u.name for u in low.data.uv_layers])


# ---------------------------------------------------------------------------
# 3. materials / regions
# ---------------------------------------------------------------------------
def make_low_materials(low):
    """Body / belly / membrane slots keyed by name (the site keys off these)."""
    me = low.data
    me.materials.clear()
    for name in ("DragonBodyCrystal", "DragonBellyCool", "DragonWingMembrane"):
        m = bpy.data.materials.new(name)
        m.use_nodes = True
        me.materials.append(m)

    co = np.empty(len(me.vertices) * 3)
    me.vertices.foreach_get("co", co)
    co = co.reshape(-1, 3)
    n_body = n_belly = n_wing = 0
    for p in me.polygons:
        c = co[list(p.vertices)].mean(axis=0)
        nrm = p.normal
        if abs(c[0]) > ROOT_X and c[1] < FRONT_Y:
            p.material_index = 2
            n_wing += 1
        elif abs(c[0]) < 0.22 and c[2] < -0.02 and c[1] < 0.22 and (nrm.z < 0.25 or nrm.y < -0.4):
            p.material_index = 1
            n_belly += 1
        else:
            p.material_index = 0
            n_body += 1
    log("regions body", n_body, "belly", n_belly, "membrane", n_wing)


def hi_bake_material(hi):
    """What the bakes read: crystal facet bump + pointiness-driven colour/roughness."""
    m = bpy.data.materials.new("HiBake")
    m.use_nodes = True
    nt = m.node_tree
    nodes, links = nt.nodes, nt.links
    bsdf = nodes.get("Principled BSDF")

    geo = nodes.new("ShaderNodeNewGeometry")
    geo.location = (-900, 300)

    # edges (pointiness > 0.5) go bright and cool, creases go a shade darker
    ramp_col = nodes.new("ShaderNodeValToRGB")
    ramp_col.location = (-600, 400)
    ramp_col.color_ramp.interpolation = "EASE"
    e = ramp_col.color_ramp.elements
    e[0].position, e[0].color = 0.40, (0.70, 0.74, 0.84, 1.0)
    e[1].position, e[1].color = 0.62, (1.00, 1.00, 1.00, 1.0)
    mid = ramp_col.color_ramp.elements.new(0.50)
    mid.color = (0.88, 0.90, 0.95, 1.0)
    links.new(geo.outputs["Pointiness"], ramp_col.inputs["Fac"])
    links.new(ramp_col.outputs["Color"], bsdf.inputs["Base Color"])

    ramp_r = nodes.new("ShaderNodeValToRGB")
    ramp_r.location = (-600, 100)
    r = ramp_r.color_ramp.elements
    r[0].position, r[0].color = 0.42, (0.55, 0.55, 0.55, 1.0)
    r[1].position, r[1].color = 0.60, (0.18, 0.18, 0.18, 1.0)
    links.new(geo.outputs["Pointiness"], ramp_r.inputs["Fac"])
    links.new(ramp_r.outputs["Color"], bsdf.inputs["Roughness"])

    set_input(bsdf, ["Metallic"], 0.0)

    # crystal plates: fine voronoi seams plus grain, as a *subtle* bump. The
    # first pass at strength 0.35 read as cracked stone; keep it a whisper on
    # the body and fainter still on the membranes (|x| beyond the wing root).
    tex_co = nodes.new("ShaderNodeTexCoord")
    tex_co.location = (-1200, -200)
    vor = nodes.new("ShaderNodeTexVoronoi")
    vor.location = (-900, -150)
    vor.feature = "DISTANCE_TO_EDGE"
    vor.inputs["Scale"].default_value = 38.0
    vor.inputs["Randomness"].default_value = 0.8
    links.new(tex_co.outputs["Object"], vor.inputs["Vector"])
    ramp_v = nodes.new("ShaderNodeValToRGB")
    ramp_v.location = (-650, -150)
    v = ramp_v.color_ramp.elements
    v[0].position, v[0].color = 0.0, (0.0, 0.0, 0.0, 1.0)
    v[1].position, v[1].color = 0.05, (1.0, 1.0, 1.0, 1.0)
    links.new(vor.outputs["Distance"], ramp_v.inputs["Fac"])

    noise = nodes.new("ShaderNodeTexNoise")
    noise.location = (-900, -450)
    noise.inputs["Scale"].default_value = 140.0
    noise.inputs["Detail"].default_value = 5.0
    noise.inputs["Roughness"].default_value = 0.6
    links.new(tex_co.outputs["Object"], noise.inputs["Vector"])

    mix = nodes.new("ShaderNodeMix")
    mix.location = (-400, -300)
    mix.data_type = "FLOAT"
    mix.inputs["Factor"].default_value = 0.4
    links.new(ramp_v.outputs["Color"], mix.inputs[2])  # A
    links.new(noise.outputs["Fac"], mix.inputs[3])  # B

    # wing mask from object-space |x|
    sep = nodes.new("ShaderNodeSeparateXYZ")
    sep.location = (-900, -700)
    links.new(tex_co.outputs["Object"], sep.inputs["Vector"])
    m_abs = nodes.new("ShaderNodeMath")
    m_abs.operation = "ABSOLUTE"
    m_abs.location = (-750, -700)
    links.new(sep.outputs["X"], m_abs.inputs[0])
    m_gt = nodes.new("ShaderNodeMath")
    m_gt.operation = "GREATER_THAN"
    m_gt.location = (-600, -700)
    m_gt.inputs[1].default_value = ROOT_X
    links.new(m_abs.outputs[0], m_gt.inputs[0])
    m_str = nodes.new("ShaderNodeMath")
    m_str.operation = "MULTIPLY_ADD"
    m_str.location = (-400, -700)
    m_str.inputs[1].default_value = -0.07  # wing: 0.12 - 0.07
    m_str.inputs[2].default_value = 0.12  # body
    links.new(m_gt.outputs[0], m_str.inputs[0])

    bump = nodes.new("ShaderNodeBump")
    bump.location = (-150, -300)
    bump.inputs["Distance"].default_value = 0.015
    links.new(m_str.outputs[0], bump.inputs["Strength"])
    links.new(mix.outputs[0], bump.inputs["Height"])
    links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])

    hi.data.materials.clear()
    hi.data.materials.append(m)
    for p in hi.data.polygons:
        p.use_smooth = True
    return m


# ---------------------------------------------------------------------------
# 4. eyes
# ---------------------------------------------------------------------------
def make_eye_material():
    m = bpy.data.materials.new("DragonEyeCyan")
    m.use_nodes = True
    b = m.node_tree.nodes.get("Principled BSDF")
    set_input(b, ["Base Color"], (0.0, 0.0, 0.0, 1.0))
    set_input(b, ["Roughness"], 1.0)
    set_input(b, ["Emission Color"], (0.12, 0.78, 1.0, 1.0))
    set_input(b, ["Emission Strength"], 22.0)
    return m


HEAD = {}  # filled by place_eyes, used by the head close-up preview


def place_eyes(low, eye_mat):
    """Find the skull by geometry and put a small socket on each cheek.

    The head is the top-most cluster at the very front of the mesh. Eyes sit
    a third of the way back from the snout tip, in the upper half of the
    skull, at its widest point on each side.
    """
    co = np.empty(len(low.data.vertices) * 3)
    low.data.vertices.foreach_get("co", co)
    co = co.reshape(-1, 3)
    x, y, z = co[:, 0], co[:, 1], co[:, 2]
    span = max(np.ptp(x), np.ptp(y), np.ptp(z))

    front = co[(np.abs(x) < 0.12 * span) & (y < y.min() + 0.28 * np.ptp(y))]
    crown_z = front[:, 2].max()
    head = front[front[:, 2] > crown_z - 0.09 * span]
    snout_y = head[:, 1].min()
    head_len = min(np.ptp(head[:, 1]), 0.12 * span)
    # just under the brow: 36-52% back from the snout tip, and only the middle
    # of the skull's height so neither the horn tips nor the jaw win the
    # "widest point" search below
    band = head[(head[:, 1] > snout_y + 0.36 * head_len) & (head[:, 1] < snout_y + 0.52 * head_len)]
    if len(band) < 6:
        band = head
    zlo, zspan = band[:, 2].min(), np.ptp(band[:, 2])
    upper = band[(band[:, 2] > zlo + 0.40 * zspan) & (band[:, 2] < zlo + 0.75 * zspan)]
    if len(upper) < 4:
        upper = band
    eye_r = span * 0.006
    HEAD.update(snout_y=float(snout_y), crown_z=float(crown_z), head_len=float(head_len))
    log(f"head: snout_y={snout_y:.3f} crown_z={crown_z:.3f} len={head_len:.3f} band={len(band)} upper={len(upper)}")

    dg = bpy.context.evaluated_depsgraph_get()
    bvh = BVHTree.FromObject(low, dg)
    # Pick one shared brow station. Independent extrema put the old eyes at
    # different heights and depths, which made the front view look cross-eyed.
    left_cheek = upper[np.argmin(upper[:, 0])]
    right_cheek = upper[np.argmax(upper[:, 0])]
    eye_y = float((left_cheek[1] + right_cheek[1]) * 0.5)
    eye_z = float((left_cheek[2] + right_cheek[2]) * 0.5)
    ray_x = max(abs(float(left_cheek[0])), abs(float(right_cheek[0]))) + eye_r * 2.0

    eyes = []
    for side, sign in (("L", -1.0), ("R", 1.0)):
        origin = Vector((sign * ray_x, eye_y, eye_z))
        hit = bvh.ray_cast(origin, Vector((-sign, 0.0, 0.0)), ray_x * 2.0)
        if hit[0] is None:
            continue
        p, n = hit[0], hit[1].normalized()
        if n.x * sign < 0:
            n = -n
        world = p - n * (eye_r * 0.12)  # seat the shallow lens into the cheek
        bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=eye_r, location=(0, 0, 0))
        eye = bpy.context.active_object
        eye.name = f"DragonEye_{side}"
        # Local +Y is the lens depth axis. Align it to the cheek normal, keep
        # local +Z upright, then bake only the lens proportions into the mesh.
        tangent_x = Vector((0.0, 0.0, 1.0)).cross(n).normalized()
        tangent_z = tangent_x.cross(n).normalized()
        basis = Matrix((tangent_x, n, tangent_z)).transposed()
        eye.rotation_mode = "QUATERNION"
        eye.rotation_quaternion = basis.to_quaternion()
        eye.scale = (1.0, 0.28, 0.62)
        select_only(eye)
        bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
        eye.location = world
        for f in eye.data.polygons:
            f.use_smooth = False
        eye.data.materials.clear()
        eye.data.materials.append(eye_mat)
        eyes.append(eye)
        log(
            f"eye {side} at {tuple(round(v, 3) for v in world)} "
            f"normal={tuple(round(v, 3) for v in n)} r={eye_r:.3f}"
        )
    for eye in eyes:
        mw = eye.matrix_world.copy()
        eye.parent = low
        eye.matrix_world = mw
    return eyes


# ---------------------------------------------------------------------------
# 5. baking hi -> low
# ---------------------------------------------------------------------------
def new_image(name, size, srgb):
    img = bpy.data.images.new(name, size, size, alpha=False, float_buffer=False)
    img.colorspace_settings.name = "sRGB" if srgb else "Non-Color"
    return img


def bake_pass(low, hi, img, bake_type, **kw):
    sc = bpy.context.scene
    # every low material must have the target image as its active node
    for m in low.data.materials:
        nt = m.node_tree
        node = nt.nodes.get("BakeTarget")
        if node is None:
            node = nt.nodes.new("ShaderNodeTexImage")
            node.name = "BakeTarget"
            node.location = (-700, -600)
        node.image = img
        node.select = True
        nt.nodes.active = node
    select_only(hi, low)
    bpy.context.view_layer.objects.active = low
    hi.select_set(True)
    low.select_set(True)
    sc.render.bake.use_selected_to_active = True
    # the low-poly deviates from the source by well under 0.01, so keep the
    # rays short: long ones cross-hit neighbouring spikes and claws and leave
    # garbage normals on the small islands
    sc.render.bake.cage_extrusion = 0.015
    sc.render.bake.max_ray_distance = 0.04
    sc.render.bake.margin = 8
    sc.render.bake.use_clear = True
    if bake_type == "DIFFUSE":
        sc.render.bake.use_pass_direct = False
        sc.render.bake.use_pass_indirect = False
        sc.render.bake.use_pass_color = True
    if bake_type == "NORMAL":
        sc.render.bake.normal_space = "TANGENT"
    t = time.time()
    bpy.ops.object.bake(type=bake_type, **kw)
    log(f"baked {bake_type} -> {img.name} in {time.time() - t:.0f}s")


def bake_all(low, hi):
    sc = bpy.context.scene
    sc.render.engine = "CYCLES"
    prefs = bpy.context.preferences.addons.get("cycles")
    if prefs:
        cp = prefs.preferences
        for backend in ("OPTIX", "CUDA"):
            try:
                cp.compute_device_type = backend
                cp.get_devices()
                for d in cp.devices:
                    d.use = d.type != "CPU"
                sc.cycles.device = "GPU"
                log("cycles backend", backend, [d.name for d in cp.devices if d.use])
                break
            except Exception as exc:  # noqa: BLE001
                log("backend", backend, "unavailable:", exc)
    sc.cycles.samples = 96
    sc.cycles.use_denoising = False
    sc.world = bpy.data.worlds.new("BakeWorld")
    sc.world.use_nodes = True
    sc.world.node_tree.nodes["Background"].inputs[1].default_value = 1.0

    albedo = new_image("dragon_albedo", TEX, True)
    ao = new_image("dragon_ao", TEX, False)
    rough = new_image("dragon_rough", TEX, False)
    normal = new_image("dragon_normal", TEX, False)

    bake_pass(low, hi, albedo, "DIFFUSE")
    bake_pass(low, hi, rough, "ROUGHNESS")
    bake_pass(low, hi, normal, "NORMAL")
    sc.cycles.samples = 128
    bake_pass(low, hi, ao, "AO")
    return albedo, ao, rough, normal


def pack_orm(ao, rough, size):
    """glTF ORM: R occlusion, G roughness, B metallic (1 => site scalar rules)."""
    n = size * size * 4
    a = np.empty(n, dtype=np.float32)
    r = np.empty(n, dtype=np.float32)
    ao.pixels.foreach_get(a)
    rough.pixels.foreach_get(r)
    a = a.reshape(-1, 4)
    r = r.reshape(-1, 4)
    # AO straight from Cycles is soft; push contrast a touch so creases read
    occ = np.clip((a[:, 0] - 0.05) / 0.95, 0.0, 1.0) ** 1.35
    out = np.empty_like(a)
    out[:, 0] = occ
    out[:, 1] = np.clip(r[:, 0], 0.0, 1.0)
    out[:, 2] = 1.0
    out[:, 3] = 1.0
    orm = new_image("dragon_orm", size, False)
    orm.pixels.foreach_set(out.ravel())
    orm.update()
    return orm


def shrink(img, size):
    if img.size[0] != size:
        img.scale(size, size)


def wire_material(m, albedo, orm, normal):
    """Principled wiring the glTF exporter turns into baseColor / ORM / normal."""
    nt = m.node_tree
    nodes, links = nt.nodes, nt.links
    for n in list(nodes):
        if n.name == "BakeTarget":
            nodes.remove(n)
    bsdf = nodes.get("Principled BSDF")

    t_alb = nodes.new("ShaderNodeTexImage")
    t_alb.image = albedo
    t_alb.location = (-500, 300)
    links.new(t_alb.outputs["Color"], bsdf.inputs["Base Color"])

    t_orm = nodes.new("ShaderNodeTexImage")
    t_orm.image = orm
    t_orm.location = (-700, 0)
    sep = nodes.new("ShaderNodeSeparateColor")
    sep.location = (-400, 0)
    links.new(t_orm.outputs["Color"], sep.inputs["Color"])
    links.new(sep.outputs["Green"], bsdf.inputs["Roughness"])
    links.new(sep.outputs["Blue"], bsdf.inputs["Metallic"])

    # occlusion goes through the exporter's glTF settings node
    grp_name = "glTF Material Output"
    grp = bpy.data.node_groups.get(grp_name)
    if grp is None:
        grp = bpy.data.node_groups.new(grp_name, "ShaderNodeTree")
        grp.interface.new_socket("Occlusion", in_out="INPUT", socket_type="NodeSocketFloat")
        grp.nodes.new("NodeGroupInput")
    g = nodes.new("ShaderNodeGroup")
    g.node_tree = grp
    g.location = (-100, -250)
    links.new(sep.outputs["Red"], g.inputs["Occlusion"])

    t_nrm = nodes.new("ShaderNodeTexImage")
    t_nrm.image = normal
    t_nrm.location = (-700, -450)
    nm = nodes.new("ShaderNodeNormalMap")
    nm.location = (-400, -450)
    links.new(t_nrm.outputs["Color"], nm.inputs["Color"])
    links.new(nm.outputs["Normal"], bsdf.inputs["Normal"])

    set_input(bsdf, ["Specular IOR Level", "Specular"], 0.5)


# ---------------------------------------------------------------------------
# 6. flight cycle (shape keys + object bob)
# ---------------------------------------------------------------------------
def rig_flight(low):
    me = low.data
    base = [v.co.copy() for v in me.vertices]
    wing_idx = [i for i, c in enumerate(base) if abs(c.x) > ROOT_X and c.y < FRONT_Y]
    tail_idx = [i for i, c in enumerate(base) if c.y > TAIL_Y0]
    tail_maxy = max(base[i].y for i in tail_idx)
    stray = [i for i, c in enumerate(base) if abs(c.x) > ROOT_X and c.y >= FRONT_Y]
    log("wing verts", len(wing_idx), "tail verts", len(tail_idx), "outboard-but-behind (ignored)", len(stray))

    membrane_slot = [m.name for m in me.materials].index("DragonWingMembrane")
    membrane_verts = set()
    for p in me.polygons:
        if p.material_index == membrane_slot:
            membrane_verts.update(p.vertices)

    for seg in SEGMENTS:
        near = [base[i] for i in wing_idx if seg["x"] <= abs(base[i].x) < seg["x"] + 0.10]
        out = [base[i] for i in wing_idx if abs(base[i].x) > seg["x"]]
        seg["z_hinge"] = sum(c.z for c in near) / len(near) if near else 0.0
        seg["y_c"] = sum(c.y for c in out) / len(out) if out else 0.0
        seg["z_c"] = sum(c.z for c in out) / len(out) if out else 0.0
    ylo = min(base[i].y for i in wing_idx)
    yhi = max(base[i].y for i in wing_idx)

    def pose(co, seg, up, idx):
        s = 1.0 if co.x >= 0 else -1.0
        u = abs(co.x)
        if u <= seg["x"]:
            return co
        w = smoothstep((u - seg["x"]) / seg["blend"])
        deg = seg["up"] if up else seg["down"]
        sweep = SWEEP_UP if up else SWEEP_DOWN
        a = math.radians(deg) * w
        du, dz = u - seg["x"], co.z - seg["z_hinge"]
        ca, sa = math.cos(a), math.sin(a)
        nu = du * ca - dz * sa
        nz = seg["z_hinge"] + du * sa + dz * ca
        y = co.y + sweep * w
        t = math.radians(seg["twist"] if up else -seg["twist"]) * w * s
        dy, dz2 = y - seg["y_c"], nz - seg["z_c"]
        ct, st = math.cos(t), math.sin(t)
        y = seg["y_c"] + dy * ct - dz2 * st
        nz = seg["z_c"] + dy * st + dz2 * ct
        if idx in membrane_verts:
            chord = (co.y - ylo) / max(1e-6, yhi - ylo)
            nz += (BILLOW if up else -BILLOW) * w * math.sin(math.pi * chord)
        return Vector((s * (seg["x"] + nu), y, nz))

    def sway(co, deg):
        w = smoothstep((co.y - TAIL_Y0) / max(1e-6, tail_maxy - TAIL_Y0))
        a = math.radians(deg) * w
        dy = co.y - TAIL_Y0
        ca, sa = math.cos(a), math.sin(a)
        return Vector((co.x * ca - dy * sa, TAIL_Y0 + co.x * sa + dy * ca, co.z))

    if me.shape_keys:
        low.shape_key_clear()
    low.shape_key_add(name="Basis", from_mix=False)
    for seg in SEGMENTS:
        for up, suffix in ((True, "Up"), (False, "Down")):
            kb = low.shape_key_add(name=f"Flap{suffix}{seg['tag']}", from_mix=False)
            kb.slider_min, kb.slider_max = 0.0, 1.0
            for i in wing_idx:
                kb.data[i].co = pose(base[i], seg, up, i)
    for name, deg in (("TailL", TAIL_SWING), ("TailR", -TAIL_SWING)):
        kb = low.shape_key_add(name=name, from_mix=False)
        kb.slider_min, kb.slider_max = 0.0, 1.0
        for i in tail_idx:
            kb.data[i].co = sway(base[i], deg)

    sc = bpy.context.scene
    sc.render.fps = FPS
    sc.frame_start, sc.frame_end = 1, CYCLE + 1
    if me.shape_keys.animation_data:
        me.shape_keys.animation_data_clear()
    kbs = me.shape_keys.key_blocks
    for seg in SEGMENTS:
        up_kb, dn_kb = kbs[f"FlapUp{seg['tag']}"], kbs[f"FlapDown{seg['tag']}"]
        for t in range(0, CYCLE + 1, 2):
            p = profile_at(t - seg["lag"])
            up_kb.value = max(0.0, 1.0 - 2.0 * p)
            dn_kb.value = max(0.0, 2.0 * p - 1.0)
            up_kb.keyframe_insert(data_path="value", frame=1 + t)
            dn_kb.keyframe_insert(data_path="value", frame=1 + t)
    third = CYCLE // 3
    for name, keys in {
        "TailL": [(1, 0.55), (1 + third, 0.0), (1 + 2 * third, 0.55), (CYCLE + 1, 0.55)],
        "TailR": [(1, 0.0), (1 + third, 0.55), (1 + 2 * third, 0.0), (CYCLE + 1, 0.0)],
    }.items():
        kb = kbs[name]
        for f, val in keys:
            kb.value = val
            kb.keyframe_insert(data_path="value", frame=f)

    if low.animation_data:
        low.animation_data_clear()
    low.rotation_mode = "XYZ"
    for t, hn in BOB_PROFILE:
        z = BOB_AMPLITUDE * (0.5 - hn)
        low.location = (0.0, 0.0, z)
        low.rotation_euler = (-z * 0.9, 0.0, 0.0)
        low.keyframe_insert(data_path="location", index=2, frame=1 + t)
        low.keyframe_insert(data_path="rotation_euler", index=0, frame=1 + t)
    sc.frame_set(1)
    log("shape keys:", [k.name for k in kbs])


# ---------------------------------------------------------------------------
# 7. export + preview
# ---------------------------------------------------------------------------
def export(low):
    select_only(low)
    for c in low.children:
        c.select_set(True)
    kw = dict(
        filepath=str(OUT_GLB),
        export_format="GLB",
        use_selection=True,
        export_apply=False,  # keeps the shape keys
        export_yup=True,
        export_morph=True,
        export_morph_normal=False,
        export_try_sparse_sk=True,
        export_animations=True,
        export_frame_range=True,
        export_cameras=False,
        export_lights=False,
        export_extras=False,
        export_image_format="WEBP",  # three.js reads EXT_texture_webp; ~4x smaller than PNG
        export_image_quality=88,
        export_texcoords=True,
        export_normals=False,  # site shades flat in-shader; shipping normals would split every face into 3 verts
        export_draco_mesh_compression_enable=True,
        export_draco_mesh_compression_level=6,
        export_draco_position_quantization=14,
        export_draco_normal_quantization=10,
        export_draco_texcoord_quantization=12,
    )
    props = bpy.ops.export_scene.gltf.get_rna_type().properties.keys()
    OUT_GLB.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.export_scene.gltf(**{k: v for k, v in kw.items() if k in props})
    log(f"WROTE {OUT_GLB} {OUT_GLB.stat().st_size / 1024 / 1024:.2f} MB")


def preview(low, path, frame=12):
    sc = bpy.context.scene
    sc.render.engine = "BLENDER_EEVEE"
    sc.render.resolution_x, sc.render.resolution_y = 1400, 1000
    sc.render.resolution_percentage = 100
    w = bpy.data.worlds.new("PreviewWorld")
    w.use_nodes = True
    w.node_tree.nodes["Background"].inputs[0].default_value = (0.010, 0.012, 0.030, 1.0)
    w.node_tree.nodes["Background"].inputs[1].default_value = 0.35
    sc.world = w

    cam_d = bpy.data.cameras.new("HeroCam")
    cam_d.lens = 50
    cam = bpy.data.objects.new("HeroCam", cam_d)
    sc.collection.objects.link(cam)
    sc.camera = cam
    loc = Vector((0.3, -4.2, 0.55))
    cam.location = loc
    cam.rotation_euler = (Vector((0, 0, 0.05)) - loc).to_track_quat("-Z", "Y").to_euler()

    def light(name, energy, loc, col, size):
        d = bpy.data.lights.new(name, "AREA")
        d.energy, d.color, d.size = energy, col, size
        o = bpy.data.objects.new(name, d)
        sc.collection.objects.link(o)
        o.location = loc
        o.rotation_euler = (Vector((0, 0, 0)) - Vector(loc)).to_track_quat("-Z", "Y").to_euler()

    light("Key", 600, (-2.6, -3.2, 3.4), (1.0, 0.96, 0.92), 3)
    light("Fill", 80, (3.0, -1.6, 0.2), (0.5, 0.66, 1.0), 4)
    light("Rim", 400, (-0.6, 3.4, 1.0), (0.43, 0.82, 1.0), 2)
    light("Rim2", 150, (2.4, 2.6, -0.6), (0.3, 0.66, 1.0), 2)

    low.rotation_euler.z = math.radians(10)
    sc.frame_set(frame)
    sc.render.filepath = str(path)
    bpy.ops.render.render(write_still=True)
    low.rotation_euler.z = 0.0
    sc.frame_set(1)
    log("preview", path)

    # head close-up so eye placement can be checked without opening Blender
    if HEAD:
        target = Vector((0.0, HEAD["snout_y"] + HEAD["head_len"] * 0.5, HEAD["crown_z"] - 0.08))
        loc = target + Vector((0.55, -0.85, 0.28))
        cam.location = loc
        cam.rotation_euler = (target - loc).to_track_quat("-Z", "Y").to_euler()
        cam_d.lens = 85
        sc.render.resolution_x, sc.render.resolution_y = 1000, 800
        sc.render.filepath = str(path.with_name(path.stem + "-head.png"))
        bpy.ops.render.render(write_still=True)
        log("preview", sc.render.filepath)


def main():
    hi = import_hi()
    normalize(hi)
    orient_forward(hi)
    normalize(hi)

    low = make_low(hi)
    unwrap(low)
    make_low_materials(low)
    hi_bake_material(hi)
    eyes = place_eyes(low, make_eye_material())

    albedo, ao, rough, normal = bake_all(low, hi)
    for img, name in ((albedo, "albedo"), (ao, "ao"), (rough, "rough"), (normal, "normal")):
        img.filepath_raw = str(ROOT / "tools" / "ref" / f"dragon-v4-{name}.png")
        img.file_format = "PNG"
        img.save()
    orm = pack_orm(ao, rough, TEX)
    for img in (albedo, orm, normal):
        shrink(img, EXPORT_TEX)
        img.pack()
    for m in low.data.materials:
        wire_material(m, albedo, orm, normal)

    # the hi-res source must not ship
    hi.hide_render = True
    hi.hide_viewport = True

    rig_flight(low)
    export(low)
    preview(low, PREVIEW, frame=12)
    preview(low, PREVIEW.with_name("hero-v4-preview-up.png"), frame=1)

    bpy.ops.wm.save_as_mainfile(filepath=str(BLEND))
    log("SAVED", BLEND)
    log("NOTE: bump the ?v= cache-buster in src/ so browsers fetch the new GLB")


if __name__ == "__main__":
    main()
