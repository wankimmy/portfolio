"""Densify hero dragon mesh, project exact billboard PNG as albedo, export GLB."""
from __future__ import annotations

from pathlib import Path

import bpy
from mathutils import Vector

SRC = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\public\models\dragon-hero.glb")
# Prefer clean raw body if present (no prior eye spheres); fall back to public GLB
RAW = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref\dragon-hunyuan-raw-v2.glb")
PNG = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref\billboard_Image_0.png")
OUT = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\public\models\dragon-hero.glb")
BLEND = Path(r"c:\Users\Admin\Documents\Safwan\portfolio\tools\ref\dragon-hero-volume.blend")

VOXEL = 0.010
SOLIDIFY = 0.016
DISPLACE = 0.006
MAX_VERTS = 200_000
TARGET_SIZE = 2.0


def set_input(bsdf, names, value):
    for name in names:
        sock = bsdf.inputs.get(name)
        if sock is not None:
            sock.default_value = value
            return True
    return False


def clear_scene():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def import_body():
    src = RAW if RAW.exists() else SRC
    bpy.ops.import_scene.gltf(filepath=str(src))
    print(f"IMPORTED={src}")

    # Drop prior eye helpers if present
    for obj in list(bpy.context.scene.objects):
        if obj.type == "MESH" and obj.name.startswith("DragonEye"):
            bpy.data.objects.remove(obj, do_unlink=True)

    meshes = [o for o in bpy.context.scene.objects if o.type == "MESH"]
    if not meshes:
        raise SystemExit("no mesh imported")

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
    return dragon


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
    print(f"NORMALIZED dims={list(dragon.dimensions)} verts={len(dragon.data.vertices)}")


def apply_modifier(dragon, name):
    bpy.ops.object.select_all(action="DESELECT")
    dragon.select_set(True)
    bpy.context.view_layer.objects.active = dragon
    bpy.ops.object.modifier_apply(modifier=name)


def densify(dragon):
    # Remesh for denser volumetric surface
    remesh = dragon.modifiers.new("Remesh", "REMESH")
    remesh.mode = "VOXEL"
    remesh.voxel_size = VOXEL
    remesh.use_smooth_shade = False
    apply_modifier(dragon, "Remesh")
    print(f"AFTER_REMESH verts={len(dragon.data.vertices)}")

    # Slight thickness so silhouettes read fuller
    solid = dragon.modifiers.new("Solidify", "SOLIDIFY")
    solid.thickness = SOLIDIFY
    solid.offset = 0.0
    solid.use_even_offset = True
    solid.use_quality_normals = True
    apply_modifier(dragon, "Solidify")
    print(f"AFTER_SOLIDIFY verts={len(dragon.data.vertices)}")

    # Mild displace for facet depth
    tex = bpy.data.textures.new("DragonFacetNoise", type="CLOUDS")
    tex.noise_scale = 0.55
    disp = dragon.modifiers.new("Displace", "DISPLACE")
    disp.texture = tex
    disp.mid_level = 0.5
    disp.strength = DISPLACE
    apply_modifier(dragon, "Displace")
    print(f"AFTER_DISPLACE verts={len(dragon.data.vertices)}")

    if len(dragon.data.vertices) > MAX_VERTS:
        ratio = MAX_VERTS / max(len(dragon.data.vertices), 1)
        dec = dragon.modifiers.new("Decimate", "DECIMATE")
        dec.ratio = max(0.15, min(0.95, ratio))
        apply_modifier(dragon, "Decimate")
        print(f"AFTER_DECIMATE verts={len(dragon.data.vertices)} ratio={dec.ratio:.3f}")

    for p in dragon.data.polygons:
        p.use_smooth = False

    # Re-center after densify
    normalize(dragon)


def project_uvs_ortho(dragon):
    """Orthographic UVs on the largest silhouette plane (stable in Blender CLI)."""
    mesh = dragon.data
    if mesh.uv_layers:
        uv_layer = mesh.uv_layers[0]
    else:
        uv_layer = mesh.uv_layers.new(name="UVMap")
    mesh.uv_layers.active = uv_layer

    coords = [dragon.matrix_world @ v.co for v in mesh.vertices]
    xs = [c.x for c in coords]
    ys = [c.y for c in coords]
    zs = [c.z for c in coords]
    min_x, max_x = min(xs), max(xs)
    min_y, max_y = min(ys), max(ys)
    min_z, max_z = min(zs), max(zs)
    sx = max(max_x - min_x, 1e-6)
    sy = max(max_y - min_y, 1e-6)
    sz = max(max_z - min_z, 1e-6)

    planes = {
        "xy": (sx * sy, "x", "y", min_x, sx, min_y, sy),
        "xz": (sx * sz, "x", "z", min_x, sx, min_z, sz),
        "yz": (sy * sz, "y", "z", min_y, sy, min_z, sz),
    }
    # Billboard art is a side/three-quarter silhouette — always project on YZ
    # (looking along X), not the largest plane (often top-down XY for winged meshes).
    plane = "yz"
    _area, ax, ay, min_a, span_a, min_b, span_b = planes[plane]

    png_aspect = 1630.0 / 826.0
    mesh_aspect = span_a / span_b

    def comp(c, axis):
        if axis == "x":
            return c.x
        if axis == "y":
            return c.y
        return c.z

    for poly in mesh.polygons:
        for li in poly.loop_indices:
            vi = mesh.loops[li].vertex_index
            c = dragon.matrix_world @ mesh.vertices[vi].co
            u = (comp(c, ax) - min_a) / span_a
            v = (comp(c, ay) - min_b) / span_b
            # Letterbox into PNG aspect so art isn't stretched as badly
            if mesh_aspect > png_aspect:
                # mesh wider — shrink v and center
                scale = png_aspect / mesh_aspect
                v = v * scale + (1.0 - scale) * 0.5
            else:
                scale = mesh_aspect / png_aspect
                u = u * scale + (1.0 - scale) * 0.5
            uv_layer.data[li].uv = (u, v)

    print(f"UV_ORTHO plane={plane} aspect_mesh={mesh_aspect:.3f} png={png_aspect:.3f}")


def setup_preview_camera(dragon):
    """Camera for blend preview only (not used for broken NDC projection)."""
    scene = bpy.context.scene
    dims = dragon.dimensions
    max_dim = max(dims.x, dims.y, dims.z, 0.001)
    radius = max_dim * 1.55
    look = Vector((0.0, 0.0, dims.z * 0.02))
    loc = Vector((0.08 * radius, -radius, look.z + 0.08 * radius))
    bpy.ops.object.camera_add(location=loc)
    cam = bpy.context.active_object
    cam.name = "ProjectCam"
    scene.camera = cam
    cam.data.lens = 45
    cam.rotation_euler = (look - loc).to_track_quat("-Z", "Y").to_euler()
    scene.render.resolution_x = 1630
    scene.render.resolution_y = 826
    return cam


def make_filled_albedo(src_png: Path, dst_png: Path):
    """Replace near-black background with cool white so projection doesn't punch holes."""
    img = bpy.data.images.load(str(src_png))
    img.pixels  # force load
    w, h = img.size[0], img.size[1]
    px = list(img.pixels)  # RGBA flat
    skin = (0.90, 0.92, 0.97, 1.0)
    threshold = 0.08
    for i in range(0, len(px), 4):
        r, g, b, a = px[i], px[i + 1], px[i + 2], px[i + 3]
        if a < 0.15 or (r + g + b) / 3.0 < threshold:
            px[i], px[i + 1], px[i + 2], px[i + 3] = skin
    img.pixels = px
    img.filepath_raw = str(dst_png)
    img.file_format = "PNG"
    img.save()
    print(f"FILLED_ALBEDO={dst_png} {w}x{h}")
    return dst_png


def make_textured_material(albedo_path: Path):
    if not albedo_path.exists():
        raise SystemExit(f"missing albedo: {albedo_path}")

    img = bpy.data.images.load(str(albedo_path))
    img.colorspace_settings.name = "sRGB"

    mat = bpy.data.materials.new("DragonExactAlbedo")
    mat.use_nodes = True
    # Opaque — background already filled; avoid silhouette punch-through
    mat.blend_method = "OPAQUE"

    nt = mat.node_tree
    bsdf = nt.nodes.get("Principled BSDF")
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = img
    tex.extension = "EXTEND"
    tex.location = (-420, 200)

    set_input(bsdf, ["Roughness"], 0.45)
    set_input(bsdf, ["Metallic"], 0.05)
    set_input(bsdf, ["Specular IOR Level", "Specular"], 0.5)

    nt.links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])

    # Mild emission from texture so cyan eyes in the art glow
    if "Emission Color" in bsdf.inputs:
        nt.links.new(tex.outputs["Color"], bsdf.inputs["Emission Color"])
        set_input(bsdf, ["Emission Strength"], 0.45)
    elif "Emission" in bsdf.inputs:
        nt.links.new(tex.outputs["Color"], bsdf.inputs["Emission"])
        set_input(bsdf, ["Emission Strength"], 0.45)

    return mat


def assign_material(dragon, mat):
    dragon.data.materials.clear()
    dragon.data.materials.append(mat)


def add_idle_root(dragon):
    root = bpy.data.objects.new("DragonRoot", None)
    bpy.context.collection.objects.link(root)
    mw = dragon.matrix_world.copy()
    dragon.parent = root
    dragon.matrix_world = mw

    scene = bpy.context.scene
    scene.frame_start = 1
    scene.frame_end = 120
    for frame, dz, ry in (
        (1, 0.0, 0.0),
        (40, 0.03, 0.04),
        (80, -0.02, -0.03),
        (120, 0.0, 0.0),
    ):
        scene.frame_set(frame)
        root.location = (0.0, 0.0, dz)
        root.rotation_euler = (0.0, 0.0, ry)
        root.keyframe_insert(data_path="location", index=2)
        root.keyframe_insert(data_path="rotation_euler", index=2)
    return root


def main():
    clear_scene()
    dragon = import_body()
    normalize(dragon)
    densify(dragon)

    project_uvs_ortho(dragon)
    setup_preview_camera(dragon)

    filled = PNG.parent / "billboard_Image_0_filled.png"
    make_filled_albedo(PNG, filled)
    mat = make_textured_material(filled)
    assign_material(dragon, mat)
    add_idle_root(dragon)

    BLEND.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.save_as_mainfile(filepath=str(BLEND))

    OUT.parent.mkdir(parents=True, exist_ok=True)
    bpy.ops.export_scene.gltf(
        filepath=str(OUT),
        export_format="GLB",
        export_animations=True,
        export_lights=False,
        export_cameras=False,
        export_image_format="AUTO",
        export_materials="EXPORT",
    )
    print(f"EXPORTED={OUT} size={OUT.stat().st_size}")
    print(f"VERTS={len(dragon.data.vertices)} DIMS={list(dragon.dimensions)}")


if __name__ == "__main__":
    main()
