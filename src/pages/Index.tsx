import { useState, useCallback } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ContactSection from "@/components/ContactSection";
import ChatWidget from "@/components/ChatWidget";
import Footer from "@/components/Footer";

const Index = () => {
  const [chatServiceId, setChatServiceId] = useState<string | null>(null);
  const [chatServiceName, setChatServiceName] = useState<string | null>(null);

  const handleChatAbout = useCallback((serviceId: string, serviceName: string) => {
    setChatServiceId(serviceId);
    setChatServiceName(serviceName);
  }, []);

  const handleChatOpened = useCallback(() => {
    // Reset after the widget has consumed the trigger
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <ServicesSection onChatAbout={handleChatAbout} />
      <ContactSection />
      <Footer />
      <ChatWidget serviceId={chatServiceId} serviceName={chatServiceName} onOpenTriggered={handleChatOpened} />
    </div>
  );
};

export default Index;
