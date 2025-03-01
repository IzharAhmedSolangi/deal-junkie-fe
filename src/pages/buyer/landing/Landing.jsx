import Layout from "../../../components/shared/Layout";
import Hero from "./components/Hero";
import KeyFeatures from "./components/KeyFeatures";
import HowItWorks from "./components/HowItWorks";
import CustomerSaid from "./components/CustomerSaid";

function Landing() {
  return (
    <>
      <Layout>
        <Hero />
        <KeyFeatures />
        <HowItWorks />
        <CustomerSaid />
      </Layout>
    </>
  );
}

export default Landing;
