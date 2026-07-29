"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Minus, Plus, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "sonner";

export function FootwearProductDetailClient({ product }: { product: Product }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const defaultSize = product.variants?.[0]?.size || product.sizes?.[0]?.label || "";
    const [selectedSize, setSelectedSize] = useState(defaultSize);
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "BLACK");
    const [quantity, setQuantity] = useState(1);
    const [zoomed, setZoomed] = useState(false);
    
    const addToCart = useCartStore((state) => state.addToCart);

    const variantPrice = product.variants?.find(v => v.size === selectedSize)?.price;
    const sizePrice = product.sizes?.find(s => s.label === selectedSize)?.price;
    const currentPrice = variantPrice || sizePrice || product.price;
    const originalPrice = product.originalPrice;
    
    // Add mock colors if none exist in data
    const colors = product.colors || ["BEIGE", "PINK", "BLACK"];
    
    const images = product.images || [product.image, product.image, product.image, product.image];

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedSize, selectedColor, currentPrice);
        toast.success(`${product.name} added to your basket!`);
    };

    return (
        <div className="bg-background min-h-screen pb-24 font-sans">
            <div className="container mx-auto px-4 md:px-8 pt-32 pb-12">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
                    {/* Left: Thumbnails (Desktop) */}
                    <div className="hidden lg:flex flex-col gap-4 w-[100px] shrink-0">
                        {images.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedImage(i)}
                                className={`w-full aspect-[4/5] relative overflow-hidden bg-card border-b-2 transition-all duration-300 ${
                                    i === selectedImage
                                        ? "border-primary opacity-100"
                                        : "border-transparent opacity-60 hover:opacity-100"
                                }`}
                            >
                                <Image
                                    src={img}
                                    alt={`${product.name} view ${i + 1}`}
                                    fill
                                    sizes="100px"
                                    className="object-contain mix-blend-multiply"
                                />
                            </button>
                        ))}
                    </div>

                    {/* Middle: Main Image */}
                    <div className="flex-1 w-full lg:max-w-[45%] relative">
                        <div
                            className="aspect-[3/4] w-full relative bg-card cursor-crosshair overflow-hidden rounded-xl"
                            onMouseEnter={() => setZoomed(true)}
                            onMouseLeave={() => setZoomed(false)}
                        >
                            <Image
                                src={images[selectedImage]}
                                alt={product.name}
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className={`object-contain mix-blend-multiply transition-transform duration-700 ${zoomed ? 'scale-150' : 'scale-100'}`}
                            />
                        </div>
                        
                        {/* Mobile Thumbnails */}
                        <div className="flex lg:hidden overflow-x-auto gap-4 mt-4 pb-2 hide-scrollbar">
                            {images.map((img, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedImage(i)}
                                    className={`w-20 aspect-[4/5] shrink-0 relative overflow-hidden bg-card border-b-2 transition-all duration-300 ${
                                        i === selectedImage
                                            ? "border-primary opacity-100"
                                            : "border-transparent opacity-60"
                                    }`}
                                >
                                    <Image
                                        src={img}
                                        alt={`${product.name} view ${i + 1}`}
                                        fill
                                        sizes="80px"
                                        className="object-contain mix-blend-multiply"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right: Product Details */}
                    <div className="flex-1 w-full lg:max-w-[45%] pt-4 lg:pt-0">
                        <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-foreground mb-1 font-sans">
                            {product.name}
                        </h1>
                        <p className="text-xs text-muted-foreground mb-8 uppercase tracking-widest font-medium">
                            {product.id} 036 BLK
                        </p>

                        <div className="prose prose-sm text-foreground/80 mb-6 space-y-4 text-sm leading-relaxed max-w-none">
                            {product.description.split('. ').map((sentence, i, arr) => (
                                sentence ? <p key={i}>{sentence}{i < arr.length - 1 ? '.' : ''}</p> : null
                            ))}
                            <p>Perfect for parties, festive wear, indoor gatherings, and special occasions.</p>
                        </div>

                        {/* Price */}
                        <div className="flex items-end gap-3 mb-1">
                            {originalPrice && (
                                <span className="text-sm text-muted-foreground line-through decoration-muted-foreground/50">PKR {originalPrice.toLocaleString()}</span>
                            )}
                            <span className="text-lg font-bold leading-none">PKR {currentPrice.toLocaleString()}</span>
                            {originalPrice && (
                                <span className="text-xs text-red-600 font-medium leading-none mb-[2px]">Save {Math.round((1 - currentPrice / originalPrice) * 100)}%</span>
                            )}
                        </div>



                        {/* Size/Variant Selector */}
                        {(product.sizes?.length || product.variants?.length) ? (
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-[10px] uppercase tracking-[0.2em] font-medium">
                                        {product.productLine === 'organics' ? 'Size / Weight' : 'Size'}
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product.variants ? (
                                        product.variants.map((v) => (
                                            <button
                                                key={v.size}
                                                onClick={() => setSelectedSize(v.size)}
                                                className={`h-10 px-4 text-xs flex items-center justify-center border transition-all ${
                                                    selectedSize === v.size
                                                        ? "border-black border-2 font-bold z-10"
                                                        : "border-border/50 text-muted-foreground hover:border-black/50"
                                                }`}
                                            >
                                                {v.size}
                                            </button>
                                        ))
                                    ) : (
                                        product.sizes?.map((size) => {
                                            const displaySize = size.label.replace(/[^0-9A-Za-z]/g, '');
                                            return (
                                                <button
                                                    key={size.label}
                                                    onClick={() => setSelectedSize(size.label)}
                                                    className={`w-12 h-10 text-xs flex items-center justify-center border transition-all ${
                                                        selectedSize === size.label
                                                            ? "border-black border-2 font-bold z-10"
                                                            : "border-border/50 text-muted-foreground hover:border-black/50 -ml-[1px]"
                                                    }`}
                                                >
                                                    {displaySize}
                                                </button>
                                            );
                                        })
                                    )}
                                </div>
                            </div>
                        ) : null}

                        {/* Colors */}
                        {product.productLine !== 'organics' && (
                            <div className="mb-8">
                                <span className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-3">Colors:</span>
                                <div className="flex gap-2">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className="flex flex-col items-center gap-2 group"
                                        >
                                            <div className={`w-16 h-24 relative overflow-hidden transition-all ${
                                                selectedColor === color ? 'border border-black p-0.5' : 'border border-transparent'
                                            }`}>
                                                <div className="w-full h-full relative bg-black/5">
                                                    <Image 
                                                        src={images[0]} 
                                                        alt={color} 
                                                        fill 
                                                        className="object-cover p-2 mix-blend-multiply" 
                                                    />
                                                </div>
                                            </div>
                                            <span className="text-[9px] uppercase tracking-widest font-medium group-hover:text-black text-muted-foreground">
                                                {color}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="mb-6">
                            <span className="text-[10px] uppercase tracking-[0.2em] font-medium block mb-3">Quantity</span>
                            <div className="flex items-center border border-border/70 w-fit h-9">
                                <button 
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-9 h-full flex items-center justify-center text-muted-foreground hover:text-black hover:bg-muted/50 transition-colors"
                                >
                                    <Minus className="w-3 h-3" />
                                </button>
                                <div className="w-10 h-full flex items-center justify-center text-xs border-x border-border/70">
                                    {quantity}
                                </div>
                                <button 
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-9 h-full flex items-center justify-center text-muted-foreground hover:text-black hover:bg-muted/50 transition-colors"
                                >
                                    <Plus className="w-3 h-3" />
                                </button>
                            </div>
                        </div>



                        {/* Add to Cart */}
                        <Button 
                            onClick={handleAddToCart}
                            className="w-full h-14 bg-[#111111] hover:bg-black text-white rounded-none uppercase tracking-[0.2em] font-bold text-xs mb-8"
                        >
                            Add to Cart
                        </Button>

                        {/* Accordions */}
                        <Accordion className="w-full border-t border-border/40">
                            {/* Care Instructions (If applicable) */}
                            {product.careInstructions && product.careInstructions.length > 0 && (
                                <AccordionItem value="care" className="border-border/40">
                                    <AccordionTrigger className="text-[10px] uppercase tracking-[0.15em] font-bold hover:no-underline py-4 text-muted-foreground hover:text-foreground transition-colors">
                                        Care Instructions
                                    </AccordionTrigger>
                                    <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
                                        <ul className="list-disc pl-5 space-y-2">
                                            {product.careInstructions.map((instruction, index) => (
                                                <li key={index}>{instruction}</li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            )}
                            <AccordionItem value="ask" className="border-border/40">
                                <AccordionTrigger className="text-[10px] uppercase tracking-[0.15em] font-bold hover:no-underline py-4 text-muted-foreground hover:text-foreground transition-colors">
                                    Ask a Question
                                </AccordionTrigger>
                                <AccordionContent className="text-xs text-muted-foreground leading-relaxed pb-4">
                                    Have a question about this product? Contact our support team via WhatsApp or email us at support@marjaancollection.com.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </div>
    );
}
