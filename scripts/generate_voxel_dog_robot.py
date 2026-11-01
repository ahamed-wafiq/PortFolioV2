import bpy
import math
import os

# Reset blender scene to factory clean state
bpy.ops.wm.read_factory_settings(use_empty=True)

# Helper to create PBR material with authentic Voxel / Mecha Palette
def create_material(name, base_color=(0.1, 0.1, 0.1, 1.0), metallic=0.0, roughness=0.5, emission_color=(0, 0, 0, 1), emission_strength=0.0):
    mat = bpy.data.materials.new(name=name)
    nodes = mat.node_tree.nodes
    bsdf = next((n for n in nodes if n.type == "BSDF_PRINCIPLED"), None)
    if not bsdf:
        bsdf = nodes.new(type="ShaderNodeBsdfPrincipled")
        output = next(n for n in nodes if n.type == "OUTPUT_MATERIAL")
        mat.node_tree.links.new(bsdf.outputs["BSDF"], output.inputs["Surface"])
    
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

# --- MATERIAL PALETTE (Matching Spacecraft / Rocket Portfolio Theme) ---
# 1. Primary White Titanium Armor (#EAECEE)
mat_white_armor = create_material("Mat_Dog_WhiteArmor", base_color=(0.84, 0.86, 0.88, 1.0), metallic=0.18, roughness=0.28)

# 2. Dark Carbon Chassis (#1E2127)
mat_dark_chassis = create_material("Mat_Dog_DarkChassis", base_color=(0.08, 0.09, 0.11, 1.0), metallic=0.80, roughness=0.30)

# 3. Chrome / Steel Hydraulic Joints (#7D8491)
mat_chrome = create_material("Mat_Dog_Chrome", base_color=(0.38, 0.40, 0.45, 1.0), metallic=0.92, roughness=0.18)

# 4. Rocket Flare Orange Accent (#FF6A00)
mat_orange_accent = create_material("Mat_Dog_OrangeAccent", base_color=(1.0, 0.38, 0.02, 1.0), metallic=0.25, roughness=0.30)

# 5. Cyber Neon Cyan Optic Glow (#00E5FF)
mat_cyan_glow = create_material("Mat_Dog_CyanGlow", base_color=(0.0, 0.90, 1.0, 1.0), emission_color=(0.0, 0.92, 1.0, 1.0), emission_strength=7.0)

# 6. Reactor Orange Collar Glow (#FF7700)
mat_orange_glow = create_material("Mat_Dog_OrangeGlow", base_color=(1.0, 0.45, 0.02, 1.0), emission_color=(1.0, 0.45, 0.02, 1.0), emission_strength=6.0)

# 7. Dark Sensor Glass (#0D0E12)
mat_sensor_glass = create_material("Mat_Dog_SensorGlass", base_color=(0.04, 0.05, 0.06, 1.0), metallic=0.95, roughness=0.08)

# 8. Gold Telemetry Accent (#FFB703)
mat_gold_accent = create_material("Mat_Dog_GoldAccent", base_color=(1.0, 0.72, 0.02, 1.0), metallic=0.65, roughness=0.25)


def add_box(name, size, location, rotation=(0, 0, 0), mat=mat_white_armor, bevel_width=0.008):
    """Adds a voxel box with exact world location and optional bevel."""
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (size[0], size[1], size[2])
    bpy.ops.object.transform_apply(scale=True, rotation=False)
    obj.data.materials.append(mat)
    
    if bevel_width > 0:
        bev = obj.modifiers.new(name="Bevel", type='BEVEL')
        bev.width = bevel_width
        bev.segments = 2
        
    for p in obj.data.polygons:
        p.use_smooth = False
        
    return obj

# =========================================================================
# MINECRAFT CYBER ROBOT DOG (K9-TITAN / ROBO-WOLF)
# X = Left(-) to Right(+), Y = Back(-) to Front(+), Z = Ground(0) to Up(+)
# =========================================================================

# --- 1. CHEST / MANE (Main Front Torso) ---
# Front Chest Armor block: 0.36 wide, 0.32 long (Y), 0.34 high (Z), centered at Z=0.50
add_box("Dog_Chest_Main", (0.36, 0.32, 0.34), (0, 0.12, 0.50), mat=mat_white_armor, bevel_width=0.010)

# Chest industrial flank plates (left & right)
add_box("Dog_Chest_Plate_L", (0.04, 0.28, 0.28), (-0.19, 0.12, 0.50), mat=mat_orange_accent)
add_box("Dog_Chest_Plate_R", (0.04, 0.28, 0.28), (0.19, 0.12, 0.50), mat=mat_orange_accent)

# Lower chest dark chassis keel
add_box("Dog_Chest_Keel", (0.30, 0.30, 0.06), (0, 0.12, 0.31), mat=mat_dark_chassis)

# Front chest radiator vent slats
add_box("Dog_Chest_Vent_1", (0.24, 0.03, 0.04), (0, 0.285, 0.57), mat=mat_dark_chassis)
add_box("Dog_Chest_Vent_2", (0.24, 0.03, 0.04), (0, 0.285, 0.49), mat=mat_dark_chassis)
add_box("Dog_Chest_Vent_3", (0.24, 0.03, 0.04), (0, 0.285, 0.41), mat=mat_dark_chassis)

# --- 2. REAR BODY / HINDQUARTERS ---
# Connected behind the chest: 0.28 wide, 0.42 long (Y), 0.26 high (Z)
add_box("Dog_Body_Hind", (0.28, 0.42, 0.26), (0, -0.22, 0.48), mat=mat_white_armor, bevel_width=0.010)

# Spine power conduit line
add_box("Dog_Spine_Conduit", (0.08, 0.40, 0.04), (0, -0.22, 0.62), mat=mat_dark_chassis)
add_box("Dog_Spine_CoreGlow", (0.04, 0.36, 0.02), (0, -0.22, 0.645), mat=mat_cyan_glow)

# Rear flank armor plates with hazard stripe feel
add_box("Dog_Hind_Flank_L", (0.03, 0.36, 0.20), (-0.15, -0.22, 0.48), mat=mat_dark_chassis)
add_box("Dog_Hind_Flank_R", (0.03, 0.36, 0.20), (0.15, -0.22, 0.48), mat=mat_dark_chassis)
add_box("Dog_Stripe_L", (0.035, 0.08, 0.18), (-0.15, -0.16, 0.48), mat=mat_orange_accent)
add_box("Dog_Stripe_R", (0.035, 0.08, 0.18), (0.15, -0.16, 0.48), mat=mat_orange_accent)

# --- 3. BACKPACK ROCKET THRUSTER POD (Spacecraft Tech) ---
add_box("Dog_Backpack_Mount", (0.22, 0.20, 0.08), (0, -0.06, 0.69), mat=mat_dark_chassis)
add_box("Dog_Battery_Cell", (0.16, 0.14, 0.05), (0, -0.06, 0.75), mat=mat_orange_accent)

# Twin micro rocket nozzles angled slightly back
add_box("Dog_Thruster_L", (0.07, 0.10, 0.07), (-0.08, -0.16, 0.69), rotation=(math.radians(15), 0, 0), mat=mat_chrome)
add_box("Dog_Thruster_R", (0.07, 0.10, 0.07), (0.08, -0.16, 0.69), rotation=(math.radians(15), 0, 0), mat=mat_chrome)

# Glowing thruster exhaust cores
add_box("Dog_Flame_L", (0.045, 0.06, 0.045), (-0.08, -0.21, 0.68), mat=mat_orange_glow, bevel_width=0.002)
add_box("Dog_Flame_R", (0.045, 0.06, 0.045), (0.08, -0.21, 0.68), mat=mat_orange_glow, bevel_width=0.002)

# --- 4. CYBER COLLAR & ARC-ENERGY CHARM ---
# Iconic Minecraft dog collar in glowing cyber tech
add_box("Dog_Collar", (0.34, 0.10, 0.34), (0, 0.32, 0.56), mat=mat_orange_accent, bevel_width=0.006)
add_box("Dog_Collar_Tag", (0.08, 0.04, 0.08), (0, 0.38, 0.52), mat=mat_gold_accent)
add_box("Dog_Collar_Gem", (0.04, 0.02, 0.05), (0, 0.405, 0.52), mat=mat_cyan_glow)

# --- 5. HEAD & SNOUT MODULE ---
# Head block: 0.32 wide, 0.32 long (Y), 0.32 high (Z), centered at (0, 0.48, 0.64)
# (Head bounds: X [-0.16, 0.16], Y [0.32, 0.64], Z [0.48, 0.80])
add_box("Dog_Head", (0.32, 0.32, 0.32), (0, 0.48, 0.64), mat=mat_white_armor, bevel_width=0.010)

# Helmet brow plate & forehead tech crest
add_box("Dog_Head_Crest", (0.16, 0.28, 0.03), (0, 0.48, 0.81), mat=mat_orange_accent)
add_box("Dog_Head_VisorPlate", (0.33, 0.08, 0.06), (0, 0.61, 0.73), mat=mat_dark_chassis)

# Optic Eyes: Dual glowing cyber sensors (Minecraft wolf eyes layout)
add_box("Dog_Eye_L", (0.07, 0.02, 0.07), (-0.10, 0.642, 0.67), mat=mat_cyan_glow, bevel_width=0.003)
add_box("Dog_Eye_R", (0.07, 0.02, 0.07), (0.10, 0.642, 0.67), mat=mat_cyan_glow, bevel_width=0.003)
# Eye pupil iris blocks
add_box("Dog_Pupil_L", (0.03, 0.025, 0.07), (-0.115, 0.644, 0.67), mat=mat_dark_chassis, bevel_width=0.001)
add_box("Dog_Pupil_R", (0.03, 0.025, 0.07), (0.085, 0.644, 0.67), mat=mat_dark_chassis, bevel_width=0.001)

# Snout / Muzzle: 0.18 wide, 0.18 long (Y), 0.14 high (Z)
add_box("Dog_Snout", (0.18, 0.18, 0.14), (0, 0.70, 0.57), mat=mat_white_armor, bevel_width=0.008)
# Snout top plate
add_box("Dog_Snout_Top", (0.16, 0.16, 0.02), (0, 0.70, 0.645), mat=mat_dark_chassis)
# Nose tip: iconic black cyber sensor block
add_box("Dog_Nose", (0.09, 0.04, 0.06), (0, 0.795, 0.60), mat=mat_dark_chassis, bevel_width=0.002)
# Lower jaw / cyber mouth
add_box("Dog_LowerJaw", (0.14, 0.14, 0.04), (0, 0.68, 0.49), mat=mat_dark_chassis)

# Ears: Upright on top corners of the head (Head top is Z=0.80)
# Left Ear
add_box("Dog_Ear_Base_L", (0.07, 0.07, 0.12), (-0.11, 0.45, 0.86), mat=mat_white_armor, bevel_width=0.006)
add_box("Dog_Ear_Inner_L", (0.04, 0.04, 0.09), (-0.11, 0.47, 0.86), mat=mat_dark_chassis)
add_box("Dog_Ear_Tip_L", (0.07, 0.07, 0.04), (-0.11, 0.45, 0.94), mat=mat_orange_accent)

# Right Ear
add_box("Dog_Ear_Base_R", (0.07, 0.07, 0.12), (0.11, 0.45, 0.86), mat=mat_white_armor, bevel_width=0.006)
add_box("Dog_Ear_Inner_R", (0.04, 0.04, 0.09), (0.11, 0.47, 0.86), mat=mat_dark_chassis)
add_box("Dog_Ear_Tip_R", (0.07, 0.07, 0.04), (0.11, 0.45, 0.94), mat=mat_orange_accent)

# Comms Sensor Antenna on Right Temple
add_box("Dog_Antenna_Mast", (0.015, 0.015, 0.14), (0.16, 0.42, 0.87), mat=mat_chrome)
add_box("Dog_Antenna_Beacon", (0.035, 0.035, 0.035), (0.16, 0.42, 0.95), mat=mat_cyan_glow, bevel_width=0.002)

# Side Audio Sensor Grills
add_box("Dog_Ear_Mic_L", (0.02, 0.08, 0.08), (-0.165, 0.48, 0.64), mat=mat_dark_chassis)
add_box("Dog_Ear_Mic_R", (0.02, 0.08, 0.08), (0.165, 0.48, 0.64), mat=mat_dark_chassis)

# --- 6. LEGS & MAGNETIC ROBO-PAWS ---
def create_cyber_leg(name_prefix, x_pos, y_pos):
    # Shoulder / Hip servo joint (Z: 0.34 to 0.42)
    add_box(f"{name_prefix}_Joint", (0.11, 0.11, 0.08), (x_pos, y_pos, 0.38), mat=mat_chrome, bevel_width=0.004)
    # Upper leg armor shaft (Z: 0.10 to 0.34)
    add_box(f"{name_prefix}_Leg", (0.10, 0.10, 0.24), (x_pos, y_pos, 0.22), mat=mat_white_armor, bevel_width=0.006)
    # Knee servo accent (orange band)
    add_box(f"{name_prefix}_Knee", (0.108, 0.108, 0.04), (x_pos, y_pos, 0.18), mat=mat_orange_accent, bevel_width=0.003)
    # Lower ankle / magnetic boot paw (Z: 0.02 to 0.10)
    add_box(f"{name_prefix}_Paw", (0.11, 0.15, 0.08), (x_pos, y_pos + 0.02, 0.06), mat=mat_dark_chassis, bevel_width=0.005)
    # Paw sole rubber grip base (Z: 0.0 to 0.02)
    add_box(f"{name_prefix}_Sole", (0.115, 0.155, 0.02), (x_pos, y_pos + 0.02, 0.01), mat=mat_dark_chassis, bevel_width=0.002)
    # Glowing toe status strip
    add_box(f"{name_prefix}_ToeGlow", (0.09, 0.03, 0.025), (x_pos, y_pos + 0.096, 0.035), mat=mat_cyan_glow, bevel_width=0.001)

create_cyber_leg("Dog_Leg_FL", -0.13, 0.16)
create_cyber_leg("Dog_Leg_FR",  0.13, 0.16)
create_cyber_leg("Dog_Leg_BL", -0.11, -0.32)
create_cyber_leg("Dog_Leg_BR",  0.11, -0.32)

# --- 7. ARTICULATED CYBER TAIL (Wagging Ready) ---
# Tail attached at top rear of hindquarters (Y = -0.44, Z = 0.56)
add_box("Dog_Tail_Joint", (0.06, 0.06, 0.06), (0, -0.44, 0.56), mat=mat_chrome, bevel_width=0.003)
add_box("Dog_Tail", (0.06, 0.06, 0.26), (0, -0.53, 0.66), rotation=(math.radians(-40), 0, 0), mat=mat_white_armor, bevel_width=0.005)
add_box("Dog_Tail_Accent", (0.065, 0.065, 0.08), (0, -0.61, 0.74), rotation=(math.radians(-40), 0, 0), mat=mat_orange_accent)
add_box("Dog_Tail_Beacon", (0.04, 0.04, 0.04), (0, -0.66, 0.80), rotation=(math.radians(-40), 0, 0), mat=mat_cyan_glow, bevel_width=0.002)


# --- 8. CENTER AND NORMALIZE SCENE ---
all_meshes = [obj for obj in bpy.data.objects if obj.type == 'MESH']
min_x = min(obj.location.x - obj.dimensions.x/2 for obj in all_meshes)
max_x = max(obj.location.x + obj.dimensions.x/2 for obj in all_meshes)
min_y = min(obj.location.y - obj.dimensions.y/2 for obj in all_meshes)
max_y = max(obj.location.y + obj.dimensions.y/2 for obj in all_meshes)
min_z = min(obj.location.z - obj.dimensions.z/2 for obj in all_meshes)
max_z = max(obj.location.z + obj.dimensions.z/2 for obj in all_meshes)

center_x = (min_x + max_x) / 2.0
center_y = (min_y + max_y) / 2.0
ground_z = min_z

print(f"Total voxel blocks assembled: {len(all_meshes)}")
print(f"Span X: {max_x - min_x:.2f}, Y: {max_y - min_y:.2f}, Z: {max_z - min_z:.2f}")

# Adjust positions so dog stands directly on ground Z=0 and is centered at X=0, Y=0
for obj in all_meshes:
    obj.location.x -= center_x
    obj.location.y -= center_y
    obj.location.z -= ground_z

# Export to GLB in public/models/
output_path = r"c:\Users\Mohideen A Kader\OneDrive\Desktop\Portfolio-2\public\models\minecraft_robot_dog.glb"
os.makedirs(os.path.dirname(output_path), exist_ok=True)

bpy.ops.export_scene.gltf(
    filepath=output_path,
    export_format='GLB',
    export_apply=True
)

print(f"SUCCESS: Minecraft Robot Dog GLB exported to: {output_path}")
