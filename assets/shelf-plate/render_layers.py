"""Run blender -b brass-plate.blend -P render_layers.py in the asset directory."""
from pathlib import Path
import bpy
out = Path(__file__).resolve().parent
scene = bpy.context.scene
frame = next(o for o in scene.objects if o.name.startswith('Pressed'))
heads = [o for o in scene.objects if o.name.startswith('Countersunk')]
assert len(heads) == 2
for head in heads:
    head.hide_render = True
scene.render.filepath = str(out / 'frame-master.png')
bpy.ops.render.render(write_still=True)
for head in heads:
    head.hide_render = False
# Camera invisibility preserves reflected light from the surrounding brass.
frame.visible_camera = False
scene.render.filepath = str(out / 'screws-master.png')
bpy.ops.render.render(write_still=True)
