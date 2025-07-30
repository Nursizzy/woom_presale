"use client";

import { useEffect, useRef, useState } from "react";

interface UseScrollAnimationOptions {
    threshold?: number;
    rootMargin?: string;
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
    options: UseScrollAnimationOptions = {}
) {
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Unobserve after animation to prevent re-animation
                    observer.unobserve(element);
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || "0px",
            }
        );

        observer.observe(element);

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [options.threshold, options.rootMargin]);

    return { ref, isVisible };
}