import { NavLink } from "react-router-dom";

function Hero() {
  return (
    <div className="pt-[70px] w-full h-screen bg-[url('/assets/images/Banner.png')] bg-cover bg-center">
      <div className="flex flex-col items-center">
        <h1 className="text-[#1D2939] lg:text-[48px] text-[24px] font-[600] text-center">
          Connecting You with Finance <br />
          Experts to Achieve Your Deal Goals
        </h1>

        <div className="flex items-center gap-2 mt-3">
          <NavLink to="/find-experts">
            <button className="rounded w-[120px] h-[40px] bg-secondary text-white text-center cursor-pointer hover:opacity-80">
              Find Experts
            </button>
          </NavLink>
          <button className="rounded w-[120px] h-[40px] bg-primary text-[#003F63] text-center cursor-pointer hover:opacity-80">
            Post a Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
