"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

type SceneTone = "default" | "thesis";

const SCENE_THEMES: Record<
    SceneTone,
    {
        background: string;
        glow: string;
        material: string;
        emissive: string;
        rimLight: string;
    }
> = {
    default: {
        background: "#f4f1ea",
        glow: "radial-gradient(circle_at_74%_40%,rgba(15,23,42,0.08),transparent_22%),radial-gradient(circle_at_28%_24%,rgba(148,163,184,0.18),transparent_24%)",
        material: "#1f2937",
        emissive: "#1f2937",
        rimLight: "#94a3b8",
    },
    thesis: {
        background: "#f5ece8",
        glow: "radial-gradient(circle_at_72%_42%,rgba(255,59,48,0.22),transparent_24%),radial-gradient(circle_at_26%_22%,rgba(255,190,184,0.2),transparent_24%)",
        material: "#ff3b30",
        emissive: "#d12d1d",
        rimLight: "#ffb4ae",
    },
};

function Blob({ tone }: { tone: SceneTone }) {
    const meshRef = useRef<THREE.Mesh>(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const materialRef = useRef<any>(null);
    const colorRef = useRef(new THREE.Color(SCENE_THEMES.default.material));
    const emissiveRef = useRef(new THREE.Color(SCENE_THEMES.default.emissive));

    useFrame((state) => {
        if (!meshRef.current || !materialRef.current) return;

        const elapsed = state.clock.getElapsedTime();
        const theme = SCENE_THEMES[tone];
        meshRef.current.rotation.x = elapsed * 0.18;
        meshRef.current.rotation.y = elapsed * 0.28;
        meshRef.current.position.y = Math.sin(elapsed * 0.7) * 0.18;
        materialRef.current.distort = 0.28 + Math.sin(elapsed * 1.2) * 0.08;
        colorRef.current.lerp(new THREE.Color(theme.material), 0.08);
        emissiveRef.current.lerp(new THREE.Color(theme.emissive), 0.08);
        materialRef.current.color.copy(colorRef.current);
        materialRef.current.emissive.copy(emissiveRef.current);
    });

    return (
        <mesh ref={meshRef} position={[1.95, 0.1, -0.2]} scale={2.35}>
            <icosahedronGeometry args={[1, 32]} />
            <MeshDistortMaterial
                ref={materialRef}
                color={SCENE_THEMES.default.material}
                distort={0.32}
                speed={1.2}
                roughness={0.08}
                metalness={0.15}
                emissive={SCENE_THEMES.default.emissive}
                emissiveIntensity={0.12}
            />
        </mesh>
    );
}

export default function Scene({ tone = "default" }: { tone?: SceneTone }) {
    const theme = SCENE_THEMES[tone];

    return (
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ backgroundColor: theme.background }} aria-hidden="true">
            <div className="absolute inset-0" style={{ backgroundImage: theme.glow }} />
            <Canvas
                className="pointer-events-none"
                style={{ pointerEvents: "none", touchAction: "auto" }}
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 6], fov: 42 }}
            >
                <ambientLight intensity={0.9} />
                <directionalLight position={[4, 3, 5]} intensity={1.65} color="#ffffff" />
                <directionalLight position={[-4, -2, 3]} intensity={0.4} color={theme.rimLight} />
                <Blob tone={tone} />
            </Canvas>
        </div>
    );
}
