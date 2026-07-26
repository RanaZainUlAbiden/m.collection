import { Metadata } from "next";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
    title: "About Us",
    description: "Discover the journey of Marjaan Collection — a brand built on quality craftsmanship in footwear and a passion for holistic organic wellness.",
};

export default function AboutPage() {
    return (
        <div className="bg-muted min-h-screen pb-24 font-sans">
            {/* Hero Section */}
            <div className="bg-primary pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
                    <ScrollReveal>
                        <span className="text-secondary font-serif italic text-lg mb-4 block">
                            Our Story
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6">
                            Designing for the <span className="text-secondary italic">Modern Woman</span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
                            Marjaan Collection was born from a simple belief — that true elegance starts with holistic wellness and uncompromising comfort. What began as a passion for premium footwear has evolved into Pakistan&apos;s trusted destination for both luxury shoes and pure, self-made organic body care.
                        </p>
                    </ScrollReveal>
                </div>
            </div>

            {/* Minimal Content */}
            <div className="container mx-auto px-4 md:px-8 mt-16 max-w-3xl text-center">
                <ScrollReveal delay={0.2}>
                    <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">Where It All Began</h2>
                    <p className="text-base text-muted-foreground leading-relaxed">
                        We saw a gap in the market for a brand that could provide both international design standards in footwear and the purest natural ingredients in self-care. Today, our collection spans elegant stilettos, block heels, and strappy sandals, alongside our signature line of handmade organic shampoos, nourishing hair oils, body scrubs, and keratin treatments. Each product is crafted to help you look your best and feel completely nurtured.
                    </p>
                </ScrollReveal>
            </div>
        </div>
    );
}
