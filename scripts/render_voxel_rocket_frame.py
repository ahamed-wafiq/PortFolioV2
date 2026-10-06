import bpy
import math
import os

bpy.ops.wm.read_factory_settings(use_empty=True)

scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.device = 'CPU'
scene.cycles.samples = 32
scene.render.resolution_x = 1000
scene.render.resolution_y = 1000
scene.render.film_transparent = True

# Materials matching the Voxel Space Rocket Reference:
# 1. Industrial Vibrant Rocket Orange
mat_orange = bpy.data.materials.new(name="Mat_RocketOrange")
mat_orange.use_nodes = True
p_orange = next(n for n in mat_orange.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
p_orange.inputs['Base Color'].default_value = (0.92, 0.35, 0.05, 1.0)
p_orange.inputs['Roughness'].default_value = 0.35
p_orange.inputs['Metallic'].default_value = 0.2

# 2. Heavy White / Ceramic Booster Plating
mat_white = bpy.data.materials.new(name="Mat_BoosterWhite")
mat_white.use_nodes = True
p_white = next(n for n in mat_white.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
p_white.inputs['Base Color'].default_value = (0.94, 0.94, 0.96, 1.0)
p_white.inputs['Roughness'].default_value = 0.28
p_white.inputs['Metallic'].default_value = 0.1

# 3. Dark Slate / Hydraulic Carbon Chassis
mat_slate = bpy.data.materials.new(name="Mat_DarkSlate")
mat_slate.use_nodes = True
p_slate = next(n for n in mat_slate.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
p_slate.inputs['Base Color'].default_value = (0.08, 0.10, 0.14, 1.0)
p_slate.inputs['Roughness'].default_value = 0.4
p_slate.inputs['Metallic'].default_value = 0.6

# 4. Glowing Amber Sensor / Exhaust Glow
mat_glow = bpy.data.materials.new(name="Mat_AmberGlow")
mat_glow.use_nodes = True
p_glow = next(n for n in mat_glow.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
p_glow.inputs['Base Color'].default_value = (1.0, 0.6, 0.1, 1.0)
p_glow.inputs['Emission Color'].default_value = (1.0, 0.55, 0.1, 1.0)
p_glow.inputs['Emission Strength'].default_value = 6.0

# 5. Hazard Black
mat_black = bpy.data.materials.new(name="Mat_HazardBlack")
mat_black.use_nodes = True
p_black = next(n for n in mat_black.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
p_black.inputs['Base Color'].default_value = (0.04, 0.04, 0.05, 1.0)
p_black.inputs['Roughness'].default_value = 0.5

W = 4.0   # half width
H = 4.2   # half height
D = 0.3   # depth
T = 0.55  # thick chunky border

def add_voxel_block(name, loc, size, mat):
    bpy.ops.mesh.primitive_cube_add(location=loc)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (size[0]/2, size[1]/2, size[2]/2)
    bpy.ops.object.transform_apply(scale=True)
    obj.data.materials.append(mat)
    # Bevel modifier for sharp chunky voxel bevels
    bev = obj.modifiers.new(name="Bevel", type='BEVEL')
    bev.width = 0.02
    bev.segments = 2
    return obj

# 1. Heavy Outer Slate Chassis Rim
add_voxel_block("Chassis_Top", (0, H - T/2, -0.05), (W*2 + 0.6, T, D), mat_slate)
add_voxel_block("Chassis_Bottom", (0, -H + T/2, -0.05), (W*2 + 0.6, T, D), mat_slate)
add_voxel_block("Chassis_Left", (-W + T/2, 0, -0.05), (T, H*2 - T*2, D), mat_slate)
add_voxel_block("Chassis_Right", (W - T/2, 0, -0.05), (T, H*2 - T*2, D), mat_slate)

# 2. Chunky Industrial Orange Rail Trim (Layer 2)
rail_t = 0.28
add_voxel_block("Orange_Top", (0, H - T*0.4, 0.08), (W*1.9, rail_t, D*0.8), mat_orange)
add_voxel_block("Orange_Bottom", (0, -H + T*0.4, 0.08), (W*1.9, rail_t, D*0.8), mat_orange)
add_voxel_block("Orange_Left", (-W + T*0.4, 0, 0.08), (rail_t, H*1.8, D*0.8), mat_orange)
add_voxel_block("Orange_Right", (W - T*0.4, 0, 0.08), (rail_t, H*1.8, D*0.8), mat_orange)

# 3. Massive Chunky Corner Rocket Booster Pods
# Like the 4 rocket booster thrusters in the reference image!
corner_coords = [
    ("TL", -W, H, 1, -1),
    ("TR", W, H, -1, -1),
    ("BL", -W, -H, 1, 1),
    ("BR", W, -H, -1, 1),
]

for name, cx, cy, sx, sy in corner_coords:
    # Outer Chunky White Rocket Column
    add_voxel_block(f"Booster_Col_{name}", (cx + sx*0.35, cy + sy*0.35, 0.15), (0.9, 0.9, D*1.5), mat_white)
    # Orange Booster Nose Armor Cap
    add_voxel_block(f"Booster_Cap_{name}", (cx + sx*0.35, cy + sy*0.35, 0.28), (0.7, 0.7, D*0.8), mat_orange)
    # Dark Thruster Core Exhaust
    add_voxel_block(f"Booster_Core_{name}", (cx + sx*0.35, cy + sy*0.35, 0.32), (0.35, 0.35, D*0.6), mat_slate)
    # Glowing Sensor Eye
    add_voxel_block(f"Booster_LED_{name}", (cx + sx*0.35, cy + sy*0.35, 0.36), (0.16, 0.16, D*0.3), mat_glow)
    
    # Hydraulic Piston Bracket
    add_voxel_block(f"Piston_H_{name}", (cx + sx*0.9, cy + sy*0.2, 0.1), (0.45, 0.28, D*1.1), mat_slate)
    add_voxel_block(f"Piston_V_{name}", (cx + sx*0.2, cy + sy*0.9, 0.1), (0.28, 0.45, D*1.1), mat_slate)

# 4. Diagonal Hazard Warning Stripe Blocks on Lateral Struts
for side_x, sign in [(-W - 0.18, -1), (W + 0.18, 1)]:
    for i in range(-4, 5):
        y_pos = i * 0.38
        mat_stripe = mat_orange if i % 2 == 0 else mat_black
        add_voxel_block(f"Hazard_{sign}_{i}", (side_x, y_pos, 0.05), (0.22, 0.26, D*0.7), mat_stripe)

# 5. Top Rocket Launch Gantry Bezel
# With telemetry antenna and orange beacon
add_voxel_block("Gantry_Header_Base", (0, H + 0.28, 0.12), (3.2, 0.45, D*1.3), mat_white)
add_voxel_block("Gantry_Header_Core", (0, H + 0.32, 0.18), (2.4, 0.32, D*1.1), mat_orange)
add_voxel_block("Gantry_Beacon_Left", (-1.2, H + 0.32, 0.25), (0.25, 0.25, D*0.8), mat_glow)
add_voxel_block("Gantry_Beacon_Right", (1.2, H + 0.32, 0.25), (0.25, 0.25, D*0.8), mat_glow)
add_voxel_block("Gantry_Antenna", (0, H + 0.65, 0.15), (0.12, 0.4, 0.12), mat_slate)

# 6. Bottom Thruster Exhaust Manifold & Hydraulic Feet
add_voxel_block("Exhaust_Base", (0, -H - 0.24, 0.1), (3.6, 0.38, D*1.2), mat_slate)
add_voxel_block("Exhaust_Grate_L", (-0.9, -H - 0.24, 0.16), (1.1, 0.22, D*0.8), mat_orange)
add_voxel_block("Exhaust_Grate_R", (0.9, -H - 0.24, 0.16), (1.1, 0.22, D*0.8), mat_orange)
add_voxel_block("Exhaust_Burner", (0, -H - 0.24, 0.18), (0.45, 0.18, D*0.9), mat_glow)

# Lighting Setup: Crisp high-contrast isometric studio lighting
light_data_sun = bpy.data.lights.new(name="SunLight", type='SUN')
light_data_sun.energy = 4.5
light_data_sun.color = (1.0, 0.95, 0.9)
light_obj_sun = bpy.data.objects.new(name="SunLight", object_data=light_data_sun)
bpy.context.collection.objects.link(light_obj_sun)
light_obj_sun.location = (6.0, 8.0, 10.0)
light_obj_sun.rotation_euler = (math.radians(45), math.radians(25), math.radians(35))

# Warm Fill
light_data_fill = bpy.data.lights.new(name="FillLight", type='POINT')
light_data_fill.energy = 350
light_data_fill.color = (1.0, 0.6, 0.2)
light_obj_fill = bpy.data.objects.new(name="FillLight", object_data=light_data_fill)
bpy.context.collection.objects.link(light_obj_fill)
light_obj_fill.location = (-5.0, -5.0, 5.0)

# Camera (Orthographic / Telephoto for isometric look)
cam_data = bpy.data.cameras.new(name="Camera")
cam_data.type = 'PERSP'
cam_data.lens = 75
cam_obj = bpy.data.objects.new(name="Camera", object_data=cam_data)
bpy.context.collection.objects.link(cam_obj)
cam_obj.location = (0.0, 0.0, 12.5)
scene.camera = cam_obj

# Output Path
output_file = r"C:\Users\Mohideen A Kader\OneDrive\Desktop\Portfolio-2\public\preview\voxel_rocket_frame_preview.png"
scene.render.filepath = output_file

print(f"Rendering Voxel Rocket Frame to {output_file}...")
bpy.ops.render.render(write_still=True)
print("Render complete!")
