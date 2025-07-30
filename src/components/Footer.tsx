"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Footer() {
    const { ref: footerRef, isVisible: footerVisible } = useScrollAnimation({ threshold: 0.3 });

    return (
        <footer
            ref={footerRef as React.RefObject<HTMLElement>}
            className={`bg-[#f7f7f7] animate-fade-up ${footerVisible ? 'visible' : ''}`}
            style={{
                padding: '64px 120px'
            }}
        >
            <div className="max-w-[1960px] mx-auto">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-4">
                    {/* Logo */}
                    <Link href="/" className="relative h-5 w-[156px]">
                        <Image
                            src="/logo/woom_footer.svg"
                            alt="WOOM Fitness"
                            fill
                            sizes="156px"
                            className="object-contain"
                            style={{ filter: 'brightness(0) saturate(100%)' }}
                        />
                    </Link>
                </div>
            </div>
        </footer>
    );
}