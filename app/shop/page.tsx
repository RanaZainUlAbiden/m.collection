import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Shop All Collections | Marjaan Collection",
    description: "Shop our premium collections of women's heels, sandals, flats, and holistic organic self-care products crafted for the modern woman.",
};

import { products } from "@/data/products";
import { ShopClient } from "@/components/shop/ShopClient";

export default function ShopPage() {
    return (
        <div className="bg-muted min-h-screen pb-24">
            {/* Header */}
            <div className="pt-28 pb-12 md:pt-32 md:pb-16 bg-white border-b border-border">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-2xl">
                        <span className="text-primary font-serif italic text-lg mb-2 block">
                            Premium Collections
                        </span>
                        <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">
                            The <span className="text-primary">Collection</span>
                        </h1>
                        <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                            Browse our selection of premium quality footwear and organic self-care essentials. Stylish, durable, and holistically crafted — delivered to your doorstep.
                        </p>
                    </div>
                </div>
            </div>

            <ShopClient initialProducts={products} />


        </div>
    );
}
