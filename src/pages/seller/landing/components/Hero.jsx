/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MdOutlineLocationOn,
  MdOutlineMail,
  MdPhoneAndroid,
} from "react-icons/md";

function Hero() {
  const Navigate = useNavigate();
  const [query, setQuery] = useState("");
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [allBuyers, setAllBuyers] = useState({
    loading: true,
    data: null,
    message: null,
  });

  const handleSearchJobs = () => {
    Navigate(`/find-jobs?search=${query}`);
  };

  const GetAllBuyers = async () => {
    await axios
      .get(`${BASE_URL}/api/accounts/random-buyers/`)
      .then((response) => {
        setAllBuyers((prevState) => ({
          ...prevState,
          loading: false,
          data: response.data,
          message: response.data ? null : "We didn't find any buyers",
        }));
      })
      .catch((error) => {
        setAllBuyers((prevState) => ({
          ...prevState,
          loading: false,
          data: null,
          message: error?.response?.data?.message || "Internal server error",
        }));
      });
  };
  useEffect(() => {
    GetAllBuyers();
  }, []);

  return (
    <div className="pt-[70px] w-full h-auto bg-[url('/assets/images/Banner.png')] bg-cover bg-center overflow-hidden">
      <div className="flex flex-col items-center md:px-0 px-3">
        <h1 className="text-[#1D2939] lg:text-[40px] text-[22px] font-[600] text-center lg:w-[40%] w-full">
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

        <div className="lg:w-[60%] md:w-[70%] w-full mt-5">
          <div className="grid grid-cols-3">
            {allBuyers?.data?.map((item, index) => {
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
                  <div className="flex justify-center gap-1 mt-2">
                    <MdOutlineLocationOn className="text-[#6F7487] md:text-[20px] text-[12px]" />
                    <p className="font-normal md:text-[14px] text-[10px] text-[#6F7487] text-center">
                      {item?.address?.street}
                    </p>
                  </div>
                  <div className="flex justify-center gap-1 mt-2">
                    <MdOutlineMail className="text-[#6F7487] md:text-[20px] text-[15px]" />
                    <p className="font-normal md:text-[14px] text-[10px] text-[#6F7487]">
                      {item?.email}
                    </p>
                  </div>
                  <div className="flex justify-center gap-1 mt-2">
                    <MdPhoneAndroid className="text-[#6F7487] md:text-[20px] text-[12px]" />
                    <p className="font-normal md:text-[14px] text-[10px] text-[#6F7487]">
                      {item?.phone_number}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          {allBuyers.loading && (
            <div className="grid grid-cols-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  className={`bg-white rounded-xl shadow p-4 w-full mx-auto animate-pulse
                    ${index === 0 && "-rotate-8 mt-10"}
                  ${index === 1 && "z-10"}
                  ${index === 2 && "rotate-8 mt-10"}
                    `}
                  key={index}
                >
                  <div className="md:h-[200px] xs:h-[120px] bg-gray-200 rounded-md md:mb-4 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2" />
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="h-4 w-4 bg-gray-200 rounded-full" />
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="h-4 w-4 bg-gray-200 rounded-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="h-4 w-4 bg-gray-200 rounded-full" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
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
