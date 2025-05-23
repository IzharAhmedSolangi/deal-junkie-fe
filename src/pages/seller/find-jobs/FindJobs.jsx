/* eslint-disable no-unused-vars */
import { useCallback, useRef, useState } from "react";
import useFindJobs from "../../../services/seller/useFindJobs";
import Filters from "./components/Filters";
import { ButtonLoader1 } from "../../../components/shared/ButtonLoaders";
import FindJobsCard from "./components/FindJobsCard";
import { useSearchParams } from "react-router-dom";
import AppHead from "../../../seo/AppHead";

function FindJobs() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key, defaultValue) => {
    const value = searchParams.get(key);
    if (value === null) return defaultValue;

    if (typeof defaultValue === "object") {
      try {
        return JSON.parse(value);
      } catch (e) {
        return defaultValue;
      }
    }
    return value;
  };

  const [filters, setFilters] = useState({
    search: getParam("search", ""),
    expertise: getParam("expertise", []),
    hourly_rate: getParam("hourly_rate", { min: null, max: null }),
    project_budget: getParam("project_budget", { min: null, max: null }),
    experience: getParam("experience", ""),
    availability: getParam("availability", ""),
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFindJobs(appliedFilters);

  const observer = useRef();
  const lastItemRef = useCallback(
    (node) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const resetFilters = () => {
    const defaultFilters = {
      search: "",
      expertise: [],
      hourly_rate: { min: null, max: null },
      project_budget: { min: null, max: null },
      experience: "",
      availability: "",
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setSearchParams();
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
    const params = {
      search: filters.search,
      expertise: JSON.stringify(filters.expertise),
      hourly_rate: JSON.stringify(filters.hourly_rate),
      project_budget: JSON.stringify(filters.project_budget),
      experience: filters.experience,
      availability: filters.availability,
    };
    setSearchParams(params);
  };

  return (
    <>
      <AppHead title="Find Jobs - Deal Junkie" />
      <div className="bg-white w-full h-auto md:pb-40 pb-28 relative">
        <div className="w-full md:h-[320px] h-[260px] flex flex-col justify-center items-center px-3">
          <img
            src="/assets/images/Banner2.png"
            alt=""
            className="absolute top-0 left-0 w-full md:h-[320px] h-[260px]"
          />
          <h1 className="font-[700] md:text-[48px] text-[30px] text-secondary z-10 text-center">
            Explore New Jobs
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
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    applyFilters();
                  }
                }}
                placeholder="Find jobs in M&A, Real Estate..."
                className="w-full h-[40px] rounded border border-[#02174C33] px-2 hover:border-secondary focus:border-secondary"
              />
              <button
                className="button-2 cursor-pointer bg-secondary rounded text-white w-[60px] h-[40px] flex justify-center items-center"
                disabled={isLoading}
                onClick={applyFilters}
              >
                {isLoading ? <ButtonLoader1 /> : "Go"}
              </button>
              {/* Filter Button */}
              <Filters
                filters={filters}
                setFilters={setFilters}
                isLoading={isLoading}
                handleFilters={applyFilters}
                resetFilters={resetFilters}
              />
            </div>
          </div>
        </div>
        <FindJobsCard
          data={data}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          lastItemRef={lastItemRef}
        />
      </div>
    </>
  );
}

export default FindJobs;
