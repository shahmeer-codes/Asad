'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraController from './CameraController';
import AvatarModel from './AvatarModel';
import CompanionRobot from './CompanionRobot';
import ReactiveLifeline from './ReactiveLifeline';
import SpatialProjectNode from './SpatialProjectNode';
import FloatingObjects from './FloatingObjects';
import NeuralNetwork from './NeuralNetwork';

interface ExperienceProps {
    scrollProgress: number;
    mouseX: number;
    mouseY: number;
    isMobile: boolean;
    enableFloating: boolean;
    enableShadows: boolean;
    particleCount: number;
    pixelRatio: number;
    hoveredCardPos?: [number, number, number] | null;
    isHoveringCard?: boolean;
}

export default function Experience({
    scrollProgress,
    mouseX,
    mouseY,
    isMobile,
    enableFloating,
    enableShadows,
    particleCount,
    pixelRatio,
    hoveredCardPos = null,
    isHoveringCard = false,
}: ExperienceProps) {
    const [hoveredNodeIndex, setHoveredNodeIndex] = useState<number | null>(null);

    const projectNodes: { pos: [number, number, number]; title: string }[] = [
        { pos: [-3.2, 1.8, -1.5], title: 'Autonomous AI Code Reviewer' },
        { pos: [-1.2, 2.8, -2.5], title: 'Hyper-Scale SaaS Marketplace' },
        { pos: [1.5, 2.2, -2.0], title: '3D Interactive CMS Engine' },
    ];

    return (
        <Canvas
            className="!fixed inset-0 !h-screen !w-screen -z-10"
            style={{ position: 'fixed', top: 0, left: 0, zIndex: -10 }}
            dpr={[1, pixelRatio]}
            camera={{ position: [0, 1.5, 8], fov: 50, near: 0.1, far: 100 }}
            gl={{
                antialias: !isMobile,
                alpha: true,
                powerPreference: 'high-performance',
            }}
        >
            <Suspense fallback={null}>
                {/* Camera controller smoothly following scroll waypoints */}
                <CameraController
                    scrollProgress={scrollProgress}
                    mouseX={mouseX}
                    mouseY={mouseY}
                />

                {/* Lighting system - Obsidian Cyber Aesthetic */}
                <ambientLight intensity={0.4} color="#0B0F19" />
                <directionalLight
                    position={[5, 8, 5]}
                    intensity={1.5}
                    color="#00F0FF"
                    castShadow={enableShadows}
                />
                <directionalLight
                    position={[-5, 4, -3]}
                    intensity={1.2}
                    color="#8B5CF6"
                />
                <pointLight position={[0, 4, 2]} intensity={0.8} color="#00F0FF" distance={10} />

                {/* Cyber Grid Floor */}
                <gridHelper
                    args={[40, 40, '#00F0FF', '#1E293B']}
                    position={[0, -1.8, 0]}
                />

                {/* Depth Fog - Obsidian Obsidian */}
                <fog attach="fog" args={['#0B0F19', 8, 30]} />

                {/* Central 3D Avatar (Shahmeer Arshad) */}
                <AvatarModel />

                {/* Flying AI Companion Robot */}
                <CompanionRobot
                    hoveredPosition={hoveredCardPos || (hoveredNodeIndex !== null ? projectNodes[hoveredNodeIndex].pos : null)}
                    isHoveringCard={isHoveringCard || hoveredNodeIndex !== null}
                />

                {/* 3D Reactive Lifeline Wave (Sine Wave) */}
                <ReactiveLifeline
                    scrollVelocity={scrollProgress * 10}
                    isInteracting={isHoveringCard || hoveredNodeIndex !== null}
                />

                {/* Floating Spatial AI Project Nodes */}
                <group position={[0, 0, 0]}>
                    {projectNodes.map((node, i) => (
                        <SpatialProjectNode
                            key={i}
                            position={node.pos}
                            title={node.title}
                            isHovered={hoveredNodeIndex === i}
                            onHover={(hovered) => setHoveredNodeIndex(hovered ? i : null)}
                        />
                    ))}
                </group>

                {/* Neural Network Node Cloud */}
                <NeuralNetwork nodeCount={particleCount} />

                {/* Floating Geometry Elements */}
                <FloatingObjects enabled={enableFloating} />
            </Suspense>
        </Canvas>
    );
}
