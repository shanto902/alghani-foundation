"use client";

import { useState } from "react";
import { Disclosure } from "@headlessui/react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

interface FAQItem {
  title: string;
  content: string;
}

export default function FAQSection({
  faqs,
}: {
  faqs: { title: string; description: string }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
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
                  {faq.description}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
