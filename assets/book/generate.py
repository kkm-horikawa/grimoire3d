"""Build from the repository root with blender -b -P assets/book/generate.py."""

import math
import subprocess
import tempfile
from pathlib import Path

import bpy
import numpy as np
from mathutils import Euler, Vector

OUT = Path(__file__).resolve().parent
bpy.ops.wm.read_factory_settings(use_empty=True)


def material(name, color, metallic=0):
    mat = bpy.data.materials.new(name)
    mat.diffuse_color = (*color, 1)
    shader = mat.node_tree.nodes.get("Principled BSDF")
    shader.inputs["Base Color"].default_value = (*color, 1)
    shader.inputs["Metallic"].default_value = metallic
    shader.inputs["Roughness"].default_value = 0.62
    return mat


leather = material("Oxblood leather", (0.095, 0.004, 0.009))
paper = material("Ivory vellum", (0.88, 0.74, 0.54))
edge = material("Cut edges", (0.76, 0.57, 0.40))
gold = material("Antique gold", (0.77, 0.41, 0.12), 0.65)
gold.node_tree.nodes.get("Principled BSDF").inputs["Roughness"].default_value = 0.35


def mesh(name, vertices, faces, mat):
    data = bpy.data.meshes.new(name)
    data.from_pydata(vertices, [], faces)
    data.materials.append(mat)
    obj = bpy.data.objects.new(name, data)
    bpy.context.collection.objects.link(obj)
    return obj


def box(name, center, dimensions, mat, bevel=0.015):
    bpy.ops.mesh.primitive_cube_add(size=1, location=center)
    obj = bpy.context.object
    obj.name = name
    obj.dimensions = dimensions
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    obj.data.materials.append(mat)
    for uv in list(obj.data.uv_layers):
        if mat == leather:
            # Project in physical units so the board and narrow spine share grain size.
            for polygon in obj.data.polygons:
                axis = max(range(3), key=lambda i: abs(polygon.normal[i]))
                axes = [i for i in range(3) if i != axis]
                for loop in polygon.loop_indices:
                    vertex = obj.data.vertices[obj.data.loops[loop].vertex_index].co
                    uv.data[loop].uv = tuple(0.53 * vertex[i] for i in axes)
        else:
            obj.data.uv_layers.remove(uv)
    if mat == gold and bevel <= 0.015:
        return obj
    mod = obj.modifiers.new("Rounded edges", "BEVEL")
    mod.width = bevel
    mod.segments = 1 if bevel < 0.02 else 2
    bpy.ops.object.modifier_apply(modifier=mod.name)
    mod = obj.modifiers.new("Face normals", "WEIGHTED_NORMAL")
    bpy.ops.object.modifier_apply(modifier=mod.name)
    return obj


def join_by_material():
    for mat in (leather, edge, gold):
        parts = [
            o
            for o in bpy.context.scene.objects
            if o.type == "MESH"
            and o.data.materials[0] == mat
            and o.name != "RightSignatures"
        ]
        if not parts:
            continue
        bpy.ops.object.select_all(action="DESELECT")
        for part in parts:
            part.select_set(True)
        bpy.context.view_layer.objects.active = parts[0]
        if len(parts) > 1:
            bpy.ops.object.join()
        parts[0].name = mat.name


def export(filename):
    join_by_material()
    bpy.ops.export_scene.gltf(
        filepath=str(OUT / filename),
        export_texcoords=True,
        export_tangents=False,
        export_animations=False,
        export_image_format="WEBP",
        export_image_quality=95,
    )


def sheet(side, t, v, depth):
    width = 3.12 + 0.21 * depth
    height = 1.916 + 0.053 * depth + 0.022 * math.sin(t * math.pi)
    lift = 0.22 * (1 - math.exp(-10 * t)) * math.exp(-2.1 * t)
    return (
        side * width * t,
        v * height + 0.010 - (0.053 + 0.027 * v) * math.exp(-8 * t),
        0.28 + lift - 0.19 * depth - 0.12 * math.exp(-10 * t),
    )


EXPLORE_CAMERA = Vector((4.39905, -5.77069, 15.68764))
EXPLORE_ROTATION = Euler((0.362898, 0.224717, 0.113631))
EXPLORE_LENS = 64.6977
REFERENCE_FOCAL_PX = 700 * EXPLORE_LENS / 36


def bezier(points, t):
    a, b, c, d = (Vector(p) for p in points)
    u = 1 - t
    return a * u**3 + 3 * b * u * u * t + 3 * c * u * t * t + d * t**3


def project(point):
    camera_space = EXPLORE_ROTATION.to_matrix().transposed() @ (
        Vector(point) - EXPLORE_CAMERA
    )
    x, y, z = camera_space
    return Vector((350 - REFERENCE_FOCAL_PX * x / z, 197 + REFERENCE_FOCAL_PX * y / z))


def fit_turn_silhouette(point, t, v):
    # Cubic edge guides digitized in the approved 700px-wide Explore view.
    # Preserve the physical hinge and the simulated lift while matching its contours.
    q = (v + 1) / 2
    near = bezier([(308, 324), (293, 321), (285, 310), (291, 298)], t)
    far = bezier([(356, 66), (385, 36), (468, 49), (526, 6)], t)
    guide = [(291, 298), (317.31, 249.51), (480.33, 265.45), (526, 6)]
    # Material rows follow the height of the page, not the parameter of the outline.
    target_y = 298 - 292 * q
    low, high = 0.0, 1.0
    for _ in range(14):
        mid = (low + high) / 2
        if bezier(guide, mid).y > target_y:
            low = mid
        else:
            high = mid
    outer = bezier(guide, (low + high) / 2)
    near_start, far_start = Vector((308, 324)), Vector((356, 66))
    near_end, far_end = Vector((291, 298)), Vector((526, 6))
    pixel = near.lerp(far, q) + t * (outer - near_end.lerp(far_end, q))
    # The foreground curl passes over the opposite page between the hinge and free edge.
    rise = min(1.0, max(0.0, (q + 0.01) / 0.19))
    fall = min(1.0, max(0.0, (q - 0.18) / 0.65))
    curl = rise**2 * (3 - 2 * rise) * (1 - fall**2 * (3 - 2 * fall))
    across_leaf = (4 * t) ** 2 * (4 * (1 - t) / 3) ** 6
    pixel.x -= 31 * curl * across_leaf
    hinge = project(sheet(1, 0, v, -0.008))
    pixel += (1 - t) ** 3 * (hinge - near_start.lerp(far_start, q))
    ray_local = Vector(
        ((pixel.x - 350) / REFERENCE_FOCAL_PX, (197 - pixel.y) / REFERENCE_FOCAL_PX, -1)
    )
    ray = EXPLORE_ROTATION.to_matrix() @ ray_local
    return EXPLORE_CAMERA + ray * ((point[2] - EXPLORE_CAMERA.z) / ray.z)


def page_turn(leaf, rows):
    # Integrating the tangent along the sheet keeps its width as the tip rises.
    leaf.shape_key_add(name="Basis")
    for progress in (0.25, 0.5, 0.75, 1.0):
        key = leaf.shape_key_add(name=f"Turn{round(100 * progress)}", from_mix=False)
        key.value = 0.0
        for v_index, v in enumerate(rows):
            x, z = 0, 0
            for i in range(41):
                t = i / 40
                if i:
                    midpoint = (i - 0.5) / 40
                    tilt = math.pi * progress + math.sin(math.pi * progress) * (
                        0.29
                        + (0.44 - 0.89 * (1 + v) / 2) * (1 - 2 * midpoint)
                        - 0.58 * v
                        - 0.45 * (1 - v * v)
                    )
                    x += 3.12 / 40 * math.cos(tilt)
                    z += 3.12 / 40 * math.sin(tilt)
                _, y, base = sheet(1, t, v, -0.008)
                point = (
                    x + (1 - t) * (0.155 * v - 0.04) * math.sin(math.pi * progress),
                    y
                    - (1 - t) * (0.15 * v + 0.05) * math.sin(math.pi * progress)
                    + (-0.655 + 0.256 * v) * t * math.sin(math.pi * progress),
                    base + z + 0.012 * progress,
                )
                key.data[len(rows) * i + v_index].co = (
                    fit_turn_silhouette(point, t, v) if progress == 0.25 else point
                )


def swatch(name, width, height):
    raw = subprocess.check_output(
        [
            "convert",
            str(OUT / "materials" / name),
            "-resize",
            f"{width}x{height}!",
            "-depth",
            "8",
            "rgb:-",
        ]
    )
    return np.frombuffer(raw, dtype=np.uint8).reshape(height, width, 3) / 255.0


def packed_image(name, rgb, data=False):
    h, w = rgb.shape[:2]
    img = bpy.data.images.new(name, width=w, height=h, alpha=False)
    if data:
        img.colorspace_settings.name = "Non-Color"
    pixels = np.ones((h, w, 4), dtype=np.float32)
    pixels[:, :, :3] = np.clip(rgb, 0.0, 1.0)
    img.pixels.foreach_set(pixels.ravel())
    img.pack()
    return img


def detail_normals(field, strength):
    dx = (np.roll(field, 1, axis=1) - np.roll(field, -1, axis=1)) * strength
    dy = (np.roll(field, 1, axis=0) - np.roll(field, -1, axis=0)) * strength
    vector = np.stack([dx, dy, np.ones_like(field)], axis=-1)
    return 0.5 + 0.5 * vector / np.linalg.norm(vector, axis=-1, keepdims=True)


def reflected_swatch(tile):
    # Mirrored boundaries preserve the direction and scale of the sampled fibers.
    strip = np.concatenate([tile, tile[:, ::-1]], axis=1)
    return np.concatenate([strip, strip[::-1]], axis=0)


def image_node(tree, image):
    node = tree.nodes.new("ShaderNodeTexImage")
    node.image = image
    return node


def connect_normal(tree, image, shader):
    texture = image_node(tree, image)
    bump = tree.nodes.new("ShaderNodeNormalMap")
    tree.links.new(texture.outputs["Color"], bump.inputs["Color"])
    tree.links.new(bump.outputs["Normal"], shader.inputs["Normal"])


def parchment():
    raw = swatch("paper.avif", 128, 240)
    sample = reflected_swatch(raw)
    grain = sample.mean(axis=2)
    fy, fx = np.meshgrid(
        np.fft.fftfreq(grain.shape[0]), np.fft.fftfreq(grain.shape[1]), indexing="ij"
    )
    low_pass = np.exp(-2 * math.pi**2 * 9**2 * (fx**2 + fy**2))
    grain -= np.fft.ifft2(np.fft.fft2(grain) * low_pass).real
    fibers = np.tile(grain, (1, 2))
    t = np.linspace(0, 1, 512)[None, :]
    gutter = np.exp(-t * 384 / 14)
    rim = 0.014 + 0.024 * t**3
    rgb = np.stack(
        [
            base + 1.3 * fibers - rim - shade * gutter
            for base, shade in [(0.923, 0.13), (0.853, 0.18), (0.774, 0.23)]
        ],
        axis=-1,
    )
    tree = paper.node_tree
    shader = tree.nodes.get("Principled BSDF")
    tree.links.new(
        image_node(tree, packed_image("Paper fibers", rgb)).outputs["Color"],
        shader.inputs["Base Color"],
    )
    shader.inputs["Roughness"].default_value = 0.87
    shader.inputs["Specular IOR Level"].default_value = 0.14
    # A matching gradient map gives the fibers relief when light grazes a lifted leaf.
    connect_normal(
        tree, packed_image("Fiber relief", detail_normals(fibers, 1.1), True), shader
    )


def leather_grain():
    raw = swatch("calfskin.avif", 224, 224)
    grain = raw[:, :, 0] * 0.7 + raw[:, :, 1] * 0.3
    grain -= np.median(grain)
    tree = leather.node_tree
    shader = tree.nodes.get("Principled BSDF")
    shader.inputs["Specular IOR Level"].default_value = 0.13
    value = np.clip(0.76 + 4.1 * grain, 0.37, 1.0)
    color = packed_image("Calfskin grain", np.repeat(value[:, :, None], 3, axis=2))
    connect_normal(
        tree,
        packed_image("Leather embossing", detail_normals(grain, 4.5), True),
        shader,
    )
    rough = np.clip(0.58 - 2.4 * grain, 0.34, 0.80)
    orm = np.stack([np.ones_like(rough), rough, np.zeros_like(rough)], axis=-1)
    rgb = tree.nodes.new("ShaderNodeSeparateColor")
    tree.links.new(
        image_node(tree, packed_image("Leather roughness", orm, True)).outputs["Color"],
        rgb.inputs["Color"],
    )
    tree.links.new(rgb.outputs["Green"], shader.inputs["Roughness"])
    dye = tree.nodes.new("ShaderNodeMix")
    dye.name = "Leather dye"
    dye.data_type = "RGBA"
    dye.blend_type = "MULTIPLY"
    dye.inputs[0].default_value = 1.0
    dye.inputs[6].default_value = (0.16, 0.005, 0.012, 1)
    tree.links.new(image_node(tree, color).outputs["Color"], dye.inputs[7])
    tree.links.new(dye.outputs[2], shader.inputs["Base Color"])


def spread():
    leather_grain()
    parchment()
    tint = edge.node_tree.nodes.new("ShaderNodeVertexColor")
    tint.layer_name = "Edge bands"
    shader = edge.node_tree.nodes.get("Principled BSDF")
    edge.node_tree.links.new(tint.outputs["Color"], shader.inputs["Base Color"])
    box("Boards", (0, 0, 0.03), (6.94, 4.01, 0.15), leather, 0.045)
    for y in (-1.946, 1.946):
        box("Blind tooling", (0, y, 0.107), (6.78, 0.009, 0.005), gold, 0.002)
    box("Rounded back", (0, 0, 0.035), (0.32, 4.04, 0.17), leather, 0.075)
    segments = 18
    for side in [-1, 1]:
        if side == 1:
            profile = (3.325, 0.023, 0.208, 0.125)
            spine("Leather roll", 0, 4.00, 0, leather, profile)
            for y in (-1.745, -0.52, 1.04, 1.88):
                spine(
                    "Raised ridge",
                    y,
                    0.14,
                    0.04,
                    leather,
                    profile,
                    taper=True,
                    lean=0.09,
                )
                for d in (-0.025, 0.025):
                    spine(
                        "Paired gold lines",
                        y + d,
                        0.011,
                        0.047,
                        gold,
                        profile,
                        lean=0.09,
                    )
        else:
            box(
                "Leather turn-in",
                (-3.393, 0, 0.070),
                (0.13, 4.00, 0.14),
                leather,
                0.055,
            )
        vertices, faces = [], []
        # Overlapping signatures terminate at staggered positions along the fore edge.
        for layer in range(12):
            inset = layer / 12
            first = len(vertices)
            for i in range(segments + 1):
                t = (i / segments) ** 1.22
                for depth, v in [
                    (inset, -1),
                    (inset, 1),
                    (inset + 0.075, 1),
                    (inset + 0.075, -1),
                ]:
                    vertices.append(sheet(side, t, v, depth))
            for i in range(segments):
                for j in (1, 3):
                    a = first + i * 4 + j
                    b = first + i * 4 + (j + 1) % 4
                    face = (a, a + 4, b + 4, b)
                    faces.append(face if side == 1 else face[::-1])
            # The layer above conceals the interior faces. Only its lip is visible.
            a = first + (segments - 1) * 4
            lip = (a, a + 4, a + 5, a + 1)
            faces.append(lip if side == 1 else lip[::-1])
            end = first + segments * 4
            face = (end, end + 3, end + 2, end + 1)
            faces.append(face if side == 1 else face[::-1])
        block = mesh(
            "RightSignatures" if side == 1 else "Signatures", vertices, faces, edge
        )
        for polygon in block.data.polygons:
            polygon.use_smooth = True
        tint = block.data.color_attributes.new(
            name="Edge bands", type="BYTE_COLOR", domain="POINT"
        )
        for index, item in enumerate(tint.data):
            layer = index // (4 * (segments + 1))
            value = (1.0, 0.79, 0.96, 0.86)[layer % 4] * (
                1.13 if index % 4 in (0, 1) else 0.81
            )
            item.color = (value * 0.79, value * 0.59, value * 0.40, 1)
        rows = [j / 8 - 1 for j in range(17)] if side == 1 else [-1, 1]
        points = [sheet(side, i / 40, v, -0.008) for i in range(41) for v in rows]
        stride = len(rows)
        faces = [
            (a, a + stride, a + stride + 1, a + 1)
            for i in range(40)
            for j in range(stride - 1)
            for a in [i * stride + j]
        ]
        leaf = mesh(
            "RightPage" if side == 1 else "LeftPage",
            points,
            faces if side == 1 else [f[::-1] for f in faces],
            paper,
        )
        uv = leaf.data.uv_layers.new()
        for loop in leaf.data.loops:
            x, y, _ = points[loop.vertex_index]
            uv.data[loop.index].uv = (0.001 + 0.998 * abs(x) / 3.12, y * 0.37)
        for poly in leaf.data.polygons:
            poly.use_smooth = True
        if side == 1:
            below = bpy.data.objects["LeftPage"].copy()
            below.scale.x = -1
            below.name = "UnderPage"
            below.location.z = 0
            leaf.location.z = 0.003
            bpy.context.collection.objects.link(below)
            page_turn(leaf, rows)
        for y in [-1.96, 1.96]:
            box(
                "Corner tooling",
                (side * 3.40, y, 0.107),
                (0.11, 0.013, 0.006),
                gold,
                0.002,
            )
            box(
                "Corner tooling",
                (side * 3.43, y * 0.98, 0.107),
                (0.012, 0.10, 0.006),
                gold,
                0.002,
            )
    export("open.glb")


def save_preview(scene, name):
    with tempfile.TemporaryDirectory() as directory:
        preview = Path(directory) / "preview.png"
        scene.render.filepath = str(preview)
        bpy.ops.render.render(write_still=True)
        subprocess.run(
            ["convert", str(preview), "-quality", "84", str(OUT / (name + ".avif"))],
            check=True,
        )


def render():
    scene = bpy.context.scene
    ground = material("Wine backdrop", (0.010, 0.0015, 0.004))
    ground.node_tree.nodes.get("Principled BSDF").inputs[
        "Specular IOR Level"
    ].default_value = 0.04
    box("Studio floor", (0, 0, -0.16), (200, 200, 0.10), ground)
    scene.world = bpy.data.worlds.new("Studio")
    scene.world.color = (0.61, 0.61, 0.61)
    bpy.ops.object.light_add(type="AREA", location=(0, 1, 10))
    light = bpy.context.object
    light.data.energy = 1350
    light.data.shape = "DISK"
    light.data.size = 9
    light.rotation_euler = (-light.location).to_track_quat("-Z", "Y").to_euler()
    bpy.ops.object.camera_add(location=(0, -3.78985, 24.21046))
    cam = bpy.context.object
    cam.rotation_euler = (0.149987, 0, 0)
    cam.data.lens = 88.6082
    scene.camera = cam
    scene.render.engine = "CYCLES"
    scene.cycles.samples = 6
    scene.cycles.use_denoising = True
    scene.render.resolution_x, scene.render.resolution_y = 1050, 591
    scene.render.resolution_percentage = 100
    scene.view_settings.view_transform = "Standard"
    save_preview(scene, "read-render")
    leaf = bpy.data.objects["RightPage"]
    leaf.data.shape_keys.key_blocks["Turn25"].value = 1
    right_block = bpy.data.objects["RightSignatures"]
    right_block.scale.x = 0.945
    for sample in right_block.data.color_attributes["Edge bands"].data:
        r, g, b, _ = sample.color
        sample.color = (r * 0.76, g * 0.63, b * 0.54, 1)
    bpy.data.objects["UnderPage"].scale.x = -0.934
    cam.location = EXPLORE_CAMERA
    cam.data.lens = EXPLORE_LENS
    cam.rotation_euler = EXPLORE_ROTATION
    bpy.ops.object.light_add(type="AREA", location=(4, -4, 6))
    fill = bpy.context.object
    light.data.energy = 920
    fill.data.energy = 320
    fill.data.size = 6
    fill.rotation_euler = (-fill.location).to_track_quat("-Z", "Y").to_euler()
    save_preview(scene, "explore-render")


def corner_tooling(x, y, sx, sy):
    verts = []
    faces = []
    # Thin paired arcs mark the corners of the leather stamp.
    for radius in (0.135, 0.181):
        first = len(verts)
        for i in range(11):
            angle = 0.5 * math.pi * i / 10
            for r in (radius, radius + 0.009):
                verts.append(
                    (x + sx * r * math.cos(angle), y + sy * r * math.sin(angle), 0.755)
                )
            if i:
                a = first + i * 2
                faces.append((a - 2, a - 1, a + 1, a))
    for a, b in [((0.04, 0), (0.04, 0.045)), ((0.04, 0.045), (0.08, 0.045))]:
        first = len(verts)
        for u, v in (a, b):
            for offset in (-0.004, 0.004):
                verts.append((x + sx * (u + offset), y + sy * (v - offset), 0.755))
        faces.append((first, first + 1, first + 3, first + 2))
    mesh("Corner stamp", verts, faces, gold)


def spine(
    name,
    y,
    length,
    raise_by,
    mat,
    profile=(-1.41, 0.355, 0.275, 0.455),
    taper=False,
    lean=0,
):
    cx, cz, rx, rz = profile
    rings = 28
    # Rounded shoulders merge a raised leather rib into the full-length roll.
    sections = (
        ((-0.5, 0), (-0.34, 0.72), (-0.24, 1), (0.24, 1), (0.34, 0.72), (0.5, 0))
        if taper
        else ((-0.5, 1), (0.5, 1))
    )
    stride = len(sections)
    vertices, faces = [], []
    for i in range(rings):
        angle = 2 * math.pi * i / rings
        for offset, height in sections:
            lift = raise_by * height
            x = cx + (rx + lift) * math.cos(angle)
            z = cz + (rz + lift) * math.sin(angle)
            vertices.append(
                (x, y + offset * length - lean * (math.cos(angle) - 0.45), z)
            )
    for i in range(rings):
        a = i * stride
        b = ((i + 1) % rings) * stride
        for j in range(stride - 1):
            faces.append((a + j, a + j + 1, b + j + 1, b + j))
    faces.extend(
        [
            tuple(range(0, rings * stride, stride)),
            tuple(range(rings * stride - 1, 0, -stride)),
        ]
    )
    obj = mesh(name, vertices, faces, mat)
    for poly in list(obj.data.polygons)[:-2]:
        poly.use_smooth = True
    if mat == leather:
        uv = obj.data.uv_layers.new()
        for loop in obj.data.loops:
            i = loop.vertex_index
            uv.data[loop.index].uv = (i // stride / rings * 1.2, vertices[i][1] * 0.65)
    return obj


def closed():
    bpy.ops.object.select_all(action="SELECT")
    bpy.ops.object.delete()
    box("Back board", (0, 0, 0), (3.0, 4.12, 0.11), leather, 0.045)
    cut = box("Page block", (0.015, 0, 0.35), (2.91, 4.01, 0.61), edge, 0.028)
    cut_color = cut.data.color_attributes.new(
        name="Edge bands", type="BYTE_COLOR", domain="POINT"
    )
    for item in cut_color.data:
        item.color = (0.79, 0.61, 0.37, 1)
    vertices, faces = [], []
    for i in range(15):
        z = 0.085 + i * 0.038
        a = len(vertices)
        for y in (-1.997, 1.997):
            vertices.extend([(1.471, y, z), (1.471, y, z + 0.013)])
        faces.append((a, a + 2, a + 3, a + 1))
    seams = mesh("Fore-edge leaves", vertices, faces, edge)
    tint = seams.data.color_attributes.new(
        name="Edge bands", type="BYTE_COLOR", domain="POINT"
    )
    for item in tint.data:
        item.color = (0.47, 0.33, 0.19, 1)
    box("Front board", (0, 0, 0.69), (3.0, 4.12, 0.11), leather, 0.045)
    spine("Rounded leather spine", 0, 4.15, 0, leather)
    for y in (-1.86, -0.91, 0.91, 1.86):
        spine("Raised band", y, 0.085, 0.014, leather)
        for d in (-0.028, 0.028):
            spine("Gilded ridge", y + d, 0.012, 0.023, gold)
    for margin in (0.09, 0.13):
        for sign in (-1, 1):
            box(
                "Frame",
                (sign * (1.35 - margin), 0, 0.750),
                (0.013, 3.88 - 2 * margin, 0.007),
                gold,
                0.002,
            )
            box(
                "Frame",
                (0, sign * (1.94 - margin), 0.750),
                (2.70 - 2 * margin, 0.013, 0.007),
                gold,
                0.002,
            )
    for sx in (-1, 1):
        for sy in (-1, 1):
            corner_tooling(sx * 1.24, sy * 1.84, -sx, -sy)
    bpy.ops.object.select_all(action="SELECT")
    bpy.context.scene.tool_settings.transform_pivot_point = "CURSOR"
    bpy.ops.transform.resize(value=(1, 1, 1.18))
    export("closed.glb")
    scene = bpy.context.scene
    bpy.ops.object.camera_add(location=(4.20, -0.52, 10.5))
    cam = bpy.context.object
    cam.rotation_euler = (0.055, 0.382, -0.026)
    cam.data.lens = 76
    scene.camera = cam
    scene.render.resolution_x, scene.render.resolution_y = 590, 756
    bpy.ops.object.light_add(type="AREA", location=(-3, 3.5, 5))
    bpy.context.object.data.energy = 360
    bpy.context.object.data.color = (1, 0.80, 0.62)
    bpy.context.object.data.size = 2.0
    bpy.context.object.rotation_euler = (
        (-bpy.context.object.location).to_track_quat("-Z", "Y").to_euler()
    )
    scene.render.film_transparent = True
    scene.world.color = (0.034, 0.017, 0.016)
    bpy.ops.object.light_add(type="AREA", location=(4.5, 0.5, 0.8))
    edge_light = bpy.context.object
    edge_light.data.energy = 168
    edge_light.data.color = (1, 0.79, 0.55)
    edge_light.data.shape = "RECTANGLE"
    edge_light.data.size = 0.8
    edge_light.data.size_y = 4.0
    edge_light.rotation_euler = (
        (Vector((1.47, 0, 0.37)) - edge_light.location)
        .to_track_quat("-Z", "Y")
        .to_euler()
    )
    bpy.ops.object.light_add(type="AREA", location=(3.5, 2, 3))
    rim = bpy.context.object
    rim.data.energy = 80
    rim.data.color = (1, 0.78, 0.52)
    rim.data.size = 2
    rim.rotation_euler = (-rim.location).to_track_quat("-Z", "Y").to_euler()
    bpy.ops.object.light_add(type="AREA", location=(-2, 3.7, 0.7))
    emboss = bpy.context.object
    emboss.data.energy = 220
    emboss.data.color = (1, 0.58, 0.31)
    emboss.data.shape = "RECTANGLE"
    emboss.data.size = 3
    emboss.data.size_y = 0.7
    emboss.rotation_euler = (-emboss.location).to_track_quat("-Z", "Y").to_euler()
    dye = leather.node_tree.nodes["Leather dye"]
    for name, color in [
        ("closed-render", (0.093, 0.0006, 0.0035)),
        ("closed-evergreen", (0.020, 0.042, 0.016)),
        ("closed-indigo", (0.017, 0.020, 0.052)),
    ]:
        dye.inputs[6].default_value = (*color, 1)
        save_preview(scene, name)


spread()
render()
closed()
