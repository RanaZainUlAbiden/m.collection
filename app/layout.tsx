import type { Metadata } from "next";
import { Fraunces, Manrope, Space_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

import { CartProvider } from "@/hooks/useCart";
import { Cart } from "@/components/shared/Cart";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Marjaan Collection",
    default: "Marjaan Collection | Premium Footwear & Organic Care",
  },
  authors: [{ name: "Haseeb" }],
  description: "Discover premium quality footwear and holistic organic self-care products online in Pakistan. Stylish shoes and natural wellness essentials delivered to your doorstep.",
  keywords: ["buy shoes online Pakistan", "premium footwear", "organic skin care Pakistan", "Marjaan Collection", "handmade organic products", "women shoes Pakistan", "holistic wellness", "natural self care"],
  icons: {
    icon: "/IMG_9226.PNG",
  },
  openGraph: {
    title: "Marjaan Collection | Premium Footwear & Organic Care",
    description: "Discover premium quality footwear and holistic organic self-care products online in Pakistan. Stylish shoes and natural wellness essentials delivered to your doorstep.",
    url: "https://marjaancollection.com",
    siteName: "Marjaan Collection",
    locale: "en_PK",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "Marjaan Collection",
  url: "https://marjaancollection.com",
  logo: "https://marjaancollection.com/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+1 234 567 8900",
    contactType: "customer service",
    areaServed: "PK",
    availableLanguage: ["en", "ur"]
  }
};

import { AnimatedFavicon } from "@/components/ui/AnimatedFavicon";
import { Preloader } from "@/components/ui/Preloader";
import { BackToTop } from "@/components/ui/BackToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${fraunces.variable} ${playfair.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: `console.log("Built by Haseeb");` }} />
      </head>
      <body className="min-h-full flex flex-col relative overflow-x-hidden w-full">
        <Preloader />
        <CartProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />

          <Cart />
          <AnimatedFavicon />
          <BackToTop />
        </CartProvider>
      </body>
    </html>
  );
}
