"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { MarkScene } from "./MarkScene";
import type { MarkSceneState } from "./mark-points";

/**
 * Full-viewport canvas for the mark. Loaded only via next/dynamic (ssr: false) from HomeScene
 * so three.js / R3F stay out of the initial bundle.
 */
export default function MarkCanvas({
  state,
  mobile,
  onReady,
}: {
  state: React.RefObject<MarkSceneState>;
  mobile: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      aria-hidden
      frameloop="demand"
      dpr={mobile ? 1 : [1, 1.75]}
      camera={{ fov: 35, near: 0.1, far: 60, position: [0, 0, 4.2] }}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(new THREE.Color("#0b0c0c"), 1);
        gl.toneMapping = THREE.NeutralToneMapping;
        gl.toneMappingExposure = 1;
      }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
    >
      <MarkScene state={state} parallax={!mobile} onFirstFrame={onReady} />
    </Canvas>
  );
}
