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
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { Product } from "@/data/products";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const addToCart = useCartStore((state) => state.addToCart);
    const originalPrice = Math.round(product.price * 1.32);
    const discountPercent = 24;
    const secondImage = product.images?.[1] || product.image;

    return (
        <div className="group flex flex-col relative font-sans">
            <div className="relative aspect-[4/5] overflow-hidden bg-card mb-4">
                
                <Link href={`/shop/${product.id}`} className="block w-full h-full">
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
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[90%] flex gap-2">
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(product, 1);
                            toast.success(`${product.name} added to cart!`);
                        }}
                        className="flex-1 bg-black text-white text-center text-[9px] font-bold uppercase tracking-widest py-2.5 border border-black hover:bg-white hover:text-black transition-colors"
                    >
                        Add to Cart
                    </button>
                    <Link href={`/shop/${product.id}`} className="flex-1 bg-white/95 backdrop-blur-sm text-black text-center text-[9px] font-bold uppercase tracking-widest py-2.5 border border-border shadow-sm hover:bg-black hover:text-white transition-colors flex items-center justify-center">
                        View Details
                    </Link>
                </div>
            </div>
            
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
