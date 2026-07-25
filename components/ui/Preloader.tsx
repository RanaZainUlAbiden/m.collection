"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";
        
        // Simulate minimum loading time for cinematic effect
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "auto";
        }, 1800);

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center flex flex-col items-center gap-4"
                    >
                        <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-normal text-foreground">
                            Marjaan Collection
                        </h1>
                        
                        <div className="w-32 h-[1px] bg-foreground/10 overflow-hidden relative">
                            <motion.div 
                                className="absolute top-0 left-0 h-full bg-foreground"
                                initial={{ width: "0%", x: "0%" }}
                                animate={{ width: ["0%", "100%", "100%"], x: ["0%", "0%", "100%"] }}
                                transition={{ duration: 1.5, ease: "easeInOut" }}
                            />
                        </div>
                        
                        <p className="text-[10px] uppercase tracking-[0.3em] font-medium text-muted-foreground">
                            Style & Wellness
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
