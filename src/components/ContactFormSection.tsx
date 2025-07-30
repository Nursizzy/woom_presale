"use client";

import Image from "next/image";
import { User, Phone } from "lucide-react";
import { useState } from "react";
import LogoBadge from "@/components/LogoBadge";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ContactFormSection() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        comment: "",
    });
    const [phoneError, setPhoneError] = useState("");
    
    // Scroll animation hooks
    const { ref: formRef, isVisible: formVisible } = useScrollAnimation({ threshold: 0.3 });
    const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.3 });
    const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.4 });

    // Format phone number with mask
    const formatPhoneNumber = (value: string) => {
        // Remove all non-digits
        const numbers = value.replace(/\D/g, '');
        
        // Apply mask XXX-XXX-XX-XX
        if (numbers.length <= 3) {
            return numbers;
        } else if (numbers.length <= 6) {
            return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
        } else if (numbers.length <= 8) {
            return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6)}`;
        } else {
            return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 8)}-${numbers.slice(8, 10)}`;
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        const formatted = formatPhoneNumber(input);
        setFormData({ ...formData, phone: formatted });
        
        // Validate phone (should be 10 digits)
        if (formatted.length === 13 && formatted.replace(/-/g, '').length === 10) {
            setPhoneError("");
        } else if (formatted.length > 0) {
            setPhoneError("Введите полный номер телефона");
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate phone before submission
        if (formData.phone.replace(/-/g, '').length !== 10) {
            setPhoneError("Введите корректный номер телефона");
            return;
        }
        
        // Handle form submission
        console.log({ ...formData, phone: `+7${formData.phone.replace(/-/g, '')}` });
    };

    return (
        <section id="contact" className="bg-white section-padding">
            <div className="container">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center">
                    {/* Image - Hidden on mobile */}
                    <div 
                        ref={imageRef as React.RefObject<HTMLDivElement>}
                        className={`hidden sm:block relative sm:w-[400px] md:w-[450px] lg:w-[530px] sm:h-[400px] md:h-[450px] lg:h-[530px] overflow-hidden flex-shrink-0 order-last lg:order-first animate-slide-left ${imageVisible ? 'visible' : ''}`}>
                        <Image
                            src="/images/contact-bg.png"
                            alt="Gym interior"
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 450px, 530px"
                            className="object-cover"
                        />
                    </div>

                    {/* Form */}
                    <div 
                        ref={formRef as React.RefObject<HTMLDivElement>}
                        className={`flex-1 w-full animate-slide-right ${formVisible ? 'visible' : ''}`}
                    >
                        <div className="flex flex-col gap-8 md:gap-12 lg:gap-16">
                            {/* Header */}
                            <div 
                                ref={titleRef as React.RefObject<HTMLDivElement>}
                                className={`flex flex-col gap-3 md:gap-4 lg:gap-5 animate-fade-up ${titleVisible ? 'visible' : ''}`}>
                                <div className="inline-flex items-center">
                                    <LogoBadge text={'Твой первый шаг'}/>
                                </div>
                                <h2 className="text-[#040815] text-2xl md:text-4xl lg:text-5xl font-semibold uppercase tracking-[0.24px] leading-[1.3]">
                                    Оставьте заявку —<br className="hidden sm:block" />
                                    и мы с вами свяжемся
                                </h2>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                {/* Name Input */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Введите ваше имя"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full pr-12 border border-[#040815]/10 bg-white text-base placeholder:text-[#040815]/50 focus:outline-none focus:border-[#eb3d3d] transition-colors tap-target"
                                        style={{ padding: '12px', paddingRight: '48px' }}
                                    />
                                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-[#040815]/50" />
                                </div>

                                {/* Phone Input */}
                                <div className="relative">
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base text-[#040815]">+7</span>
                                        <input
                                            type="tel"
                                            placeholder="XXX-XXX-XX-XX"
                                            value={formData.phone}
                                            onChange={handlePhoneChange}
                                            maxLength={13}
                                            required
                                            className={`w-full pl-12 pr-12 border ${phoneError ? 'border-red-500' : 'border-[#040815]/10'} bg-white text-base placeholder:text-[#040815]/50 focus:outline-none focus:border-[#eb3d3d] transition-colors tap-target`}
                                            style={{ padding: '12px', paddingLeft: '48px', paddingRight: '48px' }}
                                        />
                                        <Phone className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-[#040815]/50" />
                                    </div>
                                    {phoneError && (
                                        <p className="text-red-500 text-sm mt-1">{phoneError}</p>
                                    )}
                                </div>

                                {/* Comment Textarea */}
                                <div className="relative">
                  <textarea
                      placeholder="Введите комментарий"
                      value={formData.comment}
                      onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                      maxLength={500}
                      rows={4}
                      className="w-full border border-[#040815]/10 bg-white text-base placeholder:text-[#040815]/50 focus:outline-none focus:border-[#eb3d3d] transition-colors resize-none"
                      style={{ padding: '12px' }}
                  />
                                    <span className="absolute bottom-3 md:bottom-4 right-3 md:right-4 text-xs md:text-sm text-[#040815]/50">
                    {formData.comment.length}/500
                  </span>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="bg-[#eb3d3d] text-white text-sm md:text-base font-semibold uppercase hover:bg-[#d63333] transition-colors self-start tap-target w-full sm:w-auto"
                                    style={{ padding: '12px' }}
                                >
                                    Оставить контакт
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}