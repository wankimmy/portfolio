"""Rebuild the hero dragon's flight cycle and re-export the GLB.

Operates on tools/ref/dragon-hero-v3.blend, which already has the faceted
low-poly mesh, the forward-facing orientation (snout toward Blender -Y == glTF
+Z, where the site's camera sits) and the emissive eyes. Only the animation is
rebuilt here, so tweaking the numbers below and re-running is safe and cheap.

Run headless:
    blender -b tools/ref/dragon-hero-v3.blend -P tools/rig_export_hero_dragon.py
or paste into a live Blender session driven over the BlenderMCP socket.

Axis note: the mesh was de-yawed so +X is the wing axis and the wing hinge is
Y-parallel. The 3/4 hero angle is applied at the site level
(HERO_YAW_DEG in src/composables/useHeroDragon.js), not baked in here.

Why the wing is segmented
-------------------------
A single rigid hinge makes every point on the span reach its extreme on the same
frame, which reads as a flat paddle on a stick. Real wings show a travelling
wave - the tip lags the shoulder by a few frames - plus span-wise twist so the
leading edge leads the trailing edge, and a membrane that billows against the
air. This rig reproduces all three with three chained hinge stations, each
animated off the same measured beat but delayed a little further out the span.
"""
from __future__ import annotations

import math
from pathlib import Path

import bpy
from mathutils import Vector

ROOT = Path(r"c:\Users\Admin\Documents\Safwan\portfolio")
OUT_GLB = ROOT / "public" / "models" / "dragon-hero.glb"
BLEND = ROOT / "tools" / "ref" / "dragon-hero-v3.blend"

# --- tuning -----------------------------------------------------------------
ROOT_X = 0.30          # |x| where the wing leaves the torso
FRONT_Y = 0.05         # wings sit in the front (-Y) half
TAIL_Y0 = 0.15         # tail starts here going +Y
FPS = 24

# Timing measured off the reference hover clip (hf_20260730_181547, 960x960
# @24fps): left-wingtip height tracked per frame, autocorrelation peak 0.982
# at lag 42 -> a 1.75s beat.
CYCLE = 42

# Chained hinge stations from shoulder to tip. Angles are cumulative, so the tip
# ends up near up=47 / down=-33. `lag` is the frame delay applied to that
# station's copy of the beat - this is what creates the whip.
SEGMENTS = [
    dict(tag="A", x=0.30, blend=0.15, up=21.0, down=-15.0, twist=8.0, lag=0.0),
    dict(tag="B", x=0.52, blend=0.15, up=15.0, down=-10.0, twist=11.0, lag=2.5),
    dict(tag="C", x=0.74, blend=0.15, up=11.0, down=-8.0, twist=13.0, lag=5.0),
]

# Membrane bows against the air: up on the downstroke, down on the recovery.
BILLOW = 0.055
SWEEP_UP = -0.024      # wings draw back slightly as they rise
SWEEP_DOWN = 0.018
TAIL_SWING = 14.0

# Measured beat profile: p=0 wings fully up, p=0.5 spread flat, p=1 fully down.
# Not a sine - the downstroke is fast (~14 frames), the bottom is held, and the
# recovery is slower. That asymmetry is what reads as "flying".
FLAP_PROFILE = [
    (0, 0.00), (6, 0.00), (8, 0.51), (10, 0.81), (12, 0.96), (14, 0.99),
    (16, 1.00), (20, 1.00), (24, 0.93), (26, 0.73), (28, 0.59), (30, 0.47),
    (32, 0.38), (34, 0.31), (36, 0.15), (38, 0.02), (40, 0.00), (42, 0.00),
]

# Head-crown height tracked over the same clip: the body peaks ~6 frames AFTER
# the wings bottom out, not in step with them. Amplitude ~7% of body height.
BOB_AMPLITUDE = 0.075
BOB_PROFILE = [  # (frame offset, head height 0=highest 1=lowest)
    (0, 0.86), (6, 0.93), (12, 0.50), (18, 0.21), (22, 0.00),
    (26, 0.00), (32, 0.36), (38, 0.64), (42, 0.86),
]


def smoothstep(t: float) -> float:
    t = max(0.0, min(1.0, t))
    return t * t * (3 - 2 * t)


def profile_at(t: float) -> float:
    """Sample the measured beat at any (wrapped) frame offset."""
    t %= CYCLE
    for (t0, p0), (t1, p1) in zip(FLAP_PROFILE, FLAP_PROFILE[1:]):
        if t0 <= t <= t1:
            return p0 if t1 == t0 else p0 + (p1 - p0) * (t - t0) / (t1 - t0)
    return FLAP_PROFILE[-1][1]


def main() -> None:
    o = bpy.data.objects["HeroDragonMesh"]
    me = o.data
    bpy.ops.object.mode_set(mode="OBJECT")

    base = [v.co.copy() for v in me.vertices]
    xmax = max(abs(c.x) for c in base)
    wing_idx = [i for i, c in enumerate(base) if abs(c.x) > ROOT_X and c.y < FRONT_Y]
    tail_idx = [i for i, c in enumerate(base) if c.y > TAIL_Y0]
    tail_maxy = max(base[i].y for i in tail_idx)

    # --- split the wing membrane onto its own slot -------------------------
    # In the reference the membranes read distinctly bluer and thinner than the
    # body. The site keys its materials off names, so give it something to grab.
    names = [m.name if m else "" for m in me.materials]
    if "DragonWingMembrane" not in names:
        mat = bpy.data.materials.get("DragonWingMembrane")
        if mat is None:
            mat = bpy.data.materials.new("DragonWingMembrane")
            mat.use_nodes = True
            bsdf = mat.node_tree.nodes.get("Principled BSDF")
            if bsdf:
                bsdf.inputs["Base Color"].default_value = (0.62, 0.69, 0.86, 1.0)
                bsdf.inputs["Roughness"].default_value = 0.5
        me.materials.append(mat)
        names.append("DragonWingMembrane")
    wing_slot = names.index("DragonWingMembrane")

    wing_set = set(wing_idx)
    membrane_verts = set()
    for p in me.polygons:
        if sum(1 for v in p.vertices if v in wing_set) * 2 > len(p.vertices):
            p.material_index = wing_slot
            membrane_verts.update(p.vertices)

    # per-station hinge height and chord centre (for the twist axis)
    for seg in SEGMENTS:
        near = [base[i] for i in wing_idx if seg["x"] <= abs(base[i].x) < seg["x"] + 0.10]
        out = [base[i] for i in wing_idx if abs(base[i].x) > seg["x"]]
        seg["z_hinge"] = sum(c.z for c in near) / len(near) if near else 0.0
        seg["y_c"] = sum(c.y for c in out) / len(out) if out else 0.0
        seg["z_c"] = sum(c.z for c in out) / len(out) if out else 0.0
        seg["n"] = len(out)
    ylo = min(base[i].y for i in wing_idx)
    yhi = max(base[i].y for i in wing_idx)
    print("segments:", [(s["tag"], s["n"], round(s["z_hinge"], 3)) for s in SEGMENTS])

    def pose(co: Vector, seg: dict, up: bool, idx: int) -> Vector:
        """One station's contribution: swing + twist + membrane billow."""
        s = 1.0 if co.x >= 0 else -1.0
        u = abs(co.x)
        if u <= seg["x"]:
            return co
        w = smoothstep((u - seg["x"]) / seg["blend"])
        deg = seg["up"] if up else seg["down"]
        sweep = SWEEP_UP if up else SWEEP_DOWN

        # swing about the Y-parallel hinge at this station
        a = math.radians(deg) * w
        du, dz = u - seg["x"], co.z - seg["z_hinge"]
        ca, sa = math.cos(a), math.sin(a)
        nu = du * ca - dz * sa
        nz = seg["z_hinge"] + du * sa + dz * ca
        y = co.y + sweep * w

        # twist about the span (X) axis so the leading edge leads the trailing
        # edge instead of the whole panel moving as one flat plate
        t = math.radians(seg["twist"] if up else -seg["twist"]) * w * s
        dy, dz2 = y - seg["y_c"], nz - seg["z_c"]
        ct, st = math.cos(t), math.sin(t)
        y = seg["y_c"] + dy * ct - dz2 * st
        nz = seg["z_c"] + dy * st + dz2 * ct

        # membrane bows against the airflow, peaking mid-chord
        if idx in membrane_verts:
            chord = (co.y - ylo) / max(1e-6, yhi - ylo)
            nz += (BILLOW if up else -BILLOW) * w * math.sin(math.pi * chord)

        return Vector((s * (seg["x"] + nu), y, nz))

    def sway(co: Vector, deg: float) -> Vector:
        w = smoothstep((co.y - TAIL_Y0) / max(1e-6, tail_maxy - TAIL_Y0))
        a = math.radians(deg) * w
        dy = co.y - TAIL_Y0
        ca, sa = math.cos(a), math.sin(a)
        return Vector((co.x * ca - dy * sa, TAIL_Y0 + co.x * sa + dy * ca, co.z))

    # --- shape keys ---------------------------------------------------------
    if me.shape_keys:
        o.shape_key_clear()
    o.shape_key_add(name="Basis", from_mix=False)

    for seg in SEGMENTS:
        for up, suffix in ((True, "Up"), (False, "Down")):
            kb = o.shape_key_add(name=f"Flap{suffix}{seg['tag']}", from_mix=False)
            kb.slider_min, kb.slider_max = 0.0, 1.0
            for i in wing_idx:
                kb.data[i].co = pose(base[i], seg, up, i)
    for name, deg in (("TailL", TAIL_SWING), ("TailR", -TAIL_SWING)):
        kb = o.shape_key_add(name=name, from_mix=False)
        kb.slider_min, kb.slider_max = 0.0, 1.0
        for i in tail_idx:
            kb.data[i].co = sway(base[i], deg)
    print("shape keys:", [k.name for k in me.shape_keys.key_blocks])

    # --- animation ----------------------------------------------------------
    sc = bpy.context.scene
    sc.render.fps = FPS
    # end on CYCLE+1 so the last key equals frame 1 and three.js LoopRepeat wraps
    sc.frame_start, sc.frame_end = 1, CYCLE + 1

    if me.shape_keys.animation_data:
        me.shape_keys.animation_data_clear()
    kbs = me.shape_keys.key_blocks

    for seg in SEGMENTS:
        up_kb = kbs[f"FlapUp{seg['tag']}"]
        dn_kb = kbs[f"FlapDown{seg['tag']}"]
        for t in range(0, CYCLE + 1, 2):
            p = profile_at(t - seg["lag"])      # delayed copy of the same beat
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

    if o.animation_data:
        o.animation_data_clear()
    o.rotation_mode = "XYZ"
    for t, hn in BOB_PROFILE:
        z = BOB_AMPLITUDE * (0.5 - hn)
        o.location = (0.0, 0.0, z)
        o.rotation_euler = (-z * 0.9, 0.0, 0.0)   # nose lifts a touch as the body rises
        o.keyframe_insert(data_path="location", index=2, frame=1 + t)
        o.keyframe_insert(data_path="rotation_euler", index=0, frame=1 + t)

    # --- export -------------------------------------------------------------
    for ob in bpy.context.selected_objects:
        ob.select_set(False)
    o.select_set(True)
    for c in o.children:
        if c.type == "MESH":
            c.select_set(True)
    bpy.context.view_layer.objects.active = o

    kw = dict(
        filepath=str(OUT_GLB),
        export_format="GLB",
        use_selection=True,
        export_apply=False,        # must stay False or the shape keys are baked away
        export_yup=True,
        export_morph=True,
        # Only wing verts move, so sparse accessors cut the morph payload hard
        # (8 targets x 4180 verts dense was 2.9MB). Flat shading in three.js
        # derives normals per face, so morph normals are dead weight.
        export_morph_normal=False,
        export_try_sparse_sk=True,
        export_animations=True,
        export_frame_range=True,
        export_cameras=False,
        export_lights=False,
        export_extras=False,
    )
    props = bpy.ops.export_scene.gltf.get_rna_type().properties.keys()
    for k, v in (("export_draco_mesh_compression_enable", True),
                 ("export_draco_mesh_compression_level", 6),
                 ("export_draco_position_quantization", 14),
                 ("export_draco_normal_quantization", 10)):
        if k in props:
            kw[k] = v
    bpy.ops.export_scene.gltf(**{k: v for k, v in kw.items() if k in props})
    print(f"WROTE {OUT_GLB} {OUT_GLB.stat().st_size / 1024 / 1024:.2f} MB")

    bpy.ops.wm.save_as_mainfile(filepath=str(BLEND))
    print("SAVED", BLEND)
    print("NOTE: bump the ?v= cache-buster in src/ if the site is already deployed")


if __name__ == "__main__":
    main()
