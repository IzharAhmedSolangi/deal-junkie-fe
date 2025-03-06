import Layout from "../../components/shared/Layout";

function AboutUs() {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative w-full h-auto bg-white pt-[50px] pb-80 ">
        <div className="absolute top-[-100px] left-0 w-full h-[400px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
        <h1 className="font-[700] text-[48px] text-center text-secondary mt-4">
          About Us
        </h1>
      </div>

      {/* Introduction Section */}
      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-10">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-900">
            Your Marketplace for On-Demand Financial Expertise
          </h2>
          <p className="mt-4 text-gray-600">
            We connect businesses with top-tier financial professionals in M&A,
            private equity, and analytical fields to make informed decisions.
          </p>
        </div>
        <div className="md:w-1/2">
          <img
            src="/assets/images/image-2.png"
            alt="Financial Meeting"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Who We Are Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <img
              src="/assets/images/image-2.png"
              alt="Our Team"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900">Who We Are</h2>
            <ul className="mt-4 text-gray-600 list-disc pl-5 space-y-2">
              <li>Trusted advisors in finance and business strategy</li>
              <li>Experts in private equity and investment management</li>
              <li>Data-driven insights to optimize business growth</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Why Choose Deal Junkie?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {[
            {
              title: "Experts On-Demand",
              desc: "Access top professionals instantly for any financial project.",
            },
            {
              title: "Cost-Effective Solutions",
              desc: "Get expert advice without hiring full-time staff.",
            },
            {
              title: "Data-Driven Insights",
              desc: "Make informed business decisions backed by real analytics.",
            },
            {
              title: "Grow Your Business Effortlessly",
              desc: "Scale your company with trusted expert guidance.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white shadow-lg p-6 rounded-lg text-center"
            >
              <h3 className="text-xl font-semibold text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 mt-2">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-green-100 py-12 text-center">
        <h3 className="text-2xl font-bold text-gray-900">
          Deal Junkie connects you with the best financial professionals for a
          seamless investment experience.
        </h3>
        <button className="mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg">
          Get Started Today
        </button>
      </div>
    </Layout>
  );
}

export default AboutUs;
