/* eslint-disable react/no-unknown-property -- R3F/Three.js native props */
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import PropTypes from "prop-types";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    setMobile(mq.matches);
    const onChange = () => setMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return mobile;
}

function WireArchitecture({ reduced, mobile }) {
  const group = useRef();
  const ring = useRef();
  const core = useRef();
  // pointer target from mouse/touch; smoothed lag for soft motion
  const pointer = useRef({ x: 0, y: 0 });
  const smooth = useRef({ x: 0, y: 0 });
  const lastInput = useRef(0);
  const interacting = useRef(false);

  // Mobile: same black mesh, just quieter so type stays readable
  const opacityScale = mobile ? 0.32 : 0.85;

  useEffect(() => {
    if (reduced) return undefined;

    const setFromClient = (clientX, clientY) => {
      pointer.current.x = (clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -(clientY / window.innerHeight) * 2 + 1;
      lastInput.current = performance.now();
      interacting.current = true;
    };

    const onPointerMove = (e) => {
      // On touch, only track while pressed so scroll still works
      if (e.pointerType === "touch" && e.buttons === 0 && !interacting.current) {
        return;
      }
      setFromClient(e.clientX, e.clientY);
    };

    const onPointerDown = (e) => {
      interacting.current = true;
      setFromClient(e.clientX, e.clientY);
    };

    const onPointerUp = () => {
      interacting.current = false;
      lastInput.current = performance.now();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("pointercancel", onPointerUp, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [reduced]);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    if (!reduced) {
      // Idle drift when finger/mouse goes quiet (feels alive on mobile)
      const idleMs = performance.now() - lastInput.current;
      const idle = !interacting.current && idleMs > 900;

      let targetX = pointer.current.x;
      let targetY = pointer.current.y;

      if (idle) {
        targetX = Math.sin(t * 0.45) * 0.55;
        targetY = Math.cos(t * 0.32) * 0.35;
      }

      // Same smoothing everywhere
      smooth.current.x += (targetX - smooth.current.x) * 0.06;
      smooth.current.y += (targetY - smooth.current.y) * 0.06;

      const px = smooth.current.x;
      const py = smooth.current.y;

      // Identical motion parameters to desktop
      group.current.rotation.y = t * 0.12 + px * 0.35;
      group.current.rotation.x = 0.25 + py * 0.18;

      if (ring.current) {
        ring.current.rotation.z = t * 0.4;
        ring.current.rotation.x = Math.sin(t * 0.3) * 0.2;
      }

      if (core.current) {
        core.current.rotation.y = -t * 0.35;
        core.current.rotation.z = t * 0.12;
        core.current.position.y = Math.sin(t * 0.8) * 0.1;
        const pulse = 1 + Math.sin(t * 1.4) * 0.03;
        core.current.scale.setScalar(pulse);
      }
    } else {
      group.current.rotation.y = 0.4;
      group.current.rotation.x = 0.2;
    }
  });

  const nodes = useMemo(() => {
    const pts = [];
    const count = 20;
    for (let i = 0; i < count; i += 1) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      pts.push(
        new THREE.Vector3(
          Math.cos(theta) * Math.sin(phi) * 2.15,
          Math.sin(theta) * Math.sin(phi) * 2.15,
          Math.cos(phi) * 2.15
        )
      );
    }
    return pts;
  }, []);

  const lineGeometry = useMemo(() => {
    const positions = [];
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        if (nodes[i].distanceTo(nodes[j]) < 2.25) {
          positions.push(...nodes[i].toArray(), ...nodes[j].toArray());
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geo;
  }, [nodes]);

  useEffect(() => {
    return () => lineGeometry.dispose();
  }, [lineGeometry]);

  return (
    <group
      ref={group}
      position={mobile ? [0.25, -0.05, 0] : [0.15, 0.1, 0]}
      scale={mobile ? 1.08 : 1.05}
    >
      <mesh ref={core}>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshBasicMaterial
          color="#111111"
          wireframe
          transparent
          opacity={0.9 * opacityScale}
        />
      </mesh>

      <mesh scale={0.55}>
        <octahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#111111"
          wireframe
          transparent
          opacity={0.35 * opacityScale}
        />
      </mesh>

      <mesh ref={ring} scale={1.55}>
        <torusGeometry args={[1.05, 0.016, 16, 120]} />
        <meshBasicMaterial
          color="#111111"
          transparent
          opacity={0.5 * opacityScale}
        />
      </mesh>

      <mesh scale={1.95} rotation={[Math.PI / 2.4, 0.45, 0.25]}>
        <torusGeometry args={[1.05, 0.01, 12, 90]} />
        <meshBasicMaterial
          color="#111111"
          transparent
          opacity={0.25 * opacityScale}
        />
      </mesh>

      {nodes.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.035, 10, 10]} />
          <meshBasicMaterial
            color="#111111"
            transparent
            opacity={opacityScale}
          />
        </mesh>
      ))}

      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          color="#111111"
          transparent
          opacity={0.22 * opacityScale}
        />
      </lineSegments>
    </group>
  );
}

WireArchitecture.propTypes = {
  reduced: PropTypes.bool,
  mobile: PropTypes.bool,
};

function SceneContent({ reduced, mobile }) {
  return (
    <>
      <color attach="background" args={["#f0f0e9"]} />
      <ambientLight intensity={1} />
      <WireArchitecture reduced={reduced} mobile={mobile} />
      <fog attach="fog" args={["#f0f0e9", 6.5, 13]} />
    </>
  );
}

SceneContent.propTypes = {
  reduced: PropTypes.bool,
  mobile: PropTypes.bool,
};

export default function HeroCanvas() {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="absolute inset-0 bg-[#f0f0e9]" aria-hidden="true" />;
  }

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{
          position: mobile ? [0.2, 0, 5.3] : [0, 0, 5.2],
          fov: 42,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <SceneContent reduced={reduced} mobile={mobile} />
        </Suspense>
      </Canvas>
      <div
        className={`pointer-events-none absolute inset-0 ${
          mobile
            ? "bg-gradient-to-b from-[#f0f0e9]/90 via-[#f0f0e9]/75 to-[#f0f0e9]/5"
            : "bg-gradient-to-r from-[#f0f0e9] via-[#f0f0e9]/55 to-transparent"
        }`}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f0f0e9] to-transparent" />
    </div>
  );
}
