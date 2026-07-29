/**
 * FeaturedProducts Component
 * 
 * Displays a curated list of top-selling or new products on the home page.
 * 
 * Architecture:
 * - Data Source: Directly imports the `products` array and filters for "Best Seller" or "New Arrival" badges.
 * - Animation: Uses `framer-motion`'s `whileInView` to trigger a staggered fade-in animation as the user scrolls down the page.
 */
"use client";

import { motion } from "framer-motion";
import { ShoppingCart, ArrowRight, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { products } from "@/data/products";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductCard } from "@/components/shared/ProductCard";

const featuredProducts = Array.from(new Set([...products.filter(p => p.badge === "Best Seller" || p.badge === "New Arrival"), ...products])).slice(0, 4);

export function FeaturedProducts() {
    const [wishlist, setWishlist] = useState<Set<string>>(new Set());

    const toggleWishlist = (id: string) => {
        setWishlist(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });
    };

    return (
        <section className="py-12 bg-background">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                    <div className="max-w-2xl">
                        <span className="text-secondary-foreground font-serif italic text-lg mb-2 block">
                            Top Picks
                        </span>
                        <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
                            Bestselling <span className="text-primary">Products</span>
                        </h2>
                    </div>
                    <Link href="/shop" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                        View All <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {featuredProducts.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ProductCard product={product} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
