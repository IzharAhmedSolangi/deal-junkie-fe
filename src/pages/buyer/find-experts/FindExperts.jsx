/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Layout from "../../../components/shared/Layout";
import useFindExperts from "../../../services/buyer/useFindExperts";
import Filters from "./components/Filters";
import { ButtonLoader1 } from "../../../components/shared/ButtonLoaders";
import FindExpertsCard from "./components/FindExpertsCard";

function FindExperts() {
  const { FindExperts, findExperts, setFindExperts } = useFindExperts();
  const [filters, setFilters] = useState({
    search: "",
    expertise: [],
    hourly_rate: { min: null, max: null },
    experience: "",
    availability: "",
    project_type: "",
    industry_focus: "",
  });

  useEffect(() => {
    FindExperts({
      search: filters.search,
      expertise: filters.expertise,
      hourly_rate: filters.hourly_rate,
      experience: [filters.experience],
      availability: [filters.availability],
      project_type: [filters.project_type],
      industry_focus: [filters.industry_focus],
    });
  }, []);

  const handleFilters = () => {
    setFindExperts((prevState) => ({
      ...prevState,
      buttonLoading: true,
    }));
    FindExperts({
      search: filters.search,
      expertise: filters.expertise,
      hourly_rate: filters.hourly_rate,
      experience: [filters.experience],
      availability: [filters.availability],
      project_type: [filters.project_type],
      industry_focus: [filters.industry_focus],
    });
  };

  const handleSearch = () => {
    setFindExperts((prevState) => ({
      ...prevState,
      buttonLoading: true,
    }));
    FindExperts({
      search: filters.search,
      expertise: filters.expertise,
      hourly_rate: filters.hourly_rate,
      experience: [filters.experience],
      availability: [filters.availability],
      project_type: [filters.project_type],
      industry_focus: [filters.industry_focus],
    });
  };

  const handleLoadMore = () => {
    if (findExperts.currentPage < findExperts.totalPages) {
      const nextPage = findExperts.currentPage + 1;
      FindExperts(
        {
          search: filters.search,
          expertise: filters.expertise,
          hourly_rate: filters.hourly_rate,
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
            Find Experts For Your Needs
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
                placeholder="Search..."
                className="w-full h-[40px] rounded border border-[#02174C33] px-2 hover:border-secondary focus:border-secondary"
              />
              <button
                className="cursor-pointer bg-secondary rounded text-white hover:opacity-80 w-[60px] h-[40px] flex justify-center items-center"
                disabled={findExperts.buttonLoading}
                onClick={handleSearch}
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
          <FindExpertsCard
            findExperts={findExperts}
            handleLoadMore={handleLoadMore}
          />
        </div>
      </Layout>
    </>
  );
}

export default FindExperts;
