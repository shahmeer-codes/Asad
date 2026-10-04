'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Central abstract AI Core — layered geometric structure with particles */
export default function AICore() {
    const groupRef = useRef<THREE.Group>(null!);
    const innerRef = useRef<THREE.Mesh>(null!);
    const outerRef = useRef<THREE.Mesh>(null!);
    const ring1Ref = useRef<THREE.Mesh>(null!);
    const ring2Ref = useRef<THREE.Mesh>(null!);
    const particlesRef = useRef<THREE.Points>(null!);

    const particlePositions = useMemo(() => {
        const positions = new Float32Array(60 * 3);
        for (let i = 0; i < 60; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 0.4 + Math.random() * 0.3;
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        return positions;
    }, []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.15;
        }
        if (innerRef.current) {
            innerRef.current.rotation.x = t * 0.3;
            innerRef.current.rotation.z = t * 0.2;
            const breathe = 1 + Math.sin(t * 1.5) * 0.05;
            innerRef.current.scale.setScalar(breathe);
        }
        if (outerRef.current) {
            outerRef.current.rotation.y = -t * 0.1;
            outerRef.current.rotation.x = t * 0.08;
        }
        if (ring1Ref.current) {
            ring1Ref.current.rotation.x = t * 0.4;
            ring1Ref.current.rotation.z = t * 0.15;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.y = t * 0.3;
            ring2Ref.current.rotation.x = Math.PI / 3 + t * 0.1;
        }
        if (particlesRef.current) {
            particlesRef.current.rotation.y = t * 0.1;
            particlesRef.current.rotation.x = t * 0.05;
        }
    });

    return (
        <group ref={groupRef} position={[-1.5, 2.2, -2]}>
            {/* Inner core — icosahedron */}
            <mesh ref={innerRef}>
                <icosahedronGeometry args={[0.18, 1]} />
                <meshPhysicalMaterial
                    color="#3b82f6"
                    emissive="#2563eb"
                    emissiveIntensity={0.8}
                    transparent
                    opacity={0.7}
                    roughness={0.0}
                    metalness={0.3}
                    wireframe={false}
                />
            </mesh>

            {/* Outer shell — transparent */}
            <mesh ref={outerRef}>
                <icosahedronGeometry args={[0.3, 0]} />
                <meshPhysicalMaterial
                    color="#93c5fd"
                    transparent
                    opacity={0.12}
                    roughness={0.0}
                    metalness={0.1}
                    wireframe={true}
                />
            </mesh>

            {/* Ring 1 */}
            <mesh ref={ring1Ref}>
                <torusGeometry args={[0.35, 0.008, 8, 48]} />
                <meshStandardMaterial
                    color="#60a5fa"
                    emissive="#3b82f6"
                    emissiveIntensity={0.4}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Ring 2 */}
            <mesh ref={ring2Ref}>
                <torusGeometry args={[0.42, 0.005, 8, 48]} />
                <meshStandardMaterial
                    color="#818cf8"
                    emissive="#6366f1"
                    emissiveIntensity={0.3}
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Orbital particles */}
            <points ref={particlesRef}>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        args={[particlePositions, 3]}
                    />
                </bufferGeometry>
                <pointsMaterial
                    color="#60a5fa"
                    size={0.02}
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                />
            </points>

            {/* Central glow light */}
            <pointLight color="#3b82f6" intensity={0.8} distance={4} decay={2} />
        </group>
    );
}
