import Layout from "../../../components/shared/Layout";

function FindJobs() {
  return (
    <>
      <Layout>
        <div className="bg-white w-full h-auto pt-[70px] pb-40 relative">
          <div className="absolute top-[-100px] left-0 w-full h-[400px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
          <div className="relative mt-4">
            <h1 className="font-[700] text-[48px] text-center text-secondary">
              Explore New Jobs
            </h1>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default FindJobs;
