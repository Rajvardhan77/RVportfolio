import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const InputField = ({ label, type = 'text', name, placeholder }) => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState('');
    return (
        <div>
            <label className="block text-[10px] tracking-[0.2em] font-bold mb-2.5 orbitron uppercase text-slate-400">{label}</label>
            {type === 'textarea' ? (
                <textarea name={name} placeholder={placeholder} rows={5} value={value}
                    onChange={e => setValue(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    className="w-full px-5 py-4 text-sm rounded-xl resize-none outline-none text-white transition-all duration-300 placeholder-slate-600"
                    style={{
                        background: focused ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.015)',
                        border: `1px solid ${focused ? 'rgba(212, 175, 55, 0.4)' : 'rgba(255, 255, 255, 0.05)'}`,
                        boxShadow: focused ? '0 0 25px rgba(212, 175, 55, 0.05), inset 0 0 15px rgba(212, 175, 55, 0.02)' : 'none',
                        caretColor: '#D4AF37', fontFamily: 'Inter, sans-serif',
                    }}
                />
            ) : (
                <input type={type} name={name} placeholder={placeholder} value={value}
                    onChange={e => setValue(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
                    className="w-full px-5 py-4 text-sm rounded-xl outline-none text-white transition-all duration-300 placeholder-slate-600"
                    style={{
                        background: focused ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.015)',
                        border: `1px solid ${focused ? 'rgba(212, 175, 55, 0.4)' : 'rgba(255, 255, 255, 0.05)'}`,
                        boxShadow: focused ? '0 0 25px rgba(212, 175, 55, 0.05), inset 0 0 15px rgba(212, 175, 55, 0.02)' : 'none',
                        caretColor: '#D4AF37', fontFamily: 'Inter, sans-serif',
                    }}
                />
            )}
        </div>
    );
};

const Contact = () => {
    const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
    const [sent, setSent] = useState(false);
    const handleSubmit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); };

    return (
        <section id="contact" className="relative section-padding overflow-hidden noise bg-bg">
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(212,175,55,0.02) 0%, transparent 60%)' }} />
            <div className="absolute inset-0 grid-bg opacity-20" />

            <div className="relative z-10 max-w-5xl mx-auto" ref={ref}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="mb-16">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="h-px flex-1 max-w-16" style={{ background: 'linear-gradient(90deg, #D4AF37, transparent)' }} />
                        <span className="orbitron text-xs tracking-[0.3em] font-semibold text-primary">CONTACT</span>
                    </div>
                    <h2 className="orbitron font-bold text-3xl md:text-5xl text-white">
                        Let's <span className="gradient-text">Connect</span>
                    </h2>
                    <p className="mt-4 text-sm max-w-lg text-slate-400">
                        Have a project in mind, an opportunity, or just want to discuss some tech? Feel free to reach out!
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-5 gap-8">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="lg:col-span-2 space-y-4">
                        {/* Email Card */}
                        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.015] hover:border-primary/20 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20">
                                    <svg width="20" height="20" fill="none" stroke="#D4AF37" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22,6 12,13 2,6" />
                                    </svg>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[9px] tracking-widest font-bold text-slate-500 uppercase orbitron mb-1">EMAIL</p>
                                    <a href="mailto:kyaragarirajvardhan@gmail.com" className="text-sm font-semibold text-white hover:text-primary transition-colors duration-300 break-all">
                                        kyaragarirajvardhan@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.015] hover:border-primary/20 transition-all duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-primary/10 border border-primary/20">
                                    <svg width="20" height="20" fill="none" stroke="#D4AF37" strokeWidth="1.5" viewBox="0 0 24 24">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-[9px] tracking-widest font-bold text-slate-500 uppercase orbitron mb-1">LOCATION</p>
                                    <p className="text-sm font-semibold text-white">Hyderabad, India</p>
                                </div>
                            </div>
                        </div>

                        {/* Availability Card */}
                        <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.015]">
                            <div className="flex items-center gap-3">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <p className="text-xs font-semibold text-slate-300">Available for freelance projects & internships</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="lg:col-span-3">
                        <div className="rounded-2xl p-8 border border-white/5 bg-white/[0.01]">
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <InputField label="YOUR NAME" name="name" placeholder="John Doe" />
                                    <InputField label="YOUR EMAIL" name="email" type="email" placeholder="john@example.com" />
                                </div>
                                <InputField label="SUBJECT" name="subject" placeholder="Project inquiry" />
                                <InputField label="MESSAGE" name="message" type="textarea" placeholder="Tell me about your project..." />
                                
                                <motion.button type="submit" whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }}
                                    className="w-full py-4 rounded-xl font-bold tracking-[0.15em] text-xs orbitron flex items-center justify-center gap-3 transition-all duration-300"
                                    style={{
                                        background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
                                        color: '#030712',
                                        boxShadow: sent ? '0 0 35px rgba(212,175,55,0.45)' : '0 0 25px rgba(212,175,55,0.15)',
                                        cursor: 'pointer',
                                    }}
                                >
                                    {sent ? '✓ MESSAGE SENT' : (
                                        <>SEND MESSAGE <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg></>
                                    )}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
