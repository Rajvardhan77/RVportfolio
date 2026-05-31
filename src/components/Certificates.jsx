import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const certificates = [
    {
        title: 'Forge Inspira 2026',
        issuer: 'IIT Hyderabad — Forge Alumnus Services',
        year: '2026',
        color: '#D4AF37',
        image: '/certs/forge-inspira.png',
        desc: 'Career & Corporate Fest at IIT Hyderabad. Participated in the Hackathon & Codeathon series.',
        role: 'PARTICIPANT',
    },
    {
        title: 'GFG Classroom Hackfest',
        issuer: 'GeeksForGeeks Classroom Program',
        year: '2025',
        color: '#D4AF37',
        image: '/certs/hackfest.jpg',
        desc: 'Participated as Team Captain in Hackfest organized by GeeksForGeeks, leading problem-solving sprints.',
        role: 'TEAM CAPTAIN',
    },
    {
        title: 'Web Dev Bootcamp',
        issuer: 'MVSR Engineering College — DevLoop',
        year: '2025',
        color: '#D4AF37',
        image: '/certs/webdev-bootcamp.png',
        desc: 'Successfully completed the comprehensive DevLoop Web Development Bootcamp spanning May–June 2025.',
        role: 'CERTIFIED',
    },
    {
        title: 'CodeQuest 2026 AI Agent Finalist',
        issuer: 'AI Agent Hackathon',
        year: '2026',
        color: '#D4AF37',
        image: null,
        desc: 'Reached the Finalist round (Round 2) in CodeQuest 2026, building state-of-the-art autonomous AI agents.',
        role: 'FINALIST (RD 2)',
    },
    {
        title: 'BugSugi Event Coordinator',
        issuer: 'MVSR Engineering College',
        year: '2025',
        color: '#D4AF37',
        image: null,
        desc: 'Served as the main Student Coordinator for the BugSugi bug-hunting and debugging event held at MVSR Engineering College.',
        role: 'COORDINATOR',
    },
];

const CertificateFallback = ({ title, role, issuer }) => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-6 text-center border-b border-white/5 relative overflow-hidden">
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Badge Icon */}
        <div className="relative w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
            <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse" />
            <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
            </svg>
        </div>
        <span className="orbitron text-[8px] font-bold tracking-[0.2em] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20 mb-2">
            {role}
        </span>
        <h4 className="orbitron font-bold text-xs text-white max-w-[220px] line-clamp-2">{title}</h4>
        <p className="text-[9px] text-slate-500 mt-1 max-w-[200px] truncate">{issuer}</p>
    </div>
);

const AchievementDossier = ({ cert, onClose }) => {
    return (
        <div className="relative w-full max-w-2xl bg-slate-950 border border-primary/30 rounded-2xl p-8 md:p-12 text-center overflow-hidden"
             style={{ boxShadow: '0 0 60px rgba(212, 175, 55, 0.15)' }}
             onClick={e => e.stopPropagation()}
        >
            {/* Elegant Background Patterns */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #D4AF37 1px, transparent 0)', backgroundSize: '24px 24px' }} />
            <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-primary/5 filter blur-3xl" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full bg-primary/5 filter blur-3xl" />
            
            {/* Border frame */}
            <div className="absolute inset-4 border border-primary/10 pointer-events-none rounded-xl" />
            <div className="absolute inset-5 border border-dashed border-primary/5 pointer-events-none rounded-lg" />
            
            {/* Corner decorations */}
            <div className="absolute top-6 left-6 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
            <div className="absolute top-6 right-6 w-4 h-4 border-t-2 border-r-2 border-primary/40" />
            <div className="absolute bottom-6 left-6 w-4 h-4 border-b-2 border-l-2 border-primary/40" />
            <div className="absolute bottom-6 right-6 w-4 h-4 border-b-2 border-r-2 border-primary/40" />

            <button onClick={onClose} className="absolute top-8 right-8 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-slate-900 border border-white/10 hover:border-primary/40 text-slate-400 hover:text-primary transition-all z-10">
                ✕
            </button>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                </div>

                <span className="orbitron text-[10px] tracking-[0.4em] font-semibold text-primary/70 mb-2">VERIFIED ACHIEVEMENT</span>
                
                <h3 className="orbitron text-2xl md:text-3xl font-extrabold text-white mb-2 max-w-lg leading-tight">
                    {cert.title}
                </h3>
                
                <div className="w-16 h-0.5 bg-primary/30 my-4" />

                <p className="text-slate-400 text-sm md:text-base max-w-md mb-8 leading-relaxed">
                    {cert.desc}
                </p>

                <div className="grid grid-cols-2 gap-8 text-left max-w-sm w-full bg-slate-900/50 border border-white/5 rounded-xl p-5">
                    <div>
                        <span className="text-[10px] text-slate-500 block uppercase tracking-wider">Issued By</span>
                        <span className="text-xs font-semibold text-slate-200">{cert.issuer}</span>
                    </div>
                    <div>
                        <span className="text-[10px] text-slate-500 block uppercase tracking-wider">Date / Year</span>
                        <span className="text-xs font-semibold text-slate-200">{cert.year}</span>
                    </div>
                    <div>
                        <span className="text-[10px] text-slate-500 block uppercase tracking-wider">Designation</span>
                        <span className="text-xs font-semibold text-primary">{cert.role}</span>
                    </div>
                    <div>
                        <span className="text-[10px] text-slate-500 block uppercase tracking-wider">Verification Status</span>
                        <span className="text-xs font-semibold text-green-400 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                            Confirmed
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CertCard = ({ cert, index, inView, onClick }) => {
    const [hovered, setHovered] = useState(false);
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.12 }}
            className="cursor-pointer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => onClick(cert)}
        >
            <div className="rounded-2xl overflow-hidden h-full flex flex-col"
                style={{
                    background: 'rgba(255,255,255,0.015)',
                    border: `1px solid ${hovered ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.05)'}`,
                    boxShadow: hovered ? '0 10px 30px rgba(0,0,0,0.5), 0 0 30px rgba(212,175,55,0.04)' : '0 4px 20px rgba(0,0,0,0.2)',
                    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
            >
                <div className="relative h-48 overflow-hidden bg-slate-950 flex items-center justify-center">
                    {cert.image ? (
                        <>
                            <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" style={{ transform: hovered ? 'scale(1.03)' : 'scale(1)', transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        </>
                    ) : (
                        <CertificateFallback title={cert.title} role={cert.role} issuer={cert.issuer} />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-slate-950/40 backdrop-blur-sm transition-opacity duration-300">
                        <div className="px-5 py-2.5 rounded-full text-[10px] font-bold tracking-[0.2em] orbitron"
                            style={{ background: 'rgba(3,7,18,0.9)', border: '1px solid rgba(212,175,55,0.3)', color: '#D4AF37' }}>
                            VIEW DETAILS
                        </div>
                    </div>
                    {cert.image && (
                        <div className="absolute top-4 right-4 z-10">
                            <span className="px-3 py-1 rounded-full text-[9px] font-bold tracking-[0.15em] bg-primary/15 border border-primary/25 text-primary backdrop-blur-md">
                                {cert.role}
                            </span>
                        </div>
                    )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="font-bold text-base text-white mb-1 tracking-tight hover:text-primary transition-colors duration-300">{cert.title}</h3>
                        <p className="text-xs text-primary/70 font-medium mb-3">{cert.issuer}</p>
                        <p className="text-xs text-slate-400 leading-relaxed">{cert.desc}</p>
                    </div>
                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/5">
                        <span className="orbitron text-[10px] font-bold text-slate-500">{cert.year}</span>
                        <div className="flex items-center gap-1.5" style={{ opacity: hovered ? 1 : 0.6, transform: hovered ? 'translateX(0)' : 'translateX(-3px)', transition: 'all 0.3s' }}>
                            <span className="text-[9px] tracking-widest font-bold text-primary">VIEW</span>
                            <div className="h-px w-4 bg-primary" />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const CertModal = ({ cert, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[5000] flex items-center justify-center p-4"
        style={{ background: 'rgba(3,7,18,0.92)', backdropFilter: 'blur(16px)' }}
        onClick={onClose}
    >
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            onClick={e => e.stopPropagation()}
            className="flex items-center justify-center w-full max-w-3xl"
        >
            {cert.image ? (
                <div className="relative w-full rounded-2xl overflow-hidden border border-white/10" style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
                    <img src={cert.image} alt={cert.title} className="w-full h-auto max-h-[80vh] object-contain bg-slate-950" />
                    <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold bg-slate-900 border border-white/10 hover:border-primary/40 text-slate-400 hover:text-primary transition-all z-10">
                        ✕
                    </button>
                    <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent flex flex-col gap-1">
                        <span className="text-primary text-[10px] orbitron tracking-wider">{cert.role}</span>
                        <h4 className="text-white text-base font-bold">{cert.title}</h4>
                        <p className="text-slate-400 text-xs">{cert.issuer} • {cert.year}</p>
                    </div>
                </div>
            ) : (
                <AchievementDossier cert={cert} onClose={onClose} />
            )}
        </motion.div>
    </motion.div>
);

const Certificates = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [selected, setSelected] = useState(null);

    return (
        <section id="certificates" className="relative section-padding overflow-hidden noise bg-bg">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.02) 0%, transparent 60%)' }} />

            <div className="relative z-10 max-w-6xl mx-auto" ref={ref}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
                        <span className="orbitron text-xs tracking-[0.3em] font-semibold text-primary">ACHIEVEMENTS</span>
                    </div>
                    <h2 className="orbitron font-bold text-3xl md:text-5xl text-white">
                        Certificates & <span className="gradient-text">Awards</span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, i) => (
                        <CertCard key={cert.title} cert={cert} index={i} inView={inView} onClick={setSelected} />
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selected && <CertModal cert={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </section>
    );
};

export default Certificates;
