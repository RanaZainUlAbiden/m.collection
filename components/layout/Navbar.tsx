/**
 * Navbar Component
 * 
 * Provides the main global navigation for the application.
 * 
 * Architecture & Features:
 * - Responsive: Uses a standard desktop nav + a mobile Sheet (drawer).
 * - Scroll Effect: Becomes blurred and translucent upon scroll via an event listener.
 * - Integration: Hosts the SearchModal and CartSheet components to keep global state accessible anywhere.
 * - App Download: Desktop + mobile "Download App" button with a discount badge,
 *   linking directly to the APK stored in /public/downloads.
 */
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

// Path to the APK inside /public — update the filename here if you ever re-upload a new build
const APP_DOWNLOAD_URL = "https://github.com/waleedislam/m.collection/releases/download/v1.0.0/mr-footwear-app.apk";

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
                    ? "bg-white/95 border-b border-border shadow-sm py-1" 
                    : pathname === "/" 
                        ? "bg-transparent border-transparent py-4"
                        : "bg-white/95 border-transparent py-4"
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
                        <Button variant="ghost" size="icon" className="flex rounded-full hover:bg-secondary/20">
                            <Search className="w-5 h-5 text-muted-foreground" />
                        </Button>
                    </SearchModal>

                    <CartSheet />

                    {/* Download App Button with discount banner */}
                    <a
                        href={APP_DOWNLOAD_URL}
                        download
                        className="relative hidden md:inline-flex"
                    >
                        <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-6 text-xs tracking-widest uppercase h-10 bg-transparent transition-colors"
                        >
                            <Smartphone className="w-4 h-4" />
                            Download App
                        </Button>
                        <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0 h-4 whitespace-nowrap animate-pulse">
                            10% OFF
                        </Badge>
                    </a>

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
                                { label: "Testimonials", link: "/testimonials" },
                                { label: "Contact", link: "/contact" }
                            ]}
                            displaySocials={false}
                            displayItemNumbering={false}
                            colors={['#111111', '#E5B9B5']}
                            logoUrl="/IMG_9226.PNG"
                        >
                            {/* Download App Button with discount banner (mobile menu) */}
                            <a
                                href={APP_DOWNLOAD_URL}
                                download
                                className="relative w-full block"
                            >
                                <button className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full text-sm font-bold tracking-widest uppercase h-14 transition-colors flex items-center justify-center gap-2">
                                    <Smartphone className="w-4 h-4" />
                                    Download App
                                </button>
                                <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] px-1.5 py-0 h-4 animate-pulse">
                                    10% OFF
                                </Badge>
                            </a>

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