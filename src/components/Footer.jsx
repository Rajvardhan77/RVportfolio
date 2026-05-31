import React from 'react';
import { motion } from 'framer-motion';

const GithubIcon = () => (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
);
const LinkedinIcon = () => (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
);
const TwitterIcon = () => (
    <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);
const MailIcon = () => (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const socials = [
    { icon: GithubIcon, href: 'https://github.com/', label: 'GitHub' },
    { icon: LinkedinIcon, href: 'https://linkedin.com/', label: 'LinkedIn' },
    { icon: MailIcon, href: 'mailto:kyaragarirajvardhan@gmail.com', label: 'Email' },
    { icon: TwitterIcon, href: 'https://twitter.com/', label: 'Twitter' },
];

const Footer = () => (
    <footer className="relative px-6 lg:px-8 bg-bg">
        <div className="h-px max-w-6xl mx-auto" style={{ background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05), transparent)' }} />
        
        <div className="max-w-6xl mx-auto py-16">
            <div className="grid md:grid-cols-3 items-center gap-8">
                {/* Logo and Tagline */}
                <div>
                    <a href="#home" className="inline-block">
                        <span className="orbitron font-black text-xl tracking-wider text-white">
                            RV<span className="text-primary">.</span>
                        </span>
                    </a>
                    <p className="text-xs mt-2 leading-relaxed max-w-xs text-slate-500">
                        Building premium, high-performance web experiences with modern architecture.
                    </p>
                </div>
                
                {/* Quick Links */}
                <div className="flex flex-wrap justify-center gap-6">
                    {['Home', 'About', 'Skills', 'Projects', 'Certificates', 'Contact'].map(link => (
                        <a key={link} href={`#${link.toLowerCase()}`}
                            className="text-[11px] tracking-wider font-semibold text-slate-400 hover:text-primary transition-colors duration-300 orbitron uppercase"
                        >
                            {link}
                        </a>
                    ))}
                </div>
                
                {/* Social Links */}
                <div className="flex items-center justify-end gap-3">
                    {socials.map(({ icon: Icon, href, label }) => (
                        <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                            whileHover={{ scale: 1.08, y: -2 }} whileTap={{ scale: 0.95 }}
                            className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 text-slate-400 hover:text-primary hover:border-primary/20 bg-white/[0.015] border border-white/5"
                            style={{ transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
                        >
                            <Icon />
                        </motion.a>
                    ))}
                </div>
            </div>
            
            {/* Copyright & Stack */}
            <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/5">
                <p className="text-[10px] text-slate-600 orbitron tracking-wider">
                    © 2026 Raja Vardhan. All rights reserved.
                </p>
                <p className="text-[10px] text-slate-600 orbitron tracking-wider">
                    React • Three.js • Framer Motion • Tailwind CSS
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
