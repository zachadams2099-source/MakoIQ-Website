"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, Plane, ContactShadows } from "@react-three/drei";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import * as THREE from "three";
import gsap from "gsap";

const INK = "#17102b";
const VIOLET = "#8b6ff0";
const PURPLE = "#5b2ed0";
const PAPER = "#f7f6f3";

type FragmentDatum = {
  x: number;
  y: number;
  z: number;
  rotY: number;
  rotZ: number;
  scale: number;
};

function makeDocTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 160;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, 128, 160);
  ctx.fillStyle = "rgba(42,36,56,0.16)";
  for (let i = 0; i < 7; i++) {
    const w = 92 - (i % 3) * 18;
    ctx.fillRect(16, 22 + i * 15, w, 4);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeFinishedDocTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 160;
  canvas.height = 200;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = PAPER;
  ctx.fillRect(0, 0, 160, 200);
  ctx.fillStyle = VIOLET;
  ctx.fillRect(0, 0, 160, 14);
  ctx.fillStyle = "rgba(42,36,56,0.18)";
  for (let i = 0; i < 9; i++) {
    const w = 118 - (i % 3) * 22;
    ctx.fillRect(20, 34 + i * 17, w, 5);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Generates PBR reflections/refraction for the glass sphere from a small
// procedural room scene entirely on the GPU: no network fetch, so the hero
// never depends on (or breaks because of) a third-party HDRI CDN.
function ProceduralEnvironment() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();
    return () => {
      envTexture.dispose();
      scene.environment = null;
    };
  }, [gl, scene]);

  return null;
}

// Bails out to the final state if the device can't sustain a usable frame
// rate for the intro (old hardware, software rendering, an overloaded
// tab). Better to skip straight to the accessible end state than leave a
// visitor staring at a stuttering or frozen scene.
function PerformanceWatchdog({ onLowPerf }: { onLowPerf: () => void }) {
  const frames = useRef(0);
  const start = useRef<number | null>(null);
  const triggered = useRef(false);

  useFrame((state) => {
    if (triggered.current) return;
    if (start.current === null) start.current = state.clock.elapsedTime;
    frames.current += 1;
    const elapsed = state.clock.elapsedTime - start.current;
    if (elapsed >= 0.6) {
      triggered.current = true;
      const fps = frames.current / elapsed;
      if (fps < 24) onLowPerf();
    }
  });

  return null;
}

function seededFragments(count: number): FragmentDatum[] {
  const data: FragmentDatum[] = [];
  for (let i = 0; i < count; i++) {
    data.push({
      x: -6.5 + Math.random() * 8,
      y: 0.02 + Math.random() * 0.05,
      z: -2 + Math.random() * 4,
      rotY: (Math.random() - 0.5) * Math.PI * 0.7,
      rotZ: (Math.random() - 0.5) * 0.5,
      scale: 0.62 + Math.random() * 0.3,
    });
  }
  return data.sort((a, b) => a.x - b.x);
}

const SPHERE_RADIUS = 0.8;
const SPHERE_START_X = -8.5;
const SPHERE_SETTLE_X = -1.35;
const DOC_TARGET = new THREE.Vector3(0.65, 1.05, 0);

function SceneContent({
  isMobile,
  skip,
  onSettled,
}: {
  isMobile: boolean;
  skip: boolean;
  onSettled: () => void;
}) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const docRef = useRef<THREE.Mesh>(null);
  const docMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const fragmentRefs = useRef<(THREE.Mesh | null)[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const settledRef = useRef(false);

  const fragmentCount = isMobile ? 8 : 14;
  const fragments = useMemo(() => seededFragments(fragmentCount), [fragmentCount]);
  const docTexture = useMemo(() => makeDocTexture(), []);
  const finishedTexture = useMemo(() => makeFinishedDocTexture(), []);

  const notifySettled = () => {
    if (settledRef.current) return;
    settledRef.current = true;
    onSettled();
  };

  useEffect(() => {
    if (!sphereRef.current || !docRef.current) return;

    const tl = gsap.timeline({ onComplete: notifySettled });
    timelineRef.current = tl;

    tl.set(sphereRef.current.position, { x: SPHERE_START_X, y: 0, z: 0 });
    tl.set(docRef.current.scale, { x: 0.01, y: 0.01, z: 0.01 });
    if (docMatRef.current) tl.set(docMatRef.current, { opacity: 0 });

    tl.to(sphereRef.current.position, { x: SPHERE_SETTLE_X, duration: 1.7, ease: "power2.out" }, 0);

    // Soft single settle, no repeated bounce.
    tl.to(sphereRef.current.scale, { y: 0.86, x: 1.08, duration: 0.12, ease: "power1.out" }, 1.58)
      .to(sphereRef.current.scale, { y: 1, x: 1, duration: 0.32, ease: "elastic.out(1, 0.55)" }, 1.7);

    const minX = fragments[0]?.x ?? 0;
    const maxX = fragments[fragments.length - 1]?.x ?? 1;
    const spanX = Math.max(0.001, maxX - minX);

    fragments.forEach((frag, i) => {
      const mesh = fragmentRefs.current[i];
      if (!mesh) return;
      const delay = 0.35 + ((frag.x - minX) / spanX) * 1.15;
      const targetIndex = i % 6;
      const targetOffset = {
        x: (Math.random() - 0.5) * 0.16,
        y: targetIndex * 0.012,
        z: (Math.random() - 0.5) * 0.1 - targetIndex * 0.01,
      };

      tl.to(
        mesh.position,
        {
          x: DOC_TARGET.x + targetOffset.x,
          y: DOC_TARGET.y + targetOffset.y,
          z: DOC_TARGET.z + targetOffset.z,
          duration: 0.55,
          ease: "power2.inOut",
        },
        delay
      ).to(mesh.rotation, { x: 0, y: 0, z: 0, duration: 0.5, ease: "power2.inOut" }, delay);

      const mat = mesh.material as THREE.MeshBasicMaterial;
      tl.to(mat, { opacity: 0, duration: 0.3, ease: "power1.in" }, 1.95 + i * 0.01);
    });

    tl.to(docRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.5, ease: "back.out(1.6)" }, 2.05);
    if (docMatRef.current) {
      tl.to(docMatRef.current, { opacity: 1, duration: 0.4, ease: "power1.out" }, 2.05);
    }

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fragments]);

  const jumpToEnd = () => {
    if (timelineRef.current) {
      timelineRef.current.progress(1);
      timelineRef.current.kill();
    }
    notifySettled();
  };

  useEffect(() => {
    if (skip) jumpToEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.rotation.z = -sphereRef.current.position.x / SPHERE_RADIUS;
    }
  });

  return (
    <group>
      <PerformanceWatchdog onLowPerf={jumpToEnd} />

      <Plane args={[40, 24]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -SPHERE_RADIUS, 0]}>
        <meshStandardMaterial color={INK} roughness={0.95} metalness={0} />
      </Plane>

      <ContactShadows
        position={[0, -SPHERE_RADIUS + 0.01, 0]}
        opacity={0.45}
        scale={10}
        blur={2.2}
        far={2.5}
        resolution={isMobile ? 256 : 512}
        color={PURPLE}
        frames={isMobile ? 1 : Infinity}
      />

      {/* A single transmissive object keeps the extra background render pass
          cheap; mobile drops clearcoat, the priciest part of the material. */}
      <Sphere ref={sphereRef} args={[SPHERE_RADIUS, isMobile ? 32 : 48, isMobile ? 32 : 48]}>
        <meshPhysicalMaterial
          transmission={1}
          roughness={0.04}
          thickness={1.4}
          ior={1.45}
          clearcoat={isMobile ? 0 : 1}
          clearcoatRoughness={0.05}
          attenuationColor={new THREE.Color(VIOLET)}
          attenuationDistance={1.2}
          envMapIntensity={1.2}
          color="#ffffff"
        />
      </Sphere>

      {fragments.map((frag, i) => (
        <mesh
          key={i}
          ref={(el) => {
            fragmentRefs.current[i] = el;
          }}
          position={[frag.x, frag.y, frag.z]}
          rotation={[-Math.PI / 2 + (Math.random() - 0.5) * 0.15, frag.rotY, frag.rotZ]}
          scale={frag.scale}
        >
          <planeGeometry args={[0.62, 0.8]} />
          <meshBasicMaterial map={docTexture} transparent opacity={1} side={THREE.DoubleSide} />
        </mesh>
      ))}

      <mesh ref={docRef} position={[DOC_TARGET.x, DOC_TARGET.y, DOC_TARGET.z]}>
        <planeGeometry args={[1.05, 1.35]} />
        <meshBasicMaterial ref={docMatRef} map={finishedTexture} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function CinematicScene({
  isMobile,
  skip,
  onSettled,
}: {
  isMobile: boolean;
  skip: boolean;
  onSettled: () => void;
}) {
  // Nothing in the scene moves once the intro settles, so switch off the
  // continuous render loop: rendering an unchanging frame forever wastes
  // GPU/CPU (and, on constrained devices, can starve the main thread) for
  // no visual benefit.
  const [frameloop, setFrameloop] = useState<"always" | "demand">("always");
  const handleSettled = () => {
    setFrameloop("demand");
    onSettled();
  };

  return (
    <Canvas
      frameloop={frameloop}
      dpr={isMobile ? 1.5 : [1, 2]}
      camera={{ position: [0, 1.15, 6.2], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <fog attach="fog" args={[INK, 6, 15]} />
      <ambientLight intensity={0.5} color={VIOLET} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} color="#ffffff" />
      <pointLight position={[-3, 2, 2]} intensity={0.6} color={PURPLE} />
      <ProceduralEnvironment />
      <SceneContent isMobile={isMobile} skip={skip} onSettled={handleSettled} />
    </Canvas>
  );
}
