import { useState } from "react";
import Layout from "../../../components/shared/Layout";
import useFindJobs from "../../../services/seller/useFindJobs";
import Filters from "./components/Filters";
import { ButtonLoader1 } from "../../../components/shared/ButtonLoaders";
import FindJobsCard from "./components/FindJobsCard";

function FindJobs() {
  const { FindJobs, findJobs, setFindJobs } = useFindJobs();
  const [filters, setFilters] = useState({
    expertise: [],
    price_range: { min: "", max: "" },
    experience: "",
    availability: "",
    rating: "",
  });

  const handleFilters = async () => {
    setFindJobs((prevState) => ({
      ...prevState,
      buttonLoading: true,
    }));
    await FindJobs({
      expertise: filters.expertise,
      price_range: filters.price_range,
      experience: [filters.experience],
      availability: [filters.availability],
      rating: [filters.rating],
    });
  };
  return (
    <>
      <Layout>
        <div className="bg-white w-full h-auto pt-[70px] pb-40 relative">
          <div className="absolute top-[-100px] left-0 w-full h-[400px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
          <h1 className="font-[700] text-[48px] text-center text-secondary">
            Explore New Jobs
          </h1>
          <div className="w-full flex justify-center">
            <div className="md:w-[50%] w-full flex gap-2 justify-between items-center bg-white shadow-lg p-2 rounded relative">
              <input
                type="search"
                placeholder="Find jobs in M&A, Real Estate..."
                className="w-full h-[40px] rounded border border-[#02174C33] px-2 hover:border-secondary focus:border-secondary"
              />
              <button
                className="cursor-pointer bg-secondary rounded text-white hover:opacity-80 w-[60px] h-[40px] flex justify-center items-center"
                disabled={findJobs.buttonLoading}
              >
                {findJobs.buttonLoading ? <ButtonLoader1 /> : "Go"}
              </button>
              {/* Filter Button */}
              <Filters
                filters={filters}
                setFilters={setFilters}
                findJobs={findJobs}
                handleFilters={handleFilters}
              />
            </div>
          </div>
          <FindJobsCard findJobs={findJobs} />
        </div>
      </Layout>
    </>
  );
}

export default FindJobs;
