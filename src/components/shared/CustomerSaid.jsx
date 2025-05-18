import { FaStar } from "react-icons/fa";
import "../../styles/testimonial_1.css";
import "../../styles/testimonial_2.css";

function CustomerSaid() {
  const reviews = [
    {
      url: "/assets/reviews/image-1.jpeg",
      name: "David Yacobucci",
      review:
        "“I built Deal Junkie to connect the dots—giving ex-finance professionals in B-school a flexible way to earn while offering smaller investors affordable access to elite-level support. It’s a win-win”",
    },
    {
      url: "/assets/reviews/image-2.jpeg",
      name: "Frank Langfitt",
      review:
        "“Making an account on Deal Junkie was seamless. I now have the ability to use my skills to earn extra income at my fingertips. There is no other platform with as straightforward a user interface as Deal Junkie”",
    },
    {
      url: "/assets/reviews/image-3.jpeg",
      name: "James Gilbert",
      review:
        "“Deal Junkie is the perfect platform to work on your own time, earn extra income, and meet other interesting deal makers. Deal Junkie takes care of all the admin, so investors and providers can focus on what we love, DEALS!”",
    },
    {
      url: "/assets/reviews/image-4.jpeg",
      name: "William",
      review:
        "“As a former consultant, I love that I can now pick up short-term modeling or strategy work without committing to full-time hours. Deal Junkie made that easy, and I picked up my first gig within a week of signing up. Finally, a marketplace that lets me work on my own time!”",
    },
    {
      url: "/assets/reviews/image-5.jpeg",
      name: "Charlie",
      review:
        "“Deal Junkie is a fast, easy-to-use platform that connects professionals with high-quality modeling and diligence work. The UI is clean, communication is streamlined, and projects are well-scoped—making it simple to dive in and deliver value quickly. It’s a great resource for anyone looking to work on meaningful deal-related projects without the usual hassle.”",
    },
  ];
  return (
    <>
      <div className="bg-[#F2F4F7] pt-10 md:pb-40 pb-28">
        <h1 className="mdtext-[40px] text-[28px] font-[600] text-[#1D2939] text-center mb-3">
          What Users Say About Us
        </h1>
        <Testimonial />
      </div>
      {/* <div className="bg-[#F2F4F7] pt-10 md:pb-32 pb-28 md:px-[100px] px-3">
        <h1 className="mdtext-[40px] text-[28px] font-[600] text-[#1D2939] text-center mb-3">
          What Users Say About Us
        </h1>
        <div className="flex md:flex-row flex-col gap-3 overflow-hidden">
          {reviews.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full h-auto md:p-6 p-3 rounded-lg"
              data-aos="fade-up"
            >
              <div className="flex gap-2">
                <img
                  src={item.url}
                  className="w-[45px] h-[45px] rounded-[50%]"
                  alt=""
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="flex gap-1">
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                  </p>
                </div>
              </div>
              <p className="text-[#667085] text-[15px] font-[500] mt-2">
                {item.review}
              </p>
            </div>
          ))}
        </div>
      </div> */}
    </>
  );
}

export default CustomerSaid;

const Testimonial = () => {
  const testimonials_1 = [
    {
      url: "/assets/reviews/image-1.jpeg",
      name: "David Yacobucci",
      review:
        "“I built Deal Junkie to connect the dots—giving ex-finance professionals in B-school a flexible way to earn while offering smaller investors affordable access to elite-level support. It’s a win-win”",
    },
    {
      url: "/assets/reviews/image-2.jpeg",
      name: "Frank Langfitt",
      review:
        "“Making an account on Deal Junkie was seamless. I now have the ability to use my skills to earn extra income at my fingertips. There is no other platform with as straightforward a user interface as Deal Junkie”",
    },
    {
      url: "/assets/reviews/image-3.jpeg",
      name: "James Gilbert",
      review:
        "“Deal Junkie is the perfect platform to work on your own time, earn extra income, and meet other interesting deal makers. Deal Junkie takes care of all the admin, so investors and providers can focus on what we love, DEALS!”",
    },
    {
      url: "/assets/reviews/image-4.jpeg",
      name: "William",
      review:
        "“As a former consultant, I love that I can now pick up short-term modeling or strategy work without committing to full-time hours. Deal Junkie made that easy, and I picked up my first gig within a week of signing up. Finally, a marketplace that lets me work on my own time!”",
    },
    {
      url: "/assets/reviews/image-5.jpeg",
      name: "Charlie",
      review:
        "“Deal Junkie is a fast, easy-to-use platform that connects professionals with high-quality modeling and diligence work. The UI is clean, communication is streamlined, and projects are well-scoped—making it simple to dive in and deliver value quickly. It’s a great resource for anyone looking to work on meaningful deal-related projects without the usual hassle.”",
    },
  ];

  const testimonials_2 = [
    {
      url: "https://randomuser.me/api/portraits/men/52.jpg",
      name: "Darlene Robertson",
      review:
        "The client onboarding process is seamless, and I've been able to build long-term relationships with minimal effort.",
    },
    {
      url: "https://randomuser.me/api/portraits/women/33.jpg",
      name: "Theresa Webb",
      review:
        "I love the flexibility this gives me to work from anywhere and still deliver value to my clients. Super professional setup!",
    },
    {
      url: "https://randomuser.me/api/portraits/men/29.jpg",
      name: "Jerome Bell",
      review:
        "What sets this platform apart is how easy it is to match with serious investors. I no longer waste time chasing dead leads.",
    },
    {
      url: "https://randomuser.me/api/portraits/women/76.jpg",
      name: "Kristin Watson",
      review:
        "This has been a game-changer for my consulting business. I'm consistently booked and appreciated by clients who respect my time.",
    },
    {
      url: "https://randomuser.me/api/portraits/men/64.jpg",
      name: "Floyd Miles",
      review:
        "Deal Junkie gives me the tools and exposure to work with clients globally. It’s become a core part of my workflow.",
    },
    {
      url: "https://randomuser.me/api/portraits/women/18.jpg",
      name: "Kathryn Murphy",
      review:
        "I was skeptical at first, but within two weeks I landed my first client. The support team is amazing too!",
    },
    {
      url: "https://randomuser.me/api/portraits/men/85.jpg",
      name: "Devon Lane",
      review:
        "The interface is sleek, and I can manage all my consultations and deliverables from one place. It’s built for professionals.",
    },
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="marq_1">
        <div className="marq_group_1">
          {testimonials_1.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full md:h-[260px] h-[250px] md:p-6 p-3 rounded-lg"
            >
              <div className="flex gap-2">
                <img
                  src={item.url}
                  className="w-[45px] h-[45px] rounded-[50%]"
                  alt=""
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="flex gap-1">
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                  </p>
                </div>
              </div>
              <p className="text-[#667085] text-[15px] font-[500] mt-2">
                {item.review}
              </p>
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="marq_group_1">
          {testimonials_1.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full md:h-[260px] h-[250px] md:p-6 p-3 rounded-lg"
            >
              <div className="flex md:gap-2 gap-1">
                <img
                  src={item.url}
                  className="w-[45px] h-[45px] rounded-[50%]"
                  alt=""
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="flex gap-1">
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                  </p>
                </div>
              </div>
              <p className="text-[#667085] text-[15px] font-[500] mt-2">
                {item.review}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="marq_2">
        <div className="marq_group_2">
          {testimonials_2.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full md:h-[200px] h-[200px] md:p-6 p-3 rounded-lg"
            >
              <div className="flex gap-2">
                <img
                  src={item.url}
                  className="w-[45px] h-[45px] rounded-[50%]"
                  alt=""
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="flex gap-1">
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                  </p>
                </div>
              </div>
              <p className="text-[#667085] text-[15px] font-[500] mt-2">
                {item.review}
              </p>
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="marq_group_2">
          {testimonials_2.map((item, index) => (
            <div
              key={index}
              className="bg-white w-full md:h-[200px] h-[200px] md:p-6 p-3 rounded-lg"
            >
              <div className="flex md:gap-2 gap-1">
                <img
                  src={item.url}
                  className="w-[45px] h-[45px] rounded-[50%]"
                  alt=""
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="flex gap-1">
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                    <FaStar className="text-primary" />
                  </p>
                </div>
              </div>
              <p className="text-[#667085] text-[15px] font-[500] mt-2">
                {item.review}
              </p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};
