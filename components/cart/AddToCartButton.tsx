"use client";

import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

interface AddToCartButtonProps {
    product: Product;
    className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
    const addToCart = useCartStore((state) => state.addToCart);
    const [open, setOpen] = useState(false);

    const handleAdd = (e: React.MouseEvent) => {
        // Only trigger direct add for organics or products with no sizes
        if (product.productLine !== 'footwear' || !product.sizes || product.sizes.length === 0) {
            e.preventDefault();
            e.stopPropagation();
            addToCart(product, 1);
            toast.success(`${product.name} added to your basket!`);
        }
    };

    const handleSizeSelect = (size: string, price?: number) => {
        addToCart(product, 1, size, undefined, price);
        toast.success(`${product.name} (Size ${size}) added to your basket!`);
        setOpen(false);
    };

    const isApparel = (product.productLine === 'footwear' || product.productLine === 'clothing') && product.sizes && product.sizes.length > 0;
    const hasVariants = product.variants && product.variants.length > 0;

    const buttonClassName = className || "rounded-full w-10 h-10 p-0 bg-primary hover:bg-primary/90 text-white hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md flex items-center justify-center";

    if (isApparel || hasVariants) {
        return (
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger 
                    onClick={(e) => e.preventDefault()}
                    className={buttonClassName}
                >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="sr-only">Add {product.name} to cart</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white/95 backdrop-blur-md">
                    <DropdownMenuLabel className="text-xs uppercase tracking-widest text-muted-foreground text-center">Select Size</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="grid grid-cols-3 gap-2 p-2">
                        {product.variants ? (
                            product.variants.map(v => (
                                <DropdownMenuItem 
                                    key={v.size}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSizeSelect(v.size, v.price);
                                    }}
                                    className="flex items-center justify-center font-bold cursor-pointer border border-border hover:bg-black hover:text-white transition-colors text-xs"
                                >
                                    {v.size}
                                </DropdownMenuItem>
                            ))
                        ) : (
                            product.sizes?.map(size => (
                                <DropdownMenuItem 
                                    key={size.label}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleSizeSelect(size.label, size.price);
                                    }}
                                    className="flex items-center justify-center font-bold cursor-pointer border border-border hover:bg-black hover:text-white transition-colors text-xs"
                                >
                                    {size.label.replace(/[^0-9A-Za-z]/g, '')}
                                </DropdownMenuItem>
                            ))
                        )}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <Button 
            onClick={handleAdd}
            className={buttonClassName}
        >
            <ShoppingCart className="w-5 h-5" />
            <span className="sr-only">Add {product.name} to cart</span>
        </Button>
    );
}
