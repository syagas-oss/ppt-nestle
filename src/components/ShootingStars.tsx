import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Star {
    id: number;
    x: number;
    y: number;
    angle: number;
    length: number;
    speed: number;
}

export const ShootingStars: React.FC = () => {
    const [star, setStar] = useState<Star | null>(null);

    const spawnStar = useCallback(() => {
        // Only one at a time, check if already exists
        if (star) return;

        const id = Date.now();
        // Random position starting from top or sides (mostly top-leftish)
        const x = Math.random() * 80; // 0% to 80% of width
        const y = Math.random() * 30; // 0% to 30% of height
        const angle = 45 + (Math.random() * 20 - 10); // Around 45 degrees
        const length = 100 + Math.random() * 150; // Variable length
        const speed = 0.4 + Math.random() * 0.4; // Faster movement (0.4s to 0.8s)

        setStar({ id, x, y, angle, length, speed });

        // Auto-remove after animation duration (plus some buffer)
        setTimeout(() => {
            setStar(null);
        }, (speed * 1000) + 100);
    }, [star]);

    useEffect(() => {
        // Random interval between 15 and 45 seconds as requested (sobrio)
        const getNextInterval = () => Math.random() * (30000 - 10000) + 10000; // More frequent (10s to 30s)

        let timeoutId: any;

        const scheduleNext = () => {
            timeoutId = setTimeout(() => {
                spawnStar();
                scheduleNext();
            }, getNextInterval());
        };

        scheduleNext();

        return () => clearTimeout(timeoutId);
    }, [spawnStar]);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <AnimatePresence>
                {star && (
                    <motion.div
                        key={star.id}
                        initial={{
                            x: `${star.x}%`,
                            y: `${star.y}%`,
                            opacity: 0,
                            width: 0
                        }}
                        animate={{
                            x: [`${star.x}%`, `${star.x + 20}%`],
                            y: [`${star.y}%`, `${star.y + 20}%`],
                            opacity: [0, 1, 0],
                            width: star.length
                        }}
                        transition={{
                            duration: star.speed,
                            ease: "linear"
                        }}
                        style={{
                            position: 'absolute',
                            height: '1px',
                            background: 'linear-gradient(90deg, rgba(45,212,191,0) 0%, rgba(45,212,191,1) 50%, rgba(255,255,255,0.8) 100%)',
                            boxShadow: '0 0 10px rgba(45,212,191,0.5)',
                            rotate: `${star.angle}deg`,
                            transformOrigin: 'left center'
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
