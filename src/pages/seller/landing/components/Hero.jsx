import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const Navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearchJobs = () => {
    Navigate(`/find-jobs?search=${query}`);
  };

  return (
    <div className="pt-[70px] w-full h-screen bg-[url('/assets/images/Banner.png')] bg-cover bg-center">
      <div className="flex flex-col items-center">
        <h1 className="text-[#1D2939] lg:text-[48px] text-[24px] font-[600] text-center lg:w-[40%] w-[95%]">
          Unlock Your Full Potential with Deal Junkie
        </h1>

        <div className="w-full flex justify-center mt-3">
          <div className="md:w-[50%] w-[95%] flex gap-2 justify-between items-center bg-white shadow-lg p-2 rounded relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchJobs();
                }
              }}
              placeholder="Find jobs in M&A, Real Estate..."
              className="w-full h-[40px] rounded border border-[#02174C33] px-2 hover:border-secondary focus:border-secondary"
            />
            <button
              className="cursor-pointer bg-secondary rounded text-white hover:opacity-80 w-[60px] h-[40px] flex justify-center items-center"
              onClick={handleSearchJobs}
            >
              Go
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
