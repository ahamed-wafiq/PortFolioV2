import bpy
import math
import os

# Reset blender scene
bpy.ops.wm.read_factory_settings(use_empty=True)

# Helper to create PBR material
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

# Minecraft Astronaut Materials
mat_suit = create_material("Mat_Suit", base_color=(0.88, 0.90, 0.94, 1.0), metallic=0.10, roughness=0.45)
mat_suit_dark = create_material("Mat_SuitDark", base_color=(0.09, 0.11, 0.16, 1.0), metallic=0.80, roughness=0.30)
mat_gold_visor = create_material("Mat_GoldVisor", base_color=(1.0, 0.74, 0.14, 1.0), metallic=0.98, roughness=0.04)
mat_orange_trim = create_material("Mat_OrangeTrim", base_color=(1.0, 0.42, 0.05, 1.0), metallic=0.20, roughness=0.35)
mat_cyan_glow = create_material("Mat_CyanGlow", base_color=(0.0, 0.85, 1.0, 1.0), emission_color=(0.0, 0.85, 1.0, 1.0), emission_strength=4.5)
mat_orange_glow = create_material("Mat_OrangeGlow", base_color=(1.0, 0.45, 0.05, 1.0), emission_color=(1.0, 0.45, 0.05, 1.0), emission_strength=5.5)

def add_box(name, size, location, rotation=(0, 0, 0), mat=mat_suit):
    bpy.ops.mesh.primitive_cube_add(size=1.0, location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (size[0], size[1], size[2])
    obj.data.materials.append(mat)
    # Apply flat shading for authentic Minecraft blocky voxel aesthetic
    for p in obj.data.polygons:
        p.use_smooth = False
    return obj

# Minecraft Character Rig Proportions (scale factor ~ 1 unit = 1 Minecraft block / meter)
# Character centered vertically around z = 0.0

# 1. TORSO (width: 0.48, depth: 0.24, height: 0.68)
torso = add_box("Torso", (0.48, 0.24, 0.68), (0, 0, 0.08), mat=mat_suit)

# Torso belt / pelvic connector
belt = add_box("TorsoBelt", (0.50, 0.26, 0.10), (0, 0, -0.22), mat=mat_suit_dark)

# Torso shoulder epaulets (orange space strips)
shoulder_l = add_box("Shoulder_L", (0.12, 0.26, 0.08), (-0.20, 0, 0.38), mat=mat_orange_trim)
shoulder_r = add_box("Shoulder_R", (0.12, 0.26, 0.08), (0.20, 0, 0.38), mat=mat_orange_trim)

# Chest DCM (Display & Control Module) box
chest_pack = add_box("ChestPack", (0.32, 0.08, 0.24), (0, 0.15, 0.14), mat=mat_suit_dark)

# Chest Screen (glowing cyan voxel display)
chest_screen = add_box("ChestScreen", (0.20, 0.02, 0.12), (0, 0.20, 0.16), mat=mat_cyan_glow)

# Chest LED Indicators (voxel buttons)
chest_led1 = add_box("ChestLED1", (0.05, 0.02, 0.05), (-0.08, 0.20, 0.06), mat=mat_orange_glow)
chest_led2 = add_box("ChestLED2", (0.05, 0.02, 0.05), (0.08, 0.20, 0.06), mat=mat_orange_trim)

# 2. HEAD & MINECRAFT HELMET
# Inner Head (cube: 0.44 x 0.44 x 0.44)
head = add_box("Head", (0.44, 0.44, 0.44), (0, 0, 0.66), mat=mat_suit_dark)

# Outer Helmet Space Shell (slightly larger cube: 0.52 x 0.52 x 0.52)
helmet = add_box("Helmet", (0.52, 0.52, 0.52), (0, 0, 0.66), mat=mat_suit)

# Golden Visor Face (Minecraft front visor band, 0.46 wide, 0.22 high, protruding on +Y face)
visor = add_box("Visor", (0.46, 0.04, 0.22), (0, 0.265, 0.66), mat=mat_gold_visor)

# Helmet Side Lights (Minecraft voxel lanterns on ears)
ear_l = add_box("HelmetLamp_L", (0.06, 0.12, 0.12), (-0.28, 0.02, 0.66), mat=mat_suit_dark)
ear_lens_l = add_box("HelmetLens_L", (0.02, 0.08, 0.08), (-0.315, 0.02, 0.66), mat=mat_cyan_glow)

ear_r = add_box("HelmetLamp_R", (0.06, 0.12, 0.12), (0.28, 0.02, 0.66), mat=mat_suit_dark)
ear_lens_r = add_box("HelmetLens_R", (0.02, 0.08, 0.08), (0.315, 0.02, 0.66), mat=mat_cyan_glow)

# 3. JETPACK / PLSS BACKPACK (Minecraft blocky oxygen tank)
jetpack = add_box("Jetpack", (0.44, 0.20, 0.58), (0, -0.22, 0.12), mat=mat_suit_dark)

# Jetpack stripe
jetpack_stripe = add_box("JetpackStripe", (0.46, 0.02, 0.10), (0, -0.325, 0.18), mat=mat_orange_trim)

# Jetpack Voxel Antenna (thin blocky post with orange tip)
antenna = add_box("JetpackAntenna", (0.04, 0.04, 0.24), (0.16, -0.24, 0.52), mat=mat_suit_dark)
ant_tip = add_box("AntennaTip", (0.06, 0.06, 0.06), (0.16, -0.24, 0.66), mat=mat_orange_glow)

# Twin Voxel Thruster Nozzles at bottom of backpack
thruster_l = add_box("Thruster_L", (0.12, 0.12, 0.14), (-0.14, -0.22, -0.20), mat=mat_suit_dark)
thruster_r = add_box("Thruster_R", (0.12, 0.12, 0.14), (0.14, -0.22, -0.20), mat=mat_suit_dark)

# Thruster Plumes (glowing voxel exhaust flames)
plume_l = add_box("ThrusterPlume_L", (0.08, 0.08, 0.10), (-0.14, -0.22, -0.31), mat=mat_orange_glow)
plume_r = add_box("ThrusterPlume_R", (0.08, 0.08, 0.10), (0.14, -0.22, -0.31), mat=mat_orange_glow)

# 4. ARMS (Zero-g floating Minecraft pose)
# Left Arm (waving / floating upward at an angle: size 0.22 x 0.22 x 0.64)
# Rotated slightly outward & forward
arm_l = add_box("Arm_L", (0.22, 0.22, 0.64), (-0.38, 0.06, 0.08), rotation=(0.25, 0.35, -0.15), mat=mat_suit)
glove_l = add_box("Glove_L", (0.23, 0.23, 0.16), (-0.46, 0.14, -0.16), rotation=(0.25, 0.35, -0.15), mat=mat_suit_dark)

# Right Arm (raised greeting / cockpit inspection pose)
arm_r = add_box("Arm_R", (0.22, 0.22, 0.64), (0.38, 0.08, 0.12), rotation=(-0.35, -0.40, 0.20), mat=mat_suit)
glove_r = add_box("Glove_R", (0.23, 0.23, 0.16), (0.47, 0.18, -0.12), rotation=(-0.35, -0.40, 0.20), mat=mat_suit_dark)

# 5. LEGS (Zero-g floating Minecraft pose)
# Left Leg (size: 0.22 x 0.22 x 0.64) - slightly trailing back
leg_l = add_box("Leg_L", (0.22, 0.22, 0.64), (-0.13, -0.05, -0.58), rotation=(-0.20, 0.08, 0), mat=mat_suit)
boot_l = add_box("Boot_L", (0.24, 0.26, 0.18), (-0.14, -0.10, -0.82), rotation=(-0.20, 0.08, 0), mat=mat_suit_dark)

# Right Leg - slightly bent forward
leg_r = add_box("Leg_R", (0.22, 0.22, 0.64), (0.13, 0.05, -0.58), rotation=(0.22, -0.08, 0), mat=mat_suit)
boot_r = add_box("Boot_R", (0.24, 0.26, 0.18), (0.14, 0.10, -0.82), rotation=(0.22, -0.08, 0), mat=mat_suit_dark)

# 6. BLOCKY LIFE SUPPORT UMBILICAL CABLE (Segmented voxel pipe)
pipe_nodes = [
    ((-0.18, 0.14, 0.08), (0.06, 0.06, 0.12)),
    ((-0.24, 0.06, 0.02), (0.06, 0.14, 0.06)),
    ((-0.24, -0.14, 0.02), (0.06, 0.18, 0.06)),
    ((-0.20, -0.22, 0.06), (0.06, 0.06, 0.10)),
]
for idx, (loc, sz) in enumerate(pipe_nodes):
    add_box(f"UmbilicalPipe_{idx}", sz, loc, mat=mat_orange_trim)

# Center of bounds verification
min_z = min(obj.location.z - obj.scale.z/2 for obj in bpy.data.objects if obj.type == 'MESH')
max_z = max(obj.location.z + obj.scale.z/2 for obj in bpy.data.objects if obj.type == 'MESH')
center_z = (min_z + max_z) / 2.0
print(f"DEBUG: Z range: [{min_z:.2f}, {max_z:.2f}], Center Z: {center_z:.2f}")

# Adjust all objects so character is strictly centered at z = 0
for obj in bpy.data.objects:
    if obj.type == 'MESH':
        obj.location.z -= center_z

# Export to GLB
output_path = r"c:\Users\Mohideen A Kader\OneDrive\Desktop\Portfolio-2\public\models\astronaut.glb"
os.makedirs(os.path.dirname(output_path), exist_ok=True)

bpy.ops.export_scene.gltf(
    filepath=output_path,
    export_format='GLB',
    export_apply=True
)

print("SUCCESS: Minecraft-inspired Voxel Astronaut 3D model exported to", output_path)
