/* eslint-disable react/prop-types */
const CircularProgress = ({ percentage }) => {
  const radius = 40; // Radius of the circle
  const strokeWidth = 6; // Stroke width
  const circumference = 2 * Math.PI * radius; // Circumference of the circle
  const offset = circumference - (percentage / 100) * circumference; // Calculate stroke offset

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      {/* Background Circle */}
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-[#00154F] fill-none"
        />
      </svg>

      {/* Progress Circle */}
      <svg
        className="absolute top-0 left-0 w-full h-full rotate-[-90deg]"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r={radius}
          strokeWidth={strokeWidth}
          className="stroke-[#00FFA3] fill-none transition-all duration-300"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>

      {/* Percentage Text */}
      <span className="absolute text-[#00154F] text-xl font-bold">
        {percentage}%
      </span>
    </div>
  );
};

export default CircularProgress;
