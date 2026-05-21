import Navbar from "@/components/site/Navbar";
import ScrollProgress from "@/components/site/ScrollProgress";
import Hero from "@/components/site/Hero";
import About from "@/components/site/About";
import Specializations from "@/components/site/Specializations";
import Process from "@/components/site/Process";
import Approach from "@/components/site/Approach";
import Testimonials from "@/components/site/Testimonials";
import FAQ from "@/components/site/FAQ";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import FloatingWhatsApp from "@/components/site/FloatingWhatsApp";
import { useReveal } from "@/hooks/use-reveal";

const Index = () => {
  useReveal();
  return (
    <main className="bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Specializations />
      <Process />
      <Approach />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;
