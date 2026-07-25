import { Metadata } from "next";
import { HeroSection3D } from "@/components/sections/HeroSection3D";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Testimonials } from "@/components/sections/Testimonials";

export const metadata: Metadata = {
  title: "Premium Footwear & Holistic Organic Care",
  description: "Discover Marjaan Collection. Shop our handcrafted premium footwear, elegant heels, and holistic organic self-care essentials designed for your everyday wellness.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Footwear Collection */}
      <HeroSection3D />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
