import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import * as THREE from "three";
import { useScrollProgress } from "@/hooks/use-parallax";

type FadableMaterial = THREE.Material & { opacity: number; transparent: boolean };

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function themeColor(name: string, fallback: string) {
  if (typeof document === "undefined") return new THREE.Color(fallback);
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return new THREE.Color(value || fallback);
}

function CameraDrift() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      target.current.x = (event.clientX / window.innerWidth - 0.5) * 0.7;
      target.current.y = (event.clientY / window.innerHeight - 0.5) * 0.45;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const amount = 1 - Math.exp(-2.6 * Math.min(delta, 0.05));
    camera.position.x += (target.current.x - camera.position.x) * amount;
    camera.position.y += (target.current.y - camera.position.y) * amount;
    camera.lookAt(0, 0.15, -1.2);
  });

  return null;
}

function ParticleField({ count }: { count: number }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    let seed = 17;
    const random = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };

    for (let i = 0; i < count; i += 1) {
      const radius = 1.5 + random() * 4.8;
      const angle = random() * Math.PI * 2;
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (random() - 0.42) * 5.3;
      positions[i * 3 + 2] = -1.4 - random() * 4.5;
    }

    const next = new THREE.BufferGeometry();
    next.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return next;
  }, [count]);

  const points = useRef<THREE.Points>(null);
  const color = useMemo(() => themeColor("--gold", "#d8aa62"), []);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame(({ clock }, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.018;
    points.current.rotation.x = Math.sin(clock.elapsedTime * 0.08) * 0.04;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial
        color={color}
        size={0.035}
        transparent
        opacity={0.62}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}

function LightVessel({ index }: { index: number }) {
  const group = useRef<THREE.Group>(null);
  const color = useMemo(() => themeColor("--gold", "#d8aa62"), []);
  const ember = useMemo(() => themeColor("--ember", "#bf6c3b"), []);
  const phase = index * 1.21;
  const x = (index - 2) * 1.28;
  const y = index % 2 === 0 ? 0.75 : -0.4;
  const scale = index % 2 === 0 ? 0.82 : 0.58;

  useFrame(({ clock }) => {
    if (!group.current) return;
    const time = clock.elapsedTime * 0.34 + phase;
    group.current.position.y = y + Math.sin(time) * 0.18;
    group.current.rotation.z = Math.sin(time * 0.7) * 0.08;
    group.current.rotation.y += 0.002;
  });

  return (
    <group ref={group} position={[x, y, -1.5 - (index % 3) * 0.65]} scale={scale}>
      <mesh position={[0, 0.38, 0]}>
        <torusGeometry args={[0.17, 0.018, 8, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.82} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[0.18, 0.12, 0.46, 8]} />
        <meshStandardMaterial
          color={color}
          emissive={ember}
          emissiveIntensity={1.7}
          metalness={0.35}
          roughness={0.32}
          transparent
          opacity={0.9}
        />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <coneGeometry args={[0.13, 0.16, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.72} />
      </mesh>
      <pointLight color={ember} intensity={0.22} distance={2.4} />
    </group>
  );
}

function HazePlane() {
  const material = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uGold: { value: themeColor("--gold", "#d8aa62") },
      uDusk: { value: themeColor("--dusk", "#38466d") },
    }),
    [],
  );

  useFrame(({ clock }) => {
    if (material.current) material.current.uniforms.uTime.value = clock.elapsedTime;
  });

  return (
    <mesh position={[0, 0.2, -4.8]} scale={[7.5, 5.3, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        vertexShader={
          /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `
        }
        fragmentShader={
          /* glsl */ `
          uniform float uTime;
          uniform vec3 uGold;
          uniform vec3 uDusk;
          varying vec2 vUv;
          void main() {
            vec2 centered = vUv - 0.5;
            float distanceFromCenter = length(centered * vec2(1.0, 1.2));
            float bloom = exp(-distanceFromCenter * 5.2);
            float drift = sin(vUv.x * 5.0 + uTime * 0.08) * 0.025;
            vec3 color = mix(uDusk, uGold, bloom * 0.38 + drift);
            float alpha = bloom * 0.22;
            gl_FragColor = vec4(color, alpha);
          }
        `
        }
      />
    </mesh>
  );
}

function SceneContents({ wrapper }: { wrapper: RefObject<HTMLDivElement | null> }) {
  const group = useRef<THREE.Group>(null);
  const particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 260 : 560;

  useFrame(() => {
    if (!group.current || !wrapper.current) return;
    const progress = Number.parseFloat(wrapper.current.style.getPropertyValue("--p")) || 0.5;
    const leave = clamp01(Math.max(0, progress - 0.52) * 3.1);
    group.current.scale.setScalar(1 + leave * 0.08);
    group.current.position.y = leave * 0.35;
    group.current.traverse((object) => {
      if (!(object instanceof THREE.Mesh || object instanceof THREE.Points)) return;
      const material = object.material as FadableMaterial | FadableMaterial[];
      const materials = Array.isArray(material) ? material : [material];
      materials.forEach((entry) => {
        if ("opacity" in entry) entry.opacity = Math.max(0.08, 1 - leave);
      });
    });
  });

  return (
    <>
      <CameraDrift />
      <ambientLight intensity={0.42} color={themeColor("--dusk", "#38466d")} />
      <group ref={group}>
        <HazePlane />
        <ParticleField count={particleCount} />
        {Array.from({ length: 5 }, (_, index) => (
          <LightVessel key={index} index={index} />
        ))}
      </group>
    </>
  );
}

export function WebGLHero() {
  const wrapper = useScrollProgress<HTMLDivElement>();

  return (
    <div ref={wrapper} className="webgl-hero absolute inset-0" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <SceneContents wrapper={wrapper} />
      </Canvas>
    </div>
  );
}
