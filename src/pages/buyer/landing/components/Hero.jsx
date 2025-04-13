/* eslint-disable react-hooks/exhaustive-deps */
import PostProjectButton from "../../../../components/shared/PostProjectButton";
import FindExpertsButton from "../../../../components/shared/FindExpertsButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../../../storage/storage";
import RatingStars from "../../../../components/shared/RatingStars";

function Hero() {
  const token = getAccessToken();
  const Navigate = useNavigate();
  const [query, setQuery] = useState("");
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [allSellers, setAllSellers] = useState({
    loading: true,
    data: null,
    message: null,
  });

  const handleSearchJobs = () => {
    Navigate(`/find-experts?search=${query}`);
  };

  const GetAllSellers = async () => {
    await axios
      .get(`${BASE_URL}/api/accounts/random-sellers/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAllSellers((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data,
          message: response.data ? null : "We didn't find any task",
        }));
      })
      .catch((error) => {
        setAllSellers((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.message || "Internal server error",
        }));
      });
  };
  useEffect(() => {
    GetAllSellers();
  }, []);

  return (
    <div className="pt-[70px] w-full h-screen bg-[url('/assets/images/Banner.png')] bg-cover bg-center overflow-hidden">
      <div className="flex flex-col items-center md:px-0 px-3">
        <h1 className="text-[#1D2939] lg:text-[40px] text-[22px] font-[600] text-center">
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

        <div className="lg:w-[60%] md:w-[70%] w-full mt-5">
          <div className="grid grid-cols-3">
            {allSellers?.data?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`rounded-lg md:p-4 p-2 bg-white border-gray-200 ${
                    index === 0 && "-rotate-8 mt-10"
                  } 
                  ${index === 1 && "z-10"} 
                  ${index === 2 && "rotate-8 mt-10"}`}
                  style={{ boxShadow: "0px 0px 7px #49586D21" }}
                >
                  {item?.profile_picture ? (
                    <img
                      src={item?.profile_picture}
                      alt="Profile"
                      className="w-full md:h-[200px] xs:h-[100px] object-cover rounded-sm"
                    />
                  ) : (
                    <div className="w-full md:h-[200px] xs:h-[100px] bg-gray-200 rounded-sm flex justify-center items-center md:text-[15px] text-[10px]">
                      {item?.name}
                    </div>
                  )}
                  <h3 className="md:text-lg text-[12px] font-bold md:mt-2 mt-1 text-[#022247] text-center">
                    {item?.name}
                  </h3>
                  <div className="flex justify-center">
                    <p className="bg-[#F2F4F7] font-[500] md:text-[14px] text-[10px] text-secondary border border-secondary rounded-full py-1 px-2 ">
                      Starting from ${item?.rate_per_hour}
                    </p>
                  </div>
                  <div className="flex md:flex-row flex-col justify-center items-center md:gap-2 gap-0 my-2">
                    <RatingStars rating={item?.rating || 0} totalReviews={0} />
                  </div>
                </div>
              );
            })}
          </div>
          {allSellers.loading && (
            <div className="grid grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  className={`bg-white rounded-xl shadow md:p-4 p-2 w-full mx-auto animate-pulse ${
                    index === 0 && "-rotate-8 mt-10"
                  } 
                  ${index === 1 && "z-10"} 
                  ${index === 2 && "rotate-8 mt-10"}`}
                  key={index}
                >
                  <div className="w-full md:h-[200px] xs:h-[100px] bg-gray-200 rounded-md md:mb-4 mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2" />
                  <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2" />
                  <div className="flex justify-center space-x-1 mb-2">
                    {[...Array(5)].map((_, idx) => (
                      <div
                        key={idx}
                        className="w-4 h-4 bg-gray-300 rounded-full"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
