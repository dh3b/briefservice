import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

const Index = () => {
  const [chatServiceId, setChatServiceId] = useState<string | null>(null);

  const handleChatAbout = (serviceId: string) => {
    setChatServiceId(serviceId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection onChatAbout={handleChatAbout} />
      <ContactSection />
      <Footer />
      <ChatWidget serviceId={chatServiceId} />
    </div>
  );
};

export default Index;
