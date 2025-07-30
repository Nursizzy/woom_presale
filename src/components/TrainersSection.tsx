"use client";

import Image from "next/image";
import {useState, useRef, useEffect} from "react";
import {ChevronRight} from "lucide-react";
import LogoBadge from "@/components/LogoBadge";
import {useScrollAnimation} from "@/hooks/useScrollAnimation";

export default function TrainersSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [desktopIndex, setDesktopIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const desktopContainerRef = useRef<HTMLDivElement>(null);

    // Scroll animation hooks
    const {ref: headerRef, isVisible: headerVisible} = useScrollAnimation({threshold: 0.3});
    const {ref: cardsRef, isVisible: cardsVisible} = useScrollAnimation({threshold: 0.2});
    const {ref: paginationRef, isVisible: paginationVisible} = useScrollAnimation({threshold: 0.3});

    const trainers = [
        {
            name: "Спа зона",
            experience: "Бассейн 17 метров, несколько видов бань и массажный кабинет",
            image: "/images/feature-1.png"
        },
        {
            name: "Free Gym Zone",
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
            name: "Собственное приложение",
            experience: "Приложение для отслеживания прогресса, плана тренировок и записи на групповые",
            image: "/images/feature-1.png"
        },
        {
            name: "Фитнес бар",
            experience: "Полезные перекусы, спортивное питание и напитки",
            image: "/images/gallery/gallery-bg-8.jpg"
        },
    ];

    const nextSlide = () => {
        // Show 3 items at a time, so max index is length - 3
        const maxIndex = Math.max(0, trainers.length - 3);
        setDesktopIndex((prev) => Math.min(prev + 1, maxIndex));
    };

    const prevSlide = () => {
        setDesktopIndex((prev) => Math.max(prev - 1, 0));
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

        if (isLeftSwipe && currentIndex < trainers.length - 1) {
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

    useEffect(() => {
        if (desktopContainerRef.current) {
            const cardWidth = 33.333; // Width of each card (1/3 = 33.333%)
            desktopContainerRef.current.style.transform = `translateX(-${desktopIndex * cardWidth}%)`;
        }
    }, [desktopIndex]);

    return (
        <section id="trainers" className="bg-white section-padding overflow-hidden">
            <div className="container">
                <div className="flex flex-col gap-10 md:gap-12 lg:gap-16">
                    {/* Section Header */}
                    <div
                        ref={headerRef as React.RefObject<HTMLDivElement>}
                        className={`flex flex-col gap-3 md:gap-4 lg:gap-5 animate-fade-up ${headerVisible ? 'visible' : ''}`}
                    >
                        <div className="inline-flex items-center">
                            <LogoBadge text={'WOOM ЗОНЫ'}/>
                        </div>
                        <h2 className="text-[#040815] text-3xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-[0.24px]">
                            Что мы предлагаем
                        </h2>
                        <p className="text-[#040815] text-base md:text-lg lg:text-2xl opacity-70 tracking-[0.12px] max-w-3xl">
                            Woom гарантирует: современный зал,
                            бассейн, квалифицированные тренеры и
                            100 % женскую атмосферу — всё для того,
                            чтобы даже один небольшой шаг в
                            день привёл к заметному результату через
                            год.
                        </p>
                    </div>

                    {/* Trainers Grid/Slider */}
                    <div className="relative">
                        {/* Desktop Slider */}
                        <div
                            ref={cardsRef as React.RefObject<HTMLDivElement>}
                            className="hidden md:block overflow-hidden"
                        >
                            <div
                                ref={desktopContainerRef}
                                className={`flex gap-3 transition-transform duration-500 ease-out animate-stagger ${cardsVisible ? 'visible' : ''}`}
                            >
                                {trainers.map((trainer, index) => (
                                    <div
                                        key={index}
                                        className="w-1/2 lg:w-1/3 px-2 md:px-3 lg:px-4 flex-shrink-0"
                                    >
                                        <TrainerCard
                                            name={trainer.name}
                                            experience={trainer.experience}
                                            image={trainer.image}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Navigation Arrows */}
                            {trainers.length > 3 && (
                                <>
                                    <button
                                        onClick={prevSlide}
                                        disabled={desktopIndex === 0}
                                        className={`absolute left-0 top-1/2 -translate-y-1/2 w-[72px] h-[72px] bg-white rounded-full border border-gray-200 flex items-center justify-center transition-all tap-target z-10 ${
                                            desktopIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                                        }`}
                                        aria-label="Previous trainers">
                                        <ChevronRight className="w-8 h-8 text-[#040815] rotate-180"/>
                                    </button>
                                    <button
                                        onClick={nextSlide}
                                        disabled={desktopIndex >= trainers.length - 3}
                                        className={`absolute right-0 top-1/2 -translate-y-1/2 w-[72px] h-[72px] bg-white rounded-full border border-gray-200 flex items-center justify-center transition-all tap-target z-10 ${
                                            desktopIndex >= trainers.length - 3 ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                                        }`}
                                        aria-label="Next trainers">
                                        <ChevronRight className="w-8 h-8 text-[#040815]"/>
                                    </button>
                                </>
                            )}
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
                                {trainers.map((trainer, index) => (
                                    <div key={index} className="w-full flex-shrink-0">
                                        <TrainerCard
                                            name={trainer.name}
                                            experience={trainer.experience}
                                            image={trainer.image}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Mobile Pagination Dots */}
                            <div className="flex justify-center gap-2 mt-6">
                                {trainers.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`h-2 rounded-full transition-all ${
                                            index === currentIndex
                                                ? "w-8 bg-primary"
                                                : "w-2 bg-gray-300"
                                        }`}
                                        aria-label={`Go to trainer ${index + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desktop Pagination */}
                    {trainers.length > 3 && (
                        <div
                            ref={paginationRef as React.RefObject<HTMLDivElement>}
                            className={`hidden md:flex md:gap-3 justify-center animate-fade-in ${paginationVisible ? 'visible' : ''}`}
                        >
                            {trainers.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setDesktopIndex(index)}
                                    className={`${
                                        index >= desktopIndex && index < desktopIndex + 3
                                            ? "w-8 md:w-10 lg:w-12"
                                            : "w-2 md:w-[9px]"
                                    } h-2 md:h-[9px] ${
                                        index >= desktopIndex && index < desktopIndex + 3
                                            ? "bg-[#ed3d3d]"
                                            : "bg-[#ed3d3d]/30 hover:bg-black/40"
                                    } rounded-full transition-all tap-target flex items-center justify-center`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

function TrainerCard({
                         name,
                         experience,
                         image,
                     }: {
    name: string;
    experience: string;
    image: string;
}) {
    return (
        <div className="relative h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden group cursor-pointer">
            <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-x-0 bottom-0 p-3 md:p-4">
                <div
                    className="backdrop-blur-[20px] bg-gradient-to-r from-[#ed3d3d]/50 to-[#ed3d3d]/60 border border-white/20 shadow-lg p-4 md:p-5 lg:p-6 flex items-center justify-between" style={{background: 'linear-gradient(135deg, rgba(237, 61, 61, 0.7) 0%, rgba(237, 61, 61, 0.6) 100%)', backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)', padding:'12px'}}>
                    <div className="text-white">
                        <h3 className="text-xl md:text-2xl font-semibold tracking-[0.12px] mb-1">{name}</h3>
                        <p className="text-xs md:text-sm font-medium tracking-[0.07px]">{experience}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}