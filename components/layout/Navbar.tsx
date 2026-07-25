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
import { Menu, X, ShoppingCart, Search, Heart, ChevronDown, Footprints, Leaf, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
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

                    {/* Mobile Menu */}
                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetTrigger className="lg:hidden p-2 hover:bg-secondary/20 rounded-full transition-colors">
                            <Menu className="w-6 h-6 text-foreground" />
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full sm:w-[400px] bg-muted border-none flex flex-col justify-center">
                            <div className="flex flex-col items-center gap-12 mt-8">
                                <Logo />
                                <nav className="flex flex-col items-center gap-8">
                                    {navLinks.map((link) => (
                                        <Link 
                                            key={link.name}
                                            href={link.href} 
                                            onClick={() => setOpen(false)}
                                            className={`text-2xl font-heading font-normal transition-colors hover:text-primary ${pathname === link.href ? "text-primary" : "text-foreground"}`}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </nav>
                                <div className="mt-8 flex flex-col gap-4 w-full px-8">
                                    <CartSheet>
                                        <Button onClick={() => setOpen(false)} variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full text-xs tracking-widest uppercase h-14 bg-transparent transition-colors">
                                            Order Now
                                        </Button>
                                    </CartSheet>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
