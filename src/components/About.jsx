import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 });

    return (
        <section id="about" className="relative section-padding overflow-hidden noise">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 30%, rgba(212,175,55,0.03) 0%, transparent 50%)' }} />
            <div className="absolute inset-0 line-grid-bg opacity-30" />

            <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
                        <span className="orbitron text-xs tracking-[0.3em] font-semibold" style={{ color: '#D4AF37' }}>ABOUT</span>
                    </div>
                    <h2 className="orbitron font-bold text-3xl md:text-5xl text-white">
                        Who I <span className="gradient-text">Am</span>
                    </h2>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8 items-start">
                    {/* Left Column: Profile Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-2"
                    >
                        <div className="relative rounded-2xl overflow-hidden glass-card"
                            style={{ background: 'rgba(255, 255, 255, 0.015)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
                        >
                            <div className="h-32 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #050816, #0A0E1A)' }}>
                                <div className="absolute inset-0 grid-bg opacity-40" />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                                        className="w-20 h-20 rounded-full"
                                        style={{ background: 'conic-gradient(from 0deg, #D4AF37, #D4AF37, transparent, transparent, transparent, #D4AF37)', padding: '1.5px' }}
                                    >
                                        <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: '#030712' }}>
                                            <span className="orbitron font-black text-xl text-white">RV</span>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="orbitron font-bold text-lg mb-1 text-white">Raja Vardhan</h3>
                                <p className="text-[10px] tracking-widest mb-6 text-slate-400 font-bold">IT STUDENT & WEB DEVELOPER</p>
                                <div className="grid grid-cols-3 gap-2 mt-4">
                                    {[{ val: '5+', lab: 'Projects' }, { val: '10+', lab: 'Skills' }, { val: '5', lab: 'Awards' }].map(({ val, lab }) => (
                                        <div key={lab} className="py-3 rounded-xl bg-white/2 border border-white/5">
                                            <p className="orbitron font-bold text-base text-white">{val}</p>
                                            <p className="text-[9px] mt-0.5 tracking-wider text-slate-400">{lab}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Timeline & Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="lg:col-span-3 space-y-8"
                    >
                        <div className="rounded-2xl p-6 bg-white/1.5 border border-white/5">
                            <p className="text-sm md:text-base leading-relaxed text-slate-300 font-light">
                                I am <span className="font-semibold text-white">RAJA VARDHAN</span>, an Information Technology undergraduate at{' '}
                                <span className="text-[#D4AF37] font-semibold">MVSR Engineering College</span>.
                                Passionate about building modular web experiences, interactive user interfaces, and clean architectures that push the limits of modern web development.
                            </p>
                        </div>
                        
                        <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-4 before:w-[1px] before:bg-white/10 before:pointer-events-none text-left">
                            <h3 className="orbitron text-xs font-bold tracking-[0.2em] text-[#D4AF37] pl-10 mb-4 uppercase">EDUCATION TIMELINE</h3>
                            
                            {/* Timeline item 1 */}
                            <div className="relative pl-10">
                                <div className="absolute left-[12px] top-1.5 w-2 h-2 rounded-full bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                                <span className="text-[9px] orbitron font-bold text-[#D4AF37] tracking-wider">2024 — 2028 (EXPECTED)</span>
                                <h4 className="text-base font-bold text-white mt-1">B.Tech in Information Technology</h4>
                                <p className="text-xs text-slate-400 font-medium">MVSR Engineering College | CGPA 7.2</p>
                                <div className="mt-3 flex flex-wrap gap-1.5">
                                    {['Data Structures', 'C Programming', 'Java', 'Python', 'Discrete Maths', 'DBMS', 'OS', 'Web Dev'].map(course => (
                                        <span key={course} className="px-2 py-0.5 rounded bg-white/3 border border-white/5 text-[9px] font-semibold text-slate-300">
                                            {course}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Timeline item 2 */}
                            <div className="relative pl-10">
                                <div className="absolute left-[12px] top-1.5 w-2 h-2 rounded-full bg-slate-600" />
                                <span className="text-[9px] orbitron font-bold text-slate-400 tracking-wider">2022 — 2024</span>
                                <h4 className="text-base font-bold text-white mt-1">Higher Secondary Education</h4>
                                <p className="text-xs text-slate-400 font-medium">Aakash Institute | Grade 64%</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
