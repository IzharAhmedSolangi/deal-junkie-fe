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
        question: "Lorem Ipsum is simply dummy text?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        question: "Lorem Ipsum is simply dummy text?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        question: "Lorem Ipsum is simply dummy text?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        question: "Lorem Ipsum is simply dummy text?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        question: "Lorem Ipsum is simply dummy text?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
  },
  {
    id: 2,
    name: "Projects & Tasks",
    faqsItems: [
      {
        question: "Lorem Ipsum is simply dummy text?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        question: "Lorem Ipsum is simply dummy text?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        question: "Lorem Ipsum is simply dummy text?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        question: "Lorem Ipsum is simply dummy text?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
      {
        question: "Lorem Ipsum is simply dummy text?",
        answer:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      },
    ],
  },
  { id: 3, name: "Chat & Reviews" },
  { id: 4, name: "Safety & Privacy" },
  { id: 5, name: "Account & Settings" },
  { id: 6, name: "Payments" },
  { id: 7, name: "Notifications" },
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
