import FindExpertsButton from "../../../../components/shared/FindExpertsButton";
import PostProjectButton from "../../../../components/shared/PostProjectButton";

function HowItWorks() {
  return (
    <>
      <div className="w-full grid grid-cols-2 md:py-10 py-5 overflow-hidden">
        <div className="w-full h-full" data-aos="fade-right">
          <img
            src="/assets/images/image-1.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-secondary w-full h-full" data-aos="fade-left"></div>
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
