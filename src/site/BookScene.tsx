import { useEffect, useLayoutEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { type BindingColor, coverFor } from "./covers";
import { type PreparedTurn, type TurnFace, turnFaces } from "./pageTurn";
import { readFrame } from "./projection";

interface BookSceneProps {
  binding: BindingColor;
  fittedRead: boolean;
  turn: PreparedTurn | null;
  onTurnDone: (turn: PreparedTurn) => void;
  onReady: (ready: boolean) => void;
}

type Point = { x: number; y: number };
type Corners = {
  topLeft: Point;
  topRight: Point;
  bottomRight: Point;
  bottomLeft: Point;
};
export interface BookProjection {
  left: Corners;
  right: Corners;
}
type InkTexture = { value: THREE.Texture };
type TurnTextures = Record<TurnFace, InkTexture>;
const asset = new URL("../../assets/book/open.glb", import.meta.url).href;
const sheetDepth = 3.88;
const readPose = {
  position: [0, -3.78985, 24.21046],
  rotation: [0.149987, 0, 0],
  lens: 88.6082,
} as const;
const blenderToThree = new THREE.Quaternion().setFromAxisAngle(
  new THREE.Vector3(1, 0, 0),
  -Math.PI / 2
);

function disposeModel(model: THREE.Object3D) {
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  model.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) return;
    geometries.add(node.geometry);
    for (const material of Array.isArray(node.material)
      ? node.material
      : [node.material]) {
      materials.add(material);
      for (const value of Object.values(material))
        if (value instanceof THREE.Texture) textures.add(value);
    }
  });
  for (const geometry of geometries) geometry.dispose();
  for (const material of materials) material.dispose();
  for (const texture of textures) {
    texture.dispose();
    if (
      typeof ImageBitmap !== "undefined" &&
      texture.source.data instanceof ImageBitmap
    )
      texture.source.data.close();
  }
}

function pageSamples(mesh: THREE.Mesh) {
  const positions = mesh.geometry.getAttribute("position");
  const columns = new Map<number, number[]>();
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const column = columns.get(x) ?? [];
    column.push(i);
    columns.set(x, column);
  }
  const ordered = [...columns]
    .sort(([a], [b]) => a - b)
    .map(([, indices]) =>
      indices.sort((a, b) => positions.getZ(a) - positions.getZ(b))
    );
  const size = 2;
  const indices = Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => {
      const column =
        ordered[Math.round((col / (size - 1)) * (ordered.length - 1))];
      return (
        column?.[Math.round((row / (size - 1)) * (column.length - 1))] ?? 0
      );
    })
  );
  const point = new THREE.Vector3();
  return (camera: THREE.Camera) =>
    indices.map((row) =>
      row.map((i) => {
        mesh.getVertexPosition(i, point);
        point.applyMatrix4(mesh.matrixWorld).project(camera);
        return { x: (point.x + 1) / 2, y: (1 - point.y) / 2 };
      })
    );
}

function corners(grid: Point[][]): Corners {
  const first = grid[0];
  const last = grid.at(-1);
  const topLeft = first?.[0],
    topRight = first?.at(-1);
  const bottomLeft = last?.[0],
    bottomRight = last?.at(-1);
  if (!topLeft || !topRight || !bottomLeft || !bottomRight)
    throw new Error("Empty paper mesh");
  return { topLeft, topRight, bottomLeft, bottomRight };
}

function inkFrame(mesh: THREE.Mesh, name: string): THREE.BufferAttribute {
  const frame = new THREE.BufferAttribute(
    new Float32Array(mesh.geometry.getAttribute("position").count * 3),
    3
  );
  mesh.geometry.setAttribute(name, frame);
  return frame;
}

function writeInkFrame(
  mesh: THREE.Mesh,
  frame: THREE.BufferAttribute,
  camera: THREE.Camera
): void {
  // Save homogeneous screen coordinates for each vertex at rest. The folded sheet
  // carries the same coordinates, and dividing by w avoids a different text warp on landing.
  const projection = new THREE.Matrix4()
    .multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
    .multiply(mesh.matrixWorld);
  const vertex = new THREE.Vector3();
  const clip = new THREE.Vector4();
  for (let index = 0; index < frame.count; index += 1) {
    mesh.getVertexPosition(index, vertex);
    clip.set(vertex.x, vertex.y, vertex.z, 1).applyMatrix4(projection);
    frame.setXYZ(index, clip.x, clip.y, clip.w);
  }
  frame.needsUpdate = true;
}

function foldSheet(mesh: THREE.Mesh, progress: number): void {
  const weights = mesh.morphTargetInfluences;
  if (!weights) return;
  for (let i = 0; i < weights.length; i += 1) {
    weights[i] = Math.max(0, 1 - Math.abs(progress * 4 - (i + 1)));
  }
}

// A thin sheet casts a broad penumbra under an area light. Interpolating its
// actual animated edge avoids a shadow-map pass and leaves printed paper crisp.
function paperShadow(
  leaf: THREE.Mesh,
  left: THREE.Mesh,
  underPage: THREE.Mesh,
  turnTextures: TurnTextures,
  printTurning: { value: number }
) {
  const positions = leaf.geometry.getAttribute("position");
  let maxX = -Infinity;
  for (let i = 0; i < positions.count; i++)
    maxX = Math.max(maxX, positions.getX(i));
  const edge = Array.from({ length: positions.count }, (_, i) => i)
    .filter((i) => positions.getX(i) >= maxX - 0.00001)
    .sort((a, b) => positions.getZ(a) - positions.getZ(b));
  const offsets = Array.from({ length: 9 }, () => new THREE.Vector3());
  const active = { value: 0 };
  const edgeUniform = { value: offsets };
  for (const mesh of [left, underPage]) {
    if (!(mesh.material instanceof THREE.MeshStandardMaterial)) continue;
    const mat = mesh.material.clone();
    mesh.material = mat;
    const isRight = mesh === underPage;
    mat.customProgramCacheKey = () =>
      isRight ? "paper-shadow-right" : "paper-shadow-left";
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.sheetEdge = edgeUniform;
      shader.uniforms.sheetShadow = active;
      shader.uniforms.paperInk = isRight
        ? turnTextures.right
        : turnTextures.left;
      shader.uniforms.printTurning = printTurning;
      shader.vertexShader =
        "attribute vec3 inkFrontFrame; varying vec3 flatInkFrame; varying vec3 paperPosition;\n" +
        shader.vertexShader
          .replace(
            "#include <uv_vertex>",
            "#include <uv_vertex>\nflatInkFrame=inkFrontFrame;"
          )
          .replace(
            "#include <project_vertex>",
            "#include <project_vertex>\npaperPosition=(modelMatrix*vec4(transformed,1.)).xyz;"
          );
      shader.fragmentShader =
        "uniform vec3 sheetEdge[9]; uniform float sheetShadow; varying vec3 paperPosition;\n" +
        "uniform sampler2D paperInk; uniform float printTurning; varying vec3 flatInkFrame;\n" +
        `float castCoverage(float x,float extent,float blur){
          return (1.-smoothstep(extent-blur,extent+blur,x))*smoothstep(-.08,.11,x);
        }
        float foldCoverage(float x,float reach,float width){
          return (1.-smoothstep(reach,reach+width,-x))*(1.-smoothstep(-.022,.08,x));
        }\n` +
        shader.fragmentShader.replace(
          "#include <color_fragment>",
          `#include <color_fragment>
        if(printTurning>0.){
          vec4 printed=texture2D(paperInk,flatInkFrame.xy/flatInkFrame.z*.5+.5);
          diffuseColor.rgb=mix(diffuseColor.rgb,printed.rgb,printed.a);
        }
        float row = clamp((paperPosition.z+${sheetDepth / 2})/${sheetDepth}*8.,0.,7.9999);
        int i=int(floor(row));
        vec3 tip=mix(sheetEdge[i],sheetEdge[i+1],fract(row));
        float height=max(tip.y-paperPosition.y,0.);
        float x=paperPosition.x;
        // Rows can cross the spine at different times as a leaf flexes.
        float rightSide=smoothstep(-.18,.18,tip.x);
        float extent=abs(tip.x)*.96;
        float blur=.06+height*.24;
        float coverage=mix(castCoverage(-x,extent,blur),castCoverage(x,extent,blur),rightSide);
        // The far end receives more fill than the near fold.
        float nearFold=smoothstep(-1.7,1.8,paperPosition.z);
        float contact=mix(.67,1.,nearFold);
        float shade=clamp(sheetShadow*coverage*contact,0.,1.);
        diffuseColor.rgb*=mix(vec3(1.),vec3(.37,.18,.06),shade);
        // The paper curves over the binding, blocking fill on the other side too.
        float lean=smoothstep(0.,.25,abs(tip.x));
        float creaseWidth=mix(.3,1.33,nearFold)*mix(.3,1.,lean);
        float foldReach=.22*nearFold*nearFold*nearFold*lean;
        float crease=mix(foldCoverage(-x,foldReach,creaseWidth),
          foldCoverage(x,foldReach,creaseWidth),rightSide);
        float occlusion=clamp(sheetShadow*crease*mix(.36,1.1,nearFold)*lean,0.,1.);
        diffuseColor.rgb*=mix(vec3(1.),vec3(.31,.135,.045),occlusion);
        `
        );
    };
  }
  const point = new THREE.Vector3();
  return (turn: number) => {
    active.value = Math.min(1, 8 * turn, 8 * (1 - turn));
    offsets.forEach((value, row) => {
      const index = edge[Math.round((row / 8) * (edge.length - 1))];
      if (index === undefined) return;
      leaf.getVertexPosition(index, point);
      value.copy(leaf.localToWorld(point));
    });
  };
}

function mountBook(
  host: HTMLDivElement,
  initialFittedRead: boolean,
  binding: BindingColor,
  ready: (value: boolean) => void,
  turnDone: (turn: PreparedTurn) => void
) {
  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  });
  renderer.setClearColor(0, 0);
  const gl = renderer.getContext();
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const software =
    info &&
    /swiftshader|llvmpipe|software rasterizer|basic render/i.test(
      String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL))
    );
  const canvas = renderer.domElement;
  canvas.setAttribute("aria-hidden", "true");
  Object.assign(canvas.style, {
    width: "100%",
    height: "100%",
    display: "block",
  });
  host.append(canvas);
  const scene = new THREE.Scene();
  const clearInk = new THREE.DataTexture(new Uint8Array([0, 0, 0, 0]), 1, 1);
  clearInk.needsUpdate = true;
  const turnTextures: TurnTextures = {
    left: { value: clearInk },
    right: { value: clearInk },
    front: { value: clearInk },
    back: { value: clearInk },
  };
  const printTurning = { value: 0 };
  function updateTexture(
    map: InkTexture,
    image: HTMLCanvasElement | null
  ): void {
    if (image && map.value.source.data === image) return;
    if (map.value !== clearInk) map.value.dispose();
    if (image) {
      const texture = new THREE.CanvasTexture(image);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(
        4,
        renderer.capabilities.getMaxAnisotropy()
      );
      map.value = texture;
    } else {
      map.value = clearInk;
    }
  }
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 65);
  const ambient = new THREE.HemisphereLight(0xffffff, 0xb7b1b3, 2.05);
  ambient.color.setRGB(1.035, 1.09, 1.125);
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(-0.6, 8, 0.5);
  const fill = new THREE.DirectionalLight(0xffffff, 0.42);
  fill.position.set(4, 4, 4);
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(15, 12),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexShader: `varying vec2 local;
        void main(){ local=position.xy; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }`,
      fragmentShader: `varying vec2 local;
        void main(){
          vec2 d=abs(local-vec2(.015,-.075))-vec2(3.42,1.96);
          float outside=length(max(d,0.))+min(max(d.x,d.y),0.);
          float shadow=.64*exp(-max(outside,0.)*10.)+.12*exp(-max(outside,0.)*3.);
          float bounce=.46*exp(-pow((local.y+2.12)/.45,2.)-pow(local.x/1.65,4.));
          float alpha=shadow+bounce*(1.-shadow);
          vec3 color=(shadow*vec3(.014,.002,.003)+(1.-shadow)*bounce*vec3(.45,.105,.095))/max(.0001,alpha);
          gl_FragColor=vec4(color,alpha);
        }`,
    })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.085;
  ground.renderOrder = -1;
  scene.add(ambient, key, fill, ground);
  let fittedRead = initialFittedRead;
  let model: THREE.Object3D | undefined;
  let printAtRest: (() => void) | undefined;
  let page: THREE.Mesh | undefined;
  let updateShadow: ReturnType<typeof paperShadow> | undefined;
  let projectLeft: ReturnType<typeof pageSamples> | undefined;
  let projectRight: ReturnType<typeof pageSamples> | undefined;
  let projectUnderPage: ReturnType<typeof pageSamples> | undefined;
  let disposed = false;
  let contextLost = false;
  let frame = 0;
  let width = 1;
  let height = 1;
  let turn = 0;
  let activeTurn: PreparedTurn | null = null;
  let animation: { start: number; from: number } | undefined;
  const framing = new THREE.Matrix4();

  function poseCamera() {
    const laptop = THREE.MathUtils.clamp((1920 - width) / 640, 0, 1);
    const spreadScale = 1 + 0.085474 * laptop;
    if (model) model.scale.x = spreadScale;
    ground.scale.x = spreadScale;
    camera.position.fromArray(readPose.position);
    camera.position.y += laptop * (-1.795895 - readPose.position[1]);
    camera.position.applyQuaternion(blenderToThree);
    const [x, y, z] = readPose.rotation;
    camera.quaternion
      .setFromEuler(new THREE.Euler(x + laptop * (0.069131 - x), y, z, "ZYX"))
      .premultiply(blenderToThree);
    camera.aspect = width / height;
    camera.fov = THREE.MathUtils.radToDeg(
      2 *
        Math.atan(
          18 /
            ((readPose.lens + laptop * (86.64898 - readPose.lens)) *
              camera.aspect)
        )
    );
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
    if (fittedRead && model && projectLeft && projectUnderPage) {
      model.updateMatrixWorld(true);
      const paper = [
        ...projectLeft(camera).flat(),
        ...projectUnderPage(camera).flat(),
      ];
      const minX = Math.min(...paper.map((p) => p.x));
      const maxX = Math.max(...paper.map((p) => p.x));
      const minY = Math.min(...paper.map((p) => p.y));
      const maxY = Math.max(...paper.map((p) => p.y));
      const desired = readFrame(width, height);
      const x = desired.width / (width * (maxX - minX));
      const y = desired.height / (height * (maxY - minY));
      // Fit both resting pages, keeping the frame fixed while the free leaf turns.
      framing.set(
        x,
        0,
        0,
        x * (1 - minX - maxX),
        0,
        y,
        0,
        y * (minY + maxY - 1),
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1
      );
      camera.projectionMatrix.premultiply(framing);
      camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
    }
  }

  function draw(time: number) {
    frame = 0;
    if (
      disposed ||
      contextLost ||
      !model ||
      !page ||
      !projectLeft ||
      !projectRight
    )
      return;
    let completed: PreparedTurn | null = null;
    if (animation && activeTurn) {
      const t = Math.min((time - animation.start) / 670, 1);
      const eased = t * t * (3 - 2 * t);
      const end = activeTurn.plan.direction > 0 ? 1 : 0;
      turn = THREE.MathUtils.lerp(animation.from, end, eased);
      if (t === 1) {
        animation = undefined;
        completed = activeTurn;
      }
    }
    foldSheet(page, turn);
    host.dataset.turning = activeTurn ? "true" : "false";
    printTurning.value = activeTurn ? 1 : 0;
    updateShadow?.(turn);
    poseCamera();
    renderer.render(scene, camera);
    const left = projectLeft(camera);
    const right = projectRight(camera);
    host.dispatchEvent(
      new CustomEvent<BookProjection>("grimoire-projection", {
        bubbles: true,
        detail: {
          left: corners(left),
          right: corners(right),
        },
      })
    );
    if (completed) turnDone(completed);
    if (animation) requestDraw();
  }

  function requestDraw() {
    if (!disposed && !contextLost && !frame)
      frame = requestAnimationFrame(draw);
  }

  function suspendCanvas(event: Event): void {
    event.preventDefault();
    contextLost = true;
    cancelAnimationFrame(frame);
    frame = 0;
    ready(false);
  }

  function restoreCanvas(): void {
    contextLost = false;
    if (!model || !projectLeft || !projectRight) return;
    draw(performance.now());
    ready(true);
  }

  function resize() {
    if (!host.clientWidth || !host.clientHeight) return;
    width = host.clientWidth;
    height = host.clientHeight;
    renderer.setPixelRatio(
      software
        ? Math.min(1, 1024 / width)
        : Math.min(window.devicePixelRatio || 1, 1.5, 2200 / width)
    );
    renderer.setSize(width, height, false);
    requestDraw();
  }

  function setFittedRead(next: boolean): void {
    fittedRead = next;
    requestDraw();
  }

  function setTurn(next: PreparedTurn | null): void {
    if (activeTurn === next) return;
    activeTurn = next;
    for (const face of turnFaces)
      updateTexture(turnTextures[face], next?.ink[face] ?? null);
    const start = performance.now();
    turn = next?.plan.direction === -1 ? 1 : 0;
    animation = next ? { start, from: turn } : undefined;
    cancelAnimationFrame(frame);
    if (next) printAtRest?.();
    draw(start);
  }

  const observe = new ResizeObserver(resize);
  observe.observe(host);
  canvas.addEventListener("webglcontextlost", suspendCanvas);
  canvas.addEventListener("webglcontextrestored", restoreCanvas);
  resize();
  new GLTFLoader().load(
    asset,
    ({ scene: book }) => {
      if (disposed) return disposeModel(book);
      model = book;
      const left = book.getObjectByName("LeftPage");
      const right = book.getObjectByName("RightPage");
      if (!(left instanceof THREE.Mesh && right instanceof THREE.Mesh)) {
        ready(false);
        return;
      }
      const frontFrame = inkFrame(right, "inkFrontFrame");
      const backFrame = inkFrame(right, "inkBackFrame");
      const leftFrame = inkFrame(left, "inkFrontFrame");
      if (right.material instanceof THREE.MeshStandardMaterial) {
        const mat = right.material;
        mat.onBeforeCompile = (shader) => {
          shader.uniforms.frontInk = turnTextures.front;
          shader.uniforms.backInk = turnTextures.back;
          shader.uniforms.printTurning = printTurning;
          shader.vertexShader = `attribute vec3 inkFrontFrame; attribute vec3 inkBackFrame; varying vec3 frontFrame; varying vec3 backFrame;
            ${shader.vertexShader.replace("#include <uv_vertex>", "#include <uv_vertex>\nfrontFrame=inkFrontFrame;backFrame=inkBackFrame;")}`;
          shader.fragmentShader = `uniform sampler2D frontInk; uniform sampler2D backInk; uniform float printTurning; varying vec3 frontFrame; varying vec3 backFrame;
            ${shader.fragmentShader.replace(
              "#include <color_fragment>",
              `#include <color_fragment>
              if(printTurning>0.){
                vec4 ink;
                if(gl_FrontFacing){
                  ink=texture2D(frontInk,frontFrame.xy/frontFrame.z*.5+.5);
                }else{
                  diffuseColor.rgb*=vec3(.73,.65,.54);
                  ink=texture2D(backInk,backFrame.xy/backFrame.z*.5+.5);
                }
                diffuseColor.rgb=mix(diffuseColor.rgb,ink.rgb,ink.a);
              }`
            )}`;
        };
      }
      page = right;
      projectLeft = pageSamples(left);
      projectRight = pageSamples(right);
      const below = book.getObjectByName("UnderPage");
      // The studio strip is reflected by the actual perturbed normals. Its highlight
      // follows the rolled cover when the camera orbits, including the two foil bands.
      book.traverse((node) => {
        if (
          !(node instanceof THREE.Mesh) ||
          !(node.material instanceof THREE.MeshStandardMaterial)
        )
          return;
        const finish = node.material.name;
        if (finish === "Cut edges") {
          node.material.onBeforeCompile = (shader) => {
            shader.fragmentShader = shader.fragmentShader.replace(
              "#include <opaque_fragment>",
              `
              vec3 edgeNormal=inverseTransformDirection(normal,viewMatrix);
              float endGrain=smoothstep(.44,.94,abs(edgeNormal.z));
              outgoingLight*=mix(vec3(1.),vec3(.57,.42,.33),endGrain);
              #include <opaque_fragment>`
            );
          };
          node.material.customProgramCacheKey = () => "paper-stack-edges";
          return;
        }
        const metal = finish === "Antique gold";
        if (!metal && finish !== "Oxblood leather") return;
        const { dye, light } = coverFor("", binding);
        node.material.onBeforeCompile = (shader) => {
          if (!metal && dye) {
            shader.fragmentShader = shader.fragmentShader.replace(
              "#include <color_fragment>",
              `#include <color_fragment>
              float leatherGrain = dot(diffuseColor.rgb, vec3(.55,.30,.15));
              diffuseColor.rgb = leatherGrain * vec3(${dye});`
            );
          }
          shader.fragmentShader = shader.fragmentShader.replace(
            "#include <opaque_fragment>",
            `
            vec3 reflected=inverseTransformDirection(reflect(-normalize(vViewPosition),normal),viewMatrix);
            float angle=atan(reflected.x,reflected.y);
            float strip=exp(-.5*pow((angle-${metal ? ".075" : ".74"})/(${metal ? ".21+.22" : ".075+.16"}*roughnessFactor),2.))*smoothstep(-.5,.1,reflected.y);
            ${metal ? "outgoingLight=outgoingLight*vec3(.93,.94,1.22)+vec3(.39,.29,.15)*strip;" : `outgoingLight+=vec3(${light})*strip;`}
            #include <opaque_fragment>`
          );
        };
        node.material.customProgramCacheKey = () =>
          metal ? "foil-studio" : `leather-studio-${binding}`;
      });
      if (below instanceof THREE.Mesh) {
        // The model instantiates the same mesh on both sides of the spine.
        // Their printed vertices need independent screen coordinates.
        if (below.geometry === left.geometry)
          below.geometry = below.geometry.clone();
        const rightFrame = inkFrame(below, "inkFrontFrame");
        printAtRest = () => {
          poseCamera();
          book.updateMatrixWorld(true);
          writeInkFrame(left, leftFrame, camera);
          writeInkFrame(below, rightFrame, camera);
          foldSheet(right, 0);
          writeInkFrame(right, frontFrame, camera);
          foldSheet(right, 1);
          writeInkFrame(right, backFrame, camera);
          foldSheet(right, turn);
        };
        projectUnderPage = pageSamples(below);
        updateShadow = paperShadow(
          right,
          left,
          below,
          turnTextures,
          printTurning
        );
      }
      scene.add(book);
      draw(performance.now());
      ready(!contextLost);
    },
    undefined,
    () => {
      if (!disposed) ready(false);
    }
  );
  return {
    setFittedRead,
    setTurn,
    dispose() {
      disposed = true;
      observe.disconnect();
      cancelAnimationFrame(frame);
      canvas.removeEventListener("webglcontextlost", suspendCanvas);
      canvas.removeEventListener("webglcontextrestored", restoreCanvas);
      for (const face of turnFaces)
        if (turnTextures[face].value !== clearInk)
          turnTextures[face].value.dispose();
      clearInk.dispose();
      if (model) disposeModel(model);
      ground.geometry.dispose();
      ground.material.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}

export default function BookScene(props: BookSceneProps) {
  const host = useRef<HTMLDivElement>(null);
  const latest = useRef(props);
  latest.current = props;
  const runtime = useRef<ReturnType<typeof mountBook> | null>(null);
  useEffect(() => {
    if (!host.current) return;
    try {
      runtime.current = mountBook(
        host.current,
        latest.current.fittedRead,
        latest.current.binding,
        (ready) => latest.current.onReady(ready),
        (turn) => latest.current.onTurnDone(turn)
      );
    } catch {
      latest.current.onReady(false);
    }
    return () => {
      runtime.current?.dispose();
      runtime.current = null;
    };
  }, []);
  useLayoutEffect(() => {
    runtime.current?.setFittedRead(props.fittedRead);
  }, [props.fittedRead]);
  useLayoutEffect(() => {
    runtime.current?.setTurn(props.turn);
  }, [props.turn]);
  return <div ref={host} style={{ position: "absolute", inset: 0 }} />;
}
