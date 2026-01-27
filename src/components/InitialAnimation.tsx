import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PARTICLE_COUNT = 1500;
const ANIMATION_DURATION = 15000; // 15 seconds loop

export const InitialAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        // Use fixed dimensions matching the scaler container (1920x1080)
        let width = canvas.width = 1920;
        let height = canvas.height = 1080;

        const handleResize = () => {
            // No action needed on resize as dimensions are fixed for scaling
        };


        window.addEventListener('resize', handleResize);

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            baseX: number;
            baseY: number;
            size: number;
            color: string;
            speed: number;
            angle: number;
            friction: number;
            ease: number;

            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.baseX = this.x;
                this.baseY = this.y;
                this.size = Math.random() * 1.5 + 0.5;
                this.color = `rgba(45, 212, 191, ${Math.random() * 0.4 + 0.2})`;
                this.speed = Math.random() * 1 + 0.5;
                this.angle = Math.random() * Math.PI * 2;
                this.friction = 0.95;
                this.ease = 0.05;
            }

            update(time: number, pIndex: number) {
                const loopTime = time % ANIMATION_DURATION;
                const progress = loopTime / ANIMATION_DURATION;

                if (progress < 0.35) {
                    // Stage 1: Abstract Data
                    this.angle += 0.01;
                    this.vx += Math.cos(this.angle) * 0.1;
                    this.vy += Math.sin(this.angle) * 0.1;
                    this.vx *= this.friction;
                    this.vy *= this.friction;
                    this.x += this.vx;
                    this.y += this.vy;
                } else if (progress < 0.65) {
                    // Stage 2: Human Synthesis
                    const centerX = width / 2;
                    const centerY = height / 2;

                    const ratio = pIndex / PARTICLE_COUNT;
                    let tx, ty;

                    if (ratio < 0.2) { // Head
                        const a = ratio * 5 * Math.PI * 2;
                        tx = centerX + Math.cos(a) * 50;
                        ty = centerY - 180 + Math.sin(a) * 60;
                    } else if (ratio < 0.5) { // Torso
                        const a = (ratio - 0.2) * 3.33 * Math.PI;
                        tx = centerX + Math.cos(a) * 120 * Math.sin(a * 0.5);
                        ty = centerY + (ratio - 0.2) * 300 - 100;
                    } else { // Shoulders/Arms
                        const side = ratio < 0.75 ? -1 : 1;
                        const localRatio = (ratio - (ratio < 0.75 ? 0.5 : 0.75)) * 4;
                        tx = centerX + side * (60 + localRatio * 100);
                        ty = centerY - 100 + localRatio * 50;
                    }

                    this.x += (tx - this.x) * this.ease;
                    this.y += (ty - this.y) * this.ease;
                } else if (progress < 0.85) {
                    // Stage 3: Dissolve
                    this.vx += (Math.random() - 0.5) * 0.8;
                    this.vy += (Math.random() - 0.5) * 0.8;
                    this.x += this.vx;
                    this.y += this.vy;
                    this.vx *= 0.99;
                    this.vy *= 0.99;
                } else {
                    // Stage 4: Reset Transition
                    this.vx += (this.baseX - this.x) * 0.02;
                    this.vy += (this.baseY - this.y) * 0.02;
                    this.x += this.vx;
                    this.y += this.vy;
                }

                // Wrap around
                if (this.x < 0) this.x = width;
                if (this.x > width) this.x = 0;
                if (this.y < 0) this.y = height;
                if (this.y > height) this.y = 0;
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle());
            }
        };

        const animate = (time: number) => {
            ctx.fillStyle = 'rgba(10, 18, 16, 0.15)';
            ctx.fillRect(0, 0, width, height);

            particles.forEach((p, i) => {
                p.update(time, i);
                p.draw();
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        initParticles();
        animate(0);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center bg-[#0a1210] overflow-hidden">
            <canvas ref={canvasRef} className="absolute inset-0" />

            <AnimatePresence>
                <motion.div
                    key="content"
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 0, 1, 0],
                        transition: {
                            duration: ANIMATION_DURATION / 1000,
                            times: [0, 0.7, 0.85, 1],
                            repeat: Infinity,
                            ease: "easeInOut"
                        }
                    }}
                    className="relative z-10 flex flex-col items-center"
                >
                    <div className="text-6xl md:text-8xl font-display font-medium tracking-tight uppercase text-white text-center">
                        NESTLÉ<span className="text-brand-primary">.</span><br />
                        <span className="text-4xl md:text-6xl text-gray-400">NUTRICIÓN</span>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 pointer-events-none">
                <div className="h-full w-px bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent absolute left-1/4" />
                <div className="h-full w-px bg-gradient-to-b from-transparent via-brand-primary/5 to-transparent absolute left-3/4" />
                <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-primary/5 to-transparent absolute top-1/4" />
                <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-primary/5 to-transparent absolute top-3/4" />
            </div>
        </div>
    );
};
