'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CompanionRobotProps {
    hoveredPosition?: [number, number, number] | null;
    isHoveringCard?: boolean;
}

export default function CompanionRobot({ hoveredPosition = null, isHoveringCard = false }: CompanionRobotProps) {
    const robotGroupRef = useRef<THREE.Group>(null!);
    const eyeMeshRef = useRef<THREE.Mesh>(null!);
    const coneBeamRef = useRef<THREE.Mesh>(null!);
    const ringsRef = useRef<THREE.Group>(null!);

    const currentPos = useRef(new THREE.Vector3(2, 1, 1));
    const targetPos = useRef(new THREE.Vector3(2, 1, 1));

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;
        const pointer = state.pointer; // normalized [-1, 1]
        const dt = Math.min(delta, 0.1);

        if (isHoveringCard && hoveredPosition) {
            targetPos.current.set(
                hoveredPosition[0] + 0.8,
                hoveredPosition[1] + 0.6,
                hoveredPosition[2] + 0.5
            );
        } else {
            targetPos.current.set(
                pointer.x * 3.5 + 1.8,
                pointer.y * 2.0 + 0.8,
                1.2 + Math.sin(t * 1.5) * 0.2
            );
        }

        // Exponential damp motion for fluid spring response
        currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, targetPos.current.x, 5.0, dt);
        currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetPos.current.y, 5.0, dt);
        currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetPos.current.z, 5.0, dt);

        if (robotGroupRef.current) {
            robotGroupRef.current.position.copy(currentPos.current);

            // Floating bobbing effect
            robotGroupRef.current.position.y += Math.sin(t * 2.5) * 0.05;

            // Tilt toward movement direction or mouse
            if (isHoveringCard && hoveredPosition) {
                const targetVec = new THREE.Vector3(...hoveredPosition);
                robotGroupRef.current.lookAt(targetVec);
            } else {
                robotGroupRef.current.rotation.y = THREE.MathUtils.damp(
                    robotGroupRef.current.rotation.y,
                    Math.sin(t * 0.8) * 0.2 + pointer.x * 0.4,
                    4.0,
                    dt
                );
                robotGroupRef.current.rotation.z = THREE.MathUtils.damp(
                    robotGroupRef.current.rotation.z,
                    -pointer.x * 0.15,
                    4.0,
                    dt
                );
                robotGroupRef.current.rotation.x = THREE.MathUtils.damp(
                    robotGroupRef.current.rotation.x,
                    -pointer.y * 0.15,
                    4.0,
                    dt
                );
            }
        }

        // Rotate orbital thruster rings
        if (ringsRef.current) {
            ringsRef.current.rotation.z = t * 1.5;
            ringsRef.current.rotation.x = Math.sin(t) * 0.3;
        }

        // Pulse scanner beam intensity
        if (coneBeamRef.current) {
            const beamMat = coneBeamRef.current.material as THREE.MeshBasicMaterial;
            if (isHoveringCard) {
                beamMat.opacity = 0.4 + Math.sin(t * 10) * 0.15;
            } else {
                beamMat.opacity = 0.1 + Math.sin(t * 3) * 0.05;
            }
        }

        // Eye pulse glow
        if (eyeMeshRef.current) {
            const eyeMat = eyeMeshRef.current.material as THREE.MeshStandardMaterial;
            eyeMat.emissiveIntensity = 1.0 + Math.sin(t * 4) * 0.5;
        }
    });

    return (
        <group ref={robotGroupRef} position={[2, 1, 1]} scale={0.75}>
            {/* Core Robot Body - Sleek Polyhedron */}
            <mesh>
                <octahedronGeometry args={[0.32, 2]} />
                <meshPhysicalMaterial
                    color="#0F172A"
                    metalness={0.9}
                    roughness={0.1}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                />
            </mesh>

            {/* Cyan Accent Ring */}
            <mesh>
                <torusGeometry args={[0.34, 0.02, 16, 32]} />
                <meshStandardMaterial
                    color="#00F0FF"
                    emissive="#00F0FF"
                    emissiveIntensity={1.2}
                    roughness={0.2}
                />
            </mesh>

            {/* Glowing Eye Sensor */}
            <mesh ref={eyeMeshRef} position={[0, 0, 0.3]} rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
                <meshStandardMaterial
                    color="#00F0FF"
                    emissive="#00F0FF"
                    emissiveIntensity={1.5}
                />
            </mesh>

            {/* Outer Orbital Thruster Rings */}
            <group ref={ringsRef}>
                <mesh>
                    <torusGeometry args={[0.48, 0.008, 8, 32]} />
                    <meshBasicMaterial color="#8B5CF6" transparent opacity={0.7} />
                </mesh>
                <mesh rotation={[Math.PI / 3, 0, 0]}>
                    <torusGeometry args={[0.54, 0.006, 8, 32]} />
                    <meshBasicMaterial color="#00F0FF" transparent opacity={0.5} />
                </mesh>
            </group>

            {/* Volumetric Scanner Cone Beam */}
            <mesh
                ref={coneBeamRef}
                position={[0, 0, 1.2]}
                rotation={[Math.PI / 2, 0, 0]}
            >
                <coneGeometry args={[0.6, 2.4, 32, 1, true]} />
                <meshBasicMaterial
                    color={isHoveringCard ? '#00F0FF' : '#8B5CF6'}
                    transparent
                    opacity={0.15}
                    side={THREE.DoubleSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* Thruster Glow Light */}
            <pointLight color="#00F0FF" intensity={1.5} distance={3} decay={2} />
        </group>
    );
}
