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
    <section className="md:px-10  py-10 px-5 max-w-5xl mx-auto bg-primary md:rounded-lg ">
      <motion.div
        className=" mx-auto"
        onViewportEnter={() => setIsVisible(true)} // Start animation when section comes into view
      >
        <h2 className="text-3xl font-bold text-center pb-5  text-white">
          Total Served Numbers
        </h2>
        {/* Horizontal Bar Graph */}
        <div className="w-full flex flex-col space-y-4 ">
          {block.item.numbers.map((item, index) => {
            const { number, prefix, suffix } = parseStat(item.value.toString());

            const widthPercentage =
              maxNumber > 0 ? (number / maxNumber) * 100 : 0;

            return (
              <div
                key={index}
                className="flex justify-start items-center p-2 space-x-2"
              >
                {/* Year Label */}
                <span className="text-white font-extrabold text-2xl flex-1/2 text-right">
                  {item.year}
                </span>

                {/* Bar and Number */}
                <motion.div
                  className="bg-white h-10 rounded-lg relative flex-1/2 flex items-center "
                  style={{ minWidth: "50px" }}
                  initial={{ width: 0 }}
                  animate={{ width: isVisible ? `${widthPercentage}%` : 0 }}
                  transition={{ duration: 2, delay: index * 0.2 }}
                >
                  <motion.span
                    className="absolute right-2 text-xl text-black font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: isVisible ? 100 : 0,
                    }}
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
                </motion.div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default ServedNumbers;
