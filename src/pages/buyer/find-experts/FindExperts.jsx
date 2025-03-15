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
      loading: true,
      buttonLoading: true,
      data: null,
      message: null,
      totalPages: 1,
      currentPage: 1,
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
      loading: true,
      buttonLoading: true,
      data: null,
      message: null,
      totalPages: 1,
      currentPage: 1,
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
      setFindExperts((prevState) => ({
        ...prevState,
        loading: true,
      }));
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
        <div className="bg-white w-full h-auto pt-[70px] md:pb-40 pb-28 relative">
          <div className="absolute md:top-[-100px] top-[-70px] left-0 w-full md:h-[400px] h-[350px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
          <h1 className="font-[700] md:text-[48px] text-[30px] text-center text-secondary">
            Find Experts For Your Needs
          </h1>
          <div className="w-full flex justify-center">
            <div className="md:w-[50%] w-[95%] flex gap-2 justify-between items-center bg-white shadow-lg p-2 rounded relative">
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
