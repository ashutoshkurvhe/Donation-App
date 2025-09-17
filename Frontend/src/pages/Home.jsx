import FeaturedCauses from "../components/Home/FeaturedCauses";
import Footer from "../components/common/Footer";
import HeroSection from "../components/Home/HeroSection";
import HowItWorks from "../components/Home/HowItWorks";
import ImpactStats from "../components/Home/ImpactState";
import Testimonials from "../components/Home/Testimonials";
import Navbar from "../../src/components/common/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navbar/>
      <HeroSection />
      <FeaturedCauses />
      <HowItWorks />
      <ImpactStats />
      <Testimonials />
      <Footer />
    </div>
  );
}

export default Home
