"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ClientModal from "@/components/ClientModal";
import Title from "@/components/Title";
import PackageCard from "@/components/PackageCard";

export default function ProgramPage() {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const router = useRouter();

  const handleBuyClick = () => {
    try {
      if (
        typeof window !== "undefined" &&
        localStorage.getItem("clientAuth") === "true"
      ) {
        router.push("/order");
        return;
      }
    } catch {}
    setIsClientModalOpen(true);
  };

  
  
  return (
    <div className="min-h-dvh bg-[#292929]">
      <Header />

      {/* Hero Section */}
      <section
        className="relative h-[90dvh] flex items-center justify-center text-white bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/trainer.jpg')`,
        }}
      >
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-poppins">
            Pick Your Fitness Plan
          </h1>
          <p className="text-xl md:text-2xl font-inter leading-relaxed">
            Simple, effective programs from your personal trainer in Watamu—building strength and confidence, one step at a time.
          </p>
        </div>
      </section>

      {/* Premium Packages */}
      <section className="py-20 bg-[#292929]">
        <div className="max-w-6xl mx-auto px-6">
          <Title heading="Premium Packages" />
          <p className="text-lg text-slate-100 text-center mb-12 font-inter leading-relaxed">
            Tailored for serious results, with nutrition and tracking included. Save more with bigger packages.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PackageCard
              title="Jade Package"
              price="KSh 20,625"
              features={["5 sessions", "Save 8.3%", "Meal plan", "Personal workouts", "Progress tracking"]}
              variant="dark"
              ctaLabel="Get Started"
              onClick={handleBuyClick}
            />
            <PackageCard
              title="Gold Package"
              price="KSh 55,500"
              features={["30 sessions", "Save 17.8%", "Meal plan", "Personal workouts", "Progress tracking"]}
              badge="Best Value"
              variant="highlight"
              ctaLabel="Get Started"
              onClick={handleBuyClick}
            />
            <PackageCard
              title="Platinum Package"
              price="KSh 39,170"
              features={["10 sessions", "Save 13%", "Meal plan", "Personal workouts", "Progress tracking"]}
              variant="dark"
              ctaLabel="Get Started"
              onClick={handleBuyClick}
            />
          </div>
          <div className="text-center mt-12">
            <p className="text-lg text-slate-100 mb-6 font-inter leading-relaxed">
              All premium packages include personalized nutrition guidance and home workouts—backed by 5+ years of certified training experience.
            </p>
            <a href="mailto:1fithunter@gmail.com">
              <button
              
              className="bg-yellow-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-yellow-700 transition-colors font-poppins"
            >
              Book Free Consultation
            </button>
            </a>
          </div>
        </div>
      </section>

      <ClientModal
        open={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
      />

      {/* Basic Packages */}
      <section className="py-20 bg-[#4a4a4a]">
        <div className="max-w-7xl mx-auto px-6">
          <Title heading="standard Packages" />
          <p className="text-lg text-slate-100 text-center mb-12 font-inter leading-relaxed">
            Flexible options for one-on-one sessions. Start small or commit for savings. <br></br> They are only available for in-person training in Watamu.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <PackageCard
              title="Single Session"
              price="KSh 2,000 / mon"
              features={["1 session", "Personalized workout", "Expert tips"]}
              variant="muted"
              ctaLabel="Book Now"
              onClick={handleBuyClick}
            />
            <PackageCard
              title="6 Sessions"
              price="KSh 11,400"
              features={["6 sessions", "Save 5%", "Email support"]}
              variant="muted"
              ctaLabel="Get Started"
              onClick={handleBuyClick}
            />
            <PackageCard
              title="10 Sessions"
              price="KSh 18,000"
              features={["10 sessions", "Save 10%", "Priority support"]}
              badge="Popular"
              variant="highlight"
              ctaLabel="Get Started"
              onClick={handleBuyClick}
            />
            <PackageCard
              title="16 Sessions"
              price="KSh 21,600"
              features={["16 sessions", "Save 15%", "Monthly check-ins"]}
              variant="muted"
              ctaLabel="Get Started"
              onClick={handleBuyClick}
            />
          </div>
        </div>
      </section>

      {/* Online Services */}
      <section className="py-20 bg-[#292929]">
        <div className="max-w-6xl mx-auto px-6">
          <Title heading="Online Services" />
          <p className="text-lg text-slate-100 text-center mb-12 font-inter leading-relaxed">
            Train from anywhere with virtual options—perfect for busy schedules.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PackageCard
              title="Self-Paced"
              price="KSh 2,000 / mon"
              features={["Video workouts", "Email support", "Flexible access"]}
              variant="dark"
              ctaLabel="Get Started"
              onClick={handleBuyClick}
            />
            <PackageCard
              title="Meal Plan"
              price="KSh 11,500 / mon"
              features={["Custom nutrition", "Weekly tips", "Progress tracking"]}
              badge="Essential"
              variant="highlight"
              ctaLabel="Get Started"
              onClick={handleBuyClick}
            />
            <PackageCard
              title="Online Coaching"
              price="KSh 21,600 / mon"
              features={["Live sessions", "Personal plans", "Ongoing support"]}
              variant="dark"
              ctaLabel="Get Started"
              onClick={handleBuyClick}
            />
          </div>
        </div>
      </section>

      {/* Training Promise */}
      <section className="py-20 bg-[#4a4a4a]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-poppins">
              Our Promise
            </h2>
            <p className="text-lg md:text-xl text-slate-100 font-inter leading-relaxed">
              Effective, personalized fitness from a certified trainer in Watamu.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-heart-pulse-line text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white font-poppins">
                Tailored Plans
              </h3>
              <p className="text-slate-100 text-base font-inter leading-relaxed">
                Customized to your goals and lifestyle.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-shield-check-line text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white font-poppins">
                Professional Guidance
              </h3>
              <p className="text-slate-100 text-base font-inter leading-relaxed">
                Safe methods with proven results.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-group-line text-yellow-600 text-2xl"></i>
              </div>
              <h3 className="font-semibold text-lg mb-2 text-white font-poppins">
                Real Results
              </h3>
              <p className="text-slate-100 text-base font-inter leading-relaxed">
                Join 100+ transformed clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#292929] text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">
            Ready to Get Fit?
          </h2>
          <p className="text-lg md:text-xl mb-8 text-slate-100 font-inter leading-relaxed">
            Start with a free consultation from your trusted Watamu trainer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:1thefithunter@gmail.com"
              className="bg-white text-yellow-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-100 transition-colors font-poppins"
            >
              Book Free Consultation
            </a>
            <a
              href="tel:+254748679264"
              className="border-2 border-white text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-white hover:text-yellow-600 transition-colors font-poppins"
            >
              Call +254 748 679 264
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}