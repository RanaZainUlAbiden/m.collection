"use client";

import { motion } from "framer-motion";

const features = [
    {
        number: "01",
        title: "Premium Craftsmanship",
        description: "From luxury footwear to pure organic self-care, every product is crafted with uncompromising quality and attention to detail.",
    },
    {
        number: "02",
        title: "Organic Elegance",
        description: "Nurture your body with our self-made organic shampoos, nourishing oils, body scrubs, and keratin treatments.",
    },
    {
        number: "03",
        title: "Absolute Comfort",
        description: "Experience all-day comfort with our expertly designed shoes featuring premium materials and targeted cushioning.",
    },
    {
        number: "04",
        title: "Nationwide Delivery",
        description: "Fast, reliable, and secure shipping to all major cities across Pakistan.",
    },
    {
        number: "05",
        title: "Affordable Luxury",
        description: "Indulge in premium footwear and holistic organic care at prices that respect your budget.",
    },
    {
        number: "06",
        title: "Hassle-Free Returns",
        description: "Not entirely satisfied? We make it right with our seamless, customer-first return policy.",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export function WhyChooseUs() {
    return (
        <section className="py-20 md:py-32 bg-white">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6">
                        Why Choose Us
                    </h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        We deliver a lifestyle of elegance and wellness. From premium footwear to holistic organic body care, here&apos;s why customers trust us.
                    </p>
                </div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className="mb-4 text-primary/40 group-hover:text-primary group-hover:-translate-y-2 transition-all duration-500 ease-out font-serif italic text-6xl md:text-7xl">
                                {feature.number}
                            </div>
                            <h3 className="text-xl font-heading font-bold text-foreground mb-4">{feature.title}</h3>
                            <p className="text-base text-muted-foreground leading-relaxed max-w-xs mx-auto">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
