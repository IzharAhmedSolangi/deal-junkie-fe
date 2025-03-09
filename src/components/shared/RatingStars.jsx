/* eslint-disable react/prop-types */
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const RatingStars = (props) => {
  const { rating, totalReviews } = props;
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <>
      <p className="flex gap-1">
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, index) => (
          <FaStar key={index} className="text-primary" />
        ))}

        {/* Half Star */}
        {hasHalfStar && <FaStarHalfAlt className="text-primary" />}

        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, index) => (
          <FaRegStar key={index} className="text-primary" />
        ))}
      </p>
      <p className="text-sm text-[#98A2B3]">{totalReviews} reviews</p>
    </>
  );
};

export default RatingStars;
