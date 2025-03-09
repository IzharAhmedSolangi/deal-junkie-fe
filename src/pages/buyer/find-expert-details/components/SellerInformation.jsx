import { FaStar } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import { CiDollar, CiUser } from "react-icons/ci";

function SellerInformation() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#02174C] text-[32px]">
        Sarah Taylor
      </h2>
      <div className="flex gap-2 items-center">
        <p className="flex gap-1">
          <FaStar className="text-primary" />
          <FaStar className="text-primary" />
          <FaStar className="text-primary" />
          <FaStar className="text-primary" />
          <FaStar className="text-primary" />
        </p>
        <h3 className="text-sm text-[#6F7487]">23 reviews</h3>
      </div>

      <div className="flex items-center gap-3 text-[#6F7487] mt-2 text-[16px]">
        <div className="flex items-center gap-1">
          <CiDollar />
          <p>Starting from $20.45 / hr</p>
        </div>
        <div className="flex items-center gap-1">
          <MdAccessTime />
          <p>Full-Time</p>
        </div>
        <div className="flex items-center gap-1">
          <CiUser />
          <p>3 Years of Experience</p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <span className="px-3 py-1 bg-gray-200 text-[#222222] text-sm font-[500] rounded-full">
          Electrical Help
        </span>
        <span className="px-3 py-1 bg-gray-200 text-[#222222] text-sm font-[500] rounded-full">
          TV Mounting
        </span>
        <span className="px-3 py-1 bg-gray-200 text-[#222222] text-sm font-[500] rounded-full">
          Rewiring
        </span>
      </div>

      <section className="mt-6">
        <h3 className="text-lg font-semibold text-secondary">About Seller</h3>
        <p className="text-gray-400 text-[15px] mt-2">
          Sara Taylor is a highly skilled and experienced professional with a
          passion for delivering exceptional service. With a keen eye for detail
          and a commitment to customer satisfaction, Sara consistently goes
          above and beyond to exceed client expectations. Whether its a home
          repair, renovation project, or any other task, Saras expertise and
          dedication make her the go-to professional for quality workmanship.
          With a friendly and approachable demeanor, Sara ensures clear
          communication and a seamless experience from start to finish.
        </p>
      </section>

      <section className="mt-6">
        <h3 className="text-lg font-semibold text-secondary">
          Skills and experience
        </h3>
        <p className="text-gray-400 text-[15px] mt-2">
          Our experienced electricians at CurrentFlow Solutions possess the
          expertise to handle various electrical projects, from repairs to
          installations, ensuring top-notch workmanship and reliable solutions.
        </p>
      </section>
      <section className="mt-6">
        <h3 className="text-lg font-semibold text-secondary">Achievements</h3>
        <p className="text-gray-400 text-[15px] mt-2">
          At CurrentFlow Solutions, we offer flexible scheduling to accommodate
          your busy lifestyle, providing convenient appointment times that suit
          your needs, including weekdays, evenings, and weekends.
        </p>
      </section>
      <section className="mt-6">
        <h3 className="text-lg font-semibold text-secondary">
          Work preferences
        </h3>
        <p className="text-gray-400 text-[15px] mt-2">
          CurrentFlow Solutions accepts various payment methods, including cash,
          check, credit card, and online payment platforms, ensuring a
          hassle-free and convenient transaction process for our customers. At
          CurrentFlow Solutions, we offer flexible scheduling to accommodate
          your busy lifestyle, providing convenient appointment times that suit
          your needs, including weekdays, evenings, and weekends.
        </p>
      </section>
    </div>
  );
}

export default SellerInformation;
