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

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchModal } from "@/components/search/SearchModal";
import { CartSheet } from "@/components/cart/CartSheet";
import { Logo } from "@/components/ui/Logo";
import { StaggeredMenu } from "@/components/ui/staggered-menu";
import GooeyNav from "@/components/ui/GooeyNav";

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
                <div className="hidden lg:flex items-center">
                    <GooeyNav 
                        items={navLinks.map(link => ({ label: link.name, href: link.href }))} 
                    />
                </div>

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
                            Checkout
                        </Button>
                    </CartSheet>

                    {/* Luxury Full-Screen GSAP Mobile Menu */}
                    <div className="lg:hidden">
                        <StaggeredMenu 
                            position="right"
                            items={[
                                { label: "Home", link: "/" },
                                { label: "Shop", link: "/shop" },
                                { label: "About", link: "/about" },
                                { label: "Reviews", link: "/testimonials" },
                                { label: "Contact", link: "/contact" }
                            ]}
                            displaySocials={false}
                            displayItemNumbering={false}
                            colors={['#111111', '#E5B9B5']}
                            logoUrl="/IMG_9226.PNG"
                        >
                            <CartSheet>
                                <button className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full text-sm font-bold tracking-widest uppercase h-14 transition-colors flex items-center justify-center">
                                    Checkout
                                </button>
                            </CartSheet>
                        </StaggeredMenu>
                    </div>
                </div>
            </div>
        </header>
    );
}
