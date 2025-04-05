function BuyerCard() {
  return (
    <>
      <div className="bg-white rounded-xl shadow p-4 w-full mx-auto animate-pulse">
        <div className="md:h-[200px] xs:h-[120px] bg-gray-200 rounded-md mb-4" />

        <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto mb-2" />
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-4 w-4 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-1/3" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="h-4 w-4 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>

        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-4 w-4 bg-gray-200 rounded-full" />
          <div className="h-4 bg-gray-200 rounded w-1/2" />
        </div>

        <div className="h-[35px] bg-gray-200 rounded-md w-full" />
      </div>
    </>
  );
}

export default BuyerCard;
