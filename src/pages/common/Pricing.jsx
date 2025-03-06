import Layout from "../../components/shared/Layout";

function Pricing() {
  return (
    <>
      <Layout>
        <div className="bg-white w-full h-auto pt-[70px] pb-40 relative">
          <div className="absolute top-[-100px] left-0 w-full h-[400px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
          <h1 className="font-[700] text-[48px] text-center text-secondary mt-4">
            Pricing
          </h1>
          <div className="mt-32 w-full"></div>
        </div>
      </Layout>
    </>
  );
}

export default Pricing;
