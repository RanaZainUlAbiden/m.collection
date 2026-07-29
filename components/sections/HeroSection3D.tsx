/**
 * HeroSection3D Component
 * 
 * The primary hero section displayed on the home page.
 * 
 * Features:
 * - Fluid Animations: Utilizes framer-motion for orchestrated entry animations (staggered fade-ins and slide-ups).
 * - Immersive Design: Uses a full-screen height layout (`min-h-[100dvh]`) to ensure the hero covers the entire viewport on all devices.
 * - Call to Action: Prominently features the main 'Shop Collection' navigation button.
 */
"use client";

import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SpecularButton from "@/components/ui/SpecularButton";

import Image from "next/image";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { products } from "@/data/products";

// --- Liquid Silk Background Shader ---
const vertexShaderBg = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShaderBg = `
  uniform float uTime;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Generic 2D Noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    // Adjust coordinates based on aspect ratio to avoid stretching
    vec2 st = vUv;
    st.x *= uResolution.x / uResolution.y;
    
    // Animate coordinates
    vec2 pos = vec2(st * 1.5);
    float noise = snoise(pos + uTime * 0.105);
    
    // Smooth waves
    float n = snoise(pos + noise * 1.5 + uTime * 0.07);
    
    // Mix brand colors (peach/cream and light brown)
    vec3 color = mix(uColor1, uColor2, n * 0.5 + 0.5);
    
    // Add subtle gradient based on Y
    color = mix(color, uColor1, vUv.y * 0.5);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function LiquidBackground() {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const { viewport, size } = useThree();

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
            materialRef.current.uniforms.uResolution.value.set(size.width, size.height);
        }
    });

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2() },
        uColor1: { value: new THREE.Color("#fbf7f4") },
        uColor2: { value: new THREE.Color("#f2e6de") }
    }), []);

    return (
        <mesh>
            <planeGeometry args={[viewport.width, viewport.height]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShaderBg}
                fragmentShader={fragmentShaderBg}
                uniforms={uniforms}
                depthWrite={false}
                depthTest={false}
            />
        </mesh>
    );
}

export function HeroSection3D() {
    return (
        <section
            className="relative min-h-[100dvh] w-full flex items-center pt-28 md:pt-36 pb-12 lg:pt-28 lg:pb-[25px] -mt-[15px] overflow-hidden"
            aria-label="MJR Collection Hero"
        >


            {/* 3D Liquid Silk Background */}
            <div className="absolute inset-0 z-0 opacity-80 mix-blend-multiply">
                <Canvas camera={{ position: [0, 0, 1] }} gl={{ antialias: false, powerPreference: "high-performance" }} dpr={[1, 1.5]}>
                    <LiquidBackground />
                </Canvas>
            </div>

            <div className="container mx-auto px-6 md:px-12 flex flex-col items-center justify-center text-center mt-12 lg:mt-16 z-20 relative">
                {/* Entrance animation container */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="w-full max-w-4xl flex flex-col items-center justify-center"
                >
                    {/* Header animation */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="text-5xl sm:text-6xl md:text-8xl text-foreground tracking-tight mb-6 leading-[1.1]"
                    >
                        <span className="font-sans font-bold">Elevate Your</span>
                        <br />
                        <span className="font-serif italic text-primary font-medium">Style & Wellness</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="text-sm md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-12"
                    >
                        Step into elegance with our premium footwear and nourish yourself with our handmade organic self-care products.
                    </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Link href="/shop">
                        <SpecularButton
                            size="lg"
                            radius={50}
                            tint="#fbf7f4"
                            tintOpacity={0.15}
                            blur={20}
                            textColor="#111111"
                            lineColor="#c4b5a2" 
                            baseColor="#f2e6de"
                            intensity={2}
                            shineSize={15}
                            shineFade={50}
                            thickness={2}
                            speed={0.4}
                            followMouse={true}
                            proximity={300}
                            className="tracking-widest uppercase font-bold shadow-xl w-full sm:w-auto"
                        >
                            Shop Collection
                        </SpecularButton>
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="flex flex-col items-center gap-3 mt-16 md:mt-24 z-20 pointer-events-none"
                >
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground/50">Scroll</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        className="w-[1px] h-12 bg-gradient-to-b from-foreground/50 to-transparent"
                    />
                </motion.div>
            </div>
        </section>
    );
}
