import Hero from "./components/Hero";
import KeyFeatures from "./components/KeyFeatures";
import HowItWorks from "./components/HowItWorks";
import CustomerSaid from "./components/CustomerSaid";
import AppHead from "../../../seo/AppHead";

function Landing() {
  return (
    <>
      <AppHead title="Deal Junkie" />
      <Hero />
      <KeyFeatures />
      <HowItWorks />
      <CustomerSaid />
    </>
  );
}

export default Landing;
