"use client";

import { ReactNode } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface AnimatedSectionProps {
    children: ReactNode;
    className?: string;
    animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale";
    threshold?: number;
    delay?: number;
}

export default function AnimatedSection({
    children,
    className = "",
    animation = "fade-up",
    threshold = 0.1,
    delay = 0,
}: AnimatedSectionProps) {
    const { ref, isVisible } = useScrollAnimation({ threshold });

    return (
        <div
            ref={ref}
            className={`animate-${animation} ${isVisible ? "visible" : ""} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}