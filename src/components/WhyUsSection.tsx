"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import LogoBadge from "@/components/LogoBadge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function WhyUsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
    const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2 });
    const { ref: badgeRef, isVisible: badgeVisible } = useScrollAnimation({ threshold: 0.4 });

    const features = [
        {
            image: "/images/feature-1.png",
            title: "НАЧНИ С МАЛОГО",
            description: "Каждый путь начинается с первого шага.\n" +
                "Фокус на простых, безопасных\n" +
                "действиях"
        },
        {
            image: "/images/feature-2.png",
            title: "ПОСТОЯНСТВО",
            description: "Результат рождается не в пике усилий,\n" +
                "а в постоянстве"
        },
        {
            image: "/images/feature-3.png",
            title: "ОТДЫХ ТОЖЕ ВАЖЕН",
            description: "Сон, гормональный баланс,\n" +
                "питание и психоэмоциональное здоровье\n"
        }
    ];

    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > 50;
        const isRightSwipe = distance < -50;

        if (isLeftSwipe && currentIndex < features.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
        if (isRightSwipe && currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
    }, [currentIndex]);

    return (
        <section id="about" className="bg-[#f6f6f6] section-padding overflow-hidden">
            <div className="container mx-auto">
                <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
                    {/* Section Header */}
                    <div 
                        ref={headerRef as React.RefObject<HTMLDivElement>}
                        className={`flex flex-col gap-3 md:gap-4 lg:gap-5 animate-fade-up ${headerVisible ? 'visible' : ''}`}
                    >
                        <div 
                            ref={badgeRef as React.RefObject<HTMLDivElement>}
                            className={`inline-flex items-center animate-scale ${badgeVisible ? 'visible' : ''}`}
                        >
                            <LogoBadge text="WOOM ВИДЕНИЕ БРЕНДА" />
                        </div>
                        <h2 className="text-[#040815] heading-2 font-semibold uppercase">
                            КАЖДЫЙ ТВОЙ 1% ЗАСЧИТЫВАЕТСЯ
                        </h2>
                        <p className="text-[#040815] text-base md:text-lg lg:text-2xl opacity-70 max-w-3xl">
                            Мы верим: когда маленькие шаги
                            становятся привычкой, спорт перестает
                            быть «целью на лето» и превращается в
                            стиль жизни. Тогда результат становится
                            неизбежным.
                        </p>
                    </div>

                    {/* Cards - Grid on desktop, Slider on mobile */}
                    <div className="relative">
                        {/* Desktop Grid */}
                        <div 
                            ref={cardsRef as React.RefObject<HTMLDivElement>}
                            className={`hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 animate-stagger ${cardsVisible ? 'visible' : ''}`}
                        >
                            {features.map((feature, index) => (
                                <FeatureCard key={index} {...feature} />
                            ))}
                        </div>

                        {/* Mobile Slider */}
                        <div className="md:hidden relative">
                            <div 
                                className="flex transition-transform duration-300 ease-out"
                                ref={containerRef}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
                            >
                                {features.map((feature, index) => (
                                    <div key={index} className="w-full flex-shrink-0">
                                        <FeatureCard {...feature} />
                                    </div>
                                ))}
                            </div>

                            {/* Mobile Pagination Dots */}
                            <div className="flex justify-center gap-2 mt-4">
                                {features.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2 rounded-full transition-all ${
                                            index === currentIndex
                                                ? "w-8 bg-primary"
                                                : "w-2 bg-gray-300"
                                        }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeatureCard({
                         image,
                         title,
                         description,
                     }: {
    image: string;
    title: string;
    description: string;
}) {
    return (
        <div className="relative h-[300px] md:h-[350px] lg:h-[400px] bg-white overflow-hidden group cursor-pointer">
            <Image
                src={image}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-transparent to-black/75" />
            <div className="absolute inset-0 p-4 md:p-5 lg:p-6 flex flex-col justify-between" style={{padding:'12px'}}>
                <h3 className="text-white text-xl md:text-2xl lg:text-[28px] font-semibold leading-[1.2]">
                    {title}
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-[1.4] whitespace-pre-line">
                    {description}
                </p>
            </div>
        </div>
    );
}