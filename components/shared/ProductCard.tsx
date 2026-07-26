/**
 * ProductCard Component
 * 
 * Reusable card component for displaying individual products in grids (e.g., Shop, Featured).
 * 
 * Features:
 * - Hover Effects: Swaps the primary image with a secondary alternate image (if available) on hover.
 * - Global State: Integrates with Zustand (`useCartStore`) to add items directly to the cart.
 * - Dynamic Styling: Adjusts image `object-fit` and blend modes based on whether the product is from the organic line or footwear line.
 */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { Product } from "@/data/products";
import { BorderGlow } from "@/components/ui/border-glow";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const addToCart = useCartStore((state) => state.addToCart);
    const originalPrice = Math.round(product.price * 1.32);
    const discountPercent = 24;
    const secondImage = product.images?.[1] || product.image;

    const [showSizes, setShowSizes] = useState(false);

    return (
        <div className="group flex flex-col relative font-sans">
            <BorderGlow
                className="mb-4"
                backgroundColor="transparent"
                glowColor="35 60 40" // Deeper, more saturated bronze for outer glow
                glowIntensity={1.2} // Increased intensity
                borderRadius={0}
                glowRadius={25}
                colors={['#A67C00', '#BF8F00', '#8C6900']} // Richer dark golds/bronzes
            >
                <div className="relative aspect-[4/5] overflow-hidden bg-card">
                    
                    <Link href={`/shop/${product.id}`} className="block relative w-full h-full">
                        {/* Default Image */}
                        <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className={`transition-opacity duration-500 group-hover:opacity-0 absolute inset-0 z-0 ${product.productLine === 'organics' ? 'object-cover' : 'object-contain p-2 mix-blend-multiply'}`}
                        />
                        {/* Hover Image */}
                        <Image
                            src={secondImage}
                            alt={`${product.name} alternate view`}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className={`transition-opacity duration-500 opacity-0 group-hover:opacity-100 absolute inset-0 z-10 ${product.productLine === 'organics' ? 'object-cover' : 'object-contain p-2 mix-blend-multiply'}`}
                        />
                    </Link>

                    {/* Actions */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[90%]">
                        {showSizes ? (
                            <div className="flex flex-col gap-2 bg-white/95 backdrop-blur-sm border border-border p-3 shadow-xl w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <div className="flex justify-between items-center mb-1">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">Select Size</span>
                                    <button 
                                        onClick={(e) => { e.preventDefault(); setShowSizes(false); }} 
                                        className="text-[10px] text-muted-foreground hover:text-black underline underline-offset-2"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                <div className="flex gap-1.5 flex-wrap justify-start">
                                    {product.sizes?.map(size => (
                                        <button 
                                            key={size.label}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                addToCart(product, 1, size.label);
                                                toast.success(`${product.name} (Size ${size.label}) added!`);
                                                setShowSizes(false);
                                            }}
                                            className="w-8 h-8 flex items-center justify-center border border-border text-[11px] font-bold text-foreground hover:bg-black hover:text-white transition-colors bg-white shadow-sm"
                                        >
                                            {size.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (product.productLine === 'footwear' && product.sizes && product.sizes.length > 0) {
                                            setShowSizes(true);
                                        } else {
                                            addToCart(product, 1);
                                            toast.success(`${product.name} added to cart!`);
                                        }
                                    }}
                                    className="flex-1 bg-black text-white text-center text-[9px] font-bold uppercase tracking-widest py-2.5 border border-black hover:bg-white hover:text-black transition-colors shadow-md"
                                >
                                    {product.productLine === 'footwear' ? 'Quick Add' : 'Add to Cart'}
                                </button>
                                <Link href={`/shop/${product.id}`} className="flex-1 bg-white/95 backdrop-blur-sm text-black text-center text-[9px] font-bold uppercase tracking-widest py-2.5 border border-border shadow-md hover:bg-black hover:text-white transition-colors flex items-center justify-center">
                                    View Details
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </BorderGlow>
            
            <div className="flex flex-col text-center">
                <h3 className="font-bold text-[11px] md:text-xs text-foreground uppercase tracking-widest mb-2 line-clamp-1 px-2">
                    <Link href={`/shop/${product.id}`} className="hover:underline underline-offset-4">
                        {product.name}
                    </Link>
                </h3>
                
                <div className="flex items-center justify-center gap-2 flex-wrap">
                    <span className="text-[10px] text-muted-foreground line-through decoration-muted-foreground/50">
                        PKR {originalPrice.toLocaleString()}
                    </span>
                    <span className="text-[11px] font-bold text-foreground">
                        PKR {product.price.toLocaleString()}
                    </span>
                </div>
                <div className="mt-1">
                    <span className="text-[9px] font-bold text-[#8B0000] tracking-wider uppercase">
                        Save {discountPercent}%
                    </span>
                </div>
            </div>
        </div>
    );
}
