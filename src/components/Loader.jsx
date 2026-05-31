import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Loader = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => onComplete && onComplete(), 2600);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div className="fixed inset-0 z-[10000] flex flex-col items-center justify-center" style={{ background: '#0F172A' }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <div className="relative flex items-center justify-center mb-10">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} className="absolute w-24 h-24 rounded-full" style={{ border: '1px solid rgba(212,175,55,0.2)' }} />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 5, repeat: Infinity, ease: 'linear' }} className="absolute w-32 h-32 rounded-full" style={{ border: '1px solid rgba(212,175,55,0.15)' }} />
                <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}
                    className="orbitron font-black text-2xl tracking-wider" style={{ color: '#D4AF37', textShadow: '0 0 30px rgba(212,175,55,0.4)' }}>
                    RV
                </motion.div>
            </div>
            <div className="w-36 h-px rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div className="h-full rounded-full" style={{ background: 'linear-gradient(90deg, #D4AF37, #D4AF37)' }}
                    initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2.2, ease: [0.25, 0.46, 0.45, 0.94] }} />
            </div>
            <motion.p animate={{ opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-5 text-[10px] tracking-[0.3em] font-medium" style={{ color: 'rgba(212,175,55,0.25)' }}>LOADING</motion.p>
        </motion.div>
    );
};

export default Loader;
