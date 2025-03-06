"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper/modules";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "Ronald Richards",
    review:
      "I spent five years in investment banking but wanted a more flexible lifestyle. Deal Junkie lets me leverage my expertise by helping small business buyers and investors with valuations, diligence, and structuring. I’ve built a steady stream of clients while having complete control over my schedule!",
  },
  {
    name: "Eleanor Pena",
    review:
      "I spent five years in investment banking but wanted a more flexible lifestyle. Deal Junkie lets me leverage my expertise by helping small business buyers and investors with valuations, diligence, and structuring. I’ve built a steady stream of clients while having complete control over my schedule!",
  },
  {
    name: "Savannah Nguyen",
    review:
      "I spent five years in investment banking but wanted a more flexible lifestyle. Deal Junkie lets me leverage my expertise by helping small business buyers and investors with valuations, diligence, and structuring. I’ve built a steady stream of clients while having complete control over my schedule!",
  },
  {
    name: "Jacob Jones",
    review:
      "I spent five years in investment banking but wanted a more flexible lifestyle. Deal Junkie lets me leverage my expertise by helping small business buyers and investors with valuations, diligence, and structuring. I’ve built a steady stream of clients while having complete control over my schedule!",
  },
  {
    name: "Jacob Jones",
    review:
      "I spent five years in investment banking but wanted a more flexible lifestyle. Deal Junkie lets me leverage my expertise by helping small business buyers and investors with valuations, diligence, and structuring. I’ve built a steady stream of clients while having complete control over my schedule!",
  },
  {
    name: "Jacob Jones",
    review:
      "I spent five years in investment banking but wanted a more flexible lifestyle. Deal Junkie lets me leverage my expertise by helping small business buyers and investors with valuations, diligence, and structuring. I’ve built a steady stream of clients while having complete control over my schedule!",
  },
  {
    name: "Jacob Jones",
    review:
      "I spent five years in investment banking but wanted a more flexible lifestyle. Deal Junkie lets me leverage my expertise by helping small business buyers and investors with valuations, diligence, and structuring. I’ve built a steady stream of clients while having complete control over my schedule!",
  },
];

function CustomerSaid() {
  return (
    <div className="bg-[#F2F4F7] pt-10 pb-40">
      <h1 className="text-[40px] font-[600] text-[#1D2939] text-center mb-10">
        Customer Said About Us
      </h1>

      <div className="w-full mx-auto px-4">
        <Swiper
          slidesPerView={3.5}
          spaceBetween={20}
          loop={true}
          modules={[Pagination, Navigation]}
          breakpoints={{
            1024: { slidesPerView: 3.5 },
            768: { slidesPerView: 2.5 },
            640: { slidesPerView: 1 },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white w-auto h-[200px] p-6 rounded-lg shadow-lg">
                <div className=" flex gap-2">
                  <img
                    src="/assets/images/image-1.png"
                    className="w-[45px] h-[45px] rounded-[50%]"
                    alt=""
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="flex gap-1">
                      <FaStar className="text-primary" />
                      <FaStar className="text-primary" />
                      <FaStar className="text-primary" />
                      <FaStar className="text-primary" />
                      <FaStar className="text-primary" />
                    </p>
                  </div>
                </div>
                <p className="text-[#667085] text-[12px] font-[500] mt-2">
                  {item.review}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="w-full mx-auto px-4 mt-5">
        <Swiper
          slidesPerView={2.5}
          spaceBetween={20}
          loop={true}
          modules={[Pagination, Navigation]}
          breakpoints={{
            1024: { slidesPerView: 2.5 },
            768: { slidesPerView: 2.5 },
            640: { slidesPerView: 1 },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white w-auto h-[200px] p-6 rounded-lg shadow-lg">
                <div className=" flex gap-2">
                  <img
                    src="/assets/images/image-1.png"
                    className="w-[45px] h-[45px] rounded-[50%]"
                    alt=""
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="flex gap-1">
                      <FaStar className="text-primary" />
                      <FaStar className="text-primary" />
                      <FaStar className="text-primary" />
                      <FaStar className="text-primary" />
                      <FaStar className="text-primary" />
                    </p>
                  </div>
                </div>
                <p className="text-[#667085] text-[12px] font-[500] mt-2">
                  {item.review}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default CustomerSaid;
