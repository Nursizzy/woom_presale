"use client";

import Image from "next/image";
import { useState, useRef} from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import LogoBadge from "@/components/LogoBadge";

export default function ZonesSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Scroll animation hooks
    const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.3 });
    const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation({ threshold: 0.2 });

    const zones = [
        {
            name: "Спа зона",
            experience: "Бассейн 17 метров, несколько видов бань и массажный кабинет",
            image: "/images/contact-bg.png"
        },
        {
            name: "Free Gym Зона",
            experience: "Зона тренажерного зала полностью оборудована под все нужды",
            image: "/images/gallery/gallery-bg-2.jpg"
        },
        {
            name: "Booty Room",
            experience: "Авторская программа для эффективной прокачки ягодиц и ног",
            image: "/images/gallery/gallery-bg-3.jpg"
        },
        {
            name: "Пилатес Soft",
            experience: "Популярный тренд, эффективная растяжка и проработка мышц",
            image: "/images/gallery/gallery-bg-6.jpg"
        },
        {
            name: "Приложение",
            experience: "Для отслеживания прогресса и записи на групповые",
            image: "/images/contact-bg.png"
        },
        {
            name: "Фитнес бар",
            experience: "Полезные перекусы, спортивное питание и напитки",
            image: "/images/gallery/gallery-bg-8.jpg"
        },
    ];

    // Calculate max index - can't go beyond showing the last 3 cards
    const maxIndex = Math.max(0, zones.length - 3);

    const nextSlide = () => {
        setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
    };

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

        if (isLeftSwipe && currentIndex < maxIndex) {
            nextSlide();
        }
        if (isRightSwipe && currentIndex > 0) {
            prevSlide();
        }
    };



    return (
        <section id="zones" className="bg-white section-padding">
            <div className="container">
                <div className="flex flex-col gap-16">
                    {/* Section Header */}
                    <div
                        ref={headerRef as React.RefObject<HTMLDivElement>}
                        className={`flex flex-col gap-5 animate-fade-up ${headerVisible ? 'visible' : ''}`}
                    >
                        <div className="inline-flex items-center">
                       <LogoBadge text={'Наши Зоны'}/>
                        </div>
                        <h2 className="text-[#000000] text-3xl lg:text-5xl font-semibold uppercase tracking-[0.24px]">
                            ЧТО МЫ ПРЕДЛАГАЕМ
                        </h2>
                        <p className="text-[#000000] text-lg lg:text-2xl opacity-70 tracking-[0.12px] max-w-[800px] leading-[1.3]">
                            Woom гарантирует: современный зал, бассейн, квалифицированные тренеры и 100% женскую атмосферу
                        </p>
                    </div>

                    {/* Content with Cards and Navigation */}
                    <div className="relative">
                        <div
                            ref={cardsRef as React.RefObject<HTMLDivElement>}
                            className={`animate-stagger ${cardsVisible ? 'visible' : ''}`}
                        >
                            {/* Desktop View */}
                            <div className="hidden lg:block">
                                <div className="flex gap-6 items-center">
                                    {/* Left Arrow */}
                                    {currentIndex > 0 && (
                                        <button
                                            onClick={prevSlide}
                                            className="absolute left-[-100px] top-1/2 -translate-y-1/2 flex-shrink-0 w-[72px] h-[72px] bg-white backdrop-blur-[15px] rounded-full border border-white/50 flex items-center justify-center transition-all hover:shadow-lg z-10"
                                            aria-label="Previous zones"
                                        >
                                            <ArrowLeft className="w-8 h-8 text-[#040815]" />
                                        </button>
                                    )}

                                    {/* Cards Container - Always show 3 cards */}
                                    <div className="relative w-full h-[500px] overflow-hidden">
                                        {/* Render all cards but position them based on their relation to current index */}
                                        {zones.map((zone, index) => {
                                            // Calculate position relative to current index
                                            const relativePosition = index - currentIndex;

                                            // Don't render cards too far away
                                            if (relativePosition < -1 || relativePosition > 3) return null;

                                            let xPosition = 0;
                                            let width = 0;
                                            let isLarge = false;

                                            if (relativePosition === -1) {
                                                // Previous card (sliding out to left)
                                                xPosition = -532;
                                                width = 500;
                                                isLarge = true;
                                            } else if (relativePosition === 0) {
                                                // Current selected card
                                                xPosition = 0;
                                                width = 500;
                                                isLarge = true;
                                            } else if (relativePosition === 1) {
                                                // Second visible card
                                                xPosition = 532;
                                                width = 392;
                                            } else if (relativePosition === 2) {
                                                // Third visible card
                                                xPosition = 956;
                                                width = 392;
                                            } else if (relativePosition === 3) {
                                                // Next card (ready to slide in from right)
                                                xPosition = 1380; // 956 + 392 + 32
                                                width = 392;
                                            }

                                            return (
                                                <div
                                                    key={index}
                                                    className="absolute top-0 transition-all duration-700 ease-in-out"
                                                    style={{
                                                        left: `${xPosition}px`,
                                                        width: `${width}px`,
                                                    }}
                                                >
                                                    <ZoneCard
                                                        name={zone.name}
                                                        experience={zone.experience}
                                                        image={zone.image}
                                                        isLarge={isLarge}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Right Arrow */}
                                    <button
                                        onClick={nextSlide}
                                        disabled={currentIndex >= maxIndex}
                                        className={`absolute right-[-100px] top-1/2 -translate-y-1/2 flex-shrink-0 w-[72px] h-[72px] bg-white backdrop-blur-[15px] rounded-full border border-white/50 flex items-center justify-center transition-all ${
                                            currentIndex >= maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                                        } z-10`}
                                        aria-label="Next zones"
                                    >
                                        <ArrowRight className="w-8 h-8 text-[#040815]" />
                                    </button>
                                </div>
                            </div>

                            {/* Mobile View - Show 1 card */}
                            <div className="lg:hidden relative">
                                <div
                                    className="overflow-hidden"
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    <div
                                        ref={containerRef}
                                        className="flex transition-transform duration-300 ease-out"
                                        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                                    >
                                        {zones.map((zone, index) => (
                                            <div key={index} className="w-full flex-shrink-0">
                                                <ZoneCard
                                                    name={zone.name}
                                                    experience={zone.experience}
                                                    image={zone.image}
                                                    isLarge={true}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Click areas for navigation */}
                                <button
                                    className="absolute left-0 top-0 h-full w-1/3 bg-transparent"
                                    onClick={() => currentIndex > 0 && setCurrentIndex(currentIndex - 1)}
                                    aria-label="Previous zone"
                                />
                                <button
                                    className="absolute right-0 top-0 h-full w-1/3 bg-transparent"
                                    onClick={() => currentIndex < zones.length - 1 && setCurrentIndex(currentIndex + 1)}
                                    aria-label="Next zone"
                                />

                                {/* Mobile Pagination Dots */}
                                <div className="flex justify-center gap-2 mt-6" style={{
                                    paddingTop: '12px',
                                }}>
                                    {zones.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`h-2 rounded-full transition-all ${
                                                index === currentIndex
                                                    ? "w-8 bg-[#eb3d3d]"
                                                    : "w-2 bg-gray-300"
                                            }`}
                                            aria-label={`Go to zone ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ZoneCard({
                      name,
                      experience,
                      image,
                      isLarge = false,
                  }: {
    name: string;
    experience: string;
    image: string;
    isLarge?: boolean;
}) {
    return (
        <div
            className={`relative w-full ${isLarge ? 'h-[500px]' : 'h-[440px]'} overflow-hidden group cursor-pointer transition-all duration-700 ease-in-out flex flex-col items-center justify-end`}
        >
            {/* Background Image */}
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Gradient Overlay with Text */}
            <div className="relative z-10 bg-gradient-to-b from-transparent to-black/75 pt-12 pb-6 px-6 w-full flex flex-col gap-3"
            style={{
                padding:'12px 24px'
            }}>
                <h3 className={`font-semibold text-white tracking-[-1.2px] leading-[1.2] ${
                    isLarge ? 'text-[40px]' : 'text-[32px]'
                }`}>
                    {name}
                </h3>
                <p className={`text-white/80 tracking-[-0.48px] leading-[1.2] ${
                    isLarge ? 'text-base' : 'text-sm'
                }`}>
                    {experience}
                </p>
            </div>
        </div>
    );
}