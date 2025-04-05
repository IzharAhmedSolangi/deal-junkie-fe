function SellerCard() {
  return (
    <>
      <div className="bg-white rounded-xl shadow p-4 w-full mx-auto animate-pulse">
        {/* Image Placeholder */}
        <div className="w-full md:h-[200px] xs:h-[120px] bg-gray-200 rounded-md mb-4" />

        {/* Name Placeholder */}
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2" />

        {/* Price Placeholder */}
        <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2" />

        {/* Stars Placeholder */}
        <div className="flex justify-center space-x-1 mb-2">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="w-4 h-4 bg-gray-300 rounded-full" />
          ))}
        </div>

        {/* Button Placeholder */}
        <div className="w-full h-[35px] bg-gray-300 rounded-lg" />
      </div>
    </>
  );
}

export default SellerCard;
