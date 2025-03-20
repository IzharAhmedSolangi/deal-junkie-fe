import PostProjectButton from "../../../../components/shared/PostProjectButton";
import FindExpertsButton from "../../../../components/shared/FindExpertsButton";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getAccessToken } from "../../../../storage/storage";

function Hero() {
  const token = getAccessToken();
  const Navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearchJobs = () => {
    Navigate(`/find-experts?search=${query}`);
  };
  return (
    <div className="pt-[80px] w-full h-screen bg-[url('/assets/images/Banner.png')] bg-cover bg-center">
      <div className="flex flex-col items-center md:px-0 px-3">
        <h1 className="text-[#1D2939] lg:text-[48px] text-[22px] font-[600] text-center">
          Connecting You with Finance <br />
          Experts to Achieve Your Deal Goals
        </h1>
        {token ? (
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
                placeholder="Find experts..."
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
        ) : (
          <div className="flex items-center gap-2 mt-3">
            <FindExpertsButton />
            <PostProjectButton />
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
