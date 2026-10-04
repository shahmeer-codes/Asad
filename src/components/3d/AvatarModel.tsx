'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AvatarModel() {
    const avatarGroupRef = useRef<THREE.Group>(null!);
    const headGroupRef = useRef<THREE.Group>(null!);
    const pedestalRingRef = useRef<THREE.Mesh>(null!);
    const hologramRingRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        const pointer = state.pointer; // Mouse coords [-1, 1]
        const dt = Math.min(delta, 0.1);

        // Smooth head turning exponential damp
        if (headGroupRef.current) {
            const targetRotY = pointer.x * 0.45;
            const targetRotX = -pointer.y * 0.3;

            headGroupRef.current.rotation.y = THREE.MathUtils.damp(
                headGroupRef.current.rotation.y,
                targetRotY,
                5.0,
                dt
            );
            headGroupRef.current.rotation.x = THREE.MathUtils.damp(
                headGroupRef.current.rotation.x,
                targetRotX,
                5.0,
                dt
            );
        }

        // Breathing/floating idle loop for body
        if (avatarGroupRef.current) {
            avatarGroupRef.current.position.y = Math.sin(t * 1.5) * 0.04;
        }

        // Rotate cyber pedestal rings
        if (pedestalRingRef.current) {
            pedestalRingRef.current.rotation.z = t * 0.5;
        }
        if (hologramRingRef.current) {
            hologramRingRef.current.rotation.z = -t * 0.8;
            const scalePulse = 1 + Math.sin(t * 3) * 0.04;
            hologramRingRef.current.scale.set(scalePulse, scalePulse, scalePulse);
        }
    });

    return (
        <group ref={avatarGroupRef} position={[0, -0.6, 0]}>
            {/* Cybernetic Pedestal Station */}
            <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[1.2, 1.4, 0.25, 32]} />
                <meshStandardMaterial color="#0B0F19" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Glowing Cyan Ring on Pedestal */}
            <mesh ref={pedestalRingRef} position={[0, -0.66, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[1.1, 1.18, 48]} />
                <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.5} side={THREE.DoubleSide} />
            </mesh>

            {/* Hyper Violet Hologram Disk */}
            <mesh ref={hologramRingRef} position={[0, -0.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.7, 0.95, 36]} />
                <meshBasicMaterial color="#8B5CF6" transparent opacity={0.35} side={THREE.DoubleSide} />
            </mesh>

            {/* Stylized AI Engineer Avatar Body */}
            <group position={[0, 0, 0]}>
                {/* Torso / Cyber Jacket */}
                <mesh position={[0, 0.6, 0]}>
                    <capsuleGeometry args={[0.3, 0.6, 12, 24]} />
                    <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.3} />
                </mesh>

                {/* Cyber Collar Light Accent */}
                <mesh position={[0, 1.0, 0.05]} rotation={[0.2, 0, 0]}>
                    <torusGeometry args={[0.18, 0.015, 8, 24]} />
                    <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.8} />
                </mesh>

                {/* Head Group (tracks mouse cursor) */}
                <group ref={headGroupRef} position={[0, 1.35, 0]}>
                    {/* Head Skull Mesh */}
                    <mesh>
                        <sphereGeometry args={[0.24, 24, 24]} />
                        <meshStandardMaterial color="#1E293B" metalness={0.4} roughness={0.4} />
                    </mesh>

                    {/* Cyber Visor / HUD Glass */}
                    <mesh position={[0, 0.02, 0.16]} rotation={[0.1, 0, 0]}>
                        <boxGeometry args={[0.32, 0.1, 0.15]} />
                        <meshPhysicalMaterial
                            color="#00F0FF"
                            emissive="#00F0FF"
                            emissiveIntensity={0.6}
                            transparent
                            opacity={0.8}
                            roughness={0.1}
                            metalness={0.9}
                            clearcoat={1}
                        />
                    </mesh>

                    {/* Neural Headset Nodes */}
                    <mesh position={[-0.26, 0, 0]}>
                        <sphereGeometry args={[0.04, 12, 12]} />
                        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={1.2} />
                    </mesh>
                    <mesh position={[0.26, 0, 0]}>
                        <sphereGeometry args={[0.04, 12, 12]} />
                        <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={1.2} />
                    </mesh>

                    {/* Visor Data Glow Line */}
                    <mesh position={[0, 0.02, 0.24]}>
                        <boxGeometry args={[0.26, 0.01, 0.01]} />
                        <meshBasicMaterial color="#00F0FF" />
                    </mesh>
                </group>

                {/* Cybernetic Arms */}
                <mesh position={[-0.42, 0.5, 0.1]} rotation={[0.4, 0, 0.2]}>
                    <capsuleGeometry args={[0.07, 0.45, 8, 16]} />
                    <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
                </mesh>
                <mesh position={[0.42, 0.5, 0.1]} rotation={[0.4, 0, -0.2]}>
                    <capsuleGeometry args={[0.07, 0.45, 8, 16]} />
                    <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.3} />
                </mesh>
            </group>

            {/* Overhead Spotlight on Avatar */}
            <spotLight
                position={[0, 3.5, 2]}
                angle={0.6}
                penumbra={0.5}
                intensity={3.0}
                color="#00F0FF"
            />
            <pointLight position={[0, 0.5, 1.5]} intensity={1.5} color="#8B5CF6" distance={4} />
        </group>
    );
}
