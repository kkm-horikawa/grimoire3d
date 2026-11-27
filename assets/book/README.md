# Book models

Blender generates the red leather cover, gilt tooling, spine, 12 paper signatures, and ivory pages. The reader adds the title and text at runtime. The GLB files embed WebP color, normal, and roughness maps based on the approved paper and leather references. The browser needs no separate textures, mesh decoder, or Blender installation.

## Generate and inspect

Use [Blender 5.3.0](https://download.blender.org/release/Blender5.3/) and ImageMagick with AVIF support. Run the following from the repository root to generate two GLB files and five Cycles AVIF renders.

```sh
blender -b -t 8 -P assets/book/generate.py
```

The [open model](open.glb) loads through GLTFLoader. The [closed model](closed.glb) uses the same materials and leaves room for the title and emblem. To edit either model in Blender, import it through **File → Import → glTF 2.0**.

| Model | Bytes | Triangles per book | Model draw calls |
| --- | ---: | ---: | ---: |
| Open | 391,720 | 6,008 | 7 |
| Closed | 158,800 | 2,030 | 3 |

Counts come from the GLB nodes, primitives, and indices. The browser adds one draw call for the floor shadow. The model omits hidden interior faces, groups the foil by material, and shares geometry between the left and underlying right pages.

The [paper reference](materials/paper.avif) comes from an unprinted region of the reader concept. The [leather reference](materials/calfskin.avif) uses patches from the red cover with the title, emblem, and gold lines removed. Running `generate.py` also outputs five Cycles AVIF preview renders (`read-render.avif`, `explore-render.avif`, `closed-render.avif`, `closed-evergreen.avif`, and `closed-indigo.avif`) for local inspection.

## Pages and camera

In glTF coordinates, X is right, Y is up, and Z points toward the viewer. The cover is 6.94 units wide and about 4.04 units deep, with the spine at X=0. `LeftPage` and `UnderPage` are stationary. `RightPage` bends. Its 17 columns form a raised far corner and curl the near corner toward the spine.

| Progress | Morph at full weight |
| --- | --- |
| 0% | Base geometry |
| 25% | Turn25 |
| 50% | Turn50 |
| 75% | Turn75 |
| 100% | Turn100 |

Adjacent morph weights interpolate linearly. The original Explore pose uses 25%. The resting reader uses the base geometry.

[BookScene](../../src/site/BookScene.tsx) emits `grimoire-projection` when it renders. The event gives the four corners of each stationary page and a 9×9 grid for the turning sheet, normalized to the canvas dimensions for matching HTML placement. In the Explore reference, the front page's ink composites a transparent canvas into the right-page UV. The upper left is the far spine corner and the lower right is the near fore edge. The reverse is blank in that reference, and the number appears on the paper beneath it.

## Reference measurements

The cover corners in the original design references set each camera's pose and focal length. The Explore model follows the top, bottom, and fore-edge contours of the curled sheet.

On November 19, 2026, both rendered and reference frames were resized to 700×394. The paper mask used the largest connected component within the book above RGB thresholds of 90, 60, and 35. Holes left by letters were filled. Paper shadows and foil can affect the mask boundary.

| Comparison | Paper mask IoU | Median contour distance | 95th-percentile contour distance |
| --- | ---: | ---: | ---: |
| Reader, Cycles | 98.5% | 1 px | 2.2 px |
| Explore, Cycles | 95.6% | 3 px | 12 px |
| Reader, 1280×720 browser | 96.6% | 3 px | 6 px |
| Reader, 1920×1080 browser | 96.9% | 2 px | 6 px |
| Explore, 1920×1080 browser | 95.4% | 3.2 px | 13 px |

In the large browser reader, one paper sample measured RGB (246,229,208) versus reference (247,230,210). Explore's fore edge measured (210,170,134) versus (212,174,138).

Tuning the right-page shadow lowered mean RGB error from 27.9 to 6.5 across 24 patches of 7×7 pixels in 600×337 images. Tuning the shadow across the spine, underside of the curl, paper stack, and foil lowered error from 42.6 to 24.4 on the curl and 60.1 to 34.7 on the front paper stack. A model update brought curl error from 30.8 to 17.0 at 700×394 and reduced the average vertical offset of four foil bands from 13.0 px to 1.0 px. Raising the leather under the foil increased the 90th-percentile green-channel value of the second band from 143 to 175, compared with 192 in the reference.

## Browser rendering measurements

Chrome 158 on an AMD Radeon 780M used Mesa radeonsi, ANGLE, and DPR 1 for the initial benchmarks. Three keyboard turns ran from the sample library after opening Explore and waiting for the page ink. Frame intervals came from `grimoire-projection`. WebGL2 `drawElements` and `drawArrays` counted draws and triangles.

| Viewport | Frames per turn | 95th-percentile interval across three turns |
| --- | ---: | ---: |
| 1050×591 | 42–43 | 16.9–17.0 ms |
| 1280×720 | 42–43 | 17.1–17.3 ms |
| 1920×1080 | 42–43 | 16.8–17.2 ms |

The initial model drew 5,114 triangles in eight calls per frame at each size. The reader drew zero additional frames during 600 ms at rest. The WebGL resolution can drop during a turn or drag, then recover when the interaction ends. Software renderers such as SwiftShader cap the active canvas at 640 px wide. HTML and controls stay at screen resolution.

On Chrome 158 with Radeon 780M and ANGLE Vulkan (RADV), the updated shadow measured 17.2–17.4 ms at 1280×720 and 17.1–17.9 ms at 1920×1080. The paper and foil adjustments measured 17.1–17.4 ms and 17.4–17.5 ms. The later model measured 17.2–17.4 ms and 17.3–17.5 ms. Turns took 42–43 frames, and each run had zero draws during the 600 ms after settling. Reduced motion switched chapters without page animation at 1280×720.
