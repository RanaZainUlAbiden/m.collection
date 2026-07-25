"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Quote } from "lucide-react";

const testimonials = [
    {
        quote: "The quality is unmatched. I've never owned such comfortable formal shoes. Highly recommended!",
        name: "Ahmed R.",
        location: "Lahore, PK",
    },
    {
        quote: "Excellent quality and fast delivery. The shoes fit perfectly and look even better in person!",
        name: "Sana K.",
        location: "Karachi, PK",
    },
    {
        quote: "Best footwear brand in Pakistan. My entire family now shops from MR. Absolutely love the comfort!",
        name: "Usman M.",
        location: "Islamabad, PK",
    },
    {
        quote: "I ordered for the first time and was amazed by the quality. True to size, beautifully packaged, and very comfortable.",
        name: "Fatima B.",
        location: "Rawalpindi, PK",
    },
];

export function Testimonials() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent(prev => (prev + 1) % testimonials.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const t = testimonials[current];

    return (
        <section className="py-16 md:py-28 bg-primary relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <div className="flex justify-center mb-8">
                        <Quote className="w-12 h-12 text-secondary" />
                    </div>

                    <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif italic text-white leading-[1.3] mb-10 font-normal">
                        &ldquo;{t.quote}&rdquo;
                    </h2>

                    <div className="flex flex-col items-center justify-center">
                        <span className="text-secondary font-heading font-bold text-lg mb-1">&mdash; {t.name}</span>
                        <span className="text-white/60 text-sm">{t.location}</span>
                    </div>

                    <div className="flex justify-center gap-2 mt-10">
                        {testimonials.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-2 rounded-full transition-all duration-300 ${
                                    i === current ? "w-8 bg-secondary" : "w-2 bg-white/30"
                                }`}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
