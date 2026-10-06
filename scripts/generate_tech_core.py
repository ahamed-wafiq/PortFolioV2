import bpy
import bmesh
import math
import os

# Reset blender scene
bpy.ops.wm.read_factory_settings(use_empty=True)

# Helper to create PBR material
def create_material(name, base_color=(0.1, 0.1, 0.1, 1.0), metallic=0.9, roughness=0.2, emission_color=(0, 0, 0, 1), emission_strength=0.0, alpha=1.0):
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
    if "Alpha" in bsdf.inputs:
        bsdf.inputs["Alpha"].default_value = alpha

    if alpha < 1.0:
        mat.blend_method = 'BLEND'
    return mat

# Materials
mat_dark_titanium = create_material("Mat_DarkTitanium", base_color=(0.06, 0.07, 0.10, 1.0), metallic=0.95, roughness=0.18)
mat_amber_gold = create_material("Mat_AmberGold", base_color=(0.42, 0.24, 0.06, 1.0), metallic=0.92, roughness=0.15)
mat_plasma_core = create_material("Mat_PlasmaCore", base_color=(1.0, 0.35, 0.02, 1.0), metallic=0.1, roughness=0.1, emission_color=(1.0, 0.40, 0.05, 1.0), emission_strength=5.5)
mat_laser_orange = create_material("Mat_LaserOrange", base_color=(1.0, 0.55, 0.12, 1.0), metallic=0.0, roughness=0.1, emission_color=(1.0, 0.55, 0.12, 1.0), emission_strength=4.5)
mat_glass_shield = create_material("Mat_GlassShield", base_color=(0.04, 0.07, 0.12, 0.35), metallic=0.1, roughness=0.05, alpha=0.35)

# 1. Central Core - Glowing Geodesic Plasma Crystal
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=0.55, location=(0, 0, 0))
inner_core = bpy.context.active_object
inner_core.name = "InnerCore"
inner_core.data.materials.append(mat_plasma_core)

# 2. Inner Glowing Wireframe Cage
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=0.88, location=(0, 0, 0))
inner_wire = bpy.context.active_object
inner_wire.name = "InnerWireCage"
inner_wire.data.materials.append(mat_laser_orange)
wf_inner = inner_wire.modifiers.new(name="Wireframe", type='WIREFRAME')
wf_inner.thickness = 0.022
wf_inner.use_replace = True

# 3. Outer Geodesic Exoskeleton Cage (Heavy beveled titanium truss)
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=1.20, location=(0, 0, 0))
outer_cage = bpy.context.active_object
outer_cage.name = "OuterCage"
outer_cage.data.materials.append(mat_dark_titanium)

wf_mod = outer_cage.modifiers.new(name="Wireframe", type='WIREFRAME')
wf_mod.thickness = 0.055
wf_mod.use_boundary = True
wf_mod.use_replace = True

# 4. Translucent Hex Shield
bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=1.14, location=(0, 0, 0))
shield = bpy.context.active_object
shield.name = "EnergyShield"
shield.data.materials.append(mat_glass_shield)

# 5. Three High-Tech Gyroscope Gimbal Rings
def create_gimbal_ring(name, radius, tube_radius, mat, segments=80):
    bpy.ops.mesh.primitive_torus_add(
        major_radius=radius,
        minor_radius=tube_radius,
        major_segments=segments,
        minor_segments=16,
        location=(0, 0, 0)
    )
    ring = bpy.context.active_object
    ring.name = name
    ring.data.materials.append(mat)
    for poly in ring.data.polygons:
        poly.use_smooth = True
    return ring

ring_inner = create_gimbal_ring("GimbalRingInner", 1.58, 0.026, mat_laser_orange)
ring_mid = create_gimbal_ring("GimbalRingMid", 1.94, 0.022, mat_amber_gold)
ring_outer = create_gimbal_ring("GimbalRingOuter", 2.30, 0.020, mat_dark_titanium)

# 6. Six Orbital Satellites with emitters (aligned with 6 tech nodes)
for i in range(6):
    angle = (i / 6.0) * math.pi * 2.0
    rad = 1.62
    x = math.cos(angle) * rad
    y = math.sin(angle * 1.5) * 0.45
    z = math.sin(angle) * rad
    
    # Satellite body
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=0, radius=0.12, location=(x, y, z))
    sat = bpy.context.active_object
    sat.name = f"Satellite_{i}"
    sat.data.materials.append(mat_dark_titanium)
    
    # Glowing optical core
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=0.065, location=(x, y, z))
    sat_emitter = bpy.context.active_object
    sat_emitter.name = f"SatelliteEmitter_{i}"
    sat_emitter.data.materials.append(mat_laser_orange)

# Export scene to GLB
output_path = r"c:\Users\Mohideen A Kader\OneDrive\Desktop\Portfolio-2\public\models\tech-core.glb"
os.makedirs(os.path.dirname(output_path), exist_ok=True)

bpy.ops.export_scene.gltf(
    filepath=output_path,
    export_format='GLB',
    export_apply=True
)

print("SUCCESS: High-fidelity Tech Core model exported to", output_path)
