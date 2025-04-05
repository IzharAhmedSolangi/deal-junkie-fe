function JobCard() {
  return (
    <>
      <div className="w-full p-4 bg-white rounded-xl shadow-md animate-pulse relative">
        {/* Top-right badge */}
        <div className="absolute top-4 right-4 h-6 w-24 bg-gray-300 rounded-md" />

        {/* Date & Time Row */}
        <div className="flex items-center space-x-4 mb-3">
          <div className="h-4 w-28 bg-gray-300 rounded-md" />
          <div className="h-4 w-20 bg-gray-300 rounded-md" />
        </div>

        {/* Title */}
        <div className="h-5 w-1/2 bg-gray-400 rounded-md mb-2" />

        {/* Description */}
        <div className="mb-2 flex flex-col gap-1">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-11/12" />
          <div className="h-4 bg-gray-200 rounded w-10/12" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1">
          <div className="h-[35px] w-full bg-gray-300 rounded-md" />
          <div className="h-[35px] w-full bg-gray-300 rounded-md" />
        </div>
      </div>
    </>
  );
}

export default JobCard;
