'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpatialProjectNodeProps {
    position: [number, number, number];
    title: string;
    isHovered: boolean;
    onHover: (hovered: boolean) => void;
    onClick?: () => void;
}

export default function SpatialProjectNode({
    position,
    title,
    isHovered,
    onHover,
    onClick,
}: SpatialProjectNodeProps) {
    const groupRef = useRef<THREE.Group>(null!);
    const innerWireframeRef = useRef<THREE.Mesh>(null!);
    const outerRingRef = useRef<THREE.Mesh>(null!);

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;

        if (groupRef.current) {
            const hoverScale = isHovered ? 1.3 : 1.0;
            groupRef.current.scale.lerp(new THREE.Vector3(hoverScale, hoverScale, hoverScale), delta * 5);
            groupRef.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.1;
        }

        if (innerWireframeRef.current) {
            innerWireframeRef.current.rotation.y = t * 0.8;
            innerWireframeRef.current.rotation.x = t * 0.5;
        }

        if (outerRingRef.current) {
            outerRingRef.current.rotation.z = -t * 1.2;
        }
    });

    return (
        <group
            ref={groupRef}
            position={position}
            onPointerOver={(e) => {
                e.stopPropagation();
                onHover(true);
            }}
            onPointerOut={(e) => {
                e.stopPropagation();
                onHover(false);
            }}
            onClick={(e) => {
                e.stopPropagation();
                if (onClick) onClick();
            }}
        >
            {/* Inner Glowing Core Sphere */}
            <mesh>
                <sphereGeometry args={[0.22, 16, 16]} />
                <meshStandardMaterial
                    color={isHovered ? '#00F0FF' : '#8B5CF6'}
                    emissive={isHovered ? '#00F0FF' : '#8B5CF6'}
                    emissiveIntensity={isHovered ? 1.8 : 0.8}
                    transparent
                    opacity={0.85}
                />
            </mesh>

            {/* Wireframe Outer Octahedron */}
            <mesh ref={innerWireframeRef}>
                <octahedronGeometry args={[0.35, 0]} />
                <meshStandardMaterial
                    color="#00F0FF"
                    wireframe
                    transparent
                    opacity={isHovered ? 0.9 : 0.4}
                />
            </mesh>

            {/* Holographic Ring */}
            <mesh ref={outerRingRef}>
                <torusGeometry args={[0.42, 0.01, 8, 32]} />
                <meshBasicMaterial
                    color={isHovered ? '#00F0FF' : '#8B5CF6'}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Point light emitter */}
            <pointLight
                color={isHovered ? '#00F0FF' : '#8B5CF6'}
                intensity={isHovered ? 2.5 : 1.0}
                distance={2.5}
            />
        </group>
    );
}
