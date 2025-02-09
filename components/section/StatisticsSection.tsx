"use client";
import { useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";

// Mock data for served numbers
const servedNumbers = [
  { year: 2022, value: 2000, suffix: "" },
  { year: 2023, value: 4500, suffix: "+" },
  { year: 2024, value: 5000, suffix: "" },
  { year: 2025, value: 10000, suffix: " (aiming)" },
];

const StatisticsSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <section className="py-5">
      <motion.div
        className="container mx-auto text-center"
        onViewportEnter={() => setIsVisible(true)} // Start animation when section comes into view
      >
        {/* Rising Bar Graph */}
        <div className="w-full h-96 flex items-end justify-between space-x-2 md:space-x-4 px-4">
          {servedNumbers.map((item, index) => (
            <motion.div
              key={index}
              className="bg-primary relative"
              style={{ width: `${100 / servedNumbers.length}%` }} // Adjust bar width dynamically
              initial={{ height: 0 }}
              animate={{
                height: isVisible ? `${(item.value / 10000) * 100}%` : 0,
              }}
              transition={{ duration: 2, delay: index * 0.2 }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-center">
                <span className="text-2xl font-semibold text-primary">
                  {isVisible ? (
                    <CountUp
                      end={item.value}
                      duration={5}
                      suffix={item.suffix}
                    />
                  ) : (
                    `0${item.suffix}`
                  )}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Year Labels */}
        <div className="w-full flex justify-between space-x-2 md:space-x-4 px-4 mt-4">
          {servedNumbers.map((item, index) => (
            <div
              key={index}
              className="text-gray-600"
              style={{ width: `${100 / servedNumbers.length}%` }} // Match bar width
            >
              {item.year}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default StatisticsSection;
