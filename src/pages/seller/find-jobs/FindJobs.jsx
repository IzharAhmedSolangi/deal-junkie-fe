/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Layout from "../../../components/shared/Layout";
import useFindJobs from "../../../services/seller/useFindJobs";
import Filters from "./components/Filters";
import { ButtonLoader1 } from "../../../components/shared/ButtonLoaders";
import FindJobsCard from "./components/FindJobsCard";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

function FindJobs() {
  const query = useQuery();
  const q = query.get("query") || "";
  const { FindJobs, findJobs, setFindJobs } = useFindJobs();
  const [filters, setFilters] = useState({
    search: q || "",
    expertise: [],
    hourly_rate: { min: null, max: null },
    project_budget: { min: null, max: null },
    experience: "",
    availability: "",
  });

  useEffect(() => {
    FindJobs({
      search: filters.search,
      expertise: filters.expertise,
      hourly_rate: filters.hourly_rate,
      project_budget: filters.project_budget,
      experience: [filters.experience],
      availability: [filters.availability],
    });
  }, []);

  const handleFilters = () => {
    setFindJobs((prevState) => ({
      ...prevState,
      buttonLoading: true,
    }));
    FindJobs({
      search: filters.search,
      expertise: filters.expertise,
      hourly_rate: filters.hourly_rate,
      project_budget: filters.project_budget,
      experience: [filters.experience],
      availability: [filters.availability],
    });
  };

  const handleSearch = () => {
    setFindJobs((prevState) => ({
      ...prevState,
      buttonLoading: true,
    }));
    FindJobs({
      search: filters.search,
      expertise: filters.expertise,
      hourly_rate: filters.hourly_rate,
      project_budget: filters.project_budget,
      experience: [filters.experience],
      availability: [filters.availability],
      project_type: [filters.project_type],
      industry_focus: [filters.industry_focus],
    });
  };

  const handleLoadMore = () => {
    if (findJobs.currentPage < findJobs.totalPages) {
      const nextPage = findJobs.currentPage + 1;
      FindJobs(
        {
          search: filters.search,
          expertise: filters.expertise,
          hourly_rate: filters.hourly_rate,
          project_budget: filters.project_budget,
          experience: [filters.experience],
          availability: [filters.availability],
          project_type: [filters.project_type],
          industry_focus: [filters.industry_focus],
        },
        nextPage,
        true
      );
    }
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
                value={filters.search}
                onChange={(e) =>
                  setFilters((prevState) => ({
                    ...prevState,
                    search: e.target.value,
                  }))
                }
                placeholder="Find jobs in M&A, Real Estate..."
                className="w-full h-[40px] rounded border border-[#02174C33] px-2 hover:border-secondary focus:border-secondary"
              />
              <button
                className="cursor-pointer bg-secondary rounded text-white hover:opacity-80 w-[60px] h-[40px] flex justify-center items-center"
                disabled={findJobs.buttonLoading}
                onClick={handleSearch}
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
          <FindJobsCard findJobs={findJobs} handleLoadMore={handleLoadMore} />
        </div>
      </Layout>
    </>
  );
}

export default FindJobs;
