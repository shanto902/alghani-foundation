import React, { JSX } from "react";
import { FaBook, FaHeart, FaLeaf, FaWater } from "react-icons/fa";
interface SustainabilityGoal {
  id: number;
  icon: JSX.Element;
  title: string;
  description: string;
}

// Sustainability goals
const sustainabilityGoals: SustainabilityGoal[] = [
  {
    id: 1,
    icon: <FaLeaf className="text-green-500 text-4xl" />,
    title: "Environmental Protection",
    description: "Promoting eco-friendly solutions.",
  },
  {
    id: 2,
    icon: <FaWater className="text-blue-500 text-4xl" />,
    title: "Clean Water Access",
    description: "Providing clean drinking water to communities.",
  },
  {
    id: 3,
    icon: <FaBook className="text-yellow-500 text-4xl" />,
    title: "Education for All",
    description: "Supporting education for underprivileged children.",
  },
  {
    id: 4,
    icon: <FaHeart className="text-red-500 text-4xl" />,
    title: "Healthcare Initiatives",
    description: "Ensuring medical support in rural areas.",
  },
];

const SustainabilitySection = () => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
      {sustainabilityGoals.map((goal) => (
        <div
          key={goal.id}
          className="bg-white p-4 flex flex-col items-center text-center"
        >
          {goal.icon}
          <h3 className="text-lg font-bold mt-2">{goal.title}</h3>
          <p className="text-gray-600">{goal.description}</p>
        </div>
      ))}
    </div>
  );
};

export default SustainabilitySection;
