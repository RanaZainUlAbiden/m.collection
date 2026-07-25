/**
 * SearchModal Component
 * 
 * Provides a global search interface via a modal dialog.
 * 
 * Features:
 * - Real-time Filtering: Searches through the products dataset by name and description as the user types.
 * - Base UI Integration: Uses Base UI's Dialog primitives for accessible, headless modal behavior.
 * - Polymorphic Trigger: Utilizes the `render` prop on `DialogTrigger` to correctly pass interactions to nested elements without creating invalid HTML hierarchies.
 */
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Leaf } from "lucide-react";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

export function SearchModal({ children }: { children?: React.ReactNode }) {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {children ? (
                <DialogTrigger render={children as React.ReactElement} />
            ) : (
                <DialogTrigger render={<Button variant="ghost" size="icon" className="relative rounded-full hover:bg-secondary/20 transition-colors" />}>
                    <Search className="w-5 h-5 text-muted-foreground" />
                    <span className="sr-only">Search</span>
                </DialogTrigger>
            )}
            <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-xl border border-border/50 p-0 overflow-hidden rounded-2xl gap-0 shadow-xl">
                <DialogTitle className="sr-only">Search Products</DialogTitle>
                <div className="p-4 border-b border-border flex items-center gap-3 bg-white">
                    <Search className="w-5 h-5 text-muted-foreground" />
                    <Input
                        placeholder="Search shoes, organics, beauty products..."
                        className="border-none shadow-none focus-visible:ring-0 text-base px-0 bg-transparent h-12"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                </div>

                <div className="max-h-[60vh] overflow-y-auto p-2 bg-white/50">
                    {query.length === 0 ? (
                        <div className="p-8 text-center flex flex-col items-center justify-center text-muted-foreground">
                            <Search className="w-12 h-12 opacity-20 mb-4" />
                            <p>Type to start searching...</p>
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            <p>No products found matching &ldquo;{query}&rdquo;.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-2">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="flex gap-4 items-center p-3 rounded-xl border border-border/40 shadow-sm hover:border-primary/30 transition-colors group">
                                    <Link href={product.productLine === 'organics' ? `/shop/organics/${product.id}` : `/shop/${product.id}`} onClick={() => setOpen(false)} className="w-20 h-20 relative rounded-xl overflow-hidden flex-shrink-0">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-contain p-2 group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                                        />
                                    </Link>
                                    <div className="flex-1 min-w-0">
                                        <Link href={product.productLine === 'organics' ? `/shop/organics/${product.id}` : `/shop/${product.id}`} onClick={() => setOpen(false)} className="hover:text-primary transition-colors block">
                                            <h4 className="font-bold text-foreground truncate">{product.name}</h4>
                                            <p className="text-xs text-muted-foreground truncate">{product.shortDescription}</p>
                                        </Link>
                                        <p className="text-sm font-bold text-primary mt-2">PKR {product.price.toLocaleString()}</p>
                                        {product.productLine === 'organics' && (
                                            <p className="text-[10px] text-secondary flex items-center gap-1 mt-1">
                                                <Leaf className="w-3 h-3" /> Organic
                                            </p>
                                        )}
                                    </div>
                                    <AddToCartButton product={product} className="rounded-full w-10 h-10 p-0 bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all shadow-sm" />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="p-4 bg-muted border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                    <span className="flex items-center gap-2"><ArrowRight className="w-3 h-3" /> Press Esc to close</span>
                    <span>{filteredProducts.length} results</span>
                </div>
            </DialogContent>
        </Dialog>
    );
}
