/* eslint-disable react/prop-types */
import { useState } from "react";
import { BsSliders2Vertical } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { ButtonLoader1 } from "../../../../components/shared/ButtonLoaders";

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
    stateKey: "project_budget",
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
    stateKey: "availability",
  },
  {
    category: "Project Type",
    type: "radio",
    options: [
      "One-Time Deliverable (e.g., valuation model, investment memo)",
      "Ongoing Advisory (e.g., diligence over several weeks)",
      "Full Due Diligence Support (comprehensive deal evaluation)",
      "Deal Execution Support (post-acquisition planning, structuring)",
    ],
    stateKey: "project_type",
  },
  {
    category: "Industry Focus",
    type: "radio",
    options: [
      "Healthcare & Biotech",
      "Technology",
      "Real Estate",
      "Consumer & Retail",
      "Industrials",
      "Energy & Infrastructure",
      "Financial Services",
    ],
    stateKey: "industry_focus",
  },
];

function Filters(props) {
  const { filters, setFilters, isLoading, handleFilters, resetFilters } = props;
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
    const { name, value, dataset } = e.target;

    setFilters((prevFilters) => ({
      ...prevFilters,
      [dataset.priceType]: {
        ...prevFilters[dataset.priceType],
        [name]: value,
      },
    }));
  };

  return (
    <>
      <BsSliders2Vertical
        className="w-[50px] h-[40px] p-2 border border-[#02174C33] rounded text-[20px] cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 border-l border-l-gray-300 z-[9999] w-[250px] md:w-[340px] lg:w-[300px] h-screen overflow-auto transition-transform bg-white dark:bg-gray-800 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between sticky top-0 py-1 px-3 bg-white border-b border-b-gray-300">
          <h1 className="text-[24px] font-semibold text-secondary">Filters</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer rounded border border-[#02174C33] hover:border-primary hover:text-primary w-[30px] h-[30px] flex justify-center items-center"
          >
            <AiOutlineClose className="text-[22px]" />
          </button>
        </div>
        {/* Filters */}
        <div className="py-1 px-3">
          <div className="bg-white rounded w-full">
            {filterCategories?.map((filter, index) => (
              <div key={index} className="mb-2">
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
                        className="mr-2"
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
                    {/* Hourly Rate Section */}
                    <h1 className="text-[12px] font-[600] text-gray-400">
                      Hourly Rate
                    </h1>
                    <div className="flex flex-wrap gap-2 mt-1">
                      <input
                        type="number"
                        name="min"
                        placeholder="Min $"
                        value={filters?.hourly_rate?.min || ""}
                        data-price-type="hourly_rate"
                        onChange={handlePriceChange}
                        className="w-[48%] border border-gray-400 rounded p-1 text-sm max-w-full"
                      />
                      <input
                        type="number"
                        name="max"
                        placeholder="Max $"
                        value={filters?.hourly_rate?.max || ""}
                        data-price-type="hourly_rate"
                        onChange={handlePriceChange}
                        className="w-[48%] border border-gray-400 rounded p-1 text-sm max-w-full"
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Buttons */}
        <div className="flex items-center gap-2 sticky bottom-0 py-1 px-3 bg-white border-t border-t-gray-300">
          <button
            onClick={handleFilters}
            disabled={isLoading}
            className="button-2 bg-secondary text-white w-full h-[35px] rounded flex justify-center items-center cursor-pointer"
          >
            {isLoading ? <ButtonLoader1 /> : "Apply Filters"}
          </button>
          <button
            onClick={resetFilters}
            className="border border-gray-400 text-gray-700 w-full h-[35px] rounded cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </>
  );
}

export default Filters;
