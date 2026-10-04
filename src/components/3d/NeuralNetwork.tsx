'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralNetworkProps {
    nodeCount?: number;
}

/** Background neural network visualization with nodes, connections, and pulses */
export default function NeuralNetwork({ nodeCount = 40 }: NeuralNetworkProps) {
    const pointsRef = useRef<THREE.Points>(null!);
    const linesRef = useRef<THREE.LineSegments>(null!);

    const { positions, connections } = useMemo(() => {
        const pos = new Float32Array(nodeCount * 3);
        for (let i = 0; i < nodeCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 16;
            pos[i * 3 + 1] = Math.random() * 8 - 1;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 3;
        }

        // Build connections between nearby nodes
        const conn: number[] = [];
        const maxDist = 4;
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const dx = pos[i * 3] - pos[j * 3];
                const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
                const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
                if (dist < maxDist && conn.length / 6 < nodeCount * 1.5) {
                    conn.push(
                        pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2],
                        pos[j * 3], pos[j * 3 + 1], pos[j * 3 + 2]
                    );
                }
            }
        }

        return { positions: pos, connections: new Float32Array(conn) };
    }, [nodeCount]);

    useFrame((state) => {
        const t = state.clock.elapsedTime;

        // Gently pulse node positions
        if (pointsRef.current) {
            const geom = pointsRef.current.geometry;
            const posArr = geom.attributes.position.array as Float32Array;
            for (let i = 0; i < nodeCount; i++) {
                posArr[i * 3 + 1] += Math.sin(t * 0.5 + i) * 0.0005;
            }
            geom.attributes.position.needsUpdate = true;
            pointsRef.current.rotation.y = t * 0.01;
        }

        if (linesRef.current) {
            const mat = linesRef.current.material as THREE.LineBasicMaterial;
            mat.opacity = 0.08 + Math.sin(t * 0.8) * 0.03;
            linesRef.current.rotation.y = t * 0.01;
        }
    });

    return (
        <group>
            {/* Nodes */}
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    color="#93c5fd"
                    size={0.06}
                    transparent
                    opacity={0.4}
                    sizeAttenuation
                />
            </points>

            {/* Connections */}
            <lineSegments ref={linesRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[connections, 3]} />
                </bufferGeometry>
                <lineBasicMaterial color="#93c5fd" transparent opacity={0.08} />
            </lineSegments>
        </group>
    );
}
