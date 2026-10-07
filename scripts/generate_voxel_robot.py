import bpy
import math
import os

# Reset blender scene to clean state
bpy.ops.wm.read_factory_settings(use_empty=True)

# Helper to create PBR material with authentic Voxel Cockpit Engineering Palette
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

# Voxel Palette from reference images:
# 1. Cream / Off-White Ceramic Armor Plating (#EDE8DF -> sRGB ~ 0.85, 0.83, 0.78)
mat_white_armor = create_material("Mat_WhiteArmor", base_color=(0.85, 0.83, 0.78, 1.0), metallic=0.15, roughness=0.35)

# 2. Industrial Vibrant Rocket Orange (#FF7A00 -> sRGB ~ 1.0, 0.40, 0.0)
mat_orange_armor = create_material("Mat_OrangeArmor", base_color=(1.0, 0.40, 0.02, 1.0), metallic=0.25, roughness=0.30)

# 3. Burnt Orange / Copper (#C65300 -> sRGB ~ 0.78, 0.28, 0.02)
mat_copper_accent = create_material("Mat_CopperAccent", base_color=(0.78, 0.28, 0.02, 1.0), metallic=0.45, roughness=0.32)

# 4. Dark Charcoal Metal Chassis (#202126 -> sRGB ~ 0.08, 0.085, 0.10)
mat_dark_chassis = create_material("Mat_DarkChassis", base_color=(0.08, 0.085, 0.10, 1.0), metallic=0.85, roughness=0.30)

# 5. Deep Black Hydraulic Joints (#111217 -> sRGB ~ 0.04, 0.04, 0.05)
mat_black_joint = create_material("Mat_BlackJoint", base_color=(0.04, 0.04, 0.05, 1.0), metallic=0.90, roughness=0.40)

# 6. Emissive Orange Plasma Reactor (#FF8A00)
mat_orange_glow = create_material("Mat_OrangeGlow", base_color=(1.0, 0.50, 0.05, 1.0), emission_color=(1.0, 0.48, 0.05, 1.0), emission_strength=6.0)

# 7. Amber Visor Sensor
mat_visor = create_material("Mat_Visor", base_color=(0.10, 0.12, 0.16, 1.0), metallic=0.95, roughness=0.08, emission_color=(1.0, 0.65, 0.10, 1.0), emission_strength=1.5)

def add_voxel_box(name, size, location, rotation=(0, 0, 0), mat=mat_white_armor, bevel_width=0.012):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (size[0], size[1], size[2])
    bpy.ops.object.transform_apply(scale=True, rotation=False)
    obj.data.materials.append(mat)
    
    # Sharp voxel bevel to match reference 3D block render
    if bevel_width > 0:
        bev = obj.modifiers.new(name="Bevel", type='BEVEL')
        bev.width = bevel_width
        bev.segments = 2
    
    for p in obj.data.polygons:
        p.use_smooth = False
    return obj

# =========================================================================
# VOXEL ENGINEERING ROBOT / PILOT (Inspired by Unit 07 Rocket Mech)
# Total height ~ 2.4 units, centered around (0, 0, 0)
# =========================================================================

# --- 1. TORSO & CORE REACTOR ---
# Central torso frame
add_voxel_box("Torso_Frame", (0.56, 0.38, 0.62), (0, 0, 0.10), mat=mat_dark_chassis)

# Heavy chest armor plate (White/cream)
add_voxel_box("Chest_Armor_Main", (0.58, 0.20, 0.44), (0, 0.14, 0.16), mat=mat_white_armor)

# Stepped collar armor
add_voxel_box("Chest_Collar", (0.42, 0.22, 0.14), (0, 0.12, 0.40), mat=mat_copper_accent)

# Central glowing orange arc reactor cube
add_voxel_box("Chest_Reactor", (0.16, 0.08, 0.16), (0, 0.22, 0.18), mat=mat_orange_glow, bevel_width=0.008)

# Lower abdominal mechanical slats
add_voxel_box("Ab_Plate_Dark", (0.44, 0.24, 0.20), (0, 0.10, -0.16), mat=mat_dark_chassis)
add_voxel_box("Ab_Stripe_Orange", (0.46, 0.06, 0.08), (0, 0.20, -0.14), mat=mat_orange_armor)

# Pelvis / hip chassis
add_voxel_box("Pelvis", (0.48, 0.34, 0.18), (0, 0, -0.28), mat=mat_black_joint)

# --- 2. HEAD & PILOT HELM ---
# Main helmet block
add_voxel_box("Head_Core", (0.40, 0.36, 0.36), (0, 0.04, 0.64), mat=mat_white_armor)

# Helmet brow plate
add_voxel_box("Head_Brow", (0.42, 0.16, 0.12), (0, 0.18, 0.74), mat=mat_orange_armor)

# Deep horizontal visor slot with amber sensor glow
add_voxel_box("Head_Visor", (0.34, 0.06, 0.10), (0, 0.20, 0.64), mat=mat_visor)

# Helmet top crest / antenna module
add_voxel_box("Head_Crest", (0.14, 0.28, 0.10), (0, 0.02, 0.85), mat=mat_copper_accent)
add_voxel_box("Head_Ear_L", (0.08, 0.16, 0.16), (-0.23, 0.04, 0.64), mat=mat_dark_chassis)
add_voxel_box("Head_Ear_R", (0.08, 0.16, 0.16), (0.23, 0.04, 0.64), mat=mat_dark_chassis)

# --- 3. MASSIVE SHOULDER BOOSTER PODS (Unit 07 Style) ---
# Left shoulder booster pod
add_voxel_box("Shoulder_Pod_L", (0.34, 0.44, 0.48), (-0.52, 0, 0.40), mat=mat_white_armor)
add_voxel_box("Shoulder_Top_L", (0.32, 0.40, 0.08), (-0.52, 0, 0.66), mat=mat_orange_armor)
add_voxel_box("Shoulder_Vent_L1", (0.06, 0.30, 0.06), (-0.68, 0, 0.46), mat=mat_dark_chassis)
add_voxel_box("Shoulder_Vent_L2", (0.06, 0.30, 0.06), (-0.68, 0, 0.36), mat=mat_dark_chassis)
add_voxel_box("Shoulder_Cap_L", (0.10, 0.10, 0.14), (-0.52, -0.22, 0.58), mat=mat_orange_glow)

# Right shoulder booster pod
add_voxel_box("Shoulder_Pod_R", (0.34, 0.44, 0.48), (0.52, 0, 0.40), mat=mat_white_armor)
add_voxel_box("Shoulder_Top_R", (0.32, 0.40, 0.08), (0.52, 0, 0.66), mat=mat_orange_armor)
add_voxel_box("Shoulder_Vent_R1", (0.06, 0.30, 0.06), (0.68, 0, 0.46), mat=mat_dark_chassis)
add_voxel_box("Shoulder_Vent_R2", (0.06, 0.30, 0.06), (0.68, 0, 0.36), mat=mat_dark_chassis)
add_voxel_box("Shoulder_Cap_R", (0.10, 0.10, 0.14), (0.52, -0.22, 0.58), mat=mat_orange_glow)

# --- 4. ARMS & VOXEL MANIPULATOR HANDS ---
# Left Arm (slight ready pose)
add_voxel_box("UpperArm_L", (0.18, 0.20, 0.30), (-0.48, 0.04, 0.04), mat=mat_black_joint)
add_voxel_box("Forearm_L", (0.24, 0.26, 0.36), (-0.50, 0.14, -0.22), mat=mat_white_armor)
add_voxel_box("Wrist_Cuff_L", (0.26, 0.28, 0.10), (-0.50, 0.14, -0.42), mat=mat_orange_armor)
# Left Manipulator Hand / Claw
add_voxel_box("Hand_Base_L", (0.20, 0.20, 0.12), (-0.50, 0.16, -0.52), mat=mat_dark_chassis)
add_voxel_box("Claw_Thumb_L", (0.08, 0.14, 0.16), (-0.42, 0.20, -0.62), mat=mat_black_joint)
add_voxel_box("Claw_Fingers_L", (0.14, 0.14, 0.16), (-0.56, 0.20, -0.62), mat=mat_black_joint)

# Right Arm (inspection / console control pose)
add_voxel_box("UpperArm_R", (0.18, 0.20, 0.30), (0.48, 0.04, 0.04), mat=mat_black_joint)
add_voxel_box("Forearm_R", (0.24, 0.26, 0.36), (0.50, 0.18, -0.20), mat=mat_white_armor)
add_voxel_box("Wrist_Cuff_R", (0.26, 0.28, 0.10), (0.50, 0.20, -0.38), mat=mat_orange_armor)
# Right Manipulator Hand / Tool
add_voxel_box("Hand_Base_R", (0.20, 0.20, 0.12), (0.50, 0.24, -0.48), mat=mat_dark_chassis)
add_voxel_box("Claw_Thumb_R", (0.08, 0.14, 0.16), (0.42, 0.28, -0.58), mat=mat_black_joint)
add_voxel_box("Claw_Fingers_R", (0.14, 0.14, 0.16), (0.56, 0.28, -0.58), mat=mat_black_joint)

# --- 5. LEGS & MASSIVE MAGNETIC BOOTS ---
# Left Leg
add_voxel_box("Hip_Joint_L", (0.16, 0.18, 0.18), (-0.22, 0, -0.42), mat=mat_black_joint)
add_voxel_box("Thigh_L", (0.22, 0.24, 0.34), (-0.24, 0.02, -0.64), mat=mat_white_armor)
# Knee booster pod (Orange block)
add_voxel_box("Knee_Cap_L", (0.24, 0.14, 0.20), (-0.24, 0.14, -0.66), mat=mat_orange_armor)
add_voxel_box("Shin_L", (0.24, 0.26, 0.34), (-0.24, -0.02, -0.92), mat=mat_dark_chassis)
# Foot / Magnetic Landing Boot
add_voxel_box("Boot_L", (0.28, 0.44, 0.16), (-0.24, 0.04, -1.14), mat=mat_dark_chassis)
add_voxel_box("Boot_Sole_L", (0.30, 0.46, 0.08), (-0.24, 0.04, -1.24), mat=mat_black_joint)
add_voxel_box("Boot_Toe_Orange_L", (0.26, 0.16, 0.12), (-0.24, 0.18, -1.14), mat=mat_copper_accent)

# Right Leg
add_voxel_box("Hip_Joint_R", (0.16, 0.18, 0.18), (0.22, 0, -0.42), mat=mat_black_joint)
add_voxel_box("Thigh_R", (0.22, 0.24, 0.34), (0.24, 0.02, -0.64), mat=mat_white_armor)
# Knee booster pod (Orange block)
add_voxel_box("Knee_Cap_R", (0.24, 0.14, 0.20), (0.24, 0.14, -0.66), mat=mat_orange_armor)
add_voxel_box("Shin_R", (0.24, 0.26, 0.34), (0.24, -0.02, -0.92), mat=mat_dark_chassis)
# Foot / Magnetic Landing Boot
add_voxel_box("Boot_R", (0.28, 0.44, 0.16), (0.24, 0.04, -1.14), mat=mat_dark_chassis)
add_voxel_box("Boot_Sole_R", (0.30, 0.46, 0.08), (0.24, 0.04, -1.24), mat=mat_black_joint)
add_voxel_box("Boot_Toe_Orange_R", (0.26, 0.16, 0.12), (0.24, 0.18, -1.14), mat=mat_copper_accent)

# --- 6. BACK JETPACK THRUSTERS & HAZARD ACCENTS ---
add_voxel_box("Backpack_Core", (0.46, 0.22, 0.54), (0, -0.22, 0.18), mat=mat_dark_chassis)
add_voxel_box("Backpack_OrangeStripe", (0.48, 0.06, 0.14), (0, -0.32, 0.26), mat=mat_orange_armor)

# Twin vertical thrusters
add_voxel_box("Thruster_Tube_L", (0.14, 0.14, 0.28), (-0.16, -0.26, -0.14), mat=mat_dark_chassis)
add_voxel_box("Thruster_Nozzle_L", (0.16, 0.16, 0.10), (-0.16, -0.26, -0.30), mat=mat_black_joint)
add_voxel_box("Thruster_Flame_L", (0.10, 0.10, 0.14), (-0.16, -0.26, -0.40), mat=mat_orange_glow)

add_voxel_box("Thruster_Tube_R", (0.14, 0.14, 0.28), (0.16, -0.26, -0.14), mat=mat_dark_chassis)
add_voxel_box("Thruster_Nozzle_R", (0.16, 0.16, 0.10), (0.16, -0.26, -0.30), mat=mat_black_joint)
add_voxel_box("Thruster_Flame_R", (0.10, 0.10, 0.14), (0.16, -0.26, -0.40), mat=mat_orange_glow)

# Top antenna rod
add_voxel_box("Antenna_Mast", (0.04, 0.04, 0.32), (0.18, -0.26, 0.54), mat=mat_black_joint)
add_voxel_box("Antenna_Tip", (0.08, 0.08, 0.08), (0.18, -0.26, 0.72), mat=mat_orange_glow)

# --- CENTER MODEL VERTICALLY ---
all_meshes = [obj for obj in bpy.data.objects if obj.type == 'MESH']
min_z = min(obj.location.z - obj.scale.z/2 for obj in all_meshes)
max_z = max(obj.location.z + obj.scale.z/2 for obj in all_meshes)
center_z = (min_z + max_z) / 2.0

for obj in all_meshes:
    obj.location.z -= center_z

print(f"Total voxel blocks assembled: {len(all_meshes)}")
print(f"Z span: {min_z - center_z:.2f} to {max_z - center_z:.2f}")

# Export to GLB
output_path = r"c:\Users\Mohideen A Kader\OneDrive\Desktop\Portfolio-2\public\models\voxel_robot.glb"
os.makedirs(os.path.dirname(output_path), exist_ok=True)

bpy.ops.export_scene.gltf(
    filepath=output_path,
    export_format='GLB',
    export_apply=True
)

print("SUCCESS: Voxel Engineering Pilot/Robot exported to:", output_path)
