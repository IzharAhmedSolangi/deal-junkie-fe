/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsSliders2Vertical } from "react-icons/bs";
import { ButtonLoader1 } from "../../../components/shared/ButtonLoaders";

const filterCategories = [
  {
    category: "Expertise",
    type: "checkbox",
    options: [
      "ALl",
      "M&A & Buy-Side Advisory",
      "Real Estate Underwriting",
      "Public Markets (Equities, Fixed Income, etc.)",
      "Venture Capital & Startups",
      "Due Diligence Questionnaires (DDQs)",
      "Due Diligence",
      "Risk Analysis",
      "Investment Memos & Pitch Decks",
      "Financial Modeling & Valuation",
      "Market & Competitive Analysis",
      "Legal & Compliance Reviews",
    ],
    stateKey: "expertise",
  },
  {
    category: "Price Range",
    type: "price",
    stateKey: "priceRange",
  },
  {
    category: "Experience",
    type: "radio",
    options: ["1-3 Years", "4-7 Years", "8-12 Years", "12+ Years"],
    stateKey: "experience",
  },
  {
    category: "Timeline",
    type: "radio",
    options: [
      "Same Day",
      "1-Day Turnaround",
      "3-Day Turnaround",
      "7-Day Turnaround",
      "Ongoing/Retainer-Based Project",
    ],
    stateKey: "timeline",
  },
  {
    category: "Project Type",
    type: "checkbox",
    options: [
      "One-Time Deliverable (e.g., valuation model, investment memo)",
      "Ongoing Advisory (e.g., diligence over several weeks)",
      "Full Due Diligence Support (comprehensive deal evaluation)",
      "Deal Execution Support (post-acquisition planning, structuring)",
    ],
    stateKey: "projectType",
  },
  {
    category: "Industry Focus",
    type: "checkbox",
    options: [
      "Healthcare & Biotech",
      "Technology",
      "Real Estate",
      "Consumer & Retail",
      "Industrials",
      "Energy & Infrastructure",
      "Financial Services",
    ],
    stateKey: "industryFocus",
  },
];

function Filters(props) {
  const { filters, setFilters, findExperts, handleFilters } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (category, option, type) => {
    setFilters((prev) => {
      if (type === "checkbox") {
        const updated = prev[category]?.includes(option)
          ? prev[category]?.filter((item) => item !== option)
          : [...prev[category], option];
        return { ...prev, [category]: updated };
      } else if (type === "radio") {
        return { ...prev, [category]: option };
      }
      return prev;
    });
  };

  const handlePriceChange = (e) => {
    setFilters({
      ...filters,
      priceRange: { ...filters.priceRange, [e.target.name]: e.target.value },
    });
  };

  const resetFilters = () => {
    setFilters({
      expertise: [],
      priceRange: { min: "", max: "" },
      experience: "",
      timeline: "",
      projectType: [],
      industryFocus: [],
    });
  };

  return (
    <>
      <BsSliders2Vertical
        className="w-[50px] h-[40px] p-2 border border-[#02174C33] rounded text-[20px] cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 z-[9999] w-[250px] md:w-[340px] lg:w-[300px] h-screen p-4 overflow-auto transition-transform bg-white dark:bg-gray-800 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <h1 className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
          Filters
        </h1>

        {/* Close button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="absolute top-2.5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        {/* Filters */}
        <div className="py-4">
          <div className="bg-white rounded w-full">
            {filterCategories?.map((filter, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-sm font-semibold">{filter.category}</h3>

                {filter.type === "checkbox" &&
                  filter?.options?.map((option, idx) => (
                    <div
                      key={idx}
                      className="flex items-center mt-1 text-[14px] text-gray-400"
                    >
                      <input
                        type="checkbox"
                        id={option}
                        checked={filters[filter?.stateKey]?.includes(option)}
                        onChange={() =>
                          handleFilterChange(
                            filter.stateKey,
                            option,
                            "checkbox"
                          )
                        }
                        className="mr-2 "
                      />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  ))}

                {filter.type === "radio" &&
                  filter?.options?.map((option, idx) => (
                    <div
                      key={idx}
                      className="flex items-center mt-1 text-[14px] text-gray-400"
                    >
                      <input
                        type="radio"
                        id={option}
                        name={filter.stateKey}
                        checked={filters[filter.stateKey] === option}
                        onChange={() =>
                          handleFilterChange(filter.stateKey, option, "radio")
                        }
                        className="mr-2"
                      />
                      <label htmlFor={option}>{option}</label>
                    </div>
                  ))}

                {filter.type === "price" && (
                  <>
                    <h1 className="text-[12px] font-[600]  text-gray-400">
                      Hourly Rate
                    </h1>
                    <div className="flex flex-wrap gap-2  mt-1">
                      <input
                        type="number"
                        name="min"
                        placeholder="Min $"
                        value={filters?.priceRange?.min}
                        onChange={handlePriceChange}
                        className="w-[48%] border border-gray-400 rounded p-1 text-sm max-w-full"
                      />
                      <input
                        type="number"
                        name="max"
                        placeholder="Max $"
                        value={filters?.priceRange?.max}
                        onChange={handlePriceChange}
                        className="w-[48%]  border border-gray-400 rounded p-1 text-sm max-w-full"
                      />
                    </div>

                    <h1 className="text-[12px] font-[600]  text-gray-400 mt-2">
                      Project Budget
                    </h1>
                    <div className="flex flex-wrap gap-2  mt-1">
                      <input
                        type="number"
                        name="min"
                        placeholder="Min $"
                        value={filters?.priceRange?.min}
                        onChange={handlePriceChange}
                        className="w-[48%] border border-gray-400 rounded p-1 text-sm max-w-full"
                      />
                      <input
                        type="number"
                        name="max"
                        placeholder="Max $"
                        value={filters?.priceRange?.max}
                        onChange={handlePriceChange}
                        className="w-[48%]  border border-gray-400 rounded p-1 text-sm max-w-full"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* Buttons */}
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={handleFilters}
                disabled={findExperts.buttonLoading}
                className="bg-secondary text-white w-full h-[40px] rounded flex justify-center items-center"
              >
                {findExperts.buttonLoading ? (
                  <ButtonLoader1 />
                ) : (
                  "Apply Filters"
                )}
              </button>
              <button
                onClick={resetFilters}
                className="border border-gray-400 text-gray-700 w-full h-[40px] rounded"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filters;
