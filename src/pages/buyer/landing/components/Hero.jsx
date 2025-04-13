import PostProjectButton from "../../../../components/shared/PostProjectButton";
import FindExpertsButton from "../../../../components/shared/FindExpertsButton";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../../../storage/storage";
import {
  MdOutlineLocationOn,
  MdOutlineMail,
  MdPhoneAndroid
} from "react-icons/md";
import RatingStars from "../../../../components/shared/RatingStars";

function Hero() {
  const token = getAccessToken();
  const Navigate = useNavigate();
  const [query, setQuery] = useState("");
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [allSellers, setAllSellers] = useState({
    loading: true,
    data: null,
    message: null
  });

  const handleSearchJobs = () => {
    Navigate(`/find-experts?search=${query}`);
  };

  const GetAllSellers = async () => {
    await axios
      .get(`${BASE_URL}/api/accounts/random-sellers/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setAllSellers((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data,
          message: response.data ? null : "We didn't find any task"
        }));
      })
      .catch((error) => {
        setAllSellers((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.message || "Internal server error"
        }));
      });
  };
  useEffect(() => {
    GetAllSellers();
  }, []);

  return (
    <div className="pt-[70px] w-full h-screen bg-[url('/assets/images/Banner.png')] bg-cover bg-center">
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

        <div className="w-[70%] mt-2">
          <div className="grid grid-cols-3">
            {allSellers?.data?.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`rounded-lg p-4 bg-white border-gray-200 ${
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
                      className="w-full md:h-[200px] xs:h-[120px] object-cover rounded-sm"
                    />
                  ) : (
                    <div className="w-full md:h-[200px] xs:h-[120px] bg-gray-200 rounded-sm flex justify-center items-center">
                      {item?.name}
                    </div>
                  )}
                  <h3 className="text-lg font-bold mt-2 text-[#022247] text-center">
                    {item?.name}
                  </h3>
                  <div className="flex justify-center">
                    <p className="bg-[#F2F4F7] font-[500] text-[14px] text-secondary border border-secondary rounded-full py-1 px-2 ">
                      Starting from ${item?.rate_per_hour}
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-2 my-2">
                    <RatingStars rating={item?.rating || 0} totalReviews={0} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
