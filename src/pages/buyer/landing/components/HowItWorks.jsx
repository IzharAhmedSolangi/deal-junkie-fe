function HowItWorks() {
  return (
    <>
      <div className="w-full grid grid-cols-2 md:py-10 py-5">
        <div className="w-full h-full">
          <img
            src="/assets/images/image-1.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-secondary w-full h-full"></div>
      </div>
      <div className="w-full grid md:grid-cols-2 grid-cols-1 gap-5 md:py-10 py-5 md:px-24 px-5">
        <div className="w-full h-[668px] rounded-[20px] bg-[#E9FFDB] flex flex-col items-center pt-10 relative">
          <h1 className="text-[#022247] xs:text-[22px] md:text-[32px] font-[600] text-center">
            Empowering you
            <br /> with seasoned deal
            <br /> professionals
          </h1>
          <button className="mt-3 rounded w-[120px] h-[40px] bg-secondary text-white text-center cursor-pointer hover:opacity-80">
            Find Experts
          </button>
          <div className="absolute bottom-0">
            <img src="/assets/images/image-3.png" alt="" />
          </div>
        </div>
        <div className="w-full h-[668px] rounded-[20px] bg-[#F0F0FF] flex flex-col items-center pt-10 relative">
          <h1 className="text-[#022247] xs:text-[22px] md:text-[32px] font-[600] text-center">
            Find a seasoned finance
            <br /> professional to help drive
            <br /> your business
          </h1>
          <button className="mt-3 rounded w-[120px] h-[40px] bg-primary text-[#003F63] text-center cursor-pointer hover:opacity-80">
            Post a Project
          </button>
          <div className="absolute bottom-0">
            <img src="/assets/images/image-2.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

export default HowItWorks;
