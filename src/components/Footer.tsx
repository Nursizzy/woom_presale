"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Footer() {
    const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation({ threshold: 0.3 });
    
    return (
        <footer 
            ref={footerRef as React.RefObject<HTMLElement>}
            className={`bg-white py-6 animate-fade-up ${footerVisible ? 'visible' : ''}`}
        >
            <div className="max-w-[1960px] mx-auto px-6"
            style={{
                padding:'24px'
            }}
            >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4">
                    {/* Logo */}
                    <Link href="/" className="relative h-5 w-[120px] md:w-[156px]">
                        <Image
                            src="/logo/woom_footer.svg"
                            alt="WOOM Fitness"
                            fill
                            sizes="(max-width: 768px) 120px, 156px"
                            className="object-contain"
                        />
                    </Link>

                    {/* Copyright */}
                    <p className="text-[#040815] text-xs md:text-sm opacity-70 text-center sm:text-right">
                        © 2025 Все права защищены
                    </p>
                </div>
            </div>
        </footer>
    );
}