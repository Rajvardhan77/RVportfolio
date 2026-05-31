import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Icosahedron, Octahedron } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

/* ===== MOUSE TRACKER CONTEXT ===== */
const mousePos = { x: 0, y: 0 };

/* ===== FLOATING PARTICLE FIELD ===== */
const ParticleField = ({ count = 600 }) => {
    const meshRef = useRef();
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) pos[i] = (Math.random() - 0.5) * 25;
        return pos;
    }, [count]);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.015;
            meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.008) * 0.15;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.025} color="#D4AF37" transparent opacity={0.5} sizeAttenuation />
        </points>
    );
};

/* ===== MOUSE-REACTIVE 3D SCENE ===== */
const MouseTracker = ({ children }) => {
    const { camera } = useThree();

    useFrame(() => {
        camera.position.x = THREE.MathUtils.lerp(camera.position.x, mousePos.x * 0.5, 0.02);
        camera.position.y = THREE.MathUtils.lerp(camera.position.y, mousePos.y * 0.3, 0.02);
        camera.lookAt(0, 0, 0);
    });

    return <>{children}</>;
};

/* ===== FLOATING SHAPES ===== */
const FloatingTorus = ({ position, color, size = 0.6 }) => {
    const ref = useRef();
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        ref.current.rotation.x = t * 0.3 + mousePos.y * 0.5;
        ref.current.rotation.y = t * 0.2 + mousePos.x * 0.5;
        ref.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.3;
    });
    return (
        <mesh ref={ref} position={position}>
            <torusGeometry args={[size, size * 0.15, 16, 48]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} transparent opacity={0.5} wireframe />
        </mesh>
    );
};

const FloatingOctahedron = ({ position, color, size = 0.5 }) => {
    const ref = useRef();
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        ref.current.rotation.x = t * 0.4 + mousePos.x * 0.3;
        ref.current.rotation.z = t * 0.25 + mousePos.y * 0.3;
        ref.current.position.x = position[0] + Math.sin(t * 0.3) * 0.4;
    });
    return (
        <mesh ref={ref} position={position}>
            <octahedronGeometry args={[size, 0]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} transparent opacity={0.35} wireframe />
        </mesh>
    );
};

const FloatingIcosahedron = ({ position, color, size = 0.5 }) => {
    const ref = useRef();
    useFrame((state) => {
        const t = state.clock.elapsedTime;
        ref.current.rotation.y = t * 0.35 - mousePos.x * 0.4;
        ref.current.rotation.x = t * 0.2 - mousePos.y * 0.4;
        ref.current.position.y = position[1] + Math.cos(t * 0.4 + position[2]) * 0.35;
    });
    return (
        <mesh ref={ref} position={position}>
            <icosahedronGeometry args={[size, 0]} />
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} transparent opacity={0.3} wireframe />
        </mesh>
    );
};

/* ===== ORBITAL RINGS CORE ===== */
const OrbitalCore = () => {
    const outerRef = useRef();
    const innerRef = useRef();
    const coreRef = useRef();

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (outerRef.current) {
            outerRef.current.rotation.x = Math.sin(t * 0.2) * 0.3 + mousePos.y * 0.3;
            outerRef.current.rotation.y = t * 0.12 + mousePos.x * 0.2;
        }
        if (innerRef.current) {
            innerRef.current.rotation.y = -t * 0.18 - mousePos.x * 0.15;
            innerRef.current.rotation.z = Math.cos(t * 0.3) * 0.2;
        }
        if (coreRef.current) {
            coreRef.current.rotation.y = t * 0.1;
            const dist = Math.sqrt(mousePos.x * mousePos.x + mousePos.y * mousePos.y);
            const scale = 1 + dist * 0.05;
            coreRef.current.scale.setScalar(THREE.MathUtils.lerp(coreRef.current.scale.x, scale, 0.05));
        }
    });

    return (
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={1}>
            <group>
                <mesh ref={outerRef}>
                    <torusGeometry args={[2.2, 0.012, 16, 100]} />
                    <meshBasicMaterial color="#D4AF37" transparent opacity={0.45} />
                </mesh>
                <mesh rotation={[Math.PI / 3, 0, 0]}>
                    <torusGeometry args={[2, 0.009, 16, 80]} />
                    <meshBasicMaterial color="#D4AF37" transparent opacity={0.35} />
                </mesh>
                <mesh ref={innerRef} rotation={[Math.PI / 6, Math.PI / 4, 0]}>
                    <torusGeometry args={[1.7, 0.006, 16, 60]} />
                    <meshBasicMaterial color="#D4AF37" transparent opacity={0.25} />
                </mesh>
                <mesh rotation={[-Math.PI / 4, Math.PI / 3, 0]}>
                    <torusGeometry args={[1.4, 0.004, 16, 50]} />
                    <meshBasicMaterial color="#D4AF37" transparent opacity={0.2} />
                </mesh>

                <mesh ref={coreRef}>
                    <Sphere args={[0.85, 64, 64]}>
                        <MeshDistortMaterial
                            color="#0F172A"
                            emissive="#D4AF37"
                            emissiveIntensity={0.2}
                            distort={0.35}
                            speed={2.5}
                            roughness={0.15}
                            metalness={0.95}
                            transparent
                            opacity={0.85}
                        />
                    </Sphere>
                </mesh>

                <mesh>
                    <Sphere args={[0.45, 32, 32]}>
                        <meshStandardMaterial
                            color="#D4AF37"
                            emissive="#D4AF37"
                            emissiveIntensity={2.5}
                            transparent
                            opacity={0.12}
                        />
                    </Sphere>
                </mesh>

                {[...Array(12)].map((_, i) => {
                    const angle = (i / 12) * Math.PI * 2;
                    const r = 2.2;
                    return (
                        <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}>
                            <sphereGeometry args={[0.025, 8, 8]} />
                            <meshBasicMaterial color="#D4AF37" />
                        </mesh>
                    );
                })}
            </group>
        </Float>
    );
};

/* ===== HERO SECTION ===== */
const Hero = () => {
    useEffect(() => {
        const onMouseMove = (e) => {
            mousePos.x = (e.clientX / window.innerWidth - 0.5) * 2;
            mousePos.y = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#030712]">
            {/* Background layers */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, #080C14 0%, #030712 100%)' }} />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 65%)' }} />
            <div className="absolute inset-0 grid-bg opacity-30" />

            {/* Animated blurred orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute w-[600px] h-[600px] rounded-full blur-[140px] opacity-15"
                    style={{ background: '#D4AF37', top: '-10%', left: '-10%' }}
                />
                <motion.div
                    animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                    className="absolute w-[500px] h-[500px] rounded-full blur-[140px] opacity-10"
                    style={{ background: '#D4AF37', bottom: '-10%', right: '-10%' }}
                />
            </div>

            {/* 3D Canvas — FULL with mouse-reactive shapes */}
            <div className="absolute inset-0">
                <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                    <MouseTracker>
                        <ambientLight intensity={0.25} />
                        <pointLight position={[5, 5, 5]} color="#D4AF37" intensity={1.5} />
                        <pointLight position={[-5, -5, 5]} color="#D4AF37" intensity={1.2} />
                        <pointLight position={[0, 5, -5]} color="#D4AF37" intensity={0.5} />

                        <ParticleField />
                        <OrbitalCore />

                        <FloatingTorus position={[-4.5, 2, -2]} color="#D4AF37" size={0.5} />
                        <FloatingTorus position={[4.5, -2, -3]} color="#D4AF37" size={0.4} />
                        <FloatingOctahedron position={[-3.5, -2, -1.5]} color="#D4AF37" size={0.4} />
                        <FloatingOctahedron position={[3.5, 2.5, -2.5]} color="#D4AF37" size={0.35} />
                        <FloatingIcosahedron position={[5, 0.5, -2]} color="#D4AF37" size={0.35} />
                        <FloatingIcosahedron position={[-5, -0.5, -3]} color="#D4AF37" size={0.3} />
                    </MouseTracker>
                </Canvas>
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-24 md:py-32 flex flex-col items-center justify-center text-center">
                {/* Status */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="flex items-center gap-3 mb-6 bg-white/[0.02] border border-white/5 px-4 py-1.5 rounded-full backdrop-blur-md"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.25em] text-slate-300 orbitron">
                        AVAILABLE FOR OPPORTUNITIES
                    </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="relative"
                >
                    <span className="orbitron font-black block leading-[1.05] tracking-tight" style={{ fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}>
                        <span className="gradient-text-anim">RAJA</span> <span style={{ color: '#D4AF37', textShadow: '0 0 50px rgba(212,175,55,0.25)' }}>VARDHAN</span>
                    </span>
                </motion.h1>

                {/* Short Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="mt-6 text-slate-400 text-sm md:text-base leading-relaxed max-w-xl"
                >
                    B.Tech Information Technology student at MVSR Engineering College. I build modular web experiences, interactive systems, and clean front-ends driven by performance and architecture.
                </motion.p>

                {/* Role tags */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-wrap justify-center gap-2.5 mt-6 mb-10"
                >
                    {['IT Student', 'Web Developer', 'Creative Builder'].map((role) => (
                        <span
                            key={role}
                            className="px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider text-slate-300 bg-white/2 border border-white/5"
                        >
                            {role}
                        </span>
                    ))}
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="flex flex-col sm:flex-row justify-center gap-4"
                >
                    <a href="#projects" className="btn-primary">
                        VIEW PROJECTS
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                    </a>
                    <a href="#contact" className="btn-outline">
                        CONTACT ME
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 select-none pointer-events-none"
            >
                <motion.div
                    className="w-5 h-8 rounded-full border flex items-start justify-center pt-1.5"
                    style={{ borderColor: 'rgba(212,175,55,0.25)' }}
                >
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 h-1 rounded-full"
                        style={{ background: '#D4AF37' }}
                    />
                </motion.div>
                <span className="text-[10px] tracking-[0.3em] font-medium" style={{ color: 'rgba(212,175,55,0.2)' }}>SCROLL</span>
            </motion.div>
        </section>
    );
};

export default Hero;
