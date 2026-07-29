"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    delay?: number;
}

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
    const [shouldAnimate, setShouldAnimate] = useState(true);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.innerWidth < 768) {
            setShouldAnimate(false);
        }
    }, []);

    return (
        <motion.div
            initial={shouldAnimate ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
            whileInView={shouldAnimate ? { opacity: 1, y: 0 } : undefined}
            viewport={{ once: true, margin: "0px" }}
            transition={{ duration: 0.4, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
