import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AIProgramsSection from "@/components/AIProgramsSection";
import WhyChoose from "@/components/WhyChoose";
import SkillsForSuccess from "@/components/SkillsForSuccess";
import TopPicks from "@/components/TopPicks";
import HowItWorks from "@/components/HowItWorks";
import HowAKMINDWorks from "@/components/HowAKMINDWorks";
import GamificationShowcase from "@/components/GamificationShowcase";
import AIBotCinematic from "@/components/AIBotCinematic";
import Educators from "@/components/Educators";
import StudentSpotlight from "@/components/StudentSpotlight";
import FAQ from "@/components/FAQ";
import LogoTicker from "@/components/LogoTicker";
import StatsRow from "@/components/StatsRow";
import ScrollReveal from "@/components/ScrollReveal";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-white">

      {/* Dark hero → dark stats (seamless) */}
      <HeroSection />
      <StatsRow />
      <ScrollReveal><LogoTicker /></ScrollReveal>

      {/* Dark programs section */}
      <AIProgramsSection />

      {/* Wave: dark slate-950 → light slate-50 */}
      <div className="bg-slate-950">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 0L1440 0L1440 20C1200 60 960 60 720 40 480 20 240 20 0 60Z" fill="#f8fafc" />
        </svg>
      </div>

      {/* Light how-it-works */}
      <HowItWorks />

      {/* TopPicks — still light, before dark wave */}
      <ScrollReveal delay={0.1}><TopPicks /></ScrollReveal>

      {/* Wave: light → dark slate-900 */}
      <div className="bg-slate-50">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 60L1440 60L1440 40C1200 0 960 0 720 20 480 40 240 40 0 0Z" fill="#020617" />
        </svg>
      </div>

      {/* How AKMIND Works — cinematic 5-step method */}
      <HowAKMINDWorks />

      {/* Wave: dark slate-950 → white */}
      <div className="bg-slate-950">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 60L1440 60L1440 40C1200 0 960 0 720 20 480 40 240 40 0 0Z" fill="white" />
        </svg>
      </div>

      {/* Gamification showcase */}
      <GamificationShowcase />

      {/* Wave: white → dark slate-950 */}
      <div className="bg-white">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 60L1440 60L1440 40C1200 0 960 0 720 20 480 40 240 40 0 0Z" fill="#020617" />
        </svg>
      </div>

      {/* AI bot cinematic section */}
      <AIBotCinematic />

      {/* Subtle divider between dark sections */}
      <div className="bg-slate-950 h-px">
        <div className="h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      </div>

      {/* Dark why-choose */}
      <WhyChoose />

      {/* Wave: dark slate-900 → light white */}
      <div className="bg-slate-900">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0 60L1440 60L1440 40C1200 0 960 0 720 20 480 40 240 40 0 0Z" fill="white" />
        </svg>
      </div>

      <ScrollReveal><SkillsForSuccess /></ScrollReveal>
      <ScrollReveal delay={0.1}><Educators /></ScrollReveal>
      <ScrollReveal><StudentSpotlight /></ScrollReveal>
      <ScrollReveal><FAQ /></ScrollReveal>
      <Footer />
    </main>
  );
}
