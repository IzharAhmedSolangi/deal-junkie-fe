import AppHead from "../../seo/AppHead";

function Dashboard() {
  return (
    <>
      <AppHead title="Dashboard - Deal Junkie" />
      <div className="w-full h-auto p-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[#02174C] text-[30px] font-[600]">Dashboard</h1>
        </div>
        <div className="mt-3"></div>
      </div>
    </>
  );
}

export default Dashboard;
