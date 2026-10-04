'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AvatarProps {
    mouseX?: number;
    mouseY?: number;
}

/** Stylized geometric avatar representing Asad at a workstation */
export default function Avatar({ mouseX = 0, mouseY = 0 }: AvatarProps) {
    const groupRef = useRef<THREE.Group>(null!);
    const headRef = useRef<THREE.Group>(null!);
    const targetRot = useRef({ x: 0, y: 0 });

    useFrame((_, delta) => {
        // Subtle head tracking toward mouse
        targetRot.current.y = mouseX * 0.15;
        targetRot.current.x = -mouseY * 0.08;

        if (headRef.current) {
            headRef.current.rotation.y += (targetRot.current.y - headRef.current.rotation.y) * delta * 3;
            headRef.current.rotation.x += (targetRot.current.x - headRef.current.rotation.x) * delta * 3;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* Body / Torso - White shirt */}
            <mesh position={[0, 0.85, 0]}>
                <capsuleGeometry args={[0.28, 0.5, 8, 16]} />
                <meshStandardMaterial color="#f0f0f0" roughness={0.4} metalness={0.05} />
            </mesh>

            {/* Head Group - tracks mouse */}
            <group ref={headRef} position={[0, 1.65, 0]}>
                {/* Head */}
                <mesh>
                    <sphereGeometry args={[0.22, 16, 16]} />
                    <meshStandardMaterial color="#e8d5c4" roughness={0.6} metalness={0.0} />
                </mesh>

                {/* Hair */}
                <mesh position={[0, 0.1, -0.02]}>
                    <sphereGeometry args={[0.23, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
                </mesh>

                {/* Glasses - Round frames */}
                <group position={[0, -0.02, 0.18]}>
                    {/* Left lens */}
                    <mesh position={[-0.08, 0, 0]} rotation={[0, 0, 0]}>
                        <torusGeometry args={[0.045, 0.003, 8, 24]} />
                        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
                    </mesh>
                    {/* Right lens */}
                    <mesh position={[0.08, 0, 0]} rotation={[0, 0, 0]}>
                        <torusGeometry args={[0.045, 0.003, 8, 24]} />
                        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
                    </mesh>
                    {/* Bridge */}
                    <mesh position={[0, 0, 0.01]}>
                        <boxGeometry args={[0.03, 0.003, 0.003]} />
                        <meshStandardMaterial color="#0a0a0a" metalness={0.7} roughness={0.3} />
                    </mesh>
                    {/* Lens glass */}
                    <mesh position={[-0.08, 0, 0.005]}>
                        <circleGeometry args={[0.04, 24]} />
                        <meshPhysicalMaterial color="#d4e8f7" transparent opacity={0.15} roughness={0.0} metalness={0.1} />
                    </mesh>
                    <mesh position={[0.08, 0, 0.005]}>
                        <circleGeometry args={[0.04, 24]} />
                        <meshPhysicalMaterial color="#d4e8f7" transparent opacity={0.15} roughness={0.0} metalness={0.1} />
                    </mesh>
                </group>

                {/* Eyes */}
                <mesh position={[-0.07, -0.02, 0.19]}>
                    <sphereGeometry args={[0.015, 8, 8]} />
                    <meshStandardMaterial color="#1a1a2e" />
                </mesh>
                <mesh position={[0.07, -0.02, 0.19]}>
                    <sphereGeometry args={[0.015, 8, 8]} />
                    <meshStandardMaterial color="#1a1a2e" />
                </mesh>

                {/* Mustache */}
                <mesh position={[0, -0.065, 0.20]} rotation={[0.1, 0, 0]}>
                    <torusGeometry args={[0.03, 0.006, 8, 16, Math.PI]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
                </mesh>

                {/* Goatee */}
                <mesh position={[0, -0.12, 0.17]} rotation={[0.4, 0, 0]}>
                    <boxGeometry args={[0.025, 0.015, 0.01]} />
                    <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
                </mesh>
            </group>

            {/* Arms */}
            <mesh position={[-0.4, 0.7, 0.15]} rotation={[0.5, 0, 0.2]}>
                <capsuleGeometry args={[0.06, 0.4, 4, 8]} />
                <meshStandardMaterial color="#f0f0f0" roughness={0.4} />
            </mesh>
            <mesh position={[0.4, 0.7, 0.15]} rotation={[0.5, 0, -0.2]}>
                <capsuleGeometry args={[0.06, 0.4, 4, 8]} />
                <meshStandardMaterial color="#f0f0f0" roughness={0.4} />
            </mesh>

            {/* Hands */}
            <mesh position={[-0.45, 0.45, 0.4]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshStandardMaterial color="#e8d5c4" roughness={0.6} />
            </mesh>
            <mesh position={[0.45, 0.45, 0.4]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshStandardMaterial color="#e8d5c4" roughness={0.6} />
            </mesh>
        </group>
    );
}
