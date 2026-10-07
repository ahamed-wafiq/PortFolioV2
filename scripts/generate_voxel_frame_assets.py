import bpy
import math
import os

bpy.ops.wm.read_factory_settings(use_empty=True)

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

mat_charcoal = create_material("Mat_Charcoal", base_color=(0.08, 0.085, 0.10, 1.0), metallic=0.85, roughness=0.32)
mat_orange = create_material("Mat_Orange", base_color=(1.0, 0.42, 0.02, 1.0), metallic=0.20, roughness=0.35)
mat_copper = create_material("Mat_Copper", base_color=(0.78, 0.30, 0.04, 1.0), metallic=0.50, roughness=0.30)
mat_amber_glow = create_material("Mat_AmberGlow", base_color=(1.0, 0.55, 0.08, 1.0), emission_color=(1.0, 0.52, 0.08, 1.0), emission_strength=5.0)

def add_block(name, size, loc, mat=mat_charcoal, bevel_width=0.015):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=loc)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (size[0], size[1], size[2])
    bpy.ops.object.transform_apply(scale=True)
    obj.data.materials.append(mat)
    if bevel_width > 0:
        bev = obj.modifiers.new(name="Bevel", type='BEVEL')
        bev.width = bevel_width
        bev.segments = 2
    for p in obj.data.polygons:
        p.use_smooth = False
    return obj

# 1. Heavy Chunky Voxel Corner Bracket
# Horizontal wing
add_block("Corner_Wing_H", (0.80, 0.28, 0.20), (0.40, 0.14, 0), mat_charcoal)
# Vertical wing
add_block("Corner_Wing_V", (0.28, 0.80, 0.20), (0.14, 0.40, 0), mat_charcoal)
# Orange beveled corner armor cap
add_block("Corner_Cap_Orange", (0.34, 0.34, 0.26), (0.17, 0.17, 0.03), mat_orange)
# Stepped copper accent tooth
add_block("Corner_Tooth_Copper", (0.16, 0.16, 0.30), (0.08, 0.08, 0.05), mat_copper)
# Glowing sensor pip
add_block("Corner_Sensor_Glow", (0.10, 0.10, 0.10), (0.32, 0.32, 0.12), mat_amber_glow)

# Export corner module
out_dir = r"c:\Users\Mohideen A Kader\OneDrive\Desktop\Portfolio-2\public\models"
os.makedirs(out_dir, exist_ok=True)
corner_path = os.path.join(out_dir, "voxel_corner_bracket.glb")

bpy.ops.export_scene.gltf(filepath=corner_path, export_format='GLB', export_apply=True)
print("SUCCESS: Voxel Corner Bracket exported to:", corner_path)
