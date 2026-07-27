/**
 * Footer Component
 * 
 * Renders the global footer at the bottom of all pages.
 * 
 * Layout Structure:
 * - Built using CSS Grid for a fully responsive 3-column layout.
 * - Columns collapse into a single column stack on mobile devices (`grid-cols-1 md:grid-cols-3`).
 */
import Link from "next/link";
import { MapPin, Phone, Mail, Heart } from "lucide-react";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
    return (
        <footer className="bg-foreground text-secondary-foreground py-6 md:py-8">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mb-6">
                    {/* Brand */}
                    <div className="space-y-3 md:col-span-1">
                        <h3 className="font-heading font-bold text-xl text-white tracking-wide">
                            Marjaan Collection
                        </h3>
                        <p className="text-[#B5A5A0] text-xs leading-relaxed max-w-xs">
                            Your destination for premium quality footwear and holistic organic care in Pakistan. Discover stylish shoes and handmade self-care products for your everyday wellness.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-heading font-bold text-sm text-white mb-3 mt-2 md:mt-0">Quick Links</h4>
                        <nav className="flex flex-col gap-2 text-xs text-[#B5A5A0]">
                            <Link href="/shop" className="hover:text-secondary transition-colors w-fit">Shop Collection</Link>
                            <Link href="/about" className="hover:text-secondary transition-colors w-fit">About Us</Link>
                            <Link href="/testimonials" className="hover:text-secondary transition-colors w-fit">Testimonials</Link>
                            <Link href="/contact" className="hover:text-secondary transition-colors w-fit">Contact Us</Link>
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-heading font-bold text-sm text-white mb-3 mt-2 md:mt-0">Contact Us</h4>
                        <ul className="flex flex-col gap-2 text-xs text-[#B5A5A0]">
                            <li className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 shrink-0 text-secondary" />
                                <a href="tel:+12345678900" className="hover:text-secondary transition-colors">+1 234 567 8900</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="w-3.5 h-3.5 shrink-0 text-secondary" />
                                <a href="tel:+12345678900" className="hover:text-secondary transition-colors">+1 234 567 8900</a>
                            </li>
                            <li className="flex items-start gap-2">
                                <MapPin className="w-3.5 h-3.5 shrink-0 text-secondary mt-[3px]" />
                                <span>Pakistan</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-4 flex flex-col items-center justify-center text-center gap-4">
                    <p className="text-xs text-[#B5A5A0]">
                        &copy; {new Date().getFullYear()} Marjaan Collection. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
