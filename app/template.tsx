"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // The landing page already has its own entrance animations, 
    // so we don't apply the global page transition there.
    if (pathname === "/") {
        return <>{children}</>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex-1 flex flex-col w-full h-full"
        >
            {children}
        </motion.div>
    );
}
