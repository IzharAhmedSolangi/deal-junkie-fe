import { FaStar } from "react-icons/fa";
import "../../../../styles/testimonial_1.css";
import "../../../../styles/testimonial_2.css";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Ronald Richards",
      review:
        "I spent five years in investment banking but wanted a more flexible lifestyle. Deal Junkie lets me leverage my expertise by helping small business buyers and investors with valuations, diligence, and structuring. I’ve built a steady stream of clients while having complete control over my schedule!"
    },
    {
      name: "Eleanor Pena",
      review:
        "I spent five years in investment banking but wanted a more flexible lifestyle. Deal Junkie lets me leverage my expertise by helping small business buyers and investors with valuations, diligence, and structuring. I’ve built a steady stream of clients while having complete control over my schedule!"
    },
    {
      name: "Savannah Nguyen",
      review:
        "I spent five years in investment banking but wanted a more flexible lifestyle. Deal Junkie lets me leverage my expertise by helping small business buyers and investors with valuations, diligence, and structuring. I’ve built a steady stream of clients while having complete control over my schedule!"
    },
    {
      name: "Jacob Jones",
      review:
        "I spent five years in investment banking but wanted a more flexible lifestyle. Deal Junkie lets me leverage my expertise by helping small business buyers and investors with valuations, diligence, and structuring. I’ve built a steady stream of clients while having complete control over my schedule!"
    },
    {
      name: "Jacob Jones",
      review:
        "I spent five years in investment banking but wanted a more flexible lifestyle. Deal Junkie lets me leverage my expertise by helping small business buyers and investors with valuations, diligence, and structuring. I’ve built a steady stream of clients while having complete control over my schedule!"
    },
    {
      name: "Jacob Jones",
      review:
        "I spent five years in investment banking but wanted a more flexible lifestyle. Deal Junkie lets me leverage my expertise by helping small business buyers and investors with valuations, diligence, and structuring. I’ve built a steady stream of clients while having complete control over my schedule!"
    },
    {
      name: "Jacob Jones",
      review:
        "I spent five years in investment banking but wanted a more flexible lifestyle. Deal Junkie lets me leverage my expertise by helping small business buyers and investors with valuations, diligence, and structuring. I’ve built a steady stream of clients while having complete control over my schedule!"
    }
  ];
  return (
    <div className="flex flex-col gap-3">
      <div className="marq_1">
        <div className="marq_group_1">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full md:h-[220px] h-[230px] md:p-6 p-3 rounded-lg"
            >
              <div className="flex gap-2">
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
          ))}
        </div>
        <div aria-hidden="true" className="marq_group_1">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full md:h-[220px] h-[230px] md:p-6 p-3 rounded-lg"
            >
              <div className="flex md:gap-2 gap-1">
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
          ))}
        </div>
      </div>
      <div className="marq_2">
        <div className="marq_group_2">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full md:h-[220px] h-[230px] md:p-6 p-3 rounded-lg"
            >
              <div className="flex gap-2">
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
          ))}
        </div>
        <div aria-hidden="true" className="marq_group_2">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full md:h-[220px] h-[230px] md:p-6 p-3 rounded-lg"
            >
              <div className="flex md:gap-2 gap-1">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
