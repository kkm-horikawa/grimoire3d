# Brass shelf plate

[The Blender model](brass-plate.blend) contains the pressed brass plate, two slotted screws, and an orthographic camera. The plate lettering is HTML. The browser stretches the blank frame and positions the two screw images independently, so long labels can wrap while the corners and screws retain their shape.

To regenerate the transparent WebP layers, use Blender 5.3 and Python with Pillow. Run these commands from this directory.

```sh
blender -b brass-plate.blend -P render_layers.py
python3 package_layers.py
```

The browser assets are in [the reader art directory](../../src/site/art/). Copy `plate-frame.webp` to `shelf-plate.webp` and the two `plate-screw-*.webp` files to `shelf-screw-*.webp`. The build uses external assets for all three files and only requests them on categorized shelves.
