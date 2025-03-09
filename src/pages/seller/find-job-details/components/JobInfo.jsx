import { MdAccessTime } from "react-icons/md";
import { CiDollar, CiUser } from "react-icons/ci";

function JobInfo() {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-[#02174C] text-[32px]">
        Need a professional for our real estate business service
      </h2>

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
        <h3 className="text-lg font-semibold text-secondary">Description</h3>
        <p className="text-gray-400 text-[15px] mt-2">
          It is a long established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. The point of
          using Lorem Ipsum is that it has a more-or-less normal distribution of
          letters, as opposed to using Content here, content here, making it
          look like readable English. Many desktop publishing packages and web
          page editors now use Lorem Ipsum as their default model text, and a
          search for lorem ipsum will uncover many web sites still in their
          infancy. Various versions have evolved over the years, sometimes by
          accident, sometimes on purpose (injected humour and the like).
        </p>
      </section>
    </div>
  );
}

export default JobInfo;
