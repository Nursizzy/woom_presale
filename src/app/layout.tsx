import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin", "cyrillic"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "WOOM Fitness and SPA - Женский фитнес клуб в Алматы",
    description: "Фитнес студия нового формата, где ты будешь тренироваться в 3 раза чаще и эффективней. 1300м² площадь, СПА-зона, групповые тренировки.",
    keywords: "фитнес, женский фитнес, зал, Алматы, WOOM, спа, групповые тренировки",
    icons: {
        icon: [
            { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: '/favicon/apple-touch-icon.png',
        other: [
            {
                rel: 'manifest',
                url: '/favicon/site.webmanifest',
            },
        ],
    },
    openGraph: {
        title: "WOOM Fitness - Женский фитнес зал в Алматы",
        description: "Фитнес студия нового формата, где ты будешь тренироваться в 3 раза чаще и эффективней",
        type: "website",
        locale: "ru_RU",
        siteName: "WOOM Fitness",
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className={`${inter.variable} scroll-smooth`}>
        <body className="font-sans antialiased">
        {children}
        </body>
        </html>
    );
}