'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ReactiveLifelineProps {
    scrollVelocity?: number;
    isInteracting?: boolean;
}

export default function ReactiveLifeline({ scrollVelocity = 0, isInteracting = false }: ReactiveLifelineProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lineRef = useRef<any>(null);
    const pointsCount = 120;

    const { lineGeometry } = useMemo(() => {
        const posArray = new Float32Array(pointsCount * 3);
        const geo = new THREE.BufferGeometry();
        geo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        return { lineGeometry: geo };
    }, []);

    const currentAmp = useRef(0.2);
    const currentFreq = useRef(1.5);
    const currentColor = useRef(new THREE.Color('#10B981'));

    useFrame((state, delta) => {
        const t = state.clock.elapsedTime;

        // Activity factor derived from scroll velocity and interaction
        const activity = Math.min(1.0, Math.abs(scrollVelocity) * 0.15 + (isInteracting ? 0.8 : 0));

        const targetAmp = THREE.MathUtils.lerp(0.2, 0.85, activity);
        const targetFreq = THREE.MathUtils.lerp(1.5, 4.5, activity);

        currentAmp.current = THREE.MathUtils.lerp(currentAmp.current, targetAmp, delta * 3);
        currentFreq.current = THREE.MathUtils.lerp(currentFreq.current, targetFreq, delta * 3);

        const targetHex = activity > 0.3 ? '#FF2E93' : '#10B981';
        currentColor.current.lerp(new THREE.Color(targetHex), delta * 4);

        if (lineRef.current) {
            const mat = lineRef.current.material as THREE.LineBasicMaterial;
            if (mat && mat.color) {
                mat.color.copy(currentColor.current);
            }
        }

        // Update sine wave line coordinates
        const positionsAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
        const array = positionsAttr.array as Float32Array;

        for (let i = 0; i < pointsCount; i++) {
            const x = (i / (pointsCount - 1)) * 14 - 7;
            const wave1 = Math.sin(x * currentFreq.current + t * (currentFreq.current * 2)) * currentAmp.current;
            const wave2 = Math.cos(x * (currentFreq.current * 0.5) - t * 3) * (currentAmp.current * 0.4);

            // EKG heartbeat spike pulse occasionally
            const spikePhase = (t * 2 + i * 0.05) % (Math.PI * 2);
            const spike = Math.abs(Math.sin(spikePhase)) > 0.95 ? Math.sin(spikePhase) * currentAmp.current * 1.5 : 0;

            const y = -2.2 + wave1 + wave2 + spike;
            const z = -2 + Math.sin(x * 0.5 + t) * 0.3;

            array[i * 3] = x;
            array[i * 3 + 1] = y;
            array[i * 3 + 2] = z;
        }

        positionsAttr.needsUpdate = true;
    });

    return (
        <group>
            {/* Glowing 3D Line */}
            {/* @ts-ignore R3F line element type definition */}
            <line ref={lineRef} geometry={lineGeometry}>
                <lineBasicMaterial color="#10B981" linewidth={2} transparent opacity={0.85} />
            </line>
        </group>
    );
}
