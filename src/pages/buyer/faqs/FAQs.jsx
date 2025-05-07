import { MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import AppHead from "../../../seo/AppHead";

const faqsList = [
  {
    id: 1,
    name: "Getting Started",
    faqsItems: [
      {
        question: "What is dealjunkie.net?",
        answer:
          "dealjunkie.net is a professional marketplace that connects individuals, investors, and companies with pre-vetted finance professionals (including ex-bankers, private equity analysts, and consultants) for on-demand financial services like due diligence, modeling, and valuation.",
      },
      {
        question: "Who can join as a buyer or expert?",
        answer:
          "Anyone can join as a buyer. To join as an expert, you must have a finance background (e.g., IB, PE, HF, M&A consulting) and verify your identity and work history through LinkedIn.",
      },
      {
        question: "How is the platform different from Upwork or Fiverr?",
        answer:
          "dealjunkie.net is specialized. We only host financial professionals with credible backgrounds and verified credentials. This ensures clients receive institutional-quality work at freelance prices.",
      },
    ],
  },
  {
    id: 2,
    name: "Projects & Tasks",
    faqsItems: [
      {
        question: "What kinds of projects can I post?",
        answer:
          "Service seekers typically post projects like: Financial model builds, Deal memos or investment write-ups, Market research, Cap table modeling, Acquisition support, Pitch deck reviews, Due diligence support",
      },
      {
        question:
          "Can I hire someone for recurring work or a long-term engagement?",
        answer:
          "Yes. You can work with the same expert on multiple projects or request a retainer-style arrangement, all handled through the platform.",
      },
      {
        question: "Can I take the relationship off-platform?",
        answer:
          "To protect the integrity of the marketplace, off-platform engagements are prohibited unless a break fee of $10,000 is paid by the client to dealjunkie.net. This allows for flexibility while supporting the platform and its operations. Violations of this policy may result in account suspension and legal recourse.",
      },
    ],
  },
  {
    id: 3,
    name: "Chat & Reviews",
    faqsItems: [
      {
        question: "How do I communicate with experts before hiring?",
        answer:
          "You can message experts through the dealjunkie.net platform as soon as you post a project or express interest in a seller. All communications must occur on-platform.",
      },
      {
        question: "Can I review an expert after working with them?",
        answer:
          "Yes. Once a project is completed, buyers are prompted to leave a review based on communication, quality of work, and professionalism.",
      },
      {
        question: "Can I remove or edit a review?",
        answer:
          "We do not allow manual review edits after submission unless there was a mistake or abuse. You may contact our support team to resolve any disputes related to reviews.",
      },
    ],
  },
  {
    id: 4,
    name: "Safety & Privacy",
    faqsItems: [
      {
        question: "Is my data secure on dealjunkie.net?",
        answer:
          "We use SSL encryption, firewalls, and secure data practices to protect all information and communications on the platform. However, no system is completely immune to cyber threats. In the rare case of a breach, dealjunkie.net is not liable for any direct or indirect damages resulting from unauthorized access.",
      },
      {
        question: "Who is responsible for NDAs or confidentiality agreements?",
        answer:
          "It is the responsibility of the service seeker and the service provider to negotiate and execute NDAs or confidentiality clauses before beginning work. dealjunkie.net is not a party to such agreements and assumes no liability for violations.",
      },
      {
        question: "How do you prevent fraud or impersonation?",
        answer:
          "All experts must verify their identity and professional background through LinkedIn. We also monitor platform activity to detect fraudulent behavior or policy violations.",
      },
    ],
  },
  {
    id: 5,
    name: "Account & Settings",
    faqsItems: [
      {
        question: "Can I edit or delete my profile?",
        answer:
          "Yes. You can edit your profile, work history, and service offerings anytime. If you'd like to permanently delete your account, please contact support@dealjunkie.net.",
      },
      {
        question: "How do I update my payment or notification settings?",
        answer:
          "All account settings are accessible from your dashboard. Go to 'Account & Settings' to update payment methods, notification preferences, and personal details.",
      },
      {
        question: "Can I pause or deactivate my account temporarily?",
        answer:
          "Yes. You can request a temporary deactivation via your settings or by contacting our team.",
      },
    ],
  },
  {
    id: 6,
    name: "Payments",
    faqsItems: [
      {
        question: "How does payment work?",
        answer:
          "Clients fund the project upfront. Funds are held in escrow and only released to the expert once the deliverables are approved.",
      },
      {
        question: "What payment methods are accepted?",
        answer:
          "We support credit cards and ACH payments via Stripe. Experts can receive payouts via bank transfer or other supported withdrawal methods.",
      },
      {
        question: "Is there a platform fee?",
        answer:
          "Yes. Experts are charged a 20% platform fee on their earnings. Clients pay only the quoted project price unless they exceed their subscription plan (if applicable).",
      },
      {
        question: "What happens if a client or expert fails to deliver?",
        answer:
          "dealjunkie.net offers dispute mediation services. If either party fails to meet the agreed terms, we will work to resolve the situation fairly, though we do not guarantee restitution in all cases.",
      },
    ],
  },
  {
    id: 7,
    name: "Notifications",
    faqsItems: [
      {
        question: "How will I know if I get hired or receive a message?",
        answer:
          "You’ll receive real-time notifications by email and through the platform dashboard. Make sure your notification settings are enabled in your account preferences.",
      },
      {
        question: "Can I opt out of promotional messages?",
        answer:
          "Yes. Promotional messages can be toggled off in your communication preferences without affecting platform notifications related to projects or payments.",
      },
      {
        question: "What if I miss a deadline or message?",
        answer:
          "Late responses can affect your profile rating. We encourage timely communication and will remind you of project milestones via automatic alerts.",
      },
    ],
  },
];

function FAQs() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const toggleQuestion = (index) => {
    setSelectedQuestion(selectedQuestion === index ? null : index);
  };

  const selectedFaqs =
    faqsList.find((item) => item.id === selectedCategory)?.faqsItems || [];

  return (
    <>
      <AppHead title="FAQs - Deal Junkie" />
      <div className="bg-white w-full h-auto md:pb-40 pb-28 relative">
        <div className="w-full md:h-[320px] h-[260px] flex justify-center items-center px-3">
          <img
            src="/assets/images/Banner2.png"
            alt=""
            className="absolute top-0 left-0 w-full md:h-[320px] h-[260px]"
          />
          <h1 className="font-[700] md:text-[48px] text-[30px] text-secondary z-10 text-center">
            Frequently asked Questions
          </h1>
        </div>
        <div className="md:px-[80px] px-5 py-8 flex md:flex-row flex-col items-start md:gap-10 gap-5">
          <div className="md:w-[20%] w-full border border-[#02174C12] rounded-md">
            {faqsList.map((item, index) => (
              <div
                key={index}
                className={`${item.id === 1 && "rounded-tl-md rounded-tr-md"} ${
                  item.id === 7 && "rounded-bl-md rounded-br-md border-none"
                } w-full h-[50px] cursor-pointer px-2 flex items-center justify-between border-b border-b-[#02174C12] text-[15px] font-normal text-[#222222] hover:bg-secondary hover:text-white ${
                  selectedCategory === item.id && "bg-secondary text-white"
                }`}
                onClick={() => setSelectedCategory(item.id)}
              >
                <span>{item.name}</span>
                <MdKeyboardArrowRight />
              </div>
            ))}
          </div>
          {/* FAQs Content */}
          <div className="md:w-[80%] w-full">
            {selectedFaqs.length > 0 ? (
              selectedFaqs.map((item, index) => (
                <div
                  key={index}
                  className="w-full py-3 border-t border-t-[#02174C12] transition-all duration-300 ease-in-out"
                >
                  <div
                    onClick={() => toggleQuestion(index)}
                    className="flex justify-between items-center w-full cursor-pointer"
                  >
                    <span
                      className={`w-auto text-[18px] font-semibold ${
                        selectedQuestion === index
                          ? "text-secondary"
                          : "text-[#222222]"
                      }`}
                    >
                      {item.question}
                    </span>
                    <span
                      className={`${
                        selectedQuestion === index ? "rotate-180" : "rotate-0"
                      } transition-transform duration-300 ease-in-out w-[25px] h-[25px] bg-[#F9FAFF] rounded-full flex justify-center items-center`}
                    >
                      <IoIosArrowDown className="text-[#222]" />
                    </span>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      selectedQuestion === index ? "h-auto py-6" : "max-h-0"
                    }`}
                  >
                    <div className="text-[#6F7487] text-[14px] font-normal w-full">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[#6F7487] text-[18px] font-normal flex justify-center items-center w-full h-[300px]">
                No FAQs available for this category.
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FAQs;
