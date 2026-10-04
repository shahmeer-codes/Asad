'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingObjectsProps {
    enabled?: boolean;
}

interface FloatItem {
    pos: [number, number, number];
    geo: 'torus' | 'sphere' | 'icosa' | 'ring' | 'octahedron';
    scale: number;
    speed: number;
    rotSpeed: number;
    phase: number;
}

/** Subtle floating geometric objects for depth and visual interest */
export default function FloatingObjects({ enabled = true }: FloatingObjectsProps) {
    const groupRef = useRef<THREE.Group>(null!);

    const items = useMemo<FloatItem[]>(() => {
        if (!enabled) return [];
        return [
            { pos: [4, 3, -3], geo: 'torus', scale: 0.2, speed: 0.3, rotSpeed: 0.5, phase: 0 },
            { pos: [-5, 4, -6], geo: 'icosa', scale: 0.15, speed: 0.4, rotSpeed: 0.3, phase: 1 },
            { pos: [3, 1, -8], geo: 'sphere', scale: 0.12, speed: 0.5, rotSpeed: 0.2, phase: 2 },
            { pos: [-3, 5, -1], geo: 'ring', scale: 0.25, speed: 0.25, rotSpeed: 0.6, phase: 3 },
            { pos: [6, 2, -10], geo: 'octahedron', scale: 0.13, speed: 0.35, rotSpeed: 0.4, phase: 4 },
            { pos: [-6, 3, -12], geo: 'torus', scale: 0.18, speed: 0.3, rotSpeed: 0.35, phase: 5 },
            { pos: [2, 5.5, -5], geo: 'sphere', scale: 0.1, speed: 0.45, rotSpeed: 0.25, phase: 6 },
            { pos: [-4, 1.5, -15], geo: 'icosa', scale: 0.2, speed: 0.3, rotSpeed: 0.4, phase: 7 },
        ];
    }, [enabled]);

    useFrame((state) => {
        if (!groupRef.current || !enabled) return;
        const t = state.clock.elapsedTime;
        const children = groupRef.current.children;
        for (let i = 0; i < children.length; i++) {
            const item = items[i];
            if (!item) continue;
            const mesh = children[i];
            mesh.position.y = item.pos[1] + Math.sin(t * item.speed + item.phase) * 0.3;
            mesh.rotation.x += item.rotSpeed * 0.005;
            mesh.rotation.y += item.rotSpeed * 0.003;
        }
    });

    if (!enabled) return null;

    const renderGeometry = (geo: FloatItem['geo']) => {
        switch (geo) {
            case 'torus': return <torusGeometry args={[1, 0.3, 8, 24]} />;
            case 'sphere': return <sphereGeometry args={[1, 12, 12]} />;
            case 'icosa': return <icosahedronGeometry args={[1, 0]} />;
            case 'ring': return <torusGeometry args={[1, 0.08, 8, 32]} />;
            case 'octahedron': return <octahedronGeometry args={[1, 0]} />;
        }
    };

    return (
        <group ref={groupRef}>
            {items.map((item, i) => (
                <mesh key={i} position={item.pos} scale={item.scale}>
                    {renderGeometry(item.geo)}
                    <meshPhysicalMaterial
                        color="#dbe4f0"
                        roughness={0.05}
                        metalness={0.15}
                        transparent
                        opacity={0.35}
                        clearcoat={1}
                    />
                </mesh>
            ))}
        </group>
    );
}
