/* eslint-disable react/prop-types */
import { MdAccessTime } from "react-icons/md";
import { CiDollar, CiUser } from "react-icons/ci";

function JobInfo(props) {
  const { findJob } = props;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#02174C] text-[32px]">
        {findJob.data?.title}
      </h2>

      <div className="flex items-center gap-3 text-[#6F7487] mt-2 text-[16px]">
        <div className="flex items-center gap-1">
          <CiDollar />
          <p>Starting from ${findJob.data?.budget} / hr</p>
        </div>
        <div className="flex items-center gap-1">
          <MdAccessTime />
          <p>Full-Time</p>
        </div>
        <div className="flex items-center gap-1">
          <CiUser />
          <p>{findJob.data?.experience}</p>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
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
