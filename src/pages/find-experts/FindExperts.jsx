/* eslint-disable react/prop-types */
import { useState } from "react";
import Layout from "../../components/shared/Layout";
import { FaStar } from "react-icons/fa";
import useFindExperts from "../../services/useFindExperts";
import Filters from "./components/Filters";
import ShowMessage from "../../components/shared/ShowMessage";
import {
  ButtonLoader1,
  ButtonLoader3,
} from "../../components/shared/ButtonLoaders";

function FindExperts() {
  const { FindExperts, findExperts, setFindExperts } = useFindExperts();
  const [filters, setFilters] = useState({
    expertise: [],
    price_range: { min: "", max: "" },
    experience: "",
    availability: "",
    project_type: [],
    industry_focus: [],
  });
  console.log({ filters });

  const handleFilters = async () => {
    setFindExperts((prevState) => ({
      ...prevState,
      buttonLoading: true,
    }));
    await FindExperts({
      expertise: filters.expertise,
      price_range: filters.price_range,
      experience: filters.experience,
      availability: filters.availability,
      project_type: filters.project_type,
      industry_focus: filters.industry_focus,
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
          <div className="w-full flex justify-center">
            <div className="md:w-[50%] w-full flex gap-2 justify-between items-center bg-white shadow-lg p-2 rounded relative">
              <input
                type="search"
                placeholder="Search..."
                className="w-full h-[40px] rounded border border-[#02174C33] px-2 hover:border-secondary focus:border-secondary"
              />
              <button
                className="cursor-pointer bg-secondary rounded text-white hover:opacity-80 w-[60px] h-[40px] flex justify-center items-center"
                disabled={findExperts.buttonLoading}
              >
                {findExperts.buttonLoading ? <ButtonLoader1 /> : "Go"}
              </button>
              {/* Filter Button */}
              <Filters
                filters={filters}
                setFilters={setFilters}
                findExperts={findExperts}
                handleFilters={handleFilters}
              />
            </div>
          </div>
        </div>
        <FindExpertsCard findExperts={findExperts} />
      </div>
    </Layout>
  );
}

export default FindExperts;

function FindExpertsCard(props) {
  const { findExperts } = props;

  return (
    <>
      {!findExperts.data && !findExperts.loading && findExperts.showInitial && (
        <div className="flex justify-center mt-24">
          <img src="/assets/images/image-4.png" alt="" />
        </div>
      )}
      {!findExperts.data &&
        !findExperts.loading &&
        !findExperts.showInitial &&
        findExperts.message && (
          <div className="flex justify-center mt-24 mb-10">
            <ShowMessage title={findExperts.message} />
          </div>
        )}
      {findExperts.data && !findExperts.loading && (
        <div className="mt-24">
          <h1 className="text-center text-[24px] text-secondary font-bold">
            We have 24 results for that matches your details
          </h1>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 py-4 px-10">
            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className={` rounded-xl p-4 bg-white border-gray-200`}
                style={{ boxShadow: "0px 0px 7px #49586D21" }}
              >
                <img
                  src="/assets/images/image-1.png"
                  alt="Profile"
                  className="w-full h-[200px] object-cover rounded"
                />
                <h3 className="text-lg font-bold mt-2 text-[#022247] text-center">
                  Eleanor Pena
                </h3>
                <div className="flex justify-center">
                  <p className="bg-[#F2F4F7] font-[500] text-[14px] text-secondary border border-secondary rounded-full py-1 px-2 ">
                    Starting from $40
                  </p>
                </div>
                <div className="flex justify-center items-center gap-2 my-2">
                  <p className="flex gap-1">
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                  </p>
                  <p className="text-sm text-[#98A2B3]">345 reviews</p>
                </div>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {["TaxPlanning", "Advisor", "WealthAdvisor"].map((tag, i) => (
                    <span
                      key={i}
                      className="bg-[#F2F4F7] text-secondary text-xs px-2 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="mt-4 w-full bg-secondary text-white hover:opacity-80 py-2 rounded-lg cursor-pointer">
                  Hire Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      {findExperts.loading && (
        <div className="flex justify-center mt-3">
          <ButtonLoader3 />
        </div>
      )}
    </>
  );
}
