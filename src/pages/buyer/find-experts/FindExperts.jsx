import { useCallback, useRef, useState } from "react";
import Filters from "./components/Filters";
import { ButtonLoader1 } from "../../../components/shared/ButtonLoaders";
import FindExpertsCard from "./components/FindExpertsCard";
import useFindExpertsInfinite from "../../../services/buyer/useFindExperts";
import { useSearchParams } from "react-router-dom";

function FindExperts() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParam = (key, defaultValue) => {
    const value = searchParams.get(key);
    return value ? JSON.parse(value) : defaultValue;
  };

  const [filters, setFilters] = useState({
    search: getParam("search", ""),
    expertise: getParam("expertise", []),
    hourly_rate: getParam("hourly_rate", { min: null, max: null }),
    experience: getParam("experience", ""),
    availability: getParam("availability", ""),
    project_type: getParam("project_type", ""),
    industry_focus: getParam("industry_focus", ""),
  });

  const [appliedFilters, setAppliedFilters] = useState(filters);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFindExpertsInfinite(appliedFilters);

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
      experience: "",
      availability: "",
      project_type: "",
      industry_focus: "",
    };
    setFilters(defaultFilters);
    setAppliedFilters(defaultFilters);
    setSearchParams();
  };

  const applyFilters = () => {
    setAppliedFilters({ ...filters });
    const params = {
      search: JSON.stringify(filters.search),
      expertise: JSON.stringify(filters.expertise),
      hourly_rate: JSON.stringify(filters.hourly_rate),
      experience: JSON.stringify(filters.experience),
      availability: JSON.stringify(filters.availability),
      project_type: JSON.stringify(filters.project_type),
      industry_focus: JSON.stringify(filters.industry_focus),
    };
    setSearchParams(params);
  };

  return (
    <>
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
        <FindExpertsCard
          data={data}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          lastItemRef={lastItemRef}
        />
      </div>
    </>
  );
}

export default FindExperts;
