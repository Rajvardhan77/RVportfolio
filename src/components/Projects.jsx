import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const projects = [
    {
        title: 'Feelify',
        description: 'Mood-based immersive music experience platform that dynamically adapts visuals and playlist based on real-time emotion detection.',
        tags: ['React', 'Emotion AI', 'Music API'],
        color: '#D4AF37',
        number: '01',
        category: 'WEB APP',
    },
    {
        title: 'Gym Sphere',
        description: 'Modern fitness-focused digital platform delivering personalized workout plans, progress tracking, and nutrition guidance.',
        tags: ['React', 'Flask', 'MySQL'],
        color: '#D4AF37',
        number: '02',
        category: 'FULL STACK',
    },
    {
        title: 'OptiCart',
        description: 'Smart product comparison platform using real-time web scraping and filtering to find the best deals across e-commerce.',
        tags: ['Python', 'Scraping', 'React'],
        color: '#D4AF37',
        number: '03',
        category: 'WEB APP',
    },
    {
        title: 'Autonomous Disaster Relief Drone',
        description: 'Autonomous robotics project featuring AI-powered navigation, real-time terrain mapping, and package delivery for disaster relief.',
        tags: ['Robotics', 'AI', 'Python'],
        color: '#D4AF37',
        number: '04',
        category: 'HARDWARE',
    },
    {
        title: 'Flask Web Projects',
        description: 'Suite of interactive calculators, games, and web utilities demonstrating full-stack development with elegant, usable interfaces.',
        tags: ['Flask', 'Python', 'HTML/CSS'],
        color: '#D4AF37',
        number: '05',
        category: 'FULL STACK',
    },
];

const ProjectCard = ({ project, index, inView }) => {
    const [hovered, setHovered] = useState(false);
    const cardRef = useRef(null);

    const onMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 15;
        cardRef.current.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.02)`;
        const glowX = ((e.clientX - rect.left) / rect.width) * 100;
        const glowY = ((e.clientY - rect.top) / rect.height) * 100;
        cardRef.current.style.setProperty('--glow-x', `${glowX}%`);
        cardRef.current.style.setProperty('--glow-y', `${glowY}%`);
    };

    const onMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) scale(1)';
        setHovered(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            ref={cardRef}
            onMouseMove={onMouseMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={onMouseLeave}
            className="relative rounded-2xl overflow-hidden cursor-pointer"
            style={{
                background: 'rgba(255,255,255,0.015)',
                border: `1px solid ${hovered ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255,255,255,0.05)'}`,
                transition: 'border 0.3s ease, box-shadow 0.4s ease, transform 0.15s ease',
                boxShadow: hovered ? '0 0 40px rgba(212,175,55,0.1), 0 20px 60px rgba(15,23,42,0.4)' : '0 4px 24px rgba(15,23,42,0.2)',
                willChange: 'transform',
            }}
        >
            {hovered && (
                <div className="absolute inset-0 pointer-events-none opacity-20"
                    style={{ background: `radial-gradient(300px circle at var(--glow-x, 50%) var(--glow-y, 50%), ${project.color}30, transparent 70%)` }} />
            )}
            <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${project.color}80, transparent)`, opacity: hovered ? 1 : 0.3, transition: 'opacity 0.3s' }} />
            <div className="p-7 relative">
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <span className="text-[10px] font-bold tracking-[0.2em] block mb-2" style={{ color: hovered ? '#D4AF37' : '#94A3B8', transition: 'color 0.3s' }}>{project.category}</span>
                        <h3 className="orbitron font-bold text-lg" style={{ color: hovered ? '#D4AF37' : '#FFFFFF', transition: 'color 0.3s' }}>{project.title}</h3>
                    </div>
                    <span className="orbitron text-3xl font-black leading-none" style={{ color: hovered ? 'rgba(212,175,55,0.15)' : 'rgba(255,255,255,0.02)', transition: 'color 0.3s' }}>{project.number}</span>
                </div>
                <p className="text-sm leading-relaxed mb-6 text-slate-400">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-md text-[10px] font-semibold tracking-wider text-slate-300 bg-white/2 border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="flex items-center gap-2" style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'translateX(0)' : 'translateX(-10px)', transition: 'all 0.3s ease' }}>
                    <div className="h-px w-6 bg-[#D4AF37]" />
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#D4AF37]">VIEW DETAILS</span>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17" /></svg>
                </div>
            </div>
        </motion.div>
    );
};

const Projects = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.05 });

    return (
        <section id="projects" className="relative section-padding overflow-hidden noise">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 30% 70%, rgba(212,175,55,0.03) 0%, transparent 50%)' }} />
            <div className="absolute inset-0 line-grid-bg opacity-20" />

            <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
                        <span className="orbitron text-xs tracking-[0.3em] font-semibold" style={{ color: '#D4AF37' }}>PROJECTS</span>
                    </div>
                    <h2 className="orbitron font-bold text-3xl md:text-5xl text-white">
                        Featured <span className="gradient-text">Work</span>
                    </h2>
                    <p className="mt-4 text-sm max-w-lg text-slate-400">
                        A collection of projects showcasing my skills in web development, full-stack engineering, and creative problem-solving.
                    </p>
                </motion.div>

                <div className="space-y-4">
                    <ProjectCard project={projects[0]} index={0} inView={inView} />
                    <div className="grid md:grid-cols-2 gap-4">
                        {projects.slice(1).map((project, index) => (
                            <ProjectCard key={project.title} project={project} index={index + 1} inView={inView} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
