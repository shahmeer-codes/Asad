'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CameraControllerProps {
    scrollProgress: number;
    mouseX?: number;
    mouseY?: number;
}

const cameraWaypoints = [
    { pos: [0, 1.5, 8], lookAt: [0, 0.5, 0] },       // Hero
    { pos: [3, 2, 6], lookAt: [0, 1, -2] },          // About
    { pos: [-2.2, 2.4, 3.2], lookAt: [-2, 1, -3] },  // Projects
    { pos: [3.8, 2.8, 0.2], lookAt: [0, 1.5, -5] },  // Skills
    { pos: [-3, 2, -4], lookAt: [0, 1, -8] },        // Experience
    { pos: [0, 1.5, -8], lookAt: [0, 1, -12] },      // Contact
];

const sectionBreakpoints = [0, 0.17, 0.35, 0.55, 0.73, 0.88];

export default function CameraController({ scrollProgress, mouseX = 0, mouseY = 0 }: CameraControllerProps) {
    const targetPos = useRef(new THREE.Vector3(0, 1.5, 8));
    const targetLookAt = useRef(new THREE.Vector3(0, 0.5, 0));
    const currentPos = useRef(new THREE.Vector3(0, 1.5, 8));
    const currentLookAt = useRef(new THREE.Vector3(0, 0.5, 0));

    const tempVec = useMemo(() => new THREE.Vector3(), []);

    useFrame((state, delta) => {
        // Cap delta to prevent huge jumps when switching tabs
        const dt = Math.min(delta, 0.1);

        // Clamp scroll progress
        const p = Math.min(1, Math.max(0, scrollProgress));

        // Segment detection
        let segIndex = 0;
        for (let i = sectionBreakpoints.length - 1; i >= 0; i--) {
            if (p >= sectionBreakpoints[i]) {
                segIndex = i;
                break;
            }
        }

        const nextIndex = Math.min(segIndex + 1, cameraWaypoints.length - 1);
        const segStart = sectionBreakpoints[segIndex];
        const segEnd = sectionBreakpoints[nextIndex] ?? 1;
        const rawT = segEnd > segStart ? Math.min(1, Math.max(0, (p - segStart) / (segEnd - segStart))) : 0;

        // Smooth cubic ease-in-out curve
        const easedT = rawT * rawT * (3 - 2 * rawT);

        const wp1 = cameraWaypoints[segIndex];
        const wp2 = cameraWaypoints[nextIndex];

        // Interpolate target waypoint vectors directly
        targetPos.current.set(
            THREE.MathUtils.lerp(wp1.pos[0], wp2.pos[0], easedT),
            THREE.MathUtils.lerp(wp1.pos[1], wp2.pos[1], easedT),
            THREE.MathUtils.lerp(wp1.pos[2], wp2.pos[2], easedT)
        );

        targetLookAt.current.set(
            THREE.MathUtils.lerp(wp1.lookAt[0], wp2.lookAt[0], easedT),
            THREE.MathUtils.lerp(wp1.lookAt[1], wp2.lookAt[1], easedT),
            THREE.MathUtils.lerp(wp1.lookAt[2], wp2.lookAt[2], easedT)
        );

        // Add smooth subtle mouse parallax
        const mouseInfluence = 0.2;
        targetPos.current.x += mouseX * mouseInfluence;
        targetPos.current.y += mouseY * mouseInfluence * 0.5;

        // Exponential dampening for ultra-smooth 60fps tracking without drag/lag
        currentPos.current.x = THREE.MathUtils.damp(currentPos.current.x, targetPos.current.x, 4.5, dt);
        currentPos.current.y = THREE.MathUtils.damp(currentPos.current.y, targetPos.current.y, 4.5, dt);
        currentPos.current.z = THREE.MathUtils.damp(currentPos.current.z, targetPos.current.z, 4.5, dt);

        currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookAt.current.x, 4.5, dt);
        currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookAt.current.y, 4.5, dt);
        currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookAt.current.z, 4.5, dt);

        state.camera.position.copy(currentPos.current);
        tempVec.copy(currentLookAt.current);
        state.camera.lookAt(tempVec);
    });

    return null;
}
