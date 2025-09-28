// src/pages/pages/LandingPage.jsx
import React from "react";
import HeroSection from "../../components/landing/HeroSection";
import HowItWorks from "../../components/landing/HowItWorks";
import FeaturedCauses from "../../components/landing/FeaturedCauses";
import ImpactStats from "../../components/landing/ImpactState";
import Testimonials from "../../components/landing/Testimonials";
import Footer from "../../components/landing/Footer";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <HeroSection />
      <HowItWorks />
      <FeaturedCauses />
      <ImpactStats />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LandingPage;
