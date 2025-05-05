import { useState, useEffect } from "react";
import FindExpertsButton from "../../../../components/shared/FindExpertsButton";
import PostProjectButton from "../../../../components/shared/PostProjectButton";
import {
  FaChevronLeft,
  FaChevronRight,
  FaLock,
  FaRocket,
  FaThumbsUp,
} from "react-icons/fa";
import { Link } from "react-router-dom";

function HowItWorks() {
  return (
    <>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 md:py-10 py-5 overflow-hidden">
        <div className="w-full h-full" data-aos="fade-right">
          <img
            src="/assets/images/image-1.jpeg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="bg-secondary md:py-0 py-12 w-full h-full flex flex-col items-center justify-center"
          data-aos="fade-left"
        >
          <Slider />
        </div>
      </div>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-5 md:py-10 py-5 md:px-24 px-5 overflow-hidden">
        <div
          className="w-full h-[668px] rounded-[20px] bg-[#E9FFDB] flex flex-col items-center pt-10 px-3 relative"
          data-aos="fade-left"
        >
          <h1 className="text-[#022247] md:text-[32px] text-[25px] font-[600] text-center">
            Empowering you
            <br /> with seasoned deal
            <br /> professionals
          </h1>
          <div className="mt-3">
            <FindExpertsButton />
          </div>
          <div className="absolute bottom-0">
            <img src="/assets/images/image-3.png" alt="" />
          </div>
        </div>
        <div
          className="w-full h-[668px] rounded-[20px] bg-[#F0F0FF] flex flex-col items-center pt-10 px-3 relative"
          data-aos="fade-right"
        >
          <h1 className="text-[#022247] md:text-[32px] text-[25px] font-[600] text-center">
            Find a seasoned finance
            <br /> professional to help drive
            <br /> your business
          </h1>
          <div className="mt-3">
            <PostProjectButton />
          </div>
          <div className="absolute bottom-0">
            <img src="/assets/images/image-2.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HowItWorks;

const slides = [
  {
    content: (
      <>
        <div className="flex justify-center mb-8">
          <div className="bg-[#01E678] text-white rounded-full w-[120px] h-[120px] flex justify-center items-center">
            <FaLock className="text-[50px]" />
          </div>
        </div>
        <h3 className="text-[24px] text-[#022247] font-bold text-center mb-2">
          Collaborate securely on Deal Junkie
        </h3>
        <p className="text-center text-[16px] text-[#667085] mb-6">
          Work seamlessly with your chosen expert using our secure and
          easy-to-use platform.
        </p>
        <div className="w-full flex justify-center">
          <PostProjectButton />
        </div>
      </>
    ),
  },
  {
    content: (
      <>
        <div className="flex justify-center mb-8">
          <div className="bg-[#01E678] text-white rounded-full w-[120px] h-[120px] flex justify-center items-center">
            <FaRocket className="text-[50px]" />
          </div>
        </div>
        <h3 className="text-[24px] text-[#022247] font-bold text-center mb-2">
          Simple 3-Step Process
        </h3>
        <p className="text-center text-[16px] text-[#667085] mb-6">
          Create your project, connect with experts, and get results quickly and
          effectively.
        </p>
        <div className="w-full flex justify-center">
          <Link
            to={"/how-it-works"}
            className="hover-slide-button flex justify-center items-center rounded w-[120px] h-[40px] bg-primary text-[#003F63] text-center cursor-pointer"
          >
            Get Started
          </Link>
        </div>
      </>
    ),
  },
  {
    content: (
      <>
        <div className="flex justify-center mb-8">
          <div className="bg-[#01E678] text-white rounded-full w-[120px] h-[120px] flex justify-center items-center">
            <FaThumbsUp className="text-[50px]" />
          </div>
        </div>
        <h3 className="text-[24px] text-[#022247] font-bold text-center mb-2">
          Why Choose Us
        </h3>
        <p className="text-center text-[16px] text-[#667085] mb-6">
          Enjoy secure transactions, verified experts, and guaranteed
          satisfaction on every project.
        </p>
        <div className="w-full flex justify-center">
          <Link
            to={"/about-us"}
            className="hover-slide-button flex justify-center items-center rounded w-[120px] h-[40px] bg-primary text-[#003F63] text-center cursor-pointer"
          >
            Learn More
          </Link>
        </div>
      </>
    ),
  },
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    let interval;

    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextSlide();
      }, 5000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isAutoPlaying]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <>
      <div className="w-auto h-auto flex flex-col items-center justify-center bg-white rounded-xl p-5">
        <div className="max-w-sm mx-auto">{slides[currentSlide].content}</div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70 cursor-pointer"
        aria-label="Previous slide"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10 hover:bg-opacity-70 cursor-pointer"
        aria-label="Next slide"
      >
        <FaChevronRight />
      </button>

      {/* Dots indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-[40px] h-1 mx-1 rounded-[2px] ${
              currentSlide === index ? "bg-white" : "bg-gray-500"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
}
