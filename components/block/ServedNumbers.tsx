"use client";
import { useState, useMemo } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { TServedNumbersBlock } from "@/interfaces";
import { parseStat } from "@/lib/parseStat";

const ServedNumbers = ({ block }: { block: TServedNumbersBlock }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Find the maximum number dynamically
  const maxNumber = useMemo(() => {
    return Math.max(
      ...block.item.numbers.map(
        (item) => parseStat(item.value.toString()).number
      )
    );
  }, [block]);

  return (
    <section className="py-5">
      <motion.div
        className="container mx-auto text-center"
        onViewportEnter={() => setIsVisible(true)} // Start animation when section comes into view
      >
        {/* Rising Bar Graph */}
        <div className="w-full h-96 flex items-end justify-between space-x-2 md:space-x-4 px-4">
          {block.item.numbers.map((item, index) => {
            const { number, prefix, suffix } = parseStat(item.value.toString());

            // Scale height dynamically relative to maxNumber
            const heightPercentage =
              maxNumber > 0 ? (number / maxNumber) * 100 : 0;

            return (
              <motion.div
                key={index}
                className="bg-primary relative"
                style={{ width: `${100 / block.item.numbers.length}%` }} // Adjust bar width dynamically
                initial={{ height: 0 }}
                animate={{
                  height: isVisible ? `${heightPercentage}%` : 0, // Dynamically adjust height
                }}
                transition={{ duration: 2, delay: index * 0.2 }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-center">
                  <span className="text-2xl font-semibold text-primary">
                    {isVisible ? (
                      <CountUp
                        start={0}
                        end={number}
                        duration={5}
                        prefix={prefix}
                        suffix={suffix}
                      />
                    ) : (
                      `${prefix}0${suffix}`
                    )}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Year Labels */}
        <div className="w-full flex justify-between space-x-2 md:space-x-4 px-4 mt-4">
          {block.item.numbers.map((item, index) => (
            <div
              key={index}
              className="text-gray-600"
              style={{ width: `${100 / block.item.numbers.length}%` }}
            >
              {item.year}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ServedNumbers;
