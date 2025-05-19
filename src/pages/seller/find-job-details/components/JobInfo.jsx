/* eslint-disable react/prop-types */
import { MdAccessTime } from "react-icons/md";
import { CiDollar, CiUser } from "react-icons/ci";

function JobInfo(props) {
  const { findJob } = props;

  return (
    <div className="w-full flex flex-col items-start">
      <div className="bg-primary px-5 py-2 text-white rounded-full">
        {findJob.data?.category}
      </div>
      <h2 className="text-2xl font-bold text-[#02174C] text-[32px] mt-2">
        {findJob.data?.title}
      </h2>

      <div className="flex items-center gap-3 flex-wrap text-[#6F7487] mt-2 text-[16px]">
        <div className="flex items-center gap-1">
          <CiDollar className="flex-shrink-0" />
          <p>Starting from ${findJob.data?.budget} / hr</p>
        </div>
        <div className="flex items-center gap-1">
          <MdAccessTime className="flex-shrink-0" />
          <p>Full-Time</p>
        </div>
        <div className="flex items-center gap-1">
          <CiUser className="flex-shrink-0" />
          <p>{findJob.data?.experience}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {findJob.data?.tags?.map((tag, i) => (
          <span
            key={i}
            className="bg-[#F2F4F7] text-secondary text-xs px-2 py-1 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <section className="mt-6">
        <h3 className="text-lg font-semibold text-secondary">Description</h3>
        <p className="text-gray-400 text-[15px] mt-2">
          {findJob.data?.description}
        </p>
      </section>
    </div>
  );
}

export default JobInfo;
