import React from "react";

function Hero() {
  return (
    <div className="w-full h-auto">
      <div className="flex flex-col items-center pt-10">
        <h1 className="text-[#1D2939] text-[48px] font-[600] leading-14 text-center">
          Connecting You with Finance <br />
          Experts to Achieve Your Deal Goals
        </h1>
        <div className="flex items-center gap-2 mt-3">
          <button className="rounded w-[120px] h-[40px] bg-secondary text-white text-center cursor-pointer hover:opacity-80">
            Find Experts
          </button>
          <button className="rounded w-[120px] h-[40px] bg-primary text-[#003F63] text-center cursor-pointer hover:opacity-80">
            Post a Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
