/* eslint-disable react/prop-types */
import { MdAccessTime } from "react-icons/md";
import { CiDollar, CiUser } from "react-icons/ci";
import RatingStars from "../../../../components/shared/RatingStars";

function SellerInformation(props) {
  const { findExpert } = props;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#02174C] text-[32px]">
        {findExpert.data?.user?.first_name}
      </h2>
      <div className="flex gap-2 items-center">
        <RatingStars rating={findExpert.data?.rating || 0} totalReviews={0} />
      </div>

      <div className="flex items-center gap-3 text-[#6F7487] mt-2 text-[16px]">
        <div className="flex items-center gap-1">
          <CiDollar />
          <p>Starting from ${findExpert.data?.rate_per_hour} / hr</p>
        </div>
        <div className="flex items-center gap-1">
          <MdAccessTime />
          <p>Full-Time</p>
        </div>
        <div className="flex items-center gap-1">
          <CiUser />
          <p>{findExpert.data?.experience} Years of Experience</p>
        </div>
      </div>

      {/* <div className="flex gap-2 mt-4">
        {["TaxPlanning", "Advisor", "WealthAdvisor"].map((tag, i) => (
          <span
            key={i}
            className="bg-[#F2F4F7] text-secondary text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div> */}

      {findExpert.data?.describe_yourself && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-secondary">About Seller</h3>
          <p className="text-gray-400 text-[15px] mt-2">
            {findExpert.data?.describe_yourself}
          </p>
        </section>
      )}

      {findExpert.data?.skill_expperience && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-secondary">
            Skills and experience
          </h3>
          <p className="text-gray-400 text-[15px] mt-2">
            {findExpert.data?.skill_expperience}
          </p>
        </section>
      )}

      {findExpert.data?.achievements && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-secondary">Achievements</h3>
          <p className="text-gray-400 text-[15px] mt-2">
            {findExpert.data?.achievements}
          </p>
        </section>
      )}

      {findExpert.data?.work_preferences && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-secondary">
            Work preferences
          </h3>
          <p className="text-gray-400 text-[15px] mt-2">
            {findExpert.data?.work_preferences}
          </p>
        </section>
      )}
    </div>
  );
}

export default SellerInformation;
