/**
 * CartSheet Component
 * 
 * Provides a slide-out drawer (Sheet) interface for the shopping cart.
 * 
 * Architecture:
 * - State Management: Subscribes to the global `useCartStore` (Zustand) to get real-time cart items and total calculations.
 * - Hydration Safety: Uses a custom `isHydrated` state to prevent React hydration mismatch errors since cart data is persisted in `localStorage`.
 * - Base UI: Built on top of Base UI's Dialog primitive for accessible drawer mechanics.
 * - Checkout Integration: Automatically formats a WhatsApp message with the order details and triggers a redirect when the user clicks Checkout.
 */
"use client";

import { useCartStore } from "@/store/useCartStore";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface CartSheetProps {
    children?: React.ReactNode;
}

export function CartSheet({ children }: CartSheetProps) {
    const { items, updateQuantity, removeFromCart, getCartTotal, getCartCount } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        // eslint-disable-next-line
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <div className="relative">{children}</div>;
    }

    return (
        <Sheet>
            {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
            <SheetTrigger render={(children as any) || (
                <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-secondary/20 transition-colors">
                    <ShoppingCart className="w-5 h-5 text-muted-foreground" />
                    {getCartCount() > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                            {getCartCount()}
                        </span>
                    )}
                    <span className="sr-only">Cart</span>
                </Button>
            )} />
            <SheetContent className="w-full sm:max-w-md flex flex-col bg-white text-foreground border-l border-border p-6 sm:p-8">
                <SheetHeader className="pb-6 border-b border-border">
                    <SheetTitle className="font-heading font-bold text-2xl text-foreground flex items-center gap-3">
                        <ShoppingCart className="w-5 h-5 text-primary" />
                        Your Cart
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6 flex flex-col">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                            <ShoppingCart className="w-16 h-16 text-muted-foreground mb-4 opacity-40" />
                            <p className="text-xl font-heading font-bold text-foreground">Your cart is empty</p>
                            <p className="text-sm text-muted-foreground">Looks like you haven&apos;t added any items yet.</p>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={item.cartItemId} className="flex gap-4 py-5 border-b border-border/50">
                                <div className="relative w-20 h-20 bg-transparent rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        fill
                                        sizes="80px"
                                        className="object-contain p-2 group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                                    />
                                </div>
                                <div className="flex flex-col flex-1 min-w-0 justify-between">
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <h4 className="font-bold text-sm text-foreground line-clamp-2 leading-tight">{item.product.name || 'Unnamed Product'}</h4>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                PKR {item.product.price}
                                                {item.size && ` | Size: ${item.size}`}
                                                {item.color && ` | Color: ${item.color}`}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => removeFromCart(item.cartItemId)}
                                            className="p-1 text-muted-foreground hover:text-[#A33327] transition-colors flex-shrink-0"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between mt-3">
                                        <div className="flex items-center gap-2 w-fit rounded-lg border border-border bg-white">
                                            <button
                                                onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                                            >
                                                <Minus className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                                                className="w-8 h-8 flex items-center justify-center hover:text-primary transition-colors"
                                            >
                                                <Plus className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <p className="font-bold text-sm text-foreground">
                                            PKR {item.product.price * item.quantity}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="pt-6 border-t border-border mt-auto">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-base text-muted-foreground">Subtotal</span>
                            <span className="text-2xl font-bold text-primary">PKR {getCartTotal()}</span>
                        </div>
                        <SheetClose render={
                            <Link href="/checkout" className="w-full h-12 text-sm font-bold rounded-full bg-primary text-white hover:bg-primary/90 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all">
                                Proceed to Checkout
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        } />
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}
