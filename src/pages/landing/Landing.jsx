import Navbar from "../../components/shared/Navbar";
import Hero from "./components/Hero";
import Footer from "../../components/shared/Footer";
import KeyFeatures from "./components/KeyFeatures";
import HowItWorks from "./components/HowItWorks";
import CustomerSaid from "./components/CustomerSaid";

function Landing() {
  return (
    <>
      <div className="h-screen bg-[url('/assets/images/Banner.png')] bg-cover bg-center">
        <Navbar />
        <Hero />
      </div>
      <KeyFeatures />
      <HowItWorks />
      <CustomerSaid />
      <Footer />
    </>
  );
}

export default Landing;
