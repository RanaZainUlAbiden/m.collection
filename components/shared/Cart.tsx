"use client";

import { useCart } from "@/hooks/useCart";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function Cart() {
    const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, cartTotal } = useCart();

    return (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
            <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
                <SheetHeader className="border-b border-border/50 pb-4">
                    <SheetTitle className="flex items-center gap-2 font-heading text-2xl">
                        <ShoppingBag className="w-6 h-6 text-primary" />
                        Your Cart
                    </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6">
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                            <ShoppingBag className="w-16 h-16 opacity-20" />
                            <p>Your cart is empty.</p>
                            <Button
                                variant="outline"
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 rounded-full border-primary text-primary hover:bg-primary/5"
                            >
                                Continue Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {items.map((item) => (
                                <div key={item.id} className="flex gap-4 bg-card p-4 rounded-2xl border border-border/50">
                                    <div
                                        className="w-20 h-20 rounded-xl shrink-0"
                                        style={{ background: item.image }}
                                    />
                                    <div className="flex-1 flex flex-col">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-bold text-foreground line-clamp-1">{item.name}</h4>
                                                <p className="text-xs text-muted-foreground">{item.weight}</p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-muted-foreground hover:text-destructive transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between mt-auto pt-2">
                                            <div className="font-bold text-primary">
                                                PKR {(item.price * item.quantity).toLocaleString()}
                                            </div>

                                            <div className="flex items-center gap-2 bg-muted rounded-full p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="w-6 h-6 rounded-full bg-background flex items-center justify-center shadow-sm hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="w-6 h-6 rounded-full bg-background flex items-center justify-center shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {items.length > 0 && (
                    <div className="border-t border-border/50 pt-6 mt-auto">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg font-medium">Subtotal</span>
                            <span className="text-2xl font-bold text-primary">PKR {cartTotal.toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-6">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                            <Button className="w-full h-14 rounded-full text-lg bg-primary hover:bg-primary/90">
                                Proceed to Checkout
                            </Button>
                        </Link>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
}


// hellp