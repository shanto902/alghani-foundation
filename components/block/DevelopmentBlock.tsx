"use client";
import React, { useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { parseStat } from "@/lib/parseStat";
import { TDevelopmentBlock } from "@/interfaces";
import { DynamicIcon } from "../common/DynamicIcon";
import { g } from "framer-motion/client";

const DevelopmentBlock = ({ block }: { block: TDevelopmentBlock }) => {
  const [visibleSectors, setVisibleSectors] = useState<{
    [key: number]: boolean;
  }>({});

  return (
    <div className="grid md:max-w-4xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-2 justify-center my-10">
      {block.item.sectors.map((goal, index) => {
        const { number, prefix, suffix } = goal.sector_id.value
          ? parseStat(goal.sector_id.value.toString())
          : { number: 0, prefix: "", suffix: "" };

        return (
          <motion.div
            key={index + 1}
            className={`p-6 container flex flex-row items-center justify-between text-center ${
              Math.floor(index + 1 / 2) % 2 === 0
                ? "md:bg-primary md:text-white"
                : "md:bg-white md:text-black"
            } ${
              (index + 1) % 2 === 0
                ? "bg-primary text-white"
                : "bg-white text-black"
            }`}
            onViewportEnter={() =>
              setVisibleSectors((prev) => ({
                ...prev,
                [index + 1]: true,
              }))
            }
          >
            <div>
              <DynamicIcon
                iconName={goal.sector_id.icon}
                size={40}
                color={goal.sector_id.color}
              />
              <h3 className="text-lg font-bold mt-2">{goal.sector_id.label}</h3>
            </div>
            {goal.sector_id.value && (
              <div className="text-3xl font-bold">
                {visibleSectors[index + 1] ? (
                  <CountUp
                    start={0}
                    end={number}
                    prefix={prefix}
                    suffix={suffix}
                    duration={2}
                  />
                ) : (
                  `${prefix}0${suffix}`
                )}
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default DevelopmentBlock;
