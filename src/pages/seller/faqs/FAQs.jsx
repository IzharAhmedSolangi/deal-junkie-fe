import { MdKeyboardArrowRight } from "react-icons/md";
import Layout from "../../../components/shared/Layout";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

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
      <Layout>
        <div className="bg-white w-full h-auto pt-[70px] pb-40 relative">
          <div className="absolute top-[-100px] left-0 w-full h-[400px] bg-cover bg-center bg-[url('/assets/images/Banner2.png')]"></div>
          <h1 className="font-[700] text-[48px] text-center text-secondary mt-4">
            Frequently asked Questions
          </h1>
          <div className="px-[100px] mt-32 flex items-start gap-10">
            <div className="w-[20%] border border-[#02174C12] rounded-md">
              {faqsList.map((item, index) => (
                <div
                  key={index}
                  className={`${
                    item.id === 1 && "rounded-tl-md rounded-tr-md"
                  } ${
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
            <div className="w-[80%]">
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
      </Layout>
    </>
  );
}

export default FAQs;
