import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhyUsSection from "@/components/WhyUsSection";
import GallerySection from "@/components/GallerySection";
import TrainersSection from "@/components/TrainersSection";
import DiscountSection from "@/components/DiscountSection";
import ContactFormSection from "@/components/ContactFormSection";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";
import BrandPattern from "@/components/BrandPattern";

export default function Home() {
  return (
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <HeroSection />
          <WhyUsSection />
          <GallerySection />
          <TrainersSection />
          <BrandPattern />
          <DiscountSection />
          <BrandPattern />
          <ContactFormSection />
          <MapSection />
        </main>
        <Footer />
      </div>
  );
}