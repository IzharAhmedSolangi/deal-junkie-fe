/* eslint-disable react/prop-types */
import { MdAccessTime } from "react-icons/md";
import { CiDollar, CiUser } from "react-icons/ci";
import RatingStars from "../../../components/shared/RatingStars";

function SellerInformation(props) {
  const { seller } = props;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#02174C] text-[32px]">
        {seller.data?.user?.first_name}
      </h2>
      <div className="flex gap-2 items-center">
        <RatingStars
          rating={seller.data?.rating || 0}
          totalReviews={seller.data?.total_reviews || 0}
        />
      </div>

      <div className="flex items-center flex-wrap sm:gap-3 gap-2 text-[#6F7487] mt-2 text-[16px]">
        <div className="flex items-center gap-1">
          <CiDollar className="flex-shrink-0" />
          <p>Starting from ${seller.data?.rate_per_hour}/hr</p>
        </div>
        <div className="flex items-center gap-1">
          <MdAccessTime className="flex-shrink-0" />
          <p>Full-Time</p>
        </div>
        <div className="flex items-center gap-1">
          <CiUser className="flex-shrink-0" />
          <p>{seller.data?.experience} Years of Experience</p>
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

      {seller.data?.describe_yourself && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-secondary">About Seller</h3>
          <p className="text-gray-400 text-[15px] mt-2">
            {seller.data?.describe_yourself}
          </p>
        </section>
      )}

      {seller.data?.skill_expperience && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-secondary">
            Skills and experience
          </h3>
          <p className="text-gray-400 text-[15px] mt-2">
            {seller.data?.skill_expperience}
          </p>
        </section>
      )}

      {seller.data?.achievements && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-secondary">Achievements</h3>
          <p className="text-gray-400 text-[15px] mt-2">
            {seller.data?.achievements}
          </p>
        </section>
      )}

      {seller.data?.work_preferences && (
        <section className="mt-6">
          <h3 className="text-lg font-semibold text-secondary">
            Work preferences
          </h3>
          <p className="text-gray-400 text-[15px] mt-2">
            {seller.data?.work_preferences}
          </p>
        </section>
      )}
    </div>
  );
}

export default SellerInformation;
