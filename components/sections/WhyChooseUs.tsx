"use client";

import { motion } from "framer-motion";

const features = [
    {
        title: "Premium Craftsmanship",
        description: "From luxury footwear to pure organic self-care, every product is crafted with uncompromising quality and attention to detail.",
    },
    {
        title: "Organic Elegance",
        description: "Nurture your body with our self-made organic shampoos, nourishing oils, body scrubs, and keratin treatments.",
    },
    {
        title: "Absolute Comfort",
        description: "Experience all-day comfort with our expertly designed shoes featuring premium materials and targeted cushioning.",
    },
    {
        title: "Nationwide Delivery",
        description: "Fast, reliable, and secure shipping to all major cities across Pakistan.",
    },
    {
        title: "Affordable Luxury",
        description: "Indulge in premium footwear and holistic organic care at prices that respect your budget.",
    },
    {
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
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4 } },
};

export function WhyChooseUs() {
    return (
        <section className="py-16 md:py-24 bg-muted">
            <div className="container mx-auto px-4 md:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {features.map((feature) => (
                        <motion.div
                            key={feature.title}
                            variants={itemVariants}
                            className="bg-white rounded-xl p-8 border border-border/40 hover:border-primary/30 shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <h3 className="text-xl font-heading font-bold text-foreground mb-3">{feature.title}</h3>
                            <p className="text-base text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
