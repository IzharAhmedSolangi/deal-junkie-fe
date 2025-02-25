import Navbar from "../../components/shared/Navbar";
import Hero from "./components/Hero";
import Footer from "../../components/shared/Footer";

function Landing() {
  return (
    <>
      <div className="h-screen bg-[url('/assets/images/banner.png')] bg-cover bg-center">
        <Navbar />
        <Hero />
      </div>
      <Footer />
    </>
  );
}

export default Landing;
