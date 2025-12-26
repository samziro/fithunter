import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "./AboutHero";
import OurStory from "./OurStory";
import WhyChooseUs from "./WhyChooseUs";
import TeamSection from "./TeamSection";
// import QualityStandards from "./QualityStandards";
import Title from "@/components/Title";
import Location from "./Location";
import Faqs from "./Faqs";

export default function AboutPage() {
  return (
    <div className="min-h-dvh ">
      <Header />
      <AboutHero />
      <OurStory />
      
      <Location/>
      <WhyChooseUs />
      {/* <QualityStandards /> */}
      <TeamSection />
      <Faqs/>
      <Footer />
    </div>
  );
}
