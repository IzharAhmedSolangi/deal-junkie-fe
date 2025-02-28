import React, { useState } from "react";
import Layout from "../../components/shared/Layout";

import Filters from "./components/Filters";

function FindExperts() {
  return (
    <Layout>
      <div className="bg-white w-full h-auto pt-[70px] pb-40 relative">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
        <div className="relative z-50 mt-4">
          <h1 className="font-[700] text-[48px] text-center">
            Find Experts For Your Needs
          </h1>
          <div className="w-full p-2 flex justify-center">
            <div className="w-[50%] flex justify-between items-center bg-white shadow-lg p-2 rounded relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-[80%] border rounded p-2"
              />
              <button className="bg-secondary rounded text-white w-[50px] p-2">
                Go
              </button>
              {/* Filter Button */}
              <Filters />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FindExperts;
