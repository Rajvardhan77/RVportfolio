import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('Home');
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            // Check scrolled state
            setScrolled(window.scrollY > 40);

            // Calculate scroll progress percentage
            const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
            if (totalScroll > 0) {
                const progress = (window.scrollY / totalScroll) * 100;
                setScrollProgress(progress);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sections = navLinks.map(n => n.label.toLowerCase());
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const label = entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1);
                        setActive(label);
                    }
                });
            },
            { threshold: 0.25, rootMargin: '-20% 0px -60% 0px' }
        );
        sections.forEach(id => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <>
            {/* Scroll Progress Bar */}
            <div 
                className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#F59E0B] to-[#D4AF37] origin-left z-[2000] w-full transition-transform duration-75"
                style={{ transform: `scaleX(${scrollProgress / 100})` }}
            />

            <motion.nav 
                initial={{ y: -100, opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                transition={{ duration: 0.8, ease: 'easeOut' }} 
                className="fixed top-0 left-0 right-0 z-[1000] py-3 sm:py-4 transition-all duration-300"
            >
                <div 
                    className="mx-auto max-w-6xl px-4 transition-all duration-300"
                >
                    <div 
                        className="flex items-center justify-between rounded-full border px-5 sm:px-6 py-3 transition-all"
                        style={{
                            background: scrolled ? 'rgba(3, 7, 18, 0.45)' : 'rgba(3, 7, 18, 0.15)',
                            backdropFilter: 'blur(16px)',
                            borderColor: scrolled ? 'rgba(255, 255, 255, 0.06)' : 'rgba(255, 255, 255, 0.03)',
                            boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.4)' : 'none'
                        }}
                    >
                        {/* Logo with pulsing availability dot */}
                        <a href="#home" className="flex items-center gap-2 group font-mono text-sm tracking-tight text-white hover:opacity-90 transition-opacity">
                            <span className="relative flex size-2.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-60 animate-ping"></span>
                                <span className="relative inline-flex size-2.5 rounded-full bg-[#D4AF37]"></span>
                            </span>
                            <span className="orbitron font-black tracking-widest text-[#D4AF37]">VARDHAN</span>
                        </a>

                        {/* Desktop Nav Links */}
                        <nav className="hidden lg:flex items-center gap-1">
                            {navLinks.map(({ label, href }) => (
                                <a 
                                    key={label} 
                                    href={href} 
                                    onClick={() => setActive(label)}
                                    className="relative px-4 py-2 text-xs font-semibold tracking-wider rounded-full transition-all duration-300"
                                    style={{
                                        color: active === label ? '#030712' : '#94A3B8',
                                        background: active === label ? '#D4AF37' : 'transparent',
                                        boxShadow: active === label ? '0 0 15px rgba(212,175,55,0.25)' : 'none',
                                    }}
                                >
                                    {label}
                                </a>
                            ))}
                        </nav>

                        {/* Desktop Contact CTA */}
                        <div className="hidden lg:block">
                            <a 
                                href="#contact" 
                                className="rounded-full border border-white/10 hover:border-[#D4AF37]/50 bg-white/3 px-4 py-2 text-xs font-bold tracking-wider orbitron text-white hover:bg-white/5 transition-all duration-300"
                            >
                                GET IN TOUCH
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button 
                            className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5" 
                            onClick={() => setMenuOpen(!menuOpen)} 
                            aria-label="Toggle menu"
                        >
                            <motion.span animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="block w-5 h-px origin-center" style={{ background: '#D4AF37' }} />
                            <motion.span animate={menuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }} className="block w-5 h-px" style={{ background: '#D4AF37' }} />
                            <motion.span animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="block w-5 h-px origin-center" style={{ background: '#D4AF37' }} />
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }} 
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="lg:hidden overflow-hidden mt-2 mx-4 rounded-2xl border" 
                            style={{ 
                                background: 'rgba(3, 7, 18, 0.95)', 
                                backdropFilter: 'blur(30px)', 
                                borderColor: 'rgba(255, 255, 255, 0.08)' 
                            }}
                        >
                            <div className="px-5 py-5 flex flex-col gap-1.5">
                                {navLinks.map(({ label, href }, i) => (
                                    <motion.a 
                                        key={label} 
                                        href={href} 
                                        initial={{ opacity: 0, x: -10 }} 
                                        animate={{ opacity: 1, x: 0 }} 
                                        transition={{ delay: i * 0.04 }}
                                        onClick={() => { setActive(label); setMenuOpen(false); }}
                                        className="py-3 px-4 rounded-xl text-xs font-semibold tracking-wider transition-all duration-200"
                                        style={{ 
                                            color: active === label ? '#D4AF37' : '#94A3B8', 
                                            background: active === label ? 'rgba(212,175,55,0.06)' : 'transparent' 
                                        }}
                                    >
                                        {label}
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </>
    );
};

export default Navbar;
