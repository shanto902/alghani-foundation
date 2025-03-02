"use client";
import React, { useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { parseStat } from "@/lib/parseStat";
import { TDevelopmentBlock } from "@/interfaces";
import { DynamicIcon } from "../common/DynamicIcon";

const DevelopmentBlock = ({ block }: { block: TDevelopmentBlock }) => {
  const [visibleSectors, setVisibleSectors] = useState<{
    [key: number]: boolean;
  }>({});

  return (
    <div className="grid max-w-4xl mx-auto md:grid-cols-2 lg:grid-cols-2 justify-center my-10">
      {block.item.sectors.map((goal) => {
        const { number, prefix, suffix } = goal.sector_id.value
          ? parseStat(goal.sector_id.value.toString())
          : { number: 0, prefix: "", suffix: "" };

        return (
          <motion.div
            key={goal.sector_id.id}
            className={`p-6 container flex flex-row items-center justify-between text-center ${
              Math.floor(goal.sector_id.id / 2) % 2 === 0
                ? "md:bg-primary md:text-white"
                : "md:bg-white md:text-black"
            } ${
              goal.sector_id.id % 2 === 0
                ? "bg-primary text-white"
                : "bg-white text-black"
            }`}
            onViewportEnter={() =>
              setVisibleSectors((prev) => ({
                ...prev,
                [goal.sector_id.id]: true,
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
                {visibleSectors[goal.sector_id.id] ? (
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
