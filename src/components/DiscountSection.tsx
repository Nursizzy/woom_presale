"use client";

import Image from "next/image";
import {useState, useEffect} from "react";
import {useScrollAnimation} from "@/hooks/useScrollAnimation";
import LogoBadge from "@/components/LogoBadge";

export default function DiscountSection() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [currentPeriod, setCurrentPeriod] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    // Scroll animation hooks
    const {ref: textRef, isVisible: textVisible} = useScrollAnimation({threshold: 0.3});
    const {ref: buttonsRef, isVisible: buttonsVisible} = useScrollAnimation({threshold: 0.4});

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const currentYear = now.getFullYear();

            // Define all deadlines
            const deadlines = [
                new Date(currentYear, 7, 10, 23, 59, 59), // August 10
                new Date(currentYear, 7, 17, 23, 59, 59), // August 17
                new Date(currentYear, 7, 24, 23, 59, 59), // August 24
                new Date(currentYear, 7, 31, 23, 59, 59), // August 31
                new Date(currentYear, 8, 7, 23, 59, 59),  // September 7
            ];

            // Find current period
            let currentPeriodIndex = 0;
            let targetDate = deadlines[0];

            for (let i = 0; i < deadlines.length; i++) {
                if (now <= deadlines[i]) {
                    currentPeriodIndex = i;
                    targetDate = deadlines[i];
                    break;
                } else if (i === deadlines.length - 1) {
                    // After all periods
                    currentPeriodIndex = deadlines.length;
                    targetDate = deadlines[deadlines.length - 1];
                }
            }

            setCurrentPeriod(currentPeriodIndex);

            const difference = targetDate.getTime() - now.getTime();

            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                return {days, hours, minutes, seconds};
            }

            return {days: 0, hours: 0, minutes: 0, seconds: 0};
        };

        // Initial calculation
        setTimeLeft(calculateTimeLeft());

        // Update every second
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (value: number) => value.toString().padStart(2, '0');

    // Calculate prices based on current period
    const originalPrice = 600000;
    const discountRates = [25, 20, 15, 10, 5, 0];
    const currentDiscountRate = currentPeriod < discountRates.length ? discountRates[currentPeriod] : 0;
    const discountedPrice = originalPrice * (1 - currentDiscountRate / 100);

    // Format price with thousands separator
    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    // Price Card Component
    const PriceCard = () => (
        <div
            className="bg-[#eb3d3d] p-8 w-full lg:w-[456px] flex flex-col gap-10"
            style={{
                padding: '32px'
            }}
        >
            {/* Pre-sale Badge */}
            <div
                className="inline-flex items-center self-start backdrop-blur-[12.5px] bg-white border border-white/20 px-4 py-3 gap-3 h-11"
                style={{
                    padding: '16px'
                }}>
                <div className="w-7 h-3.5 relative">
                    <Image
                        src="/logo/woom_discount.svg"
                        alt="WOOM"
                        fill
                        className="object-contain"
                        style={{filter: 'brightness(0) saturate(100%) invert(34%) sepia(89%) saturate(1826%) hue-rotate(340deg) brightness(94%) contrast(89%)'}}
                    />
                </div>
                <span className="text-[#eb3d3d] text-base font-semibold uppercase">
                    ПРЕДПРОДАЖА
                </span>
            </div>

            {/* Price Information */}
            <div className="flex flex-col">
                <p className="text-[28px] font-medium text-white uppercase">
                    СКИДКА {currentDiscountRate}%
                </p>
                <p className="text-[60px] font-bold text-white uppercase">
                    {formatPrice(discountedPrice)} ₸
                </p>
                <p className="text-[30px] font-medium text-white/70 uppercase line-through">
                    {formatPrice(originalPrice)} ₸
                </p>
            </div>

            {/* Timeline */}
            <div className="flex-1 flex flex-col justify-between gap-4">
                {/* Week 1 */}
                <div className={`flex items-end gap-4 ${currentPeriod === 0 ? '' : currentPeriod > 0 ? 'opacity-50' : ''}`}>
                    <span className={`text-base font-semibold uppercase whitespace-nowrap ${currentPeriod === 0 ? 'text-white' : 'text-white/60'}`}>
                        ДО 10 АВГУСТА
                    </span>
                    <div className={`flex-1 border-b border-dashed ${currentPeriod === 0 ? 'border-white' : 'border-white/30'}`}></div>
                    <span className={`text-base font-semibold uppercase whitespace-nowrap ${currentPeriod === 0 ? 'text-white' : 'text-white/60'}`}>
                        450 000 ₸ (25%)
                    </span>
                </div>

                {/* Week 2 */}
                <div className={`flex items-end gap-4 ${currentPeriod === 1 ? '' : currentPeriod > 1 ? 'opacity-50' : ''}`}>
                    <span className={`text-base font-semibold uppercase whitespace-nowrap ${currentPeriod === 1 ? 'text-white' : 'text-white/60'}`}>
                        ДО 17 АВГУСТА
                    </span>
                    <div className={`flex-1 border-b border-dashed ${currentPeriod === 1 ? 'border-white' : 'border-white/30'}`}></div>
                    <span className={`text-base font-semibold uppercase whitespace-nowrap ${currentPeriod === 1 ? 'text-white' : 'text-white/60'}`}>
                        480 000 ₸ (20%)
                    </span>
                </div>

                {/* Week 3 */}
                <div className={`flex items-end gap-4 ${currentPeriod === 2 ? '' : currentPeriod > 2 ? 'opacity-50' : ''}`}>
                    <span className={`text-base font-semibold uppercase whitespace-nowrap ${currentPeriod === 2 ? 'text-white' : 'text-white/60'}`}>
                        ДО 24 АВГУСТА
                    </span>
                    <div className={`flex-1 border-b border-dashed ${currentPeriod === 2 ? 'border-white' : 'border-white/30'}`}></div>
                    <span className={`text-base font-semibold uppercase whitespace-nowrap ${currentPeriod === 2 ? 'text-white' : 'text-white/60'}`}>
                        510 000 ₸ (15%)
                    </span>
                </div>

                {/* Week 4 */}
                <div className={`flex items-end gap-4 ${currentPeriod === 3 ? '' : currentPeriod > 3 ? 'opacity-50' : ''}`}>
                    <span className={`text-base font-semibold uppercase whitespace-nowrap ${currentPeriod === 3 ? 'text-white' : 'text-white/60'}`}>
                        ДО 31 АВГУСТА
                    </span>
                    <div className={`flex-1 border-b border-dashed ${currentPeriod === 3 ? 'border-white' : 'border-white/30'}`}></div>
                    <span className={`text-base font-semibold uppercase whitespace-nowrap ${currentPeriod === 3 ? 'text-white' : 'text-white/60'}`}>
                        540 000 ₸ (10%)
                    </span>
                </div>

                {/* Week 5 */}
                <div className={`flex items-end gap-4 ${currentPeriod === 4 ? '' : currentPeriod > 4 ? 'opacity-50' : ''}`}>
                    <span className={`text-base font-semibold uppercase whitespace-nowrap ${currentPeriod === 4 ? 'text-white' : 'text-white/60'}`}>
                        ДО 7 СЕНТЯБРЯ
                    </span>
                    <div className={`flex-1 border-b border-dashed ${currentPeriod === 4 ? 'border-white' : 'border-white/30'}`}></div>
                    <span className={`text-base font-semibold uppercase whitespace-nowrap ${currentPeriod === 4 ? 'text-white' : 'text-white/60'}`}>
                        570 000 ₸ (5%)
                    </span>
                </div>
            </div>
        </div>
    );

    return (
        <section id="discount" className="bg-white section-padding">
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-16 items-center justify-between">
                    {/* Left Content */}
                    <div
                        ref={textRef as React.RefObject<HTMLDivElement>}
                        className={`flex-1 animate-slide-right ${textVisible ? 'visible' : ''}`}
                    >
                        <div className="flex flex-col gap-10">
                            <div className="inline-flex items-center">
                            <LogoBadge text={'Специальное предложение'}/>
                            </div>
                            {/* Text Content */}
                            <div className="flex flex-col gap-5">
                                {/* Title */}
                                <h2 className="text-3xl md:text-[60px] font-semibold uppercase tracking-[0.3px] leading-[1.3]">
                                    <span className="text-black">ВЫГОДНАЯ </span>
                                    <span className="text-[#eb3d3d]">ЦЕНА!</span>
                                </h2>

                                {/* Description */}
                                <p className="text-lg md:text-[22px] text-black/70 tracking-[0.11px] leading-[1.3] max-w-[600px]">
                                    Запишитесь на консультацию уже сейчас!
                                </p>
                            </div>

                            {/* Mobile: Show price card here */}
                            <div className="lg:hidden">
                                <PriceCard />
                            </div>

                            {/* Timer Section */}
                            <div className="flex flex-col gap-4">
                                <p className="text-lg md:text-[22px] font-semibold text-black/70 tracking-[0.11px]">
                                    До следующего понижения скидки осталось:
                                </p>

                                {/* Timer Boxes */}
                                <div className="flex gap-2 md:gap-4">
                                    {/* Days */}
                                    <div className="flex flex-col gap-2 items-center">
                                        <div
                                            className="w-16 h-16 md:w-[72px] md:h-[72px] border border-[#eb3d3d] flex items-center justify-center">
                                            <span className="text-2xl md:text-[32px] font-bold text-black tracking-[0.16px]">
                                                {formatTime(timeLeft.days)}
                                            </span>
                                        </div>
                                        <span className="text-sm md:text-base font-medium text-black tracking-[0.08px]">
                                            дней
                                        </span>
                                    </div>

                                    {/* Hours */}
                                    <div className="flex flex-col gap-2 items-center">
                                        <div
                                            className="w-16 h-16 md:w-[72px] md:h-[72px] border border-[#eb3d3d] flex items-center justify-center">
                                            <span className="text-2xl md:text-[32px] font-bold text-black tracking-[0.16px]">
                                                {formatTime(timeLeft.hours)}
                                            </span>
                                        </div>
                                        <span className="text-sm md:text-base font-medium text-black tracking-[0.08px]">
                                            часов
                                        </span>
                                    </div>

                                    {/* Minutes */}
                                    <div className="flex flex-col gap-2 items-center">
                                        <div
                                            className="w-16 h-16 md:w-[72px] md:h-[72px] border border-[#eb3d3d] flex items-center justify-center">
                                            <span className="text-2xl md:text-[32px] font-bold text-black tracking-[0.16px]">
                                                {formatTime(timeLeft.minutes)}
                                            </span>
                                        </div>
                                        <span className="text-sm md:text-base font-medium text-black tracking-[0.08px]">
                                            минут
                                        </span>
                                    </div>

                                    {/* Seconds */}
                                    <div className="flex flex-col gap-2 items-center">
                                        <div
                                            className="w-16 h-16 md:w-[72px] md:h-[72px] border border-[#eb3d3d] flex items-center justify-center">
                                            <span className="text-2xl md:text-[32px] font-bold text-black tracking-[0.16px]">
                                                {formatTime(timeLeft.seconds)}
                                            </span>
                                        </div>
                                        <span className="text-sm md:text-base font-medium text-black tracking-[0.08px]">
                                            секунд
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div
                                ref={buttonsRef as React.RefObject<HTMLDivElement>}
                                className={`flex items-center gap-3 animate-scale ${buttonsVisible ? 'visible' : ''}`}>
                                <button
                                    onClick={() => {
                                        const element = document.querySelector('#contact');
                                        if (element) {
                                            const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
                                            window.scrollTo({top: offsetTop, behavior: 'smooth'});
                                        }
                                    }}
                                    className="w-full md:w-auto bg-[#eb3d3d] text-white text-base md:text-[18px] font-semibold uppercase hover:bg-[#d63333] transition-colors"
                                    style={{
                                        padding: isMobile ? '16px 40px' : '20px 40px'
                                    }}
                                >
                                    Записаться на консультацию
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Card - Desktop only */}
                    <div className="hidden lg:block">
                        <PriceCard />
                    </div>
                </div>
            </div>
        </section>
    );
}