import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const skillCategories = [
    {
        title: 'Languages',
        skills: ['C', 'Java', 'Python', 'JavaScript', 'HTML5', 'CSS3', 'SQL']
    },
    {
        title: 'Frontend',
        skills: ['React', 'Tailwind CSS', 'Three.js', 'Framer Motion', 'Responsive UI']
    },
    {
        title: 'Backend & DB',
        skills: ['Flask', 'MySQL', 'DBMS', 'REST APIs', 'Node.js']
    },
    {
        title: 'Tools & UI/UX',
        skills: ['Git', 'GitHub', 'VS Code', 'Figma', 'UI/UX Design']
    }
];

const marqueeSkills = [
    'HTML5', 'CSS3', 'JAVASCRIPT', 'REACT', 'TAILWIND CSS', 'THREE.JS', 
    'FRAMER MOTION', 'PYTHON', 'FLASK', 'MYSQL', 'C', 'JAVA', 
    'DBMS', 'GIT', 'FIGMA', 'UI/UX'
];

const Skills = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

    return (
        <section id="skills" className="relative section-padding overflow-hidden noise">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 50%)' }} />

            <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
                        <span className="orbitron text-xs tracking-[0.3em] font-semibold" style={{ color: '#D4AF37' }}>SKILLS</span>
                    </div>
                    <h2 className="orbitron font-bold text-3xl md:text-5xl text-white">
                        Technical <span className="gradient-text">Arsenal</span>
                    </h2>
                    <p className="mt-4 text-sm max-w-lg text-slate-400">
                        A grouped toolkit of technologies and concepts I focus on to build modern, performant web platforms.
                    </p>
                </motion.div>

                {/* Grouped Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {skillCategories.map((cat, ci) => (
                        <motion.div 
                            key={cat.title} 
                            initial={{ opacity: 0, y: 30 }} 
                            animate={inView ? { opacity: 1, y: 0 } : {}} 
                            transition={{ duration: 0.6, delay: ci * 0.1 }}
                            className="glass-card rounded-2xl p-6 flex flex-col justify-between"
                            style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)' }}
                        >
                            <div>
                                <div className="flex items-center gap-2 mb-6">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                                    <span className="text-xs orbitron font-bold tracking-widest text-[#D4AF37]">{cat.title.toUpperCase()}</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {cat.skills.map((skill, i) => (
                                        <span 
                                            key={skill} 
                                            className="px-3 py-1.5 text-xs font-semibold text-slate-300 bg-white/2 border border-white/5 rounded-lg hover:border-[#D4AF37]/45 hover:text-white hover:bg-white/4 transition-all duration-300 cursor-default select-none"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Continuous Horizontal Marquee */}
            <div className="w-full overflow-hidden mt-20 py-8 border-t border-b border-white/5 relative bg-white/0.5 select-none">
                <div className="animate-marquee whitespace-nowrap flex gap-12 items-center">
                    {/* Duplicate array to make it scroll continuously */}
                    {marqueeSkills.concat(marqueeSkills).concat(marqueeSkills).map((name, index) => (
                        <span 
                            key={index} 
                            className="orbitron text-xs md:text-lg font-bold tracking-[0.25em] text-slate-700 hover:text-[#D4AF37]/50 transition-colors duration-300 px-6 cursor-default"
                        >
                            {name}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
