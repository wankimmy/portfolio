"""Creature build - raw sculpt -> shipped model, the dragon's way.

Reuses the dragon pipeline (build_hero_dragon_v4.py / v5.py): import, dense
decimate, Smart UV, Cycles bakes (albedo, AO+roughness as ORM, tangent normal
against the flat low-poly), Draco GLB with WebP textures. What changes per
creature is the hide recipe (RECIPES below) and the size of the bakes.

The sculpt keeps its axes: no rotation, no mirror. Only a uniform scale (largest
dimension = 2) and a re-centre of the bounding box on the origin.

Run headless:
    blender -b -P tools/build_creature.py -- <naga|whale|phoenix> [lite]

Inputs:  tools/ref/creature-<name>-raw.glb
Outputs: public/models/creature-<name>.glb        (full: ~50k tris, 2048 normal)
         public/models/creature-<name>-lite.glb   (lite: ~18k tris, 1024 normal)
Preview PNGs and bake maps go to the scratchpad folder, not the repo.
"""
from __future__ import annotations

import importlib.util
import sys
import time
from pathlib import Path

import bmesh
import bpy
from mathutils import Vector

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
SCRATCH = Path(r"C:\Users\Admin\AppData\Local\Temp\claude\af71f5d35ee93aee\1123fbff-6548-4fd8-b184-ca05523c0dfc\scratchpad")


def _load(name, file):
    """Load a sibling build script. Their module-level code parses sys.argv,
    so hide our own arguments while they import."""
    saved = sys.argv
    sys.argv = [saved[0], "--"]
    try:
        spec = importlib.util.spec_from_file_location(name, HERE / file)
        mod = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(mod)
    finally:
        sys.argv = saved
    return mod


v5 = _load("creature_hero_v5", "build_hero_dragon_v5.py")  # imports v4 as v5.v4
v4 = v5.v4
log = v4.log

ARGS = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
if not ARGS or ARGS[0] not in ("naga", "whale", "phoenix"):
    raise SystemExit("usage: blender -b -P tools/build_creature.py -- <naga|whale|phoenix> [lite]")
NAME = ARGS[0]
LITE = "lite" in ARGS[1:]
PLAIN = "plain" in ARGS[1:]  # also write an uncompressed tools/ref copy for the test stage

RAW = ROOT / "tools" / "ref" / f"creature-{NAME}-raw.glb"
OUT = ROOT / "public" / "models" / (f"creature-{NAME}-lite.glb" if LITE else f"creature-{NAME}.glb")
TRIS = 18000 if LITE else 50000
BAKE_TEX = 2048
NORMAL_TEX = 1024 if LITE else 2048
COLOR_TEX = 1024
MIN_ISLAND_FACES = 12  # loose bits smaller than this are dust, not fins or whiskers

# ---------------------------------------------------------------------------
# hide recipes. Values follow the dragon's pearl hide: a value range that
# matches it and a little desaturation. "up" and "grad" are in the sculpt's own
# axes (+X screen right, +Y up, +Z toward the viewer).
# ---------------------------------------------------------------------------
RECIPES = {
    "naga": dict(
        up=(0.0, 1.0, 0.0),
        density=70.0,
        stretch=(1.0, 0.72, 0.9),
        bump=0.011,
        scale_ramp=[
            (0.00, (0.07, 0.27, 0.24, 1.0)),
            (0.45, (0.12, 0.38, 0.33, 1.0)),
            (0.80, (0.18, 0.46, 0.40, 1.0)),
            (1.00, (0.26, 0.54, 0.47, 1.0)),
        ],
        mottle=(0.20, 0.40, 0.36, 1.0), mottle_w=0.35,
        back_col=(0.10, 0.36, 0.38, 1.0), back_w=0.75,
        belly_col=(0.50, 0.62, 0.56, 1.0), belly_w=0.45,
        grad=("dot", (-0.8, -0.5, 0.0), (-0.4, 0.7)),  # head -> tail: jade to indigo
        tail_col=(0.20, 0.19, 0.42, 1.0), tail_w=0.85,
        groove_col=(0.06, 0.14, 0.14, 1.0), groove_w=0.8,
        crease_col=(0.05, 0.10, 0.12, 1.0), crease_w=0.45,
        tip_col=(0.80, 0.60, 0.26, 1.0), tip_w=0.85,  # gold only on fin and horn tips
        rough=(0.50, 0.12),
    ),
    "whale": dict(
        up=(0.0, 1.0, 0.0),
        density=150.0,
        stretch=(1.0, 1.0, 1.0),
        bump=0.03,  # was 0.006: the scales were too faint to read in the close-up (the dragon's scales read at 0.011)
        scale_ramp=[
            (0.00, (0.07, 0.10, 0.20, 1.0)),
            (0.50, (0.10, 0.14, 0.26, 1.0)),
            (1.00, (0.14, 0.19, 0.32, 1.0)),
        ],
        mottle=(0.12, 0.16, 0.28, 1.0), mottle_w=0.30,
        back_col=(0.09, 0.12, 0.22, 1.0), back_w=0.85,
        belly_col=(0.70, 0.76, 0.84, 1.0), belly_w=0.90,
        stripes=((0.0, 0.0, 1.0), 14.0, (0.42, 0.48, 0.60, 1.0), 0.6),  # throat grooves on the belly
        grad=None,
        groove_col=(0.06, 0.08, 0.14, 1.0), groove_w=0.25,
        crease_col=(0.05, 0.07, 0.12, 1.0), crease_w=0.3,
        tip_col=(0.80, 0.84, 0.92, 1.0), tip_w=0.0,
        freckles=dict(col=(0.85, 0.90, 1.0, 1.0), density=16.0),  # the star freckles, as glowing points
        rough=(0.40, 0.10),
    ),
    "phoenix": dict(
        up=(0.0, 1.0, 0.0),
        density=60.0,
        stretch=(1.0, 0.30, 1.0),  # feathers: cells longer along Y than wide
        bump=0.010,
        scale_ramp=[
            (0.00, (0.42, 0.12, 0.06, 1.0)),
            (0.50, (0.66, 0.30, 0.10, 1.0)),
            (1.00, (0.78, 0.52, 0.22, 1.0)),
        ],
        mottle=(0.52, 0.30, 0.12, 1.0), mottle_w=0.30,
        back_col=(0.50, 0.14, 0.07, 1.0), back_w=0.40,
        belly_col=(0.72, 0.42, 0.14, 1.0), belly_w=0.40,
        grad=("radius", None, (0.25, 0.90)),  # root ember -> pale gold tips
        tail_col=(0.90, 0.74, 0.42, 1.0), tail_w=0.90,
        groove_col=(0.30, 0.07, 0.04, 1.0), groove_w=0.70,
        crease_col=(0.22, 0.05, 0.03, 1.0), crease_w=0.50,
        tip_col=(0.95, 0.82, 0.52, 1.0), tip_w=0.60,
        rough=(0.36, 0.12),
    ),
}
R = RECIPES[NAME]


# ---------------------------------------------------------------------------
# 1. import, keep axes, clean
# ---------------------------------------------------------------------------
def import_raw():
    v4.RAW = RAW
    hi = v4.import_hi()
    # the glTF importer may leave an axis-conversion transform on the object;
    # bake it into the vertices so the mesh holds the sculpt's own coordinates
    v4.select_only(hi)
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    return hi


def drop_dust(obj):
    """Delete loose islands with fewer than MIN_ISLAND_FACES faces."""
    me = obj.data
    bm = bmesh.new()
    bm.from_mesh(me)
    bm.faces.ensure_lookup_table()
    seen = set()
    islands = []
    for f in bm.faces:
        if f.index in seen:
            continue
        seen.add(f.index)
        stack, comp = [f], []
        while stack:
            g = stack.pop()
            comp.append(g)
            for e in g.edges:
                for h in e.link_faces:
                    if h.index not in seen:
                        seen.add(h.index)
                        stack.append(h)
        islands.append(comp)
    dust = [c for c in islands if len(c) < MIN_ISLAND_FACES]
    counts = sorted(len(c) for c in islands)
    log("islands", len(islands), "smallest face counts", counts[:12], "dropping", len(dust))
    verts = {v for comp in dust for f in comp for v in f.verts}
    if verts:
        bmesh.ops.delete(bm, geom=list(verts), context="VERTS")
    bm.to_mesh(me)
    bm.free()
    me.update()


def tri_count(obj):
    return sum(len(p.vertices) - 2 for p in obj.data.polygons)


# ---------------------------------------------------------------------------
# 2. the hide the bakes read (one procedural shader per creature)
# ---------------------------------------------------------------------------
def creature_hide(hi):
    m = bpy.data.materials.new("CreatureHiBake")
    m.use_nodes = True
    g = v5.Graph(m.node_tree)
    bsdf = g.nodes.get("Principled BSDF")
    geo = g.nodes.new("ShaderNodeNewGeometry")
    pos = g.nodes.new("ShaderNodeTexCoord").outputs["Object"]

    def dot(vec, axis):
        n = g.nodes.new("ShaderNodeVectorMath")
        n.operation = "DOT_PRODUCT"
        g.put(n.inputs[0], vec)
        n.inputs[1].default_value = axis
        return n.outputs["Value"]

    normal = geo.outputs["Normal"]
    pointy = geo.outputs["Pointiness"]
    up_dot = dot(normal, R["up"])
    dorsal = g.smooth(up_dot, -0.2, 0.6)
    # belly is only the underside: side walls must not pick up the pale tint
    not_dorsal = g.smooth(dot(normal, tuple(-c for c in R["up"])), 0.0, 0.5)
    tips = g.smooth(pointy, 0.60, 0.74)
    crease = g.math("SUBTRACT", 1.0, g.smooth(pointy, 0.36, 0.48))

    # --- scales (or fine feathers / skin mottling) ---------------------------
    mapping = g.nodes.new("ShaderNodeMapping")
    mapping.inputs["Scale"].default_value = R["stretch"]
    g.put(mapping.inputs["Vector"], pos)
    sp = mapping.outputs["Vector"]
    cells = g.voronoi(sp, R["density"], "F1")
    edges = g.voronoi(sp, R["density"], "DISTANCE_TO_EDGE")
    plate = g.smooth(edges.outputs["Distance"], 0.0, 0.07)
    dome = g.math("SUBTRACT", 1.0, g.math("MULTIPLY", cells.outputs["Distance"], R["density"] * 0.7), clamp=True)
    cell_sep = g.nodes.new("ShaderNodeSeparateColor")
    g.put(cell_sep.inputs["Color"], cells.outputs["Color"])
    cell_rand = cell_sep.outputs["Red"]
    grain = g.noise(pos, 210.0, detail=6.0, rough=0.62)
    height = g.math(
        "ADD",
        g.math("ADD", g.math("MULTIPLY", plate, 0.62), g.math("MULTIPLY", dome, 0.28)),
        g.math("MULTIPLY", grain, 0.10),
    )
    bump = g.nodes.new("ShaderNodeBump")
    bump.inputs["Distance"].default_value = 0.011
    g.put(bump.inputs["Strength"], R["bump"])
    g.put(bump.inputs["Height"], height)
    g.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])

    # --- colour: per-scale tone, mottle, countershading, grooves, tips -------
    body = g.ramp(cell_rand, R["scale_ramp"], interp="LINEAR")
    mottle = g.noise(pos, 5.5, detail=3.0)
    body = g.mix_c(g.math("MULTIPLY", g.smooth(mottle, 0.35, 0.7), R["mottle_w"]), body, R["mottle"])
    body = g.mix_c(g.math("MULTIPLY", dorsal, R["back_w"]), body, R["back_col"])
    body = g.mix_c(g.math("MULTIPLY", not_dorsal, R["belly_w"]), body, R["belly_col"])

    if R.get("stripes"):
        axis, freq, col, w = R["stripes"]
        wave = g.math("SINE", g.math("MULTIPLY", dot(pos, axis), freq))
        band = g.smooth(wave, 0.2, 0.8)
        body = g.mix_c(g.math("MULTIPLY", band, g.math("MULTIPLY", not_dorsal, w)), body, col)

    if R.get("grad"):
        mode, axis, (lo, hi_) = R["grad"]
        if mode == "radius":
            n = g.nodes.new("ShaderNodeVectorMath")
            n.operation = "LENGTH"
            g.put(n.inputs[0], pos)
            along = n.outputs["Value"]
        else:
            along = dot(pos, axis)
        t_grad = g.smooth(along, lo, hi_)
        body = g.mix_c(g.math("MULTIPLY", t_grad, R["tail_w"]), body, R["tail_col"])

    body = g.mix_c(g.math("MULTIPLY", g.math("SUBTRACT", 1.0, plate), R["groove_w"]), body, R["groove_col"])
    body = g.mix_c(g.math("MULTIPLY", crease, R["crease_w"]), body, R["crease_col"])
    body = g.mix_c(g.math("MULTIPLY", tips, R["tip_w"]), body, R["tip_col"])

    if R.get("freckles"):
        fz = R["freckles"]
        fc = g.voronoi(pos, fz["density"], "F1")
        spot = g.math("SUBTRACT", 1.0, g.smooth(fc.outputs["Distance"], 0.03, 0.09))
        fsep = g.nodes.new("ShaderNodeSeparateColor")
        g.put(fsep.inputs["Color"], fc.outputs["Color"])
        star = g.smooth(fsep.outputs["Red"], 0.80, 0.92)
        body = g.mix_c(g.math("MULTIPLY", g.math("MULTIPLY", spot, star), dorsal), body, fz["col"])

    g.links.new(body, bsdf.inputs["Base Color"])

    # --- roughness: glossy plates, rougher grooves, grain on top -------------
    base_r, var_r = R["rough"]
    rough = g.mix_f(plate, base_r + var_r, base_r)
    rough = g.math("ADD", rough, g.math("MULTIPLY", grain, 0.15))
    g.links.new(rough, bsdf.inputs["Roughness"])
    v4.set_input(bsdf, ["Metallic"], 0.0)

    hi.data.materials.clear()
    hi.data.materials.append(m)
    for p in hi.data.polygons:
        p.use_smooth = True
    return m


# ---------------------------------------------------------------------------
# 3. build, bake, export
# ---------------------------------------------------------------------------
def preview(low, name, frame=1):
    path = SCRATCH / f"creature-{NAME}{'-lite' if LITE else ''}-{name}.png"
    v4.preview(low, path, frame=frame)
    return path


def main():
    t0 = time.time()
    v4.TARGET_TRIS = TRIS
    v4.TEX = BAKE_TEX
    v4.OUT_GLB = OUT
    v4.PREVIEW = SCRATCH / f"creature-{NAME}.png"
    SCRATCH.mkdir(parents=True, exist_ok=True)

    hi = import_raw()
    v4.normalize(hi)
    log("raw", NAME, "tris", tri_count(hi), "dims", tuple(round(d, 3) for d in hi.dimensions))
    drop_dust(hi)
    v4.normalize(hi)
    log("clean tris", tri_count(hi), "centre", tuple(round(c, 4) for c in hi.location))

    low = v4.make_low(hi)
    log("low tris", tri_count(low))
    v4.unwrap(low)

    mat = bpy.data.materials.new(f"Creature{NAME.capitalize()}Hide")
    mat.use_nodes = True
    low.data.materials.clear()
    low.data.materials.append(mat)
    creature_hide(hi)

    albedo, ao, rough, normal = v4.bake_all(low, hi)
    for img, tag in ((albedo, "albedo"), (ao, "ao"), (rough, "rough"), (normal, "normal")):
        img.filepath_raw = str(SCRATCH / f"creature-{NAME}-{tag}.png")
        img.file_format = "PNG"
        img.save()
    orm = v4.pack_orm(ao, rough, BAKE_TEX)
    v4.shrink(albedo, COLOR_TEX)
    v4.shrink(orm, COLOR_TEX)
    v4.shrink(normal, NORMAL_TEX)
    for img in (albedo, orm, normal):
        img.pack()
    v4.wire_material(mat, albedo, orm, normal)

    hi.hide_render = True
    hi.hide_viewport = True
    v4.export(low)
    if PLAIN:
        # the test stage's glb= loader has no Draco decoder: write an uncompressed
        # copy for viewing only, next to the raw sculpt (never shipped)
        v4.select_only(low)
        bpy.ops.export_scene.gltf(
            filepath=str(ROOT / "tools" / "ref" / f"creature-{NAME}-view.glb"),
            export_format="GLB", use_selection=True, export_yup=True,
            export_normals=False, export_image_format="WEBP", export_image_quality=88,
            export_draco_mesh_compression_enable=False,
        )
        log("plain view copy written")
    log(f"bakes+export {time.time() - t0:.0f}s")
    if not LITE:
        preview(low, "front", frame=1)
    log("DONE", OUT)


if __name__ == "__main__":
    main()
