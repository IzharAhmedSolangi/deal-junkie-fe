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
    stateKey: "price_range",
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
    options: ["Same Day", "1-Day", "3-Day", "7-Day"],
    stateKey: "availability",
  },
  {
    category: "Rating",
    type: "radio",
    options: ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Stars"],
    stateKey: "rating",
  },
];

function Filters(props) {
  const { filters, setFilters, findJobs, handleFilters } = props;
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
      price_range: { ...filters.price_range, [e.target.name]: e.target.value },
    });
  };

  const resetFilters = () => {
    setFilters({
      expertise: [],
      price_range: { min: "", max: "" },
      experience: "",
      availability: "",
      rating: "",
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
        <div className="flex items-center justify-between">
          <h1 className="text-[24px] font-semibold text-secondary">Filters</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="cursor-pointer rounded border border-[#02174C33] w-[30px] h-[30px] flex justify-center items-center"
          >
            <AiOutlineClose className="text-[22px]" />
          </button>
        </div>
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
                    <h1 className="text-[12px] font-[600]  text-gray-400">
                      Hourly Rate
                    </h1>
                    <div className="flex flex-wrap gap-2  mt-1">
                      <input
                        type="number"
                        name="min"
                        placeholder="Min $"
                        value={filters?.price_range?.min}
                        onChange={handlePriceChange}
                        className="w-[48%] border border-gray-400 rounded p-1 text-sm max-w-full"
                      />
                      <input
                        type="number"
                        name="max"
                        placeholder="Max $"
                        value={filters?.price_range?.max}
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
                        value={filters?.price_range?.min}
                        onChange={handlePriceChange}
                        className="w-[48%] border border-gray-400 rounded p-1 text-sm max-w-full"
                      />
                      <input
                        type="number"
                        name="max"
                        placeholder="Max $"
                        value={filters?.price_range?.max}
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
                disabled={findJobs.buttonLoading}
                className="bg-secondary text-white w-full h-[40px] rounded flex justify-center items-center cursor-pointer"
              >
                {findJobs.buttonLoading ? <ButtonLoader1 /> : "Apply Filters"}
              </button>
              <button
                onClick={resetFilters}
                className="border border-gray-400 text-gray-700 w-full h-[40px] rounded cursor-pointer"
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
