import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Ecosystem from "@/components/Ecosystem";
import CloudPortal from "@/components/CloudPortal";
import CaseStudies from "@/components/CaseStudies";
import TrustMarquee from "@/components/TrustMarquee";
import MaestroPitch from "@/components/MaestroPitch";
import ClientJourney from "@/components/ClientJourney";
import ConsultationForm from "@/components/ConsultationForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050505] selection:bg-cyan-500/30">
      <Navbar />
      <Hero />
      <Ecosystem />
      <CloudPortal />
      <CaseStudies />

      {/* Phase 11-12: Visual Seduction & Client Acquisition */}
      <TrustMarquee />
      <MaestroPitch />
      <ClientJourney />
      <ConsultationForm />
      
      <Footer />
    </main>
  );
}

