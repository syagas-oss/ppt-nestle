import React, { useEffect, useState, useCallback, useRef, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Star {
    id: number;
    x: number;
    y: number;
    angle: number;
    length: number;
    speed: number;
}

interface ShootingStarsProps {
    minInterval?: number;
    maxInterval?: number;
    className?: string;
    style?: CSSProperties;
    html2canvasIgnore?: boolean;
}

const DEFAULT_MIN_INTERVAL = 10000;
const DEFAULT_MAX_INTERVAL = 30000;

export const ShootingStars: React.FC<ShootingStarsProps> = ({
    minInterval = DEFAULT_MIN_INTERVAL,
    maxInterval = DEFAULT_MAX_INTERVAL,
    className = "",
    style,
    html2canvasIgnore = false
}) => {
    const [star, setStar] = useState<Star | null>(null);
    const removalTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const activeStarRef = useRef(false);

    const spawnStar = useCallback(() => {
        if (activeStarRef.current) return;

        activeStarRef.current = true;
        const id = Date.now();
        const x = Math.random() * 80;
        const y = Math.random() * 30;
        const angle = 45 + (Math.random() * 20 - 10);
        const length = 100 + Math.random() * 150;
        const speed = 0.4 + Math.random() * 0.4;

        setStar({ id, x, y, angle, length, speed });

        if (removalTimer.current) {
            clearTimeout(removalTimer.current);
        }

        removalTimer.current = setTimeout(() => {
            setStar(null);
            removalTimer.current = null;
            activeStarRef.current = false;
        }, (speed * 1000) + 120);
    }, []);

    useEffect(() => {
        const min = Math.min(minInterval, maxInterval);
        const max = Math.max(minInterval, maxInterval);
        const getNextInterval = () => Math.random() * (max - min) + min;

        let timeoutId: ReturnType<typeof setTimeout>;

        const scheduleNext = () => {
            timeoutId = setTimeout(() => {
                spawnStar();
                scheduleNext();
            }, getNextInterval());
        };

        scheduleNext();

        return () => {
            clearTimeout(timeoutId);
        };
    }, [spawnStar, minInterval, maxInterval]);

    useEffect(() => {
        return () => {
            if (removalTimer.current) {
                clearTimeout(removalTimer.current);
            }
        };
    }, []);

    const baseClass = `absolute inset-0 pointer-events-none overflow-hidden z-0${className ? ` ${className}` : ''}`;

    return (
        <div
            className={baseClass}
            style={style}
            data-html2canvas-ignore={html2canvasIgnore ? "true" : undefined}
        >
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
