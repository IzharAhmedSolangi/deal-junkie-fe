/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useParams } from "react-router-dom";
import useGetJobById from "../../services/admin/useGetJobById";
import { useEffect } from "react";
import ShowMessage from "../../components/shared/ShowMessage";
import { IoMdClose } from "react-icons/io";

function JobDetails() {
  const { jobId } = useParams();
  const { GetJobById, job } = useGetJobById();

  useEffect(() => {
    if (jobId) {
      GetJobById(jobId);
    }
  }, [jobId]);

  return (
    <>
      <div className="w-full h-auto p-5">
        <div className="flex items-center gap-1 mb-3">
          <Link
            to={"/admin/jobs"}
            className="text-[#02174C] hover:text-primary text-[18px] font-[500]"
          >
            Jobs
          </Link>
          /
          <p className="text-primary text-[18px] font-[500]">
            {job.data?.title}
          </p>
        </div>
        <div className="rounded-[12px] bg-white shadow-md p-5">
          <TaskDetails job={job} />
          <Proposals job={job} />
          <button className="bg-[#EA51670F] w-full h-[35px] border border-[#EA5167] rounded-sm text-[#EA5167] text-[13px] cursor-pointer flex justify-center items-center gap-1 mt-5">
            <IoMdClose />
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default JobDetails;

function TaskDetails(props) {
  const { job } = props;

  return (
    <div className="w-full">
      <h2 className="text-[#222222] text-[18px] font-[600]">Task details</h2>
      <div className="grid grid-cols-2 gap-2 w-full mt-3">
        <div>
          <label className="text-[#222222] text-[16px] font-[500]">
            Category
          </label>
          <p className="text-[#6F7487] text-[16px] font-[400]">
            {job.data?.category}
          </p>
        </div>
        <div>
          <label className="text-[#222222] text-[16px] font-[500]">Title</label>
          <p className="text-[#6F7487] text-[16px] font-[400]">
            {job.data?.title}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 w-full mt-3">
        <div>
          <label className="text-[#222222] text-[16px] font-[500]">Tags</label>
          <div className="flex flex-wrap gap-2">
            {job.data?.tags?.map((tag, i) => (
              <span
                key={i}
                className="bg-[#F2F4F7] text-[#222222] text-xs px-2 py-1 rounded-full text-[13px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div>
          <label className="text-[#222222] text-[16px] font-[500]">
            Estimated budget
          </label>
          <p className="text-[#6F7487] text-[16px] font-[400]">
            ${job.data?.budget} / hr
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 w-full mt-3">
        <div>
          <label className="text-[#222222] text-[16px] font-[500]">
            Task description
          </label>
          <p className="text-[#6F7487] text-[16px] font-[400]">
            {job.data?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function Proposals(props) {
  const { job } = props;

  return (
    <div className="w-full mt-5">
      <h2 className="text-[#222222] text-[18px] font-[600]">Experts</h2>
      {job.data?.proposals?.length > 0 && (
        <div className="mt-3 flex flex-col gap-3">
          {job.data?.proposals?.map((item, index) => (
            <div
              className="w-full h-[110px] p-5 rounded-xl border border-[#02174C33] flex items-center justify-between"
              key={index}
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.seller.user.profile_picture}
                  alt=""
                  className="w-[80px] h-[80px] rounded-sm object-cover"
                />
                <div>
                  <p className="text-[#6F7487] text-[12px] font-[400]">
                    Request {item.status}
                  </p>
                  <h2 className="text-[#222222] text-[18px] font-[600]">
                    {item.seller.user.first_name} {item.seller.user.last_name}
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to={`/find-experts/${item.seller.id}`}
                  className="bg-[#02174C0F] w-[120px] h-[35px] border border-secondary rounded-sm text-secondary text-[13px] cursor-pointer flex justify-center items-center"
                >
                  See Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
      {job.data?.proposals?.length === 0 && (
        <div className="flex justify-center items-center w-full h-[150px]">
          <ShowMessage title="Didn't received any proposal yet" />
        </div>
      )}
    </div>
  );
}
