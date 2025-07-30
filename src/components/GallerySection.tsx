"use client";

import Image from "next/image";
import { useState} from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function GallerySection() {
  const [currentSlide, setCurrentSlide] = useState(2); // Third slide active by default
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const totalSlides = 9; // Updated to 9 slides
  const { ref: sectionRef, isVisible } = useScrollAnimation<HTMLElement>({ threshold: 0.3 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.4 });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
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

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <section 
      id="gallery" 
      ref={sectionRef} 
      className="relative h-[100vh] md:h-[862px] overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Image Carousel with Overlay */}
      <div className={`absolute inset-0 animate-fade-in ${isVisible ? 'visible' : ''}`}>
        <div className="absolute inset-0 bg-black/60 z-10" />
        {[...Array(totalSlides)].map((_, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={`/images/gallery/gallery-bg-${index + 1}.${index === 0 ? 'png' : 'jpg'}`}
              alt={`Gym interior ${index + 1}`}
              fill
              sizes="100vw"
              className="object-cover"
              priority={index === 2} // Preload the default slide
            />
          </div>
        ))}
      </div>

      {/* Content */}
      <div ref={contentRef} className="relative z-20 h-full flex flex-col items-center justify-center px-5 md:px-[120px]">
        <div className="max-w-[1200px] w-full mx-auto">
          <div className={`flex flex-col gap-6 md:gap-10 items-center text-center animate-fade-up ${contentVisible ? 'visible' : ''}`}>
            {/* Section Header */}
            <div className="flex flex-col gap-3 md:gap-5 items-center">
              <div className="backdrop-blur-[12.5px] bg-white/20 border border-white/20" style={{ padding: '12px 16px' }}>
                <div className="w-[120px] md:w-[156px] h-4 md:h-5 relative">
                  <Image
                    src="/logo/woom_header.svg"
                    alt="WOOM FITNESS"
                    fill
                    sizes="156px"
                    className="object-contain"
                  />
                </div>
              </div>
              <h2 className="text-white text-3xl md:text-[60px] font-semibold uppercase tracking-[0.3px] leading-[1.3]">
    ОТ МАЛОГО К ВЕЛИКОМУ
              </h2>
              <p className="text-white/70 text-lg md:text-2xl tracking-[0.12px] leading-[1.3] max-w-[90%] md:max-w-none">
                Новейшее оборудование, профессиональные тренеры<br className="hidden md:block" />
                <span className="md:hidden">и индивидуальный подход к каждой девушке</span>
                <span className="hidden md:inline">и индивидуальный подход к каждой девушке</span>
              </p>
            </div>

            {/* CTA Button */}
            <button 
              onClick={() => {
                const element = document.querySelector('#discount');
                if (element) {
                  const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
              }}
              className="backdrop-blur-[15px] bg-white/30 border border-white/25 px-6 md:px-10 py-3 md:py-4 text-white text-base md:text-lg font-semibold uppercase hover:bg-white/40 transition-all" 
              style={{ padding: '12px' }}
            >
              Получить консультацию
            </button>
          </div>
        </div>

        {/* Click areas for mobile navigation */}
        <button
          className="md:hidden absolute left-0 top-0 h-full w-1/3 bg-transparent"
          onClick={prevSlide}
          aria-label="Previous slide"
        />
        <button
          className="md:hidden absolute right-0 top-0 h-full w-1/3 bg-transparent"
          onClick={nextSlide}
          aria-label="Next slide"
        />

        {/* Desktop Navigation Arrows */}
        <button
          onClick={prevSlide}
          className={`hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-[72px] h-[72px] backdrop-blur-[15px] bg-white/25 rounded-full border border-white/50 items-center justify-center hover:bg-white/35 transition-all animate-scale ${contentVisible ? 'visible' : ''}`}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className={`hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 w-[72px] h-[72px] backdrop-blur-[15px] bg-white/25 rounded-full border border-white/50 items-center justify-center hover:bg-white/35 transition-all animate-scale ${contentVisible ? 'visible' : ''}`}
          aria-label="Next slide"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3">
          {[...Array(totalSlides)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all ${
                index === currentSlide
                  ? "w-8 md:w-12 h-2 md:h-[9px] bg-white rounded-full"
                  : "w-2 md:w-[9px] h-2 md:h-[9px] bg-white/25 rounded-full hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}