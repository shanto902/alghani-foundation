"use client";
import React, { JSX, useState } from "react";
import CountUp from "react-countup";
import { motion } from "framer-motion"; // Import motion
import {
  FaBook,
  FaHeart,
  FaWater,
  FaTree,
  FaMapMarkerAlt,
  FaParking,
} from "react-icons/fa";

interface SustainabilityGoal {
  id: number;
  icon: JSX.Element;
  title: string;
  description: string;
  stat?: string;
}

const sustainabilityGoals: SustainabilityGoal[] = [
  {
    id: 1,
    icon: <FaTree className="text-green-500 text-4xl" />,
    title: "Trees Planted",
    description: "Contributing to a greener planet.",
    stat: "68,891",
  },
  {
    id: 2,
    icon: <FaParking className="text-blue-500 text-4xl" />,
    title: "Green Public Spaces",
    description: "Creating sustainable community areas.",
    stat: "15",
  },
  {
    id: 3,
    icon: <FaMapMarkerAlt className="text-yellow-500 text-4xl" />,
    title: "Districts Covered",
    description: "Expanding our impact across regions.",
    stat: "8",
  },
  {
    id: 4,
    icon: <FaWater className="text-blue-500 text-4xl" />,
    title: "Clean Water Access",
    description: "Providing clean drinking water to communities.",
    stat: "10,000+",
  },
  {
    id: 5,
    icon: <FaBook className="text-yellow-500 text-4xl" />,
    title: "Education for All",
    description: "Supporting education for underprivileged children.",
    stat: "5,000+",
  },
  {
    id: 6,
    icon: <FaHeart className="text-red-500 text-4xl" />,
    title: "Healthcare Initiatives",
    description: "Ensuring medical support in rural areas.",
    stat: "20+",
  },
];

const parseStat = (stat: string) => {
  const match = stat.match(/^([^0-9]*)(\d[\d,]*)([^0-9]*)$/);
  if (!match) return { number: NaN, prefix: "", suffix: "" };

  const [, prefix, numStr, suffix] = match;
  const number = parseInt(numStr.replace(/,/g, ""), 10);

  return { number, prefix, suffix };
};

const SustainabilitySection = () => {
  return (
    <div className="grid max-w-4xl mx-auto md:grid-cols-2 lg:grid-cols-2 justify-center  my-10">
      {sustainabilityGoals.map((goal) => {
        const { number, prefix, suffix } = goal.stat
          ? parseStat(goal.stat)
          : { number: 0, prefix: "", suffix: "" };

        const [isVisible, setIsVisible] = useState(false);

        return (
          <motion.div
            key={goal.id}
            className={`p-6 container flex flex-row items-center justify-between text-center  ${
              Math.floor(goal.id / 2) % 2 === 0
                ? "md:bg-primary md:text-white"
                : "md:bg-white md:text-black"
            } ${
              goal.id % 2 === 0
                ? "bg-primary text-white"
                : "bg-white text-black"
            }`}
            onViewportEnter={() => setIsVisible(true)}
          >
            <div>
              {goal.icon}
              <h3 className="text-lg font-bold mt-2">{goal.title}</h3>
            </div>
            {goal.stat && (
              <div className="text-3xl font-bold">
                {isVisible ? (
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

export default SustainabilitySection;
