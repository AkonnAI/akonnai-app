import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AIProgramsSection from "@/components/AIProgramsSection";
import WhyChoose from "@/components/WhyChoose";
import SkillsForSuccess from "@/components/SkillsForSuccess";
import TopPicks from "@/components/TopPicks";
import HowItWorks from "@/components/HowItWorks";
import Educators from "@/components/Educators";
import StudentSpotlight from "@/components/StudentSpotlight";
import FAQ from "@/components/FAQ";
import LogoTicker from "@/components/LogoTicker";
import StatsRow from "@/components/StatsRow";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <HeroSection />
      <LogoTicker />
      <StatsRow />
      <AIProgramsSection />
      <TopPicks />
      <HowItWorks />
      <WhyChoose />
      <SkillsForSuccess />
      <Educators />
      <StudentSpotlight />
      <FAQ />
      <Footer />
    </main>
  );
}
