"use client";
import React, { useState } from "react";
import Layout from "../../components/shared/Layout";
import { FaStar } from "react-icons/fa";
import useFilters from "../../services/useFilters";
import Filters from "./components/Filters";

function FindExperts() {
  const { AddFilters, loading, errorMessage } = useFilters();
  const [filters, setFilters] = useState({
    expertise: [],
    price_range: { min: "", max: "" },
    experience: "",
    availability: "",
    project_type: [],
    industry_focus: []
  });
  console.log({ filters });

  const handleFilters = async () => {
    await AddFilters({
      expertise: filters.expertise,
      price_range: filters.price_range,
      experience: filters.experience,
      availability: filters.availability,
      project_type: filters.project_type,
      industry_focus: filters.industry_focus
    });
  };

  return (
    <Layout>
      <div className="bg-white w-full h-auto pt-[70px] pb-40 relative">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
        <div className="relative mt-4">
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
              <Filters
                setFilters={setFilters}
                filters={filters}
                handleFilters={handleFilters}
              />
            </div>
          </div>
        </div>
        <FindExpertsCard />
      </div>
    </Layout>
  );
}

export default FindExperts;

function FindExpertsCard() {
  const [selectedCard, setSelectedCard] = useState(null);
  return (
    <>
      <div className="grid grid-cols-4 gap-6 py-4 px-10 mt-16">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className={` rounded-xl shadow-lg p-2 bg-white transition-all ${
              selectedCard === index ? "border-blue-500" : "border-gray-200"
            }`}
            onClick={() => setSelectedCard(index)}
            style={{ boxShadow: "0px 0px 7px #e0e0e0" }}
          >
            <img
              src="/assets/images/image-1.png"
              alt="Profile"
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2 text-[#022247] text-center">
              Eleanor Pena
            </h3>
            <div className="flex justify-center cursor-pointer">
              <p className="font-[500] text-[14px] text-[#003F63] border border-[#003F63] rounded-[30px] py-1 px-2 ">
                Starting from $40
              </p>
            </div>
            <div className="flex justify-center items-center gap-2 my-2 cursor-pointer">
              <p className="flex gap-1">
                <FaStar className="text-[#0AF886]" />
                <FaStar className="text-[#0AF886]" />
                <FaStar className="text-[#0AF886]" />
                <FaStar className="text-[#0AF886]" />
                <FaStar className="text-[#0AF886]" />
              </p>
              <p className="text-sm text-gray-500">345 reviews</p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2 cursor-pointer">
              {["TaxPlanning", "Advisor", "WealthAdvisor"].map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <button className="mt-4 w-full bg-secondary text-white py-2 rounded-lg cursor-pointer">
              Hire Now
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
