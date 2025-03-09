import React from "react";
import Layout from "../../../components/shared/Layout";
import SellerInformation from "./components/SellerInformation";
import SellerTimeDetails from "./components/SellerTimeDetails";

function FindExpertDetails() {
  return (
    <Layout>
      <div className="relative w-full h-auto bg-white pt-[70px] pb-40">
        <div className="absolute top-[-100px] left-0 w-full h-[400px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]" />

        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <h1 className="font-bold text-3xl md:text-5xl text-center text-secondary mt-10">
            Find Expert Details
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40">
            {/* Seller Information */}
            <SellerInformation />

            {/* Seller Details */}
            <SellerTimeDetails />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FindExpertDetails;
