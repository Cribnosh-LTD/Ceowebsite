"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Environment, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Blob() {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<any>(null);

    useGSAP(() => {
        if (!meshRef.current || !materialRef.current) return;

        const timeline = gsap.timeline({
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
        });

        // Morph the blob based on scroll
        timeline.to(materialRef.current, {
            distort: 0.8,
            speed: 3,
            duration: 1,
            ease: "power1.inOut",
        });

        // Rotate the mesh
        timeline.to(
            meshRef.current.rotation,
            {
                x: Math.PI * 2,
                y: Math.PI * 2,
                duration: 1,
                ease: "none",
            },
            "<"
        );

        // Change color using hex
        const colors = ["#2A2A2A", "#3B82F6", "#10B981", "#F59E0B"];
        colors.forEach((color, i) => {
            timeline.to(materialRef.current.color, {
                r: new THREE.Color(color).r,
                g: new THREE.Color(color).g,
                b: new THREE.Color(color).b,
                duration: 1 / colors.length,
            }, i * (1 / colors.length));
        });

    }, []);

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} scale={2.5}>
                <sphereGeometry args={[1, 64, 64]} />
                <MeshDistortMaterial
                    ref={materialRef}
                    color="#2A2A2A"
                    distort={0.4}
                    speed={1.5}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
}

export default function Scene() {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none">
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                <Environment preset="studio" />
                <ambientLight intensity={0.5} />
                <Blob />
            </Canvas>
        </div>
    );
}
