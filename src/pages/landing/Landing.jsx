import Navbar from "../../components/shared/Navbar";
import Hero from "./components/Hero";
import Footer from "../../components/shared/Footer";
import KeyFeatures from "./components/KeyFeatures";

function Landing() {
  return (
    <>
      <div className="h-screen bg-[url('/assets/images/banner.png')] bg-cover bg-center">
        <Navbar />
        <Hero />
      </div>
      <KeyFeatures />
      <Footer />
    </>
  );
}

export default Landing;
