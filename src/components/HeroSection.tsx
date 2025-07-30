"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function HeroSection() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { ref: contentRef, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.2 });

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.addEventListener('loadeddata', () => {
                setIsVideoLoaded(true);
            });
        }
    }, []);

    return (
        <section id="hero" className="relative h-screen min-h-[600px] md:min-h-[700px] lg:h-[862px] overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/60 z-10" />

                {/* PNG Fallback (always rendered) */}
                <Image
                    src="/images/hero-bg.png"
                    alt="Fitness friends celebrate workout"
                    fill
                    className={`object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
                    priority
                />

                {/* MP4 Video Background */}
                <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/images/hero-bg.mp4" type="video/mp4" />
                    {/* Fallback to GIF if MP4 is not supported */}
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Content */}
            <div ref={contentRef} className="relative z-20 container mx-auto h-full flex flex-col justify-center pt-16 md:pt-0">
                <div className="max-w-[1240px] mx-auto w-full">
                    <div className={`flex flex-col gap-6 md:gap-8 lg:gap-10 items-start animate-stagger ${isVisible ? 'visible' : ''}`}>
                        {/* Text Content */}
                        <div className="flex flex-col gap-3 md:gap-4 lg:gap-5">
                            <h1 className="text-white heading-1 font-semibold uppercase [text-shadow:_5px_5px_30px_rgba(0,0,0,0.15)]">
                                Женский фитнес клуб WOOM<br className="hidden sm:block" />
                                <span className="sm:hidden"> </span>Уже в Алматы
                            </h1>
                            <p className="text-white/70 text-base sm:text-lg md:text-xl lg:text-2xl leading-[1.3] max-w-[600px]">
                                Здесь постоянство важнее формы,
                                а фитнес становится стилем жизни.
                            </p>
                        </div>

                        {/* CTA Button */}
                        <button 
                            onClick={() => {
                                const element = document.querySelector('#contact');
                                if (element) {
                                    const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
                                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                                }
                            }}
                            className="btn btn-glass"
                        >
                            Зарезервировать клубную карту
                        </button>
                    </div>
                </div>

                {/* Metrics - Hidden on mobile, visible on tablet and up */}
                <div className="hidden md:flex absolute bottom-8 lg:bottom-[120px] left-0 right-0">
                    <div className="container mx-auto">
                        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                            <MetricItem value="1300 м²" label="площадь фитнес-клуба" />
                            <div className="hidden lg:block h-[60px] w-[0.5px] bg-white/50" />
                            <MetricItem value="СПА-зона" label="Бассейн, бани и массаж" />
                            <div className="hidden lg:block h-[60px] w-[0.5px] bg-white/50" />
                            <MetricItem value="Групповые тренировки" label="Авторские программы" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function MetricItem({ value, label }: { value: string; label: string }) {
    return (
        <div className="text-white">
            <div className="text-xl lg:text-[32px] font-medium mb-1 lg:mb-2">{value}</div>
            <div className="text-xs lg:text-base uppercase opacity-80">{label}</div>
        </div>
    );
}