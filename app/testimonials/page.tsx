import { Metadata } from "next";
import { MapPin, CheckCircle2 } from "lucide-react";
import { testimonialsData } from "@/data/testimonials";

export const metadata: Metadata = {
    title: "Customer Reviews",
    description: "Read verified reviews from our customers across Pakistan about Marjaan Collection's premium footwear and organic self-care products.",
};

export default function ReviewsPage() {
    return (
        <div className="bg-muted min-h-screen pb-24">
            {/* Header */}
            <div className="bg-primary text-white py-24 md:py-28 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at center, white 0%, transparent 70%)", backgroundSize: "100px 100px" }} />
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

                <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl relative z-10">
                    <span className="text-secondary font-serif italic text-lg mb-4 block">Verified Buyers</span>
                    <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
                        What Pakistan is <span className="text-secondary italic">Saying</span>
                    </h1>

                    <div className="flex flex-col items-center justify-center gap-3 mt-6">
                        <p className="text-white/70 text-base">Real feedback from our valued customers across Pakistan</p>
                    </div>
                </div>
            </div>

            {/* Reviews Grid */}
            <div className="container mx-auto px-4 md:px-8 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {testimonialsData.map((review) => (
                        <div
                            key={review.id}
                            className="bg-white border border-border/60 p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full rounded-2xl"
                        >
                            <div className="flex justify-end items-start mb-4">
                                <span className="text-xs text-muted-foreground">{review.date}</span>
                            </div>

                            <blockquote className="text-sm font-medium leading-relaxed text-foreground mb-6 flex-grow">
                                &ldquo;{review.comment}&rdquo;
                            </blockquote>

                            <div className="mt-auto pt-4 border-t border-border/50">
                                <p className="font-bold text-foreground mb-1 flex items-center gap-2 text-sm">
                                    {review.name}
                                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                                </p>
                                <div className="flex flex-col gap-1">
                                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                                        <MapPin className="w-3 h-3 shrink-0" />
                                        {review.city}, Pakistan
                                    </p>
                                    <p className="text-[10px] uppercase tracking-wider font-medium text-primary bg-primary/5 w-fit px-2.5 py-1 mt-1.5 rounded-full">
                                        {review.purchased}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
