import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FootwearProductDetailClient } from "./FootwearProductDetailClient";
import { products } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const product = products.find(p => p.id === resolvedParams.slug);
    if (!product) return { title: "Not Found | Marjaan Collection" };
    return {
        title: `${product.name} | Marjaan Collection`,
        description: product.shortDescription,
    };
}

export default async function ProductPage({ params }: Props) {
    const resolvedParams = await params;
    const product = products.find(p => p.id === resolvedParams.slug);

    if (!product) {
        notFound();
    }

    return <FootwearProductDetailClient product={product} />;
}
