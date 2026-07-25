"use client";

import { useCartStore } from "@/store/useCartStore";
import { Product } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is used, if not we just won't show a toast

interface AddToCartButtonProps {
    product: Product;
    className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
    const addToCart = useCartStore((state) => state.addToCart);

    const handleAdd = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent link navigation if inside a Link
        addToCart(product, 1);
        toast.success(`${product.name} added to your basket!`);
    };

    return (
        <Button 
            onClick={handleAdd}
            className={className || "rounded-full w-10 h-10 p-0 bg-primary hover:bg-primary/90 text-white hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-md"}
        >
            <ShoppingCart className="w-5 h-5" />
            <span className="sr-only">Add {product.name} to cart</span>
        </Button>
    );
}
