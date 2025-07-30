import Image from "next/image";

export default function BrandPattern() {
    return (
        <div className="bg-[#eb3d3d] py-4 md:py-6 overflow-hidden">
            <div className="flex items-center gap-8 md:gap-20 animate-scroll">
                {/* Repeat the pattern multiple times for smooth scrolling */}
                {[...Array(10)].map((_, index) => (
                    <div key={index} className="flex items-center gap-8 md:gap-20 flex-shrink-0">
                        <WoomLogo />
                        <WoomLogo inverted />
                        <WoomLogo />
                        <WoomLogo inverted />
                        <WoomLogo />
                    </div>
                ))}
            </div>
        </div>
    );
}

function WoomLogo({ inverted = false }: { inverted?: boolean }) {
    return (
        <div className={`relative h-8 w-[120px] md:h-10 md:w-[157px] ${inverted ? "rotate-180" : ""}`}>
            <Image
                src="/logo/woom_header.svg"
                alt="WOOM"
                fill
                sizes="(max-width: 768px) 120px, 157px"
                className="object-contain"
            />
        </div>
    );
}