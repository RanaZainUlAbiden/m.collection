/**
 * ShopClient Component
 * 
 * The primary client-side component for the Shop page.
 * 
 * Features:
 * - Local Filtering & Sorting: Filters the static `initialProducts` array by category and sorts by price without needing server roundtrips.
 * - Skeletons: Simulates a network loading state using `setTimeout` when changing filters to display a skeleton grid, improving perceived performance and UX.
 * - Empty State: Displays a "No Products Found" fallback when filters result in an empty array.
 */
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Filter, SearchX } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";
import { Product } from "@/data/products";
import { ProductCard } from "@/components/shared/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

interface ShopClientProps {
    initialProducts: Product[];
}

const categories = ["ALL", "HEELS", "SANDALS", "FLATS", "HAIR-CARE", "SKIN-CARE"];

function ProductCardSkeleton() {
    return (
        <div className="flex flex-col relative font-sans">
            <Skeleton className="relative aspect-[4/5] mb-4 w-full rounded-none" />
            <div className="flex flex-col items-center">
                <Skeleton className="h-4 w-3/4 mb-2" />
                <Skeleton className="h-3 w-1/2" />
            </div>
        </div>
    );
}

export function ShopClient({ initialProducts }: ShopClientProps) {
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [sortBy, setSortBy] = useState("Featured");
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const addToCart = useCartStore((state) => state.addToCart);

    const PRODUCTS_PER_PAGE = 20;

    useEffect(() => {
        // eslint-disable-next-line
        setIsLoading(true);
        setCurrentPage(1);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 400); // Small artificial delay to show skeletons during filter change
        return () => clearTimeout(timer);
    }, [selectedCategory, sortBy]);

    let filteredProducts = [...initialProducts];

    if (selectedCategory !== "ALL") {
        filteredProducts = filteredProducts.filter(p => 
            p.category.toUpperCase().replace(/\s+/g, '-') === selectedCategory
        );
    }

    if (sortBy === "Price: Low to High") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
    const paginatedProducts = filteredProducts.slice((currentPage - 1) * PRODUCTS_PER_PAGE, currentPage * PRODUCTS_PER_PAGE);

    return (
        <div className="container mx-auto px-4 md:px-8 mt-8 pb-24 font-sans">
            <div className="flex flex-col gap-8">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 py-4 border-b border-border/40">
                    <div className="flex items-center gap-6 flex-wrap">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`text-[11px] tracking-[0.2em] uppercase font-bold transition-all relative py-2 ${
                                    selectedCategory === cat
                                        ? "text-foreground after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{filteredProducts.length} PRODUCTS</span>
                        <div className="flex items-center gap-2">
                            <Filter className="w-3 h-3 text-foreground" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-transparent text-foreground text-[10px] uppercase tracking-widest font-bold focus:outline-none cursor-pointer border-none"
                            >
                                <option value="Featured">SORT: FEATURED</option>
                                <option value="Price: Low to High">PRICE: LOW TO HIGH</option>
                                <option value="Price: High to Low">PRICE: HIGH TO LOW</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Product Grid / Empty State / Skeletons */}
                {isLoading ? (
                    <motion.div 
                        key="skeleton"
                        initial="hidden" animate="show" 
                        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12"
                    >
                        {[...Array(8)].map((_, i) => (
                            <motion.div key={i} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                                <ProductCardSkeleton />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <SearchX className="w-16 h-16 text-muted-foreground/30 mb-4" />
                        <h3 className="font-heading font-bold text-2xl text-foreground mb-2">No Products Found</h3>
                        <p className="text-muted-foreground max-w-md">
                            We couldn&apos;t find any products in the &quot;{selectedCategory}&quot; category at the moment. Please check back later or explore other collections!
                        </p>
                        <button 
                            onClick={() => setSelectedCategory("ALL")}
                            className="mt-6 border border-primary text-primary px-6 py-2 rounded-full uppercase tracking-widest text-xs font-bold hover:bg-primary hover:text-white transition-colors"
                        >
                            View All Products
                        </button>
                    </div>
                ) : (
                    <motion.div 
                        key={selectedCategory + sortBy + currentPage}
                        initial="hidden" animate="show" 
                        variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12"
                    >
                        {paginatedProducts.map((product) => (
                            <motion.div key={product.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Pagination Controls */}
                {!isLoading && totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-12 border-t border-border/40 pt-8">
                        <button
                            onClick={() => {
                                setCurrentPage(p => Math.max(1, p - 1));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            disabled={currentPage === 1}
                            className="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-border disabled:opacity-30 hover:bg-black hover:text-white transition-colors"
                        >
                            Prev
                        </button>
                        
                        <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none no-scrollbar">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => {
                                        setCurrentPage(i + 1);
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className={`min-w-[32px] h-8 px-2 flex items-center justify-center text-xs font-bold border transition-colors ${
                                        currentPage === i + 1 
                                            ? "bg-black text-white border-black" 
                                            : "border-transparent hover:border-border text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => {
                                setCurrentPage(p => Math.min(totalPages, p + 1));
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 text-xs font-bold uppercase tracking-widest border border-border disabled:opacity-30 hover:bg-black hover:text-white transition-colors"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
