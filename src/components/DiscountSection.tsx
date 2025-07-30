"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function DiscountSection() {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });
    const [currentDiscount, setCurrentDiscount] = useState(25);
    
    // Scroll animation hooks
    const { ref: textRef, isVisible: textVisible } = useScrollAnimation({ threshold: 0.3 });
    const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.3 });
    const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation({ threshold: 0.4 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const currentYear = now.getFullYear();
            
            // First iteration: August 10th, 23:59
            const firstDeadline = new Date(currentYear, 7, 10, 23, 59, 59); // Month is 0-indexed, so 7 = August
            
            let targetDate;
            let discount = 25;
            
            if (now <= firstDeadline) {
                // We're still in the first iteration
                targetDate = firstDeadline;
            } else {
                // Calculate which 7-day iteration we're in
                const daysSinceFirst = Math.floor((now.getTime() - firstDeadline.getTime()) / (1000 * 60 * 60 * 24));
                const iterationNumber = Math.floor(daysSinceFirst / 7) + 1;
                
                // Calculate discount based on iteration (decreases by 5% each iteration)
                discount = Math.max(5, 25 - (iterationNumber * 5));
                
                // Calculate next deadline (7 days after the current iteration start)
                const daysToAdd = ((iterationNumber) * 7);
                targetDate = new Date(firstDeadline);
                targetDate.setDate(targetDate.getDate() + daysToAdd);
                targetDate.setHours(23, 59, 59);
            }
            
            setCurrentDiscount(discount);
            
            const difference = targetDate.getTime() - now.getTime();
            
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                
                return { days, hours, minutes, seconds };
            }
            
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
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
    
    // Calculate prices based on current discount
    const originalPrice = 600000;
    const discountedPrice = Math.round(originalPrice * (1 - currentDiscount / 100));
    
    // Format price with thousands separator
    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    return (
        <section id="discount" className="bg-white section-padding">
            <div className="container" >
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center justify-between">
                    {/* Content */}
                    <div 
                        ref={textRef as React.RefObject<HTMLDivElement>}
                        className={`flex-1 w-full lg:min-w-[400px] animate-slide-right ${textVisible ? 'visible' : ''}`}
                    >
                        <div className="flex flex-col gap-6 md:gap-8 lg:gap-10">
                            <span className="inline-flex items-center self-start backdrop-blur-[12.5px] bg-[#faf1f1] border border-white/20 px-4 py-3 gap-3" style={{
                                padding:'4px',
                            }}>
                <div className="w-7 h-3.5 relative">
                  <Image
                      src="/logo/woom_discount.svg"
                      alt="WOOM"
                      fill
                      className="object-contain"
                  />
                </div>
                <span className="text-[#eb3d3d] text-base font-semibold uppercase">
                  Осталось {formatTime(timeLeft.days)}:{formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                </span>
              </span>

                            {/* Title */}
                            <div className="flex items-center gap-1 md:gap-2 lg:gap-2.5 flex-wrap">
                                <h2 className="text-3xl md:text-4xl lg:text-[60px] font-semibold uppercase tracking-[0.3px]">
                                    <span className="text-black">скидка </span>
                                    <span className="text-[#eb3d3d] font-bold">{currentDiscount}%</span>
                                </h2>
                                {currentDiscount > 20 && (
                                    <span className="text-2xl md:text-3xl lg:text-[60px] font-bold uppercase opacity-25">20%</span>
                                )}
                                {currentDiscount > 15 && (
                                    <span className="text-2xl md:text-3xl lg:text-[60px] font-bold uppercase opacity-25 hidden sm:inline">15%</span>
                                )}
                                {currentDiscount > 10 && (
                                    <span className="text-2xl md:text-3xl lg:text-[60px] font-bold uppercase opacity-25 hidden md:inline">10%</span>
                                )}
                                {currentDiscount > 5 && (
                                    <span className="text-2xl md:text-3xl lg:text-[60px] font-bold uppercase opacity-25 hidden lg:inline">5%</span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-base md:text-lg lg:text-2xl text-black/70 tracking-[0.12px]">
                                Присоединяйтесь к WOOM и получите скидку до {currentDiscount}% на годовые клубные карты!
                            </p>

                            {/* Price Block */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-baseline gap-3 md:gap-4 flex-wrap">
                                    <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#eb3d3d]">
                                        {formatPrice(discountedPrice)} ₸
                                    </span>
                                    <span className="text-lg md:text-xl lg:text-2xl text-black/40 line-through">
                                        {formatPrice(originalPrice)} ₸
                                    </span>
                                    <span className="inline-flex items-center bg-[#eb3d3d]/10 text-[#eb3d3d] px-3 py-1 text-sm md:text-base font-semibold">
                                        Экономия {formatPrice(originalPrice - discountedPrice)} ₸
                                    </span>
                                </div>
                                <p className="text-sm md:text-base text-black/60">
                                    Цена за годовую клубную карту
                                </p>
                            </div>

                            {/* Actions */}
                            <div 
                                ref={buttonsRef as React.RefObject<HTMLDivElement>}
                                className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 animate-scale ${buttonsVisible ? 'visible' : ''}`}>
                                <button 
                                    onClick={() => {
                                        const element = document.querySelector('#contact');
                                        if (element) {
                                            const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
                                            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                                        }
                                    }}
                                    className="bg-[#eb3d3d] px-6 py-3 md:px-8 md:py-4 lg:px-10 text-white text-base md:text-lg font-semibold uppercase hover:bg-[#d63333] transition-colors tap-target w-full sm:w-auto" 
                                    style={{
                                        padding:'12px'
                                    }}
                                >
                                    Заразервируй клубную карту
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div 
                        ref={imageRef as React.RefObject<HTMLDivElement>}
                        className={`relative w-full sm:w-[400px] md:w-[450px] lg:w-[530px] h-[300px] sm:h-[400px] md:h-[450px] lg:h-[530px] overflow-hidden order-first lg:order-last animate-slide-left ${imageVisible ? 'visible' : ''}`}>
                        <Image
                            src="/images/discount-image.png"
                            alt="Happy fitness woman"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 450px, 530px"
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}