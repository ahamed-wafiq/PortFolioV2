import bpy
import math
import os

# Clear existing objects
bpy.ops.wm.read_factory_settings(use_empty=True)

scene = bpy.context.scene
scene.render.engine = 'CYCLES'
scene.cycles.device = 'CPU'
scene.cycles.samples = 32
scene.render.resolution_x = 1000
scene.render.resolution_y = 900
scene.render.resolution_percentage = 100
scene.render.film_transparent = True

# Materials
# 1. Dark Brushed Obsidian Titanium Chassis
mat_chassis = bpy.data.materials.new(name="Mat_Chassis")
mat_chassis.use_nodes = True
nodes = mat_chassis.node_tree.nodes
principled = next(n for n in nodes if n.type == "BSDF_PRINCIPLED")
principled.inputs['Base Color'].default_value = (0.05, 0.06, 0.09, 1.0)
principled.inputs['Metallic'].default_value = 0.92
principled.inputs['Roughness'].default_value = 0.25

# 2. Glowing Amber Neon Conduits
mat_glow = bpy.data.materials.new(name="Mat_AmberGlow")
mat_glow.use_nodes = True
glow_nodes = mat_glow.node_tree.nodes
glow_principled = next(n for n in glow_nodes if n.type == "BSDF_PRINCIPLED")
glow_principled.inputs['Base Color'].default_value = (1.0, 0.45, 0.08, 1.0)
glow_principled.inputs['Emission Color'].default_value = (1.0, 0.52, 0.1, 1.0)
glow_principled.inputs['Emission Strength'].default_value = 5.5

# 3. Gold Accent Armor Lugs
mat_armor = bpy.data.materials.new(name="Mat_ArmorGold")
mat_armor.use_nodes = True
armor_nodes = mat_armor.node_tree.nodes
armor_principled = next(n for n in armor_nodes if n.type == "BSDF_PRINCIPLED")
armor_principled.inputs['Base Color'].default_value = (0.85, 0.55, 0.18, 1.0)
armor_principled.inputs['Metallic'].default_value = 0.95
armor_principled.inputs['Roughness'].default_value = 0.18

# Frame Dimensions (Width: 8.0, Height: 7.2)
W = 4.0  # half-width
H = 3.6  # half-height
D = 0.15 # depth
T = 0.32 # frame border thickness

# Helper: create beveled cube/mesh
def make_box(name, loc, size, mat):
    bpy.ops.mesh.primitive_cube_add(location=loc)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = (size[0]/2, size[1]/2, size[2]/2)
    bpy.ops.object.transform_apply(scale=True)
    obj.data.materials.append(mat)
    
    # Add bevel modifier for sleek industrial finish
    bev = obj.modifiers.new(name="Bevel", type='BEVEL')
    bev.width = 0.03
    bev.segments = 3
    return obj

# 1. Main outer border rails
# Top rail
make_box("Rail_Top", (0, H - T/2, 0), (W*2, T, D), mat_chassis)
# Bottom rail
make_box("Rail_Bottom", (0, -H + T/2, 0), (W*2, T, D), mat_chassis)
# Left rail
make_box("Rail_Left", (-W + T/2, 0, 0), (T, H*2 - T*2, D), mat_chassis)
# Right rail
make_box("Rail_Right", (W - T/2, 0, 0), (T, H*2 - T*2, D), mat_chassis)

# 2. Glowing Amber Inset Light Channels
glow_t = 0.04
glow_d = 0.18
# Top & Bottom glow lines
make_box("Glow_Top", (0, H - T*0.5, 0.02), (W*1.85, glow_t, glow_d), mat_glow)
make_box("Glow_Bottom", (0, -H + T*0.5, 0.02), (W*1.85, glow_t, glow_d), mat_glow)
# Left & Right glow lines
make_box("Glow_Left", (-W + T*0.5, 0, 0.02), (glow_t, H*1.8, glow_d), mat_glow)
make_box("Glow_Right", (W - T*0.5, 0, 0.02), (glow_t, H*1.8, glow_d), mat_glow)

# 3. Reinforced Corner Brackets (Armor lugs at 4 corners)
corners = [
    ("TL", -W, H, 1, -1),
    ("TR", W, H, -1, -1),
    ("BL", -W, -H, 1, 1),
    ("BR", W, -H, -1, 1),
]

for name, cx, cy, sx, sy in corners:
    # Corner L-bracket arm horizontal
    make_box(f"Corner_H_{name}", (cx + sx*0.5, cy + sy*0.18, 0.04), (1.0, 0.36, D*1.3), mat_armor)
    # Corner L-bracket arm vertical
    make_box(f"Corner_V_{name}", (cx + sx*0.18, cy + sy*0.5, 0.04), (0.36, 1.0, D*1.3), mat_armor)
    # Small cyber notch / LED on corner tip
    make_box(f"Corner_LED_{name}", (cx + sx*0.18, cy + sy*0.18, 0.08), (0.16, 0.16, 0.08), mat_glow)

# 4. Segmented Side Heat Sink / Vent Slats (Left & Right)
for i in range(-3, 4):
    y_pos = i * 0.42
    # Left vent
    make_box(f"Vent_L_{i}", (-W - 0.08, y_pos, 0.01), (0.14, 0.18, D*0.8), mat_armor)
    # Right vent
    make_box(f"Vent_R_{i}", (W + 0.08, y_pos, 0.01), (0.14, 0.18, D*0.8), mat_armor)

# 5. Top Telemetry Header Notch (trapezoid style plate)
make_box("Header_Center_Plate", (0, H + 0.12, 0.03), (2.8, 0.24, D*1.2), mat_armor)
make_box("Header_LED_Left", (-1.1, H + 0.12, 0.06), (0.2, 0.08, 0.06), mat_glow)
make_box("Header_LED_Right", (1.1, H + 0.12, 0.06), (0.2, 0.08, 0.06), mat_glow)

# 6. Subtle inner dark glass backing plate to showcase frame depth
mat_glass = bpy.data.materials.new(name="Mat_DarkGlass")
mat_glass.use_nodes = True
g_nodes = mat_glass.node_tree.nodes
g_princ = next(n for n in g_nodes if n.type == "BSDF_PRINCIPLED")
g_princ.inputs['Base Color'].default_value = (0.03, 0.04, 0.06, 0.85)
g_princ.inputs['Roughness'].default_value = 0.15
g_princ.inputs['Transmission Weight'].default_value = 0.65
make_box("Glass_Backdrop", (0, 0, -0.05), (W*2 - T*1.6, H*2 - T*1.6, 0.02), mat_glass)

# Lighting Setup
# Key Amber Sunlight
light_data_key = bpy.data.lights.new(name="KeyLight", type='POINT')
light_data_key.energy = 450
light_data_key.color = (1.0, 0.75, 0.45)
light_obj_key = bpy.data.objects.new(name="KeyLight", object_data=light_data_key)
bpy.context.collection.objects.link(light_obj_key)
light_obj_key.location = (4.5, 5.0, 6.0)

# Rim Cyan / Cold Star Light
light_data_rim = bpy.data.lights.new(name="RimLight", type='POINT')
light_data_rim.energy = 300
light_data_rim.color = (0.3, 0.75, 1.0)
light_obj_rim = bpy.data.objects.new(name="RimLight", object_data=light_data_rim)
bpy.context.collection.objects.link(light_obj_rim)
light_obj_rim.location = (-5.5, -4.0, 5.0)

# Camera Setup
cam_data = bpy.data.cameras.new(name="Camera")
cam_data.lens = 65
cam_obj = bpy.data.objects.new(name="Camera", object_data=cam_data)
bpy.context.collection.objects.link(cam_obj)
cam_obj.location = (0.0, 0.0, 11.2)
cam_obj.rotation_euler = (0, 0, 0)
scene.camera = cam_obj

# Output Path
output_dir = r"C:\Users\Mohideen A Kader\OneDrive\Desktop\Portfolio-2\public\preview"
os.makedirs(output_dir, exist_ok=True)
output_file = os.path.join(output_dir, "blender_hud_frame_preview.png")
scene.render.filepath = output_file

print(f"Rendering Blender 3D Sci-Fi HUD Frame to {output_file}...")
bpy.ops.render.render(write_still=True)
print("Render complete!")
