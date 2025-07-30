"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile on mount and resize
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            // Get all sections
            const heroSection = document.getElementById('hero');
            const gallerySection = document.getElementById('gallery');

            if (!heroSection || !gallerySection) return;

            const scrollY = window.scrollY + 100; // Add offset for header height

            // Check if we're in hero or gallery section
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const galleryTop = gallerySection.offsetTop;
            const galleryBottom = gallerySection.offsetTop + gallerySection.offsetHeight;

            // Set dark mode if we're NOT in hero or gallery sections
            const inHeroSection = scrollY < heroBottom;
            const inGallerySection = scrollY >= galleryTop && scrollY < galleryBottom;

            setIsDarkMode(!inHeroSection && !inGallerySection);
        };

        handleScroll(); // Check initial state
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isMenuOpen]);

    const navItems = [
        { href: "#about", label: "О зале" },
        { href: "#gallery", label: "Фотографии" },
        { href: "#zones", label: "Зоны" },
        { href: "#location", label: "Локация" },
        { href: "#discount", label: "Предпродажи" },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsMenuOpen(false);

        const element = document.querySelector(href);
        if (element) {
            const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
    };

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                isDarkMode ? "bg-white/90 backdrop-blur-md" : "bg-transparent backdrop-blur-xs"
            }`}>
                <div className="container max-w-[1440px] mx-auto px-5 lg:px-[100px]" style={{
                    paddingTop: isMobile ? '20px' : '0px'
                }}>
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link href="/" className="relative h-5 w-[156px]">
                            <Image
                                src={isDarkMode ? "/logo/woom.svg" : "/logo/woom_header.svg"}
                                alt="WOOM Fitness"
                                fill
                                className="object-contain"
                                style={{ filter: isDarkMode ? 'none' : 'brightness(0) invert(1)' }}
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className={`${isDarkMode ? 'text-black' : 'text-white'} text-sm font-medium hover:opacity-80 transition-opacity px-1`}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        {/* Desktop CTA Button */}
                        <button
                            onClick={() => {
                                const element = document.querySelector('#contact');
                                if (element) {
                                    const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
                                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                                }
                            }}
                            className="hidden lg:block transition-all duration-300"
                            style={{
                                padding: '12px 24px',
                                fontSize: '14px',
                                fontWeight: '500',
                                borderRadius: '4px',
                                border: isDarkMode ? 'none' : '1px solid rgba(255, 255, 255, 0.3)',
                                backgroundColor: isDarkMode ? '#EB3D3D' : 'rgba(255, 255, 255, 0.1)',
                                backdropFilter: isDarkMode ? 'none' : 'blur(10px)',
                                color: isDarkMode ? 'white' : 'white',
                                cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                                if (isDarkMode) {
                                    e.currentTarget.style.backgroundColor = '#d63333';
                                } else {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (isDarkMode) {
                                    e.currentTarget.style.backgroundColor = '#EB3D3D';
                                } else {
                                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                                }
                            }}
                        >
                            Получить консультацию
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className={`lg:hidden p-2 tap-target ${isDarkMode ? 'text-black' : 'text-white'}`}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${
                    isMenuOpen ? 'visible' : 'invisible'
                }`}
            >
                {/* Background overlay */}
                <div
                    className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${
                        isMenuOpen ? 'opacity-100' : 'opacity-0'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Menu panel - slides from right */}
                <div
                    className={`absolute right-0 top-0 h-full w-[250px] transition-transform duration-300 ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.75)',
                        backdropFilter: 'blur(12.5px)',
                        WebkitBackdropFilter: 'blur(12.5px)',
                    }}
                >
                    <div className="flex flex-col gap-4 pt-[50px] pb-4 h-full" style={{
                        padding:'50px 24px'
                    }}>
                        {/* Menu Header */}
                        <div className="flex items-center justify-between h-16 px-6">
                            <h2 className="text-white text-xl font-semibold">Меню</h2>
                            <button
                                onClick={() => setIsMenuOpen(false)}
                                className="w-10 h-10 flex items-center justify-center text-white"
                                aria-label="Close menu"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Navigation Links */}
                        <nav className="flex flex-col gap-6 px-6">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className="text-white text-base font-medium py-1 px-1 hover:opacity-80 transition-opacity"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}