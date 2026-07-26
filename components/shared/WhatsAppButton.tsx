"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
    const whatsappNumber = "923216777808";
    const defaultMessage = encodeURIComponent("Hello! I'm interested in ordering from Marjaan Collection.");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${defaultMessage}`;

    return (
        <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-20 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 hover:shadow-xl transition-all duration-300 group"
            aria-label="Chat on WhatsApp"
        >
            <MessageCircle className="w-7 h-7" />

            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-foreground text-secondary-foreground text-sm font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
                Chat with us
            </span>
        </a>
    );
}
