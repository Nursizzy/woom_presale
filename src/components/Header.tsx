"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { href: "#about", label: "О зале" },
        { href: "#gallery", label: "Фотографии" },
        { href: "#trainers", label: "Тренера" },
        { href: "#discount", label: "Акции" },
        { href: "#contact", label: "Контакты" },
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
                isScrolled ? "bg-black/90 backdrop-blur-md" : "bg-transparent"
            }`}>
                <div className="container mx-auto">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="relative h-4 md:h-5 w-[120px] md:w-[156px]">
                            <Image
                                src="/logo/woom_header.svg"
                                alt="WOOM Fitness"
                                fill
                                className="object-contain"
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => handleNavClick(e, item.href)}
                                    className="text-white text-sm font-medium hover:opacity-80 transition-opacity"
                                >
                                    {item.label}
                                </a>
                            ))}
                        </nav>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden text-white p-2 tap-target"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b">
                        <Link href="/" className="relative h-5 w-[156px]">
                            <Image
                                src="/logo/woom_header.svg"
                                alt="WOOM Fitness"
                                fill
                                className="object-contain"
                            />
                        </Link>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="p-2 tap-target"
                            aria-label="Close menu"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    
                    <nav className="flex-1 flex flex-col gap-4 p-6">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="text-text-dark text-lg font-medium py-2 border-b border-gray-100 hover:text-primary transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>
                    
                    <div className="p-6">
                        <button className="btn btn-primary w-full">
                            Купить абонемент
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}