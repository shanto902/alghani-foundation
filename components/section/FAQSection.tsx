"use client";

import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface FAQItem {
  title: string;
  content: string;
}

const faqs: FAQItem[] = [
  {
    title: "Quality Education",
    content:
      "With access to quality education, children become lifelong learners, transforming their communities...",
  },
  {
    title: "Nutritional Support",
    content:
      "Your sponsorship helps provide nutritious meals and food support to children...",
  },
  {
    title: "Healthcare",
    content:
      "Children receive essential medical checkups and healthcare services...",
  },
  {
    title: "Sustainable Development",
    content: "We work towards sustainable solutions, empowering communities...",
  },
  {
    title: "Expense Breakdown",
    content: "Your contribution is allocated across various support areas...",
  },
  {
    title: "Additional Contribution",
    content:
      "You can choose to make additional contributions, helping expand the impact...",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          FAQs About Sponsor A Child Program
        </h2>

        <div className="space-y-2">
          {faqs.map((faq: FAQItem, index: number) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className={`flex justify-between items-center w-full px-6 py-4 text-left text-lg font-semibold transition-all ${
                  openIndex === index
                    ? "bg-primary text-white"
                    : "bg-white text-black"
                }`}
              >
                <span>{faq.title}</span>
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 text-gray-700 bg-white">
                  {faq.content}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
