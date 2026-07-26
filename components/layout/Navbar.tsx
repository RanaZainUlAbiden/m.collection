/**
 * Navbar Component
 * 
 * Provides the main global navigation for the application.
 * 
 * Architecture & Features:
 * - Responsive: Uses a standard desktop nav + a mobile Sheet (drawer).
 * - Scroll Effect: Becomes blurred and translucent upon scroll via an event listener.
 * - Integration: Hosts the SearchModal and CartSheet components to keep global state accessible anywhere.
 */
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Search, Heart, ChevronDown, Footprints, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchModal } from "@/components/search/SearchModal";
import { CartSheet } from "@/components/cart/CartSheet";
import { Logo } from "@/components/ui/Logo";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Testimonials", href: "/testimonials" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    // Tracks if the user has scrolled past 20px to apply the translucent backdrop effect
    const [isScrolled, setIsScrolled] = useState(false);
    
    // Controls the mobile navigation drawer state
    const [open, setOpen] = useState(false);
    
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [open]);

    // Helper function to determine if a route is currently active
    // Handles the root path uniquely to prevent it from matching all routes
    const isActive = (href: string) => pathname.startsWith(href) && (href !== "/" || pathname === "/");

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${
                isScrolled 
                    ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm py-1" 
                    : pathname === "/" 
                        ? "bg-transparent border-transparent py-4"
                        : "bg-white/50 backdrop-blur-sm border-transparent py-4"
            }`}
        >
            <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                <Logo variant="default" />

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm tracking-widest uppercase font-medium transition-colors hover:text-primary ${
                                isActive(link.href)
                                    ? "text-primary"
                                    : "text-foreground"
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2 md:gap-3">
                    <SearchModal>
                        <Button variant="ghost" size="icon" className="hidden sm:flex rounded-full hover:bg-secondary/20">
                            <Search className="w-5 h-5 text-muted-foreground" />
                        </Button>
                    </SearchModal>

                    <CartSheet />

                    <CartSheet>
                        <Button variant="outline" className="hidden md:flex border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-6 text-xs tracking-widest uppercase h-10 bg-transparent transition-colors">
                            Order Now
                        </Button>
                    </CartSheet>

                    {/* Mobile Menu Trigger */}
                    <button onClick={() => setOpen(true)} className="lg:hidden p-2 hover:bg-secondary/20 rounded-full transition-colors">
                        <Menu className="w-6 h-6 text-foreground" />
                    </button>

                    {/* Luxury Full-Screen Mobile Menu */}
                    <AnimatePresence>
                        {open && (
                            <motion.div
                                initial={{ opacity: 0, y: "-100%" }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: "-100%" }}
                                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                                className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-2xl flex flex-col items-center justify-center h-[100dvh] w-[100vw]"
                            >
                                {/* Close Button */}
                                <button 
                                    onClick={() => setOpen(false)}
                                    className="absolute top-6 right-6 p-4 rounded-full bg-secondary/5 hover:bg-secondary/10 transition-colors z-[110]"
                                >
                                    <X className="w-6 h-6 text-foreground" />
                                </button>

                                {/* Navigation Links */}
                                <nav className="flex flex-col items-center gap-6 sm:gap-8 w-full px-6 z-[110]">
                                    {navLinks.map((link, i) => (
                                        <div key={link.name} className="overflow-hidden">
                                            <motion.div
                                                initial={{ opacity: 0, y: 100 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 100 }}
                                                transition={{ duration: 0.6, delay: 0.1 + (i * 0.08), ease: [0.22, 1, 0.36, 1] }}
                                            >
                                                <Link 
                                                    href={link.href} 
                                                    onClick={() => setOpen(false)}
                                                    className={`text-4xl sm:text-5xl md:text-7xl font-serif italic transition-all duration-300 hover:text-primary ${pathname === link.href ? "text-primary" : "text-foreground"}`}
                                                >
                                                    {link.name}
                                                </Link>
                                            </motion.div>
                                        </div>
                                    ))}

                                    {/* Order Now CTA */}
                                    <div className="overflow-hidden mt-8 w-full max-w-[280px]">
                                        <motion.div
                                            initial={{ opacity: 0, y: 100 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 100 }}
                                            transition={{ duration: 0.6, delay: 0.1 + (navLinks.length * 0.08), ease: [0.22, 1, 0.36, 1] }}
                                        >
                                            <CartSheet>
                                                <button onClick={() => setOpen(false)} className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full text-sm font-bold tracking-widest uppercase h-14 transition-colors flex items-center justify-center">
                                                    Order Now
                                                </button>
                                            </CartSheet>
                                        </motion.div>
                                    </div>
                                </nav>

                                {/* Background Logo watermark */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 0.05, scale: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="absolute inset-0 pointer-events-none flex items-center justify-center z-[105]"
                                >
                                    <Logo variant="default" className="scale-[4] sm:scale-[6] filter grayscale" />
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
