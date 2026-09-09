import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
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

function SceneContents() {
  const group = useRef<THREE.Group>(null);
  const progressRef = useRef(0);
  const particleCount = typeof window !== "undefined" && window.innerWidth < 768 ? 260 : 560;

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector<HTMLElement>("#bismillah");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      progressRef.current = clamp01((vh - rect.top) / (vh + rect.height));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useFrame(() => {
    if (!group.current) return;
    const progress = progressRef.current;
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
        <SceneContents />
      </Canvas>
    </div>
  );
}
