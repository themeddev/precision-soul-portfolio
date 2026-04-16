import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDirection;
    varying float vNoise;
    uniform float uTime;
    uniform vec2 uPointer;

    vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
    vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;

      i = mod(i, 289.0);
      vec4 p = permute(
        permute(
          permute(i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0)
        )
        + i.x + vec4(0.0, i1.x, i2.x, 1.0)
      );

      float n_ = 1.0 / 7.0;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(
        m * m,
        vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3))
      );
    }

    void main() {
      vec3 transformed = position;
      vec3 noiseCoord = normalize(position) * 2.1 + vec3(uPointer * 0.35, uTime * 0.16);
      float primaryNoise = snoise(noiseCoord);
      float secondaryNoise = snoise(position * 1.65 - vec3(0.0, 0.0, uTime * 0.22));
      float displacement = primaryNoise * 0.22 + secondaryNoise * 0.08;

      transformed += normal * displacement;

      vec4 modelPosition = modelMatrix * vec4(transformed, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;

      vNormal = normalize(normalMatrix * normal);
      vWorldPosition = modelPosition.xyz;
      vViewDirection = normalize(cameraPosition - modelPosition.xyz);
      vNoise = primaryNoise;

      gl_Position = projectionMatrix * viewPosition;
    }
  `;

const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    varying vec3 vViewDirection;
    varying float vNoise;
    uniform float uTime;

    vec3 spectralPalette(float t) {
      vec3 a = vec3(0.12, 0.14, 0.18);
      vec3 b = vec3(0.45, 0.40, 0.48);
      vec3 c = vec3(1.0, 1.0, 1.0);
      vec3 d = vec3(0.02, 0.15, 0.28);
      return a + b * cos(6.28318 * (c * t + d));
    }

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewDirection);
      float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.8);

      vec3 lightA = normalize(vec3(0.45, 0.8, 0.9));
      vec3 lightB = normalize(vec3(-0.8, 0.2, 0.45));
      float diffuseA = max(dot(normal, lightA), 0.0);
      float diffuseB = max(dot(normal, lightB), 0.0);
      vec3 halfA = normalize(lightA + viewDir);
      vec3 halfB = normalize(lightB + viewDir);
      float specA = pow(max(dot(normal, halfA), 0.0), 38.0);
      float specB = pow(max(dot(normal, halfB), 0.0), 24.0);

      float spectralShift = fresnel * 0.9 + vNoise * 0.12 + uTime * 0.04;
      vec3 iridescence = spectralPalette(spectralShift);

      vec3 chromeBase = vec3(0.03, 0.035, 0.05);
      vec3 reflected = mix(vec3(0.15, 0.18, 0.24), vec3(0.78, 0.84, 0.95), fresnel);
      vec3 color = chromeBase + reflected * (diffuseA * 0.3 + diffuseB * 0.18);
      color += iridescence * fresnel * 0.85;
      color += vec3(1.0) * specA * 0.9;
      color += vec3(1.0, 0.92, 0.88) * specB * 0.45;
      color += iridescence * specB * 0.3;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

interface BlobMeshProps {
  reducedMotion: boolean;
}

const BlobMesh: React.FC<BlobMeshProps> = ({ reducedMotion }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pointer = useMemo(() => new THREE.Vector2(0, 0), []);
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2(0, 0) },
        },
        vertexShader,
        fragmentShader,
      }),
    []
  );

  useFrame((state, delta) => {
    if (!meshRef.current) {
      return;
    }

    const elapsed = state.clock.getElapsedTime();
    const pointerTargetX = state.pointer.x * 0.18;
    const pointerTargetY = state.pointer.y * 0.12;

    pointer.lerp(new THREE.Vector2(pointerTargetX, pointerTargetY), 0.06);
    material.uniforms.uPointer.value.copy(pointer);
    material.uniforms.uTime.value = reducedMotion ? 0 : elapsed;

    const targetRotationY = reducedMotion ? 0.2 : elapsed * 0.12 + pointer.x * 0.6;
    const targetRotationX = reducedMotion ? -0.15 : pointer.y * 0.35 + Math.sin(elapsed * 0.35) * 0.08;

    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, delta * 1.8);
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, delta * 1.8);
  });

  return (
    <mesh ref={meshRef} scale={1.55}>
      <icosahedronGeometry args={[1, 42]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
};

export const HeroBlobCanvas: React.FC = () => {
  return (
    <div className="h-full w-full">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 4.4], fov: 32 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.18} />
        <directionalLight position={[2.5, 3, 4]} intensity={1.45} color="#f8fbff" />
        <directionalLight position={[-3, -1.5, 2]} intensity={0.55} color="#ff825d" />
        <BlobMesh reducedMotion={false} />
      </Canvas>
    </div>
  );
};
