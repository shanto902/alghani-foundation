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
    <section className="md:px-10 py-10 my-10 px-5 max-w-5xl mx-auto bg-primary md:rounded-lg">
      <motion.div
        className="mx-auto"
        onViewportEnter={() => setIsVisible(true)} // Start animation when section comes into view
      >
        <h2 className="text-3xl font-bold text-center pb-5 text-white">
          Total Served Numbers
        </h2>

        {/* Horizontal Bar Graph */}
        <div className="w-full flex flex-col space-y-4">
          {block.item.numbers.map((item, index) => {
            const { number, prefix, suffix } = parseStat(item.value.toString());
            const widthPercentage =
              maxNumber > 0 ? (number / maxNumber) * 100 : 0;

            return (
              <div key={index} className="flex items-center space-x-4 w-full">
                {/* Year Label (Left Side) */}
                <span className="text-white font-extrabold text-2xl w-20 text-right">
                  {item.year}
                </span>

                {/* Bar Container */}
                <div className="relative flex-1 h-10  rounded-lg overflow-hidden">
                  {/* Animated Bar */}
                  <motion.div
                    className="bg-white h-10 rounded-lg absolute left-0 top-0"
                    initial={{ width: 0 }}
                    animate={{ width: isVisible ? `${widthPercentage}%` : 0 }}
                    transition={{ duration: 2, delay: index * 0.2 }}
                  ></motion.div>
                </div>

                {/* Value (Right Side) */}
                <motion.span
                  className="text-xl text-white font-semibold w-fit text-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                >
                  {isVisible ? (
                    <CountUp
                      className="text-lg md:text-xl"
                      start={0}
                      end={number}
                      duration={5}
                      prefix={prefix}
                      suffix={suffix}
                    />
                  ) : (
                    `${prefix}0${suffix}`
                  )}
                </motion.span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default ServedNumbers;
