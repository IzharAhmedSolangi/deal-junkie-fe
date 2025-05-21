/* eslint-disable react/prop-types */
import useGetDashboardStats from "../../../services/admin/useGetDashboardStats";
import { FaUsers } from "react-icons/fa";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { MdEditDocument } from "react-icons/md";

function DashboardStats() {
  const { data, isLoading } = useGetDashboardStats();

  return (
    <>
      <div className="grid sm:grid-cols-4 grid-cols-2 gap-2">
        <Card
          title="Sellers"
          icon={<FaUsers />}
          count={data?.total_sellers || 0}
        />
        <Card
          title="Buyers"
          icon={<FaUsers />}
          count={data?.total_buyers || 0}
        />
        <Card
          title="Jobs"
          icon={<MdEditDocument />}
          count={data?.total_jobs || 0}
        />
        <Card
          title="Earning"
          icon={<RiMoneyDollarCircleFill />}
          count={`$${data?.total_earning || 0}`}
        />
      </div>
    </>
  );
}

export default DashboardStats;

function Card(props) {
  const { title, icon, count } = props;
  return (
    <div className="bg-white border border-[#E9EDF7] rounded-xl flex flex-col justify-between md:h-[150px] h-[150px] md:p-5 p-3">
      <div className="flex justify-between items-center  ">
        <h1 className="text-[#02174C] md:text-[25px] text-[18px] font-[600]">
          {title}
        </h1>
        <span className="text-[#02174C] md:text-[30px] text-[20px] font-[600]">
          {count}
        </span>
      </div>
      <div className="flex items-center justify-end text-[40px]">{icon}</div>
    </div>
  );
}
