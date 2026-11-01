import bpy
import math
import os

# Clean scene
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

# Configure Render settings for high quality isometric render
scene.render.engine = 'CYCLES'
scene.cycles.device = 'CPU'
scene.cycles.samples = 48
scene.render.resolution_x = 1200
scene.render.resolution_y = 1200
scene.render.film_transparent = True

# Import generated GLB
glb_path = r"c:\Users\Mohideen A Kader\OneDrive\Desktop\Portfolio-2\public\models\minecraft_robot_dog.glb"
bpy.ops.import_scene.gltf(filepath=glb_path)

# Calculate bounding box of all imported objects to frame camera perfectly
all_meshes = [obj for obj in bpy.data.objects if obj.type == 'MESH']
min_x = min(obj.location.x - obj.dimensions.x/2 for obj in all_meshes)
max_x = max(obj.location.x + obj.dimensions.x/2 for obj in all_meshes)
min_y = min(obj.location.y - obj.dimensions.y/2 for obj in all_meshes)
max_y = max(obj.location.y + obj.dimensions.y/2 for obj in all_meshes)
min_z = min(obj.location.z - obj.dimensions.z/2 for obj in all_meshes)
max_z = max(obj.location.z + obj.dimensions.z/2 for obj in all_meshes)

mid_x = (min_x + max_x) / 2.0
mid_y = (min_y + max_y) / 2.0
mid_z = (min_z + max_z) / 2.0

# Setup Dynamic 3/4 Camera view (Isometric angle)
cam_data = bpy.data.cameras.new("DogCamera")
cam_data.lens = 55 # slightly wider cinematic focal length
cam_obj = bpy.data.objects.new("DogCamera", cam_data)
scene.collection.objects.link(cam_obj)
scene.camera = cam_obj

# Camera positioned in front-right-high isometric spot looking at full dog
cam_obj.location = (mid_x + 2.6, mid_y + 2.4, mid_z + 1.4)

# Point camera at center of dog
target_empty = bpy.data.objects.new("TargetEmpty", None)
target_empty.location = (mid_x, mid_y, mid_z)
scene.collection.objects.link(target_empty)

track = cam_obj.constraints.new(type='TRACK_TO')
track.target = target_empty
track.track_axis = 'TRACK_NEGATIVE_Z'
track.up_axis = 'UP_Y'

# Studio Lights
# 1. Warm Sun / Key Light
key_light = bpy.data.lights.new(name="KeyLight", type='AREA')
key_light.energy = 80.0
key_light.size = 2.0
key_light.color = (1.0, 0.95, 0.90)
key_obj = bpy.data.objects.new("KeyLight", key_light)
key_obj.location = (mid_x + 2.0, mid_y + 2.0, mid_z + 3.0)
scene.collection.objects.link(key_obj)

# 2. Cool Cyber Rim Light (electric cyan edge)
rim_light = bpy.data.lights.new(name="RimLight", type='AREA')
rim_light.energy = 120.0
rim_light.size = 2.5
rim_light.color = (0.0, 0.85, 1.0)
rim_obj = bpy.data.objects.new("RimLight", rim_light)
rim_obj.location = (mid_x - 2.5, mid_y - 2.5, mid_z + 2.0)
scene.collection.objects.link(rim_obj)

# 3. Orange Back Bounce Light (underneath / flank glow)
bounce_light = bpy.data.lights.new(name="BounceLight", type='POINT')
bounce_light.energy = 40.0
bounce_light.color = (1.0, 0.40, 0.05)
bounce_obj = bpy.data.objects.new("BounceLight", bounce_light)
bounce_obj.location = (mid_x - 1.5, mid_y + 1.0, mid_z + 0.2)
scene.collection.objects.link(bounce_obj)

# Output paths
preview_dir = r"c:\Users\Mohideen A Kader\OneDrive\Desktop\Portfolio-2\public\preview"
os.makedirs(preview_dir, exist_ok=True)
output_img = os.path.join(preview_dir, "minecraft_robot_dog.png")

scene.render.filepath = output_img
bpy.ops.render.render(write_still=True)

print(f"SUCCESS: Rendered Minecraft Robot Dog preview to: {output_img}")
