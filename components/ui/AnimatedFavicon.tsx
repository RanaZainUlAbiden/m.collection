"use client";

import { useEffect } from "react";

export function AnimatedFavicon() {
    useEffect(() => {
        let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
        if (!link) {
            link = document.createElement("link");
            link.type = "image/png";
            link.rel = "icon";
            document.getElementsByTagName("head")[0].appendChild(link);
        }

        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        
        const img = new Image();
        img.src = "/IMG_9226.PNG";
        
        let angle = 0;
        let animationFrameId: number;
        let lastDraw = 0;

        img.onload = () => {
            const draw = (timestamp: number) => {
                // Throttle to roughly ~15 frames per second so it doesn't drain battery
                if (timestamp - lastDraw > 60) { 
                    if (ctx) {
                        ctx.clearRect(0, 0, 64, 64);
                        ctx.save();
                        ctx.translate(32, 32);
                        
                        // Gentle breathing / scaling animation
                        const scale = 1 + Math.sin(angle) * 0.15;
                        ctx.scale(scale, scale);
                        
                        // Draw image centered
                        ctx.drawImage(img, -24, -24, 48, 48);
                        ctx.restore();
                        
                        link.href = canvas.toDataURL("image/png");
                        angle += 0.1;
                    }
                    lastDraw = timestamp;
                }
                animationFrameId = requestAnimationFrame(draw);
            };
            animationFrameId = requestAnimationFrame(draw);
        };

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, []);

    return null;
}
