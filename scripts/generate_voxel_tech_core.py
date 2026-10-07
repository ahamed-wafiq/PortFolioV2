import bpy
import math
import os

# Reset blender scene to clean state
bpy.ops.wm.read_factory_settings(use_empty=True)

# Helper to create PBR materials
def create_material(name, base_color=(0.1, 0.1, 0.1, 1.0), metallic=0.0, roughness=0.5, emission_color=(0, 0, 0, 1), emission_strength=0.0):
    mat = bpy.data.materials.new(name=name)
    nodes = mat.node_tree.nodes
    bsdf = next(n for n in nodes if n.type == "BSDF_PRINCIPLED")
    
    if "Base Color" in bsdf.inputs:
        bsdf.inputs["Base Color"].default_value = base_color
    if "Metallic" in bsdf.inputs:
        bsdf.inputs["Metallic"].default_value = metallic
    if "Roughness" in bsdf.inputs:
        bsdf.inputs["Roughness"].default_value = roughness
    if "Emission Color" in bsdf.inputs:
        bsdf.inputs["Emission Color"].default_value = emission_color
    if "Emission Strength" in bsdf.inputs:
        bsdf.inputs["Emission Strength"].default_value = emission_strength
    return mat

mat_dark_titanium = create_material("Mat_DarkTitanium", base_color=(0.07, 0.08, 0.10, 1.0), metallic=0.92, roughness=0.25)
mat_amber_copper = create_material("Mat_AmberCopper", base_color=(0.82, 0.38, 0.05, 1.0), metallic=0.65, roughness=0.22)
mat_plasma_core = create_material("Mat_PlasmaCore", base_color=(1.0, 0.42, 0.02, 1.0), emission_color=(1.0, 0.48, 0.04, 1.0), emission_strength=6.5)
mat_laser_orange = create_material("Mat_LaserOrange", base_color=(1.0, 0.55, 0.08, 1.0), emission_color=(1.0, 0.52, 0.08, 1.0), emission_strength=4.5)
mat_satellite_body = create_material("Mat_SatelliteBody", base_color=(0.12, 0.13, 0.16, 1.0), metallic=0.88, roughness=0.28)

def make_voxel_cube(name, size, location, rotation=(0, 0, 0), mat=mat_dark_titanium):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (size[0], size[1], size[2])
    bpy.ops.object.transform_apply(scale=True, rotation=False)
    obj.data.materials.append(mat)
    for p in obj.data.polygons:
        p.use_smooth = False
    return obj

# 1. CENTRAL MECHANICAL CUBE REACTOR (InnerCore)
# Central glowing power block
inner_core = make_voxel_cube("InnerCore", (0.75, 0.75, 0.75), (0, 0, 0), mat=mat_plasma_core)

# 2. INNER WIRE CAGE / VOXEL EXOSKELETON (InnerWireCage)
# 12 edge struts forming a chunky voxel cube frame around InnerCore
edge_coords = [
    # Top 4 edges
    ((0, 0.58, 0.58), (1.20, 0.10, 0.10)),
    ((0, -0.58, 0.58), (1.20, 0.10, 0.10)),
    ((0.58, 0, 0.58), (0.10, 1.20, 0.10)),
    ((-0.58, 0, 0.58), (0.10, 1.20, 0.10)),
    # Bottom 4 edges
    ((0, 0.58, -0.58), (1.20, 0.10, 0.10)),
    ((0, -0.58, -0.58), (1.20, 0.10, 0.10)),
    ((0.58, 0, -0.58), (0.10, 1.20, 0.10)),
    ((-0.58, 0, -0.58), (0.10, 1.20, 0.10)),
    # 4 Vertical pillars
    ((0.58, 0.58, 0), (0.10, 0.10, 1.20)),
    ((-0.58, 0.58, 0), (0.10, 0.10, 1.20)),
    ((0.58, -0.58, 0), (0.10, 0.10, 1.20)),
    ((-0.58, -0.58, 0), (0.10, 0.10, 1.20)),
]

strut_objs = []
for idx, (loc, sz) in enumerate(edge_coords):
    strut_objs.append(make_voxel_cube(f"Strut_{idx}", sz, loc, mat=mat_laser_orange))

# Join all struts into single object "InnerWireCage"
bpy.ops.object.select_all(action='DESELECT')
for s in strut_objs:
    s.select_set(True)
bpy.context.view_layer.objects.active = strut_objs[0]
bpy.ops.object.join()
inner_wire = bpy.context.active_object
inner_wire.name = "InnerWireCage"

# 3. OUTER CHUNKY VOXEL CAGE (OuterCage)
# 8 chunky corner blocks with copper lugs
corner_objs = []
for cx in [-0.85, 0.85]:
    for cy in [-0.85, 0.85]:
        for cz in [-0.85, 0.85]:
            corner_objs.append(make_voxel_cube(f"Corner_{len(corner_objs)}", (0.32, 0.32, 0.32), (cx, cy, cz), mat=mat_dark_titanium))

bpy.ops.object.select_all(action='DESELECT')
for c in corner_objs:
    c.select_set(True)
bpy.context.view_layer.objects.active = corner_objs[0]
bpy.ops.object.join()
outer_cage = bpy.context.active_object
outer_cage.name = "OuterCage"

# 4. THREE CONCENTRIC ROTATING BLOCK RINGS
# Inner Ring: 16 discrete voxel cubes orbiting at radius 1.55
def create_voxel_ring(name, num_blocks, radius, block_size, mat):
    ring_blocks = []
    for i in range(num_blocks):
        angle = (i / num_blocks) * math.pi * 2.0
        x = math.cos(angle) * radius
        y = math.sin(angle) * radius
        z = 0.0
        rot = (0, 0, angle)
        b = make_voxel_cube(f"{name}_block_{i}", block_size, (x, y, z), rotation=rot, mat=mat)
        ring_blocks.append(b)
    
    bpy.ops.object.select_all(action='DESELECT')
    for b in ring_blocks:
        b.select_set(True)
    bpy.context.view_layer.objects.active = ring_blocks[0]
    bpy.ops.object.join()
    ring_obj = bpy.context.active_object
    ring_obj.name = name
    return ring_obj

ring_inner = create_voxel_ring("GimbalRingInner", 16, 1.55, (0.16, 0.22, 0.12), mat_laser_orange)
ring_mid   = create_voxel_ring("GimbalRingMid",   20, 1.95, (0.18, 0.26, 0.14), mat_amber_copper)
ring_outer = create_voxel_ring("GimbalRingOuter", 24, 2.35, (0.20, 0.30, 0.16), mat_dark_titanium)

# 5. SIX SATELLITE EMITTERS (Aligned with tech nodes)
for i in range(6):
    angle = (i / 6.0) * math.pi * 2.0
    rad = 1.68
    x = math.cos(angle) * rad
    y = math.sin(angle * 1.5) * 0.40
    z = math.sin(angle) * rad
    
    sat = make_voxel_cube(f"SatelliteEmitter_{i}", (0.24, 0.24, 0.24), (x, y, z), mat=mat_satellite_body)

# Export to GLB
output_path = r"c:\Users\Mohideen A Kader\OneDrive\Desktop\Portfolio-2\public\models\tech-core.glb"
os.makedirs(os.path.dirname(output_path), exist_ok=True)

bpy.ops.export_scene.gltf(
    filepath=output_path,
    export_format='GLB',
    export_apply=True
)

print("SUCCESS: Voxel Technology Core exported to:", output_path)
