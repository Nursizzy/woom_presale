"use client";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function MapSection() {
    const { ref: mapRef, isVisible: mapVisible } = useScrollAnimation({ threshold: 0.2 });
    
    return (
        <section 
            id="map" 
            ref={mapRef as React.RefObject<HTMLElement>}
            className={`relative h-[400px] md:h-[500px] lg:h-[600px] xl:h-[720px] bg-[#f9f9fb] animate-fade-in animate-scale ${mapVisible ? 'visible' : ''}`}
        >
            <div className="h-full w-full">
                {/* Replace with actual map implementation */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d726.0393453022925!2d76.9322763!3d43.238543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDPCsDE0JzE4LjgiTiA3NsKwNTUnNTguNSJF!5e0!3m2!1sen!2s!4v1734567890123"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale opacity-90"
                    title="Location map"
                />

                {/* Optional: Add custom markers or overlays here */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Add custom map styling or markers */}
                </div>
            </div>
        </section>
    );
}