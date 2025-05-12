// src/components/ParticleMorphCanvas.jsx
import * as THREE from "three";
import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

function ParticleMorph() {
  const count = 60000;
  const meshRef = useRef();
  const [targetIndex, setTargetIndex] = useState(0);
  const shapeIndex = useRef(0);
  const mouse = useRef(new THREE.Vector2());
  const scatterAmount = useRef(new Float32Array(count).fill(0));

  // 犬の点群（省略） → 必要に応じて細密化可
  const dogPoints = useMemo(() => {
    const arr = new Float32Array(count * 3).fill(0);
    for (let i = 0; i < 300; i++) {
      arr[i * 3] = Math.random() * 20 - 10;
      arr[i * 3 + 1] = Math.random() * 20 - 10;
      arr[i * 3 + 2] = Math.random() * 20 - 10;
    }
    return arr;
  }, []);

  const scale = 6;
  const shapes = useMemo(() => {
    const arrs = [];

    // 球体
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 1.5 + 0.3;
      const angle = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 2;
      a[i * 3] = Math.sin(angle) * r * scale;
      a[i * 3 + 1] = Math.cos(angle) * r * scale;
      a[i * 3 + 2] = z * scale;
    }
    arrs.push(a);

    // 星型
    const b = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 1.8 + 0.3;
      b[i * 3] = Math.sin(angle) * radius * scale;
      b[i * 3 + 1] = Math.cos(angle) * radius * 0.5 * scale;
      b[i * 3 + 2] = (Math.random() - 0.5) * 2 * scale;
    }
    arrs.push(b);

    // 鳥型
    const c = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random();
      const angle = Math.random() * Math.PI * 2;
      c[i * 3] = Math.cos(angle) * r * scale * 3;
      c[i * 3 + 1] = Math.sin(angle * 3) * r * scale * 1.5;
      c[i * 3 + 2] = (Math.random() - 0.5) * 2 * scale;
    }
    arrs.push(c);

    // 犬シルエット
    arrs.push(dogPoints);

    return arrs;
  }, [count, scale, dogPoints]);

  const initial = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, [count]);

  const positions = useRef(initial.slice());

  useEffect(() => {
    const activeIndices = [0, 1, 2];
    let currentIndex = 0;
    const interval = setInterval(() => {
      shapeIndex.current = activeIndices[currentIndex];
      setTargetIndex(shapeIndex.current);
      currentIndex = (currentIndex + 1) % activeIndices.length;
    }, 3000);
    return () => clearInterval(interval);
  }, [shapes.length]);

  const { size } = useThree();
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / size.width) * 2 - 1;
      mouse.current.y = -(e.clientY / size.height) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [size]);

  useFrame(({ clock, camera }) => {
    const time = clock.getElapsedTime();
    const pos = meshRef.current.geometry.attributes.position.array;
    const target = shapes[targetIndex] || positions.current;

    const mouse3D = new THREE.Vector3(mouse.current.x, mouse.current.y, 0.5);
    mouse3D.unproject(camera);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const p = new THREE.Vector3(pos[i3], pos[i3 + 1], pos[i3 + 2]);
      const dist = p.distanceTo(mouse3D);

      if (dist < 3) {
        scatterAmount.current[i] = Math.min(1, scatterAmount.current[i] + 0.1);
      } else {
        scatterAmount.current[i] *= 0.92;
      }

      const scatter = scatterAmount.current[i];

      pos[i3] +=
        (target[i3] - pos[i3]) * 0.035 + (Math.random() - 0.5) * scatter * 0.3;
      pos[i3 + 1] +=
        (target[i3 + 1] - pos[i3 + 1]) * 0.035 +
        Math.sin(time + i) * 0.002 +
        (Math.random() - 0.5) * scatter * 0.3;
      pos[i3 + 2] +=
        (target[i3 + 2] - pos[i3 + 2]) * 0.035 +
        (Math.random() - 0.5) * scatter * 0.3;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions.current}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#66ccff" transparent opacity={0.9} />
    </points>
  );
}

export default function ParticleMorphCanvas() {
  return (
    <div className="fixed inset-0 h-screen w-screen z-[-5] pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        <ambientLight />
        <directionalLight position={[3, 2, 1]} />
        <ParticleMorph />
      </Canvas>
    </div>
  );
}
