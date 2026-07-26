import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
    variant?: "default" | "light";
    className?: string;
}

export function Logo({ variant = "default", className }: LogoProps) {
    return (
        <Link href="/" className={cn("flex items-center gap-3 group", className)}>
            <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0">
                <Image
                    src="/IMG_9226.PNG"
                    alt="Marjaan Collection"
                    fill
                    sizes="80px"
                    className={cn(
                        "object-contain transition-all duration-300",
                        variant === "light" && "brightness-0 invert opacity-90"
                    )}
                />
            </div>
        </Link>
    );
}
