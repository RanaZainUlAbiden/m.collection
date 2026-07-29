"use client";

import { useCartStore } from "@/store/useCartStore";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, MapPin, Phone, User, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface CheckoutFormData {
    fullName: string;
    phone: string;
    city: string;
    address: string;
    specialInstructions: string;
}


export default function CheckoutPage() {
    const { items, getCartTotal, clearCart } = useCartStore();
    const [isMounted, setIsMounted] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>();

    useEffect(() => {
        // eslint-disable-next-line
        setIsMounted(true);
    }, []);

    const onSubmit = (data: CheckoutFormData) => {
        if (items.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        // WhatsApp Business Number
        const waNumber = "+923154322433"; // Provided by user

        // Construct the WhatsApp Message
        let message = `*NEW ORDER - Marjaan Collection*\n\n`;
        message += `*Customer Details:*\n`;
        message += `Name: ${data.fullName}\n`;
        message += `Phone: ${data.phone}\n`;
        message += `City: ${data.city}\n`;
        message += `Address: ${data.address}\n`;
        if (data.specialInstructions) {
            message += `Notes: ${data.specialInstructions}\n`;
        }
        
        message += `\n*Order Summary:*\n`;
        items.forEach(item => {
            message += `• ${item.product.name}\n`;
            message += `  Qty: ${item.quantity} | Size: ${item.size || 'N/A'} | Rs. ${item.price}/pc\n`;
            message += `  Subtotal: Rs. ${item.price * item.quantity}\n`;
        });
        message += `\n*Total Amount (before shipping):* Rs. ${getCartTotal()}\n`;

        const encodedMessage = encodeURIComponent(message);
        const waUrl = `https://wa.me/${waNumber.replace('+', '')}?text=${encodedMessage}`;

        // Clear the cart when the WhatsApp window opens
        clearCart(); 
        
        window.open(waUrl, '_blank');
    };

    if (!isMounted) return null;

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-background pt-32 pb-24 flex items-center justify-center">
                <div className="text-center space-y-6 max-w-md px-6">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-8">
                        <ShoppingCart className="w-10 h-10 text-muted-foreground" />
                    </div>
                    <h1 className="font-heading text-4xl text-foreground">Your Basket is Empty</h1>
                    <p className="text-muted-foreground">Looks like you haven&apos;t added any items to your cart yet.</p>
                    <Link href="/shop" className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-none font-bold text-lg flex items-center justify-center">
                        Return to Shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-32 pb-24">
            <div className="container mx-auto px-4 md:px-8">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Checkout Form */}
                    <div className="flex-1 lg:max-w-2xl">
                        <div className="mb-10">
                            <span className="text-primary font-mono tracking-widest uppercase text-sm mb-2 block">Secure Checkout</span>
                            <h1 className="text-4xl md:text-5xl font-heading font-normal text-foreground">Shipping Details</h1>
                        </div>



                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-card p-6 md:p-8 rounded-xl border border-border/50 shadow-sm">
                            <div className="space-y-2">
                                <label className="text-sm font-bold flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Full Name</label>
                                <Input 
                                    {...register("fullName", { required: "Name is required" })} 
                                    className="h-12 bg-background border-border focus-visible:ring-primary"
                                    placeholder="e.g. Ali Raza"
                                />
                                {errors.fullName && <p className="text-destructive text-sm">{errors.fullName.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> Phone Number</label>
                                <Input 
                                    {...register("phone", { required: "Phone number is required" })} 
                                    className="h-12 bg-background border-border focus-visible:ring-primary"
                                    placeholder="03XX XXXXXXX"
                                />
                                {errors.phone && <p className="text-destructive text-sm">{errors.phone.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> City</label>
                                <Input 
                                    {...register("city", { required: "City is required" })} 
                                    className="h-12 bg-background border-border focus-visible:ring-primary"
                                    placeholder="e.g. Lahore, Karachi, Islamabad"
                                />
                                {errors.city && <p className="text-destructive text-sm">{errors.city.message}</p>}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold flex items-center gap-2"><MapPin className="w-4 h-4 text-primary" /> Complete Delivery Address</label>
                                <Textarea 
                                    {...register("address", { required: "Address is required" })} 
                                    className="min-h-[100px] bg-background border-border focus-visible:ring-primary resize-none"
                                    placeholder="House, Street, Area..."
                                />
                                {errors.address && <p className="text-destructive text-sm">{errors.address.message}</p>}
                            </div>



                            <div className="space-y-2">
                                <label className="text-sm font-bold text-muted-foreground">Special Instructions (Optional)</label>
                                <Textarea 
                                    {...register("specialInstructions")} 
                                    className="bg-background border-border focus-visible:ring-primary resize-none"
                                    placeholder="Any specific delivery instructions?"
                                />
                            </div>

                            <Button type="submit" className="w-full h-14 text-lg font-bold rounded-none bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg flex items-center gap-2 group mt-8">
                                Place Order via WhatsApp
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div className="w-full lg:w-[450px]">
                        <div className="sticky top-32">
                            <div className="bg-card p-6 md:p-8 rounded-xl border border-border/50 shadow-lg">
                                <h2 className="font-heading text-2xl mb-6 pb-6 border-b border-border flex items-center justify-between">
                                    Order Summary
                                    <span className="text-sm font-sans font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">
                                        {items.length} Items
                                    </span>
                                </h2>
                                
                                <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-primary/20">
                                    {items.map((item) => (
                                        <div key={item.product.id} className="flex gap-4 items-center">
                                            <div className="w-16 h-16 relative bg-transparent rounded-lg flex-shrink-0 border border-border/50 overflow-hidden">
                                                <Image 
                                                    src={item.product.image} 
                                                    alt={item.product.name} 
                                                    fill 
                                                    className="object-contain p-1 mix-blend-multiply" 
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-foreground text-sm">{item.product.name}</h4>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                                    {item.size ? `Size: ${item.size}` : item.product.weight}
                                                    {item.color ? ` | Color: ${item.color}` : ''}
                                                </p>
                                                <p className="text-xs font-medium">Qty: {item.quantity}</p>
                                            </div>
                                            <div className="font-bold text-foreground">
                                                Rs. {item.price * item.quantity}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-4 pt-6 border-t border-border">
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Subtotal</span>
                                        <span className="font-medium text-foreground">Rs. {getCartTotal()}</span>
                                    </div>
                                    <div className="flex justify-between text-muted-foreground">
                                        <span>Shipping</span>
                                        <span className="font-medium text-primary">Calculated on WhatsApp</span>
                                    </div>
                                    <div className="pt-4 border-t border-border border-dashed flex justify-between items-end">
                                        <span className="text-lg font-bold text-foreground">Total</span>
                                        <span className="text-3xl font-heading font-bold text-primary">Rs. {getCartTotal()}</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 text-green-600" />
                                SSL Secure Checkout
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
