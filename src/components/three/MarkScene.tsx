"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { gsap } from "@/lib/gsap";
import { MARK_POINTS, glyphHatch, markShapes, type MarkSceneState } from "./mark-path";

const BONE = new THREE.Color("#ecebe6");
const ACCENT = new THREE.Color("#2ee6a6");
const DEPTH = 0.35;
const MARK_SCALE = 1.3;
const MARK_W = 1.36;

/** Radial glow texture for the additive "bloom-ish" sprite (no postprocessing). */
function glowTexture(): THREE.Texture {
  const size = 256;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.18, "rgba(255,255,255,0.55)");
  g.addColorStop(0.5, "rgba(255,255,255,0.12)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Hatch lines on front and back faces of one glyph, as a LineSegments geometry. */
function hatchGeometry(points: (typeof MARK_POINTS)[number]["points"]): THREE.BufferGeometry {
  const pos: number[] = [];
  for (const [x1, x2, y] of glyphHatch(points)) {
    for (const z of [DEPTH / 2, -DEPTH / 2]) pos.push(x1, y, z, x2, y, z);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  return geo;
}

type Glyph = { id: string; solid: THREE.ExtrudeGeometry; edges: THREE.EdgesGeometry; hatch: THREE.BufferGeometry };

/**
 * The extruded `<` `/` `>` mark. Reads the shared state every frame (written by the GSAP
 * timeline in HomeScene); renders on demand, invalidated from the GSAP ticker while active.
 */
export function MarkScene({
  state,
  parallax,
  onFirstFrame,
}: {
  state: React.RefObject<MarkSceneState>;
  parallax: boolean;
  onFirstFrame?: () => void;
}) {
  const invalidate = useThree((s) => s.invalidate);
  const group = useRef<THREE.Group>(null);
  const glyphRefs = useRef<(THREE.Group | null)[]>([]);
  const smooth = useRef({ px: 0, py: 0, first: true });

  const glyphs = useMemo<Glyph[]>(() => {
    const shapes = markShapes();
    return shapes.map((shape, i) => {
      const solid = new THREE.ExtrudeGeometry(shape, {
        depth: DEPTH,
        bevelEnabled: true,
        bevelThickness: 0.018,
        bevelSize: 0.012,
        bevelSegments: 2,
        curveSegments: 1,
      });
      solid.translate(0, 0, -DEPTH / 2);
      solid.computeVertexNormals();
      return {
        id: MARK_POINTS[i].id,
        solid,
        edges: new THREE.EdgesGeometry(solid, 25),
        hatch: hatchGeometry(MARK_POINTS[i].points),
      };
    });
  }, []);

  const glowMap = useMemo(() => glowTexture(), []);
  const glowMat = useRef<THREE.SpriteMaterial>(null);
  const grid = useRef<THREE.GridHelper>(null);

  const rim = useRef<THREE.PointLight>(null);
  const key = useRef<THREE.PointLight>(null);
  const glowSprite = useRef<THREE.Sprite>(null);

  // Render loop: invalidate from the GSAP ticker only while the scene's range is on screen.
  useEffect(() => {
    const tick = () => {
      if (state.current?.active) invalidate();
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, [invalidate, state]);

  useEffect(
    () => () => {
      for (const g of glyphs) {
        g.solid.dispose();
        g.edges.dispose();
        g.hatch.dispose();
      }
      glowMap.dispose();
    },
    [glyphs, glowMap],
  );

  useFrame(({ camera, clock, size }) => {
    const s = state.current;
    const g = group.current;
    if (!s || !g) return;

    // Additive idle offset: slow sway (peak ≈0.1 rad/s) + pointer parallax (±8°), weighted by s.idle.
    const k = smooth.current;
    const tx = parallax ? s.pointerX : 0;
    const ty = parallax ? s.pointerY : 0;
    k.px += (tx - k.px) * 0.06;
    k.py += (ty - k.py) * 0.06;
    const t = clock.getElapsedTime();
    const deg8 = (8 * Math.PI) / 180;
    const idleY = (0.32 * Math.sin(t * 0.31) + k.px * deg8) * s.idle;
    const idleX = (0.06 * Math.sin(t * 0.23) - k.py * deg8) * s.idle;

    g.rotation.set(s.rotX + idleX, s.rotY + idleY, s.rotZ);

    // Fit the mark to narrow viewports.
    const cam = camera as THREE.PerspectiveCamera;
    const visH = 2 * 4.2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    const visW = visH * (size.width / size.height);
    const scale = Math.min(MARK_SCALE, (visW * 0.82) / MARK_W);
    g.scale.setScalar(scale);

    const slash = glyphRefs.current[1];
    if (slash) slash.position.z = s.slashZ;

    camera.position.set(s.camX, s.camY, s.camZ);
    camera.lookAt(0, 0, 0);

    if (grid.current) {
      const gm = grid.current.material as THREE.LineBasicMaterial;
      gm.transparent = true;
      gm.depthWrite = false;
      gm.opacity = s.grid * 0.22;
      grid.current.visible = s.grid > 0.005;
    }
    if (glowMat.current) glowMat.current.opacity = 0.55 * s.glow;
    if (glowSprite.current) glowSprite.current.visible = s.glow > 0.005;
    if (rim.current) rim.current.intensity = 6 * s.rim;
    if (key.current) key.current.intensity = 3 + 4 * (1 - s.wire);

    for (const child of glyphRefs.current) {
      if (!child) continue;
      const [mesh, edges, hatch] = child.children as [THREE.Mesh, THREE.LineSegments, THREE.LineSegments];
      const sm = mesh.material as THREE.MeshStandardMaterial;
      sm.opacity = s.solid;
      sm.depthWrite = s.solid > 0.98;
      mesh.visible = s.solid > 0.005;
      (edges.material as THREE.LineBasicMaterial).opacity = s.wire * 0.6;
      (hatch.material as THREE.LineBasicMaterial).opacity = s.wire * 0.28;
      edges.visible = hatch.visible = s.wire > 0.005;
    }

    if (k.first) {
      k.first = false;
      onFirstFrame?.();
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[-3, 4, 5]} intensity={2.2} />
      <directionalLight position={[4, -2, 3]} intensity={0.5} />
      <pointLight ref={key} position={[0.1, 0.1, 1.4]} color="#b9f7e0" intensity={4} distance={6} decay={1.4} />
      <pointLight ref={rim} position={[2.2, 1.2, -1.6]} color={ACCENT} intensity={0} distance={8} decay={1} />
      <sprite ref={glowSprite} position={[0, 0, -0.6]} scale={[3.4, 3.4, 1]}>
        <spriteMaterial
          ref={glowMat}
          map={glowMap}
          color={ACCENT}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
          depthTest={false}
        />
      </sprite>
      <gridHelper ref={grid} args={[14, 56, BONE, BONE]} position={[0, -0.95, 0]} visible={false} />
      <group ref={group}>
        {glyphs.map((gl, i) => (
          <group
            key={gl.id}
            ref={(el) => {
              glyphRefs.current[i] = el;
            }}
          >
            <mesh geometry={gl.solid}>
              <meshStandardMaterial color={BONE} roughness={0.5} metalness={0} transparent />
            </mesh>
            <lineSegments geometry={gl.edges}>
              <lineBasicMaterial color={BONE} transparent opacity={0} depthWrite={false} />
            </lineSegments>
            <lineSegments geometry={gl.hatch}>
              <lineBasicMaterial color={BONE} transparent opacity={0} depthWrite={false} />
            </lineSegments>
          </group>
        ))}
      </group>
    </>
  );
}
