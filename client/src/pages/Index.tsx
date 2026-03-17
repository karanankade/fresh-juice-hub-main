import Navbar from "@/components/Navbar";
import StatusBar from "@/components/StatusBar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ReviewsSection from "@/components/ReviewsSection";
import BlogSection from "@/components/BlogSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <StatusBar />
    <HeroSection />
    <AboutSection />
    <ReviewsSection />
    <BlogSection />
    <GallerySection />
    <ContactSection />
    <Footer />
    <WhatsAppButton />
  </div>
);

export default Index;
