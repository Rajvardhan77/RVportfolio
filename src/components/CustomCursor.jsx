import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    useEffect(() => {
        const dot = dotRef.current;
        const ring = ringRef.current;
        if (!dot || !ring) return;

        const onMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            dot.style.left = mouseX + 'px';
            dot.style.top = mouseY + 'px';
        };

        const animate = () => {
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;
            ring.style.left = ringX + 'px';
            ring.style.top = ringY + 'px';
            requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', onMouseMove);
        animate();

        // Scale up on interactive elements
        const onEnter = () => {
            dot.style.transform = 'translate(-50%, -50%) scale(0)';
            ring.style.width = '48px';
            ring.style.height = '48px';
            ring.style.borderColor = 'rgba(0,245,255,0.6)';
            ring.style.backgroundColor = 'rgba(0,245,255,0.05)';
        };
        const onLeave = () => {
            dot.style.transform = 'translate(-50%, -50%) scale(1)';
            ring.style.width = '32px';
            ring.style.height = '32px';
            ring.style.borderColor = 'rgba(0,245,255,0.25)';
            ring.style.backgroundColor = 'transparent';
        };

        const addListeners = () => {
            document.querySelectorAll('a, button, [role="button"]').forEach(el => {
                el.addEventListener('mouseenter', onEnter);
                el.addEventListener('mouseleave', onLeave);
            });
        };
        addListeners();
        const observer = new MutationObserver(addListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            document.removeEventListener('mousemove', onMouseMove);
            observer.disconnect();
        };
    }, []);

    return (
        <>
            <div
                ref={dotRef}
                className="fixed z-[9999] pointer-events-none"
                style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: '#00F5FF',
                    boxShadow: '0 0 6px #00F5FF',
                    transform: 'translate(-50%, -50%)',
                    transition: 'transform 0.15s ease',
                }}
            />
            <div
                ref={ringRef}
                className="fixed z-[9998] pointer-events-none"
                style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: '1px solid rgba(0,245,255,0.25)',
                    transform: 'translate(-50%, -50%)',
                    transition: 'width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background-color 0.25s ease',
                }}
            />
        </>
    );
};

export default CustomCursor;
