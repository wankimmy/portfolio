"""Hero dragon v5 - realistic scaled hide on a denser mesh.

Same pipeline as build_hero_dragon_v4.py (import, adaptive decimate, Smart UV,
Cycles bakes, shape-key flight cycle, Draco GLB); this file only swaps the
parts that decide how real the dragon reads:

  * 60k tris instead of 24k, so horns, claws and wing fingers keep their shape
  * the bake material is a scaled hide, not crystal plates: per-scale colour
    variation, dark creases, countershading (dark back, pale front), ivory
    horn and claw tips, leathery veined membranes
  * the normal map ships at 2048 so single scales survive a close-up
  * a transparent poster is rendered for the no-WebGL / reduced-motion hero

The low-poly stays flat-shaded on purpose: the site derives face normals in
the fragment shader (correct under the morph-target flap, no normals shipped)
and the tangent normal map, baked against those same flat faces, puts the
smooth hi-res surface back.

Run headless:
    blender -b -P tools/build_hero_dragon_v5.py -- [raw.glb] [tris] [tex] [out.glb] [normal_tex] [lite]

The site ships two files from this script:
    ... -- tools/ref/dragon-hunyuan-raw-v3.glb 60000 2048 public/models/dragon-hero.glb
    ... -- tools/ref/dragon-hunyuan-raw-v3.glb 20000 2048 public/models/dragon-hero-lite.glb 1024 lite
"""
from __future__ import annotations

import importlib.util
import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

HERE = Path(__file__).resolve().parent
_spec = importlib.util.spec_from_file_location("hero_v4", HERE / "build_hero_dragon_v4.py")
v4 = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(v4)

ARGS = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
v4.TARGET_TRIS = int(ARGS[1]) if len(ARGS) > 1 else 60000
v4.TEX = int(ARGS[2]) if len(ARGS) > 2 else 2048
v4.BLEND = v4.ROOT / "tools" / "ref" / "dragon-hero-v5.blend"
v4.PREVIEW = v4.ROOT / "tools" / "ref" / "hero-v5-preview.png"
NORMAL_TEX = int(ARGS[4]) if len(ARGS) > 4 else 2048
COLOR_TEX = 1024
# "lite" builds the phone variant: same bakes, no previews, poster or .blend
LITE = len(ARGS) > 5 and ARGS[5] == "lite"
POSTER = v4.ROOT / "public" / "images" / "hero-dragon-poster.webp"

SCALE_DENSITY = 84.0  # voronoi cells per scene unit: one scale is ~0.7% of the wingspan
log = v4.log


# ---------------------------------------------------------------------------
# node helpers
# ---------------------------------------------------------------------------
class Graph:
    def __init__(self, nt):
        self.nt = nt
        self.nodes = nt.nodes
        self.links = nt.links

    def put(self, socket, value):
        if isinstance(value, bpy.types.NodeSocket):
            self.links.new(value, socket)
        else:
            socket.default_value = value

    def math(self, op, a, b=None, c=None, clamp=False):
        n = self.nodes.new("ShaderNodeMath")
        n.operation = op
        n.use_clamp = clamp
        for i, v in enumerate((a, b, c)):
            if v is not None:
                self.put(n.inputs[i], v)
        return n.outputs[0]

    def smooth(self, value, lo, hi):
        """0 below lo, 1 above hi, smoothstep between."""
        n = self.nodes.new("ShaderNodeMapRange")
        n.interpolation_type = "SMOOTHSTEP"
        self.put(n.inputs["Value"], value)
        n.inputs["From Min"].default_value = lo
        n.inputs["From Max"].default_value = hi
        n.inputs["To Min"].default_value = 0.0
        n.inputs["To Max"].default_value = 1.0
        return n.outputs["Result"]

    def mix_f(self, fac, a, b):
        n = self.nodes.new("ShaderNodeMix")
        n.data_type = "FLOAT"
        self.put(n.inputs[0], fac)
        self.put(n.inputs[2], a)
        self.put(n.inputs[3], b)
        return n.outputs[0]

    def mix_c(self, fac, a, b, blend="MIX"):
        n = self.nodes.new("ShaderNodeMix")
        n.data_type = "RGBA"
        n.blend_type = blend
        self.put(n.inputs[0], fac)
        self.put(n.inputs[6], a)
        self.put(n.inputs[7], b)
        return n.outputs[2]

    def ramp(self, fac, stops, interp="EASE"):
        n = self.nodes.new("ShaderNodeValToRGB")
        cr = n.color_ramp
        cr.interpolation = interp
        while len(cr.elements) < len(stops):
            cr.elements.new(0.5)
        for el, (pos, col) in zip(cr.elements, stops):
            el.position = pos
            el.color = col
        self.put(n.inputs["Fac"], fac)
        return n.outputs["Color"]

    def voronoi(self, vector, scale, feature="F1", randomness=0.85):
        n = self.nodes.new("ShaderNodeTexVoronoi")
        n.feature = feature
        n.inputs["Scale"].default_value = scale
        n.inputs["Randomness"].default_value = randomness
        self.put(n.inputs["Vector"], vector)
        return n

    def noise(self, vector, scale, detail=4.0, rough=0.55):
        n = self.nodes.new("ShaderNodeTexNoise")
        n.inputs["Scale"].default_value = scale
        n.inputs["Detail"].default_value = detail
        n.inputs["Roughness"].default_value = rough
        self.put(n.inputs["Vector"], vector)
        return n.outputs["Fac"]


def grey(v):
    return (v, v, v, 1.0)


# ---------------------------------------------------------------------------
# the hide the bakes read
# ---------------------------------------------------------------------------
def hi_bake_material(hi):
    m = bpy.data.materials.new("HiBakeHide")
    m.use_nodes = True
    g = Graph(m.node_tree)
    bsdf = g.nodes.get("Principled BSDF")

    geo = g.nodes.new("ShaderNodeNewGeometry")
    tex = g.nodes.new("ShaderNodeTexCoord")
    pos = tex.outputs["Object"]

    sep = g.nodes.new("ShaderNodeSeparateXYZ")
    g.put(sep.inputs["Vector"], pos)
    nsep = g.nodes.new("ShaderNodeSeparateXYZ")
    g.put(nsep.inputs["Vector"], geo.outputs["Normal"])

    # --- region masks (normalized mesh: x span, -Y snout, +Z up) ------------
    abs_x = g.math("ABSOLUTE", sep.outputs["X"])
    wing = g.math(
        "MULTIPLY",
        g.smooth(abs_x, v4.ROOT_X - 0.03, v4.ROOT_X + 0.03),
        g.math("SUBTRACT", 1.0, g.smooth(sep.outputs["Y"], v4.FRONT_Y - 0.03, v4.FRONT_Y + 0.03)),
    )
    # back of the animal faces +Y (it hovers upright, snout toward -Y)
    dorsal = g.smooth(nsep.outputs["Y"], -0.25, 0.75)
    # horn, claw and spike tips are the sharpest convex points on the mesh
    tips = g.smooth(geo.outputs["Pointiness"], 0.60, 0.74)
    crease = g.math("SUBTRACT", 1.0, g.smooth(geo.outputs["Pointiness"], 0.36, 0.48))

    # --- scales --------------------------------------------------------------
    # stretched along the body axis so they read as overlapping rows, not cells
    mapping = g.nodes.new("ShaderNodeMapping")
    mapping.inputs["Scale"].default_value = (1.0, 0.72, 0.9)
    g.put(mapping.inputs["Vector"], pos)
    scale_pos = mapping.outputs["Vector"]

    cells = g.voronoi(scale_pos, SCALE_DENSITY, "F1")
    edges = g.voronoi(scale_pos, SCALE_DENSITY, "DISTANCE_TO_EDGE")
    plate = g.smooth(edges.outputs["Distance"], 0.0, 0.07)  # 0 in the groove, 1 on the plate
    dome = g.math(
        "SUBTRACT", 1.0, g.math("MULTIPLY", cells.outputs["Distance"], SCALE_DENSITY * 0.7), clamp=True
    )
    cell_sep = g.nodes.new("ShaderNodeSeparateColor")
    g.put(cell_sep.inputs["Color"], cells.outputs["Color"])
    cell_rand = cell_sep.outputs["Red"]

    # --- membranes: fine leather grain plus a loose vein net -----------------
    grain = g.noise(pos, 210.0, detail=6.0, rough=0.62)
    # the same grain keeps each plate from reading as polished chrome
    body_height = g.math(
        "ADD",
        g.math("ADD", g.math("MULTIPLY", plate, 0.62), g.math("MULTIPLY", dome, 0.28)),
        g.math("MULTIPLY", grain, 0.10),
    )
    veins_v = g.voronoi(pos, 11.0, "DISTANCE_TO_EDGE", randomness=1.0)
    vein = g.math("SUBTRACT", 1.0, g.smooth(veins_v.outputs["Distance"], 0.0, 0.022))
    wing_height = g.math("ADD", g.math("MULTIPLY", grain, 0.55), g.math("MULTIPLY", vein, 0.45))

    height = g.mix_f(wing, body_height, wing_height)
    strength = g.mix_f(wing, 0.85, 0.38)

    bump = g.nodes.new("ShaderNodeBump")
    bump.inputs["Distance"].default_value = 0.011
    g.put(bump.inputs["Strength"], strength)
    g.put(bump.inputs["Height"], height)
    g.links.new(bump.outputs["Normal"], bsdf.inputs["Normal"])

    # --- colour --------------------------------------------------------------
    # pearl ice-blue hide: every scale picks its own tone from the ramp
    scale_col = g.ramp(
        cell_rand,
        [
            (0.00, (0.33, 0.43, 0.63, 1.0)),
            (0.45, (0.55, 0.65, 0.82, 1.0)),
            (0.80, (0.72, 0.80, 0.92, 1.0)),
            (1.00, (0.86, 0.90, 0.97, 1.0)),
        ],
        interp="LINEAR",
    )
    mottle = g.noise(pos, 5.5, detail=3.0)
    body_col = g.mix_c(g.math("MULTIPLY", g.smooth(mottle, 0.35, 0.7), 0.35), scale_col, (0.40, 0.52, 0.74, 1.0))
    # countershading: slate back, pale front
    body_col = g.mix_c(g.math("MULTIPLY", dorsal, 0.62), body_col, (0.17, 0.24, 0.40, 1.0), "MULTIPLY")
    body_col = g.mix_c(g.math("MULTIPLY", g.math("SUBTRACT", 1.0, dorsal), 0.30), body_col, (0.93, 0.95, 0.99, 1.0))
    # grooves between scales and deep creases hold shadow and grime
    body_col = g.mix_c(
        g.math("MULTIPLY", g.math("SUBTRACT", 1.0, plate), 0.78), body_col, (0.13, 0.18, 0.31, 1.0)
    )
    body_col = g.mix_c(g.math("MULTIPLY", crease, 0.45), body_col, (0.10, 0.14, 0.24, 1.0))
    # horn, claw, spike tips: worn ivory
    body_col = g.mix_c(tips, body_col, (0.92, 0.90, 0.84, 1.0))

    wing_tone = g.smooth(g.noise(pos, 3.2, detail=2.0), 0.3, 0.75)
    wing_col = g.mix_c(wing_tone, (0.30, 0.40, 0.60, 1.0), (0.50, 0.62, 0.84, 1.0))
    wing_col = g.mix_c(g.math("MULTIPLY", vein, 0.55), wing_col, (0.16, 0.22, 0.38, 1.0))
    wing_col = g.mix_c(g.math("MULTIPLY", grain, 0.18), wing_col, (0.70, 0.78, 0.92, 1.0))
    # finger bones are convex ridges: lift them toward the body colour
    ridges = g.smooth(geo.outputs["Pointiness"], 0.53, 0.62)
    wing_col = g.mix_c(g.math("MULTIPLY", ridges, 0.7), wing_col, (0.74, 0.80, 0.90, 1.0))

    g.links.new(g.mix_c(wing, body_col, wing_col), bsdf.inputs["Base Color"])

    # --- roughness: glossy plates, matte grooves, satin membranes -----------
    body_rough = g.mix_f(plate, 0.72, g.mix_f(cell_rand, 0.36, 0.52))
    body_rough = g.mix_f(tips, body_rough, 0.20)
    wing_rough = g.math("ADD", 0.46, g.math("MULTIPLY", grain, 0.20))
    g.links.new(g.mix_f(wing, body_rough, wing_rough), bsdf.inputs["Roughness"])
    v4.set_input(bsdf, ["Metallic"], 0.0)

    hi.data.materials.clear()
    hi.data.materials.append(m)
    for p in hi.data.polygons:
        p.use_smooth = True
    return m


# ---------------------------------------------------------------------------
# poster for the no-WebGL / reduced-motion hero
# ---------------------------------------------------------------------------
def poster(low, path, frame=12):
    sc = bpy.context.scene
    sc.render.engine = "BLENDER_EEVEE"
    sc.render.film_transparent = True
    sc.render.resolution_x, sc.render.resolution_y = 1600, 1120
    sc.render.resolution_percentage = 100
    sc.render.image_settings.file_format = "WEBP"
    sc.render.image_settings.color_mode = "RGBA"
    sc.render.image_settings.quality = 86
    cam = sc.camera
    loc = Vector((0.3, -4.2, 0.55))
    cam.location = loc
    cam.data.lens = 50
    cam.rotation_euler = (Vector((0, 0, 0.05)) - loc).to_track_quat("-Z", "Y").to_euler()
    low.rotation_euler.z = math.radians(10)
    sc.frame_set(frame)
    sc.render.filepath = str(path)
    bpy.ops.render.render(write_still=True)
    low.rotation_euler.z = 0.0
    sc.frame_set(1)
    sc.render.film_transparent = False
    sc.render.image_settings.file_format = "PNG"
    log("poster", path)


def face_check(path):
    """Straight-on and 3/4 head shots: the only way to see eye seating headless."""
    sc = bpy.context.scene
    cam = sc.camera
    cam.data.lens = 90
    sc.render.resolution_x, sc.render.resolution_y = 900, 900
    head = v4.HEAD
    target = Vector((0.0, head["snout_y"] + head["head_len"] * 0.45, head["crown_z"] - 0.12))
    for tag, offset in (("front", Vector((0.0, -1.9, 0.12))), ("side", Vector((1.45, -1.2, 0.2)))):
        loc = target + offset
        cam.location = loc
        cam.rotation_euler = (target - loc).to_track_quat("-Z", "Y").to_euler()
        sc.render.filepath = str(path.with_name(f"{path.stem}-{tag}.png"))
        bpy.ops.render.render(write_still=True)
        log("face", sc.render.filepath)


def main():
    hi = v4.import_hi()
    v4.normalize(hi)
    v4.orient_forward(hi)
    v4.normalize(hi)

    low = v4.make_low(hi)
    v4.unwrap(low)
    v4.make_low_materials(low)
    hi_bake_material(hi)
    v4.place_eyes(low, v4.make_eye_material())

    albedo, ao, rough, normal = v4.bake_all(low, hi)
    for img, name in ((albedo, "albedo"), (ao, "ao"), (rough, "rough"), (normal, "normal")):
        img.filepath_raw = str(v4.ROOT / "tools" / "ref" / f"dragon-v5-{name}.png")
        img.file_format = "PNG"
        img.save()
    orm = v4.pack_orm(ao, rough, v4.TEX)
    v4.shrink(albedo, COLOR_TEX)
    v4.shrink(orm, COLOR_TEX)
    v4.shrink(normal, NORMAL_TEX)
    for img in (albedo, orm, normal):
        img.pack()
    for m in low.data.materials:
        v4.wire_material(m, albedo, orm, normal)

    hi.hide_render = True
    hi.hide_viewport = True

    v4.rig_flight(low)
    v4.export(low)
    if LITE:
        return
    v4.preview(low, v4.PREVIEW, frame=12)
    v4.preview(low, v4.PREVIEW.with_name("hero-v5-preview-up.png"), frame=1)
    poster(low, POSTER)
    face_check(v4.PREVIEW.with_name("hero-v5-face.png"))

    bpy.ops.wm.save_as_mainfile(filepath=str(v4.BLEND))
    log("SAVED", v4.BLEND)


if __name__ == "__main__":
    main()
