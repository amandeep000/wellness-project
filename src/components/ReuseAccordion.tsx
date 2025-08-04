import { current } from "@reduxjs/toolkit";
import { useEffect, useRef, useState } from "react";

type AccordionItem = {
  id: string;
  question: string;
  answer: string;
};

const data: AccordionItem[] = [
  {
    id: "1",
    question: "are wellness supplements safe to use?",
    answer:
      "Absolutely! All our products are manufactured in certified facilities and meet strict safety and quality standards. We recommend consulting your healthcare provider if you have specific health conditions or are taking medications.This is the demo store.",
  },
  {
    id: "2",
    question: "How should i store my supplements?",
    answer:
      "To ensure the freshness and effectiveness of our products, store them in a cool, dry place away from direct sunlight. Always keep them out of reach of children.",
  },
  {
    id: "3",
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide! Shipping costs and delivery times may vary depending on your location. You can find more details on our Shipping Policy page.",
  },
  {
    id: "4",
    question: "What is your return policy?",
    answer:
      "We offer a 30-day satisfaction guarantee. If you're not completely happy with your purchase, you can return it for a refund or exchange. Please visit our Return Policy page for more details.",
  },
];

const Accordion = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {data.map(({ id, question, answer }) => {
        const isOpen = openId === id;
        return (
          <div key={id} className="border-b">
            <button
              onClick={() => toggleAccordion(id)}
              className="w-full flex justify-between items-center py-3 font-medium text-left focus:outline-none"
            >
              <span className="capitalize text-lg font-semibold">
                {question}
              </span>
              <span className="cursor-pointer">
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                )}
              </span>
            </button>
            <div
              className={`px-4 pb-4 transition-all duration-500 ease-in-out overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
            >
              {answer}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
