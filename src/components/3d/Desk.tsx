'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Futuristic floating desk with keyboard, mouse and laptop */
export default function Desk() {
    const laptopScreenRef = useRef<THREE.Mesh>(null!);
    const holoRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        // Subtle laptop screen glow pulse
        if (laptopScreenRef.current) {
            const mat = laptopScreenRef.current.material as THREE.MeshStandardMaterial;
            mat.emissiveIntensity = 0.3 + Math.sin(t * 1.5) * 0.1;
        }
        // Holographic float
        if (holoRef.current) {
            holoRef.current.position.y = 1.7 + Math.sin(t * 2) * 0.05;
            holoRef.current.rotation.y = t * 0.3;
        }
    });

    return (
        <group position={[0, 0, 0]}>
            {/* Desk surface - floating glass */}
            <mesh position={[0, 0.42, 0.3]} receiveShadow>
                <boxGeometry args={[1.6, 0.04, 0.8]} />
                <meshPhysicalMaterial
                    color="#e8edf2"
                    roughness={0.1}
                    metalness={0.3}
                    transparent
                    opacity={0.85}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </mesh>

            {/* Desk legs — slim metallic */}
            {[[-0.7, 0.21, -0.05], [0.7, 0.21, -0.05], [-0.7, 0.21, 0.6], [0.7, 0.21, 0.6]].map((p, i) => (
                <mesh key={i} position={p as [number, number, number]} castShadow>
                    <cylinderGeometry args={[0.015, 0.015, 0.42, 8]} />
                    <meshStandardMaterial color="#c0c8d4" metalness={0.7} roughness={0.25} />
                </mesh>
            ))}

            {/* Laptop base */}
            <mesh position={[0, 0.46, 0.15]} castShadow>
                <boxGeometry args={[0.5, 0.015, 0.35]} />
                <meshStandardMaterial color="#d0d5dc" metalness={0.5} roughness={0.3} />
            </mesh>

            {/* Laptop screen */}
            <group position={[0, 0.62, -0.02]} rotation={[-0.15, 0, 0]}>
                <mesh castShadow>
                    <boxGeometry args={[0.5, 0.32, 0.01]} />
                    <meshStandardMaterial color="#c5cbd4" metalness={0.5} roughness={0.3} />
                </mesh>
                {/* Screen display */}
                <mesh ref={laptopScreenRef} position={[0, 0, 0.006]}>
                    <planeGeometry args={[0.45, 0.27]} />
                    <meshStandardMaterial
                        color="#0f172a"
                        emissive="#3b82f6"
                        emissiveIntensity={0.3}
                        roughness={0.0}
                    />
                </mesh>
                {/* Code lines on screen */}
                {[0.08, 0.04, 0, -0.04, -0.08].map((y, i) => (
                    <mesh key={i} position={[-0.05 + i * 0.02, y, 0.008]}>
                        <planeGeometry args={[0.15 + Math.random() * 0.12, 0.012]} />
                        <meshBasicMaterial color={i % 2 === 0 ? '#60a5fa' : '#34d399'} transparent opacity={0.6} />
                    </mesh>
                ))}
            </group>

            {/* Keyboard */}
            <mesh position={[0, 0.448, 0.5]}>
                <boxGeometry args={[0.35, 0.008, 0.12]} />
                <meshStandardMaterial color="#d8dde5" metalness={0.4} roughness={0.35} />
            </mesh>

            {/* Mouse */}
            <mesh position={[0.35, 0.448, 0.5]}>
                <capsuleGeometry args={[0.02, 0.03, 4, 8]} />
                <meshStandardMaterial color="#d8dde5" metalness={0.4} roughness={0.35} />
            </mesh>

            {/* Holographic floating AI interface */}
            <group ref={holoRef} position={[0.6, 1.7, 0]}>
                <mesh>
                    <octahedronGeometry args={[0.08, 0]} />
                    <meshPhysicalMaterial
                        color="#3b82f6"
                        transparent
                        opacity={0.4}
                        roughness={0.0}
                        metalness={0.2}
                        emissive="#3b82f6"
                        emissiveIntensity={0.5}
                    />
                </mesh>
                {/* Ring */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.12, 0.005, 8, 32]} />
                    <meshStandardMaterial color="#60a5fa" transparent opacity={0.5} emissive="#60a5fa" emissiveIntensity={0.4} />
                </mesh>
            </group>
        </group>
    );
}
