import { TCareer } from "@/interfaces";
import React from "react";

import { slugify } from "@/lib/slugify";
import CustomButton from "../common/CustomButton";

const CareerCard = ({ career }: { career: TCareer }) => {
  return (
    <div className="bg-white border-2 p-10 hover:shadow-xl transition-all duration-300 md:min-w-5xl flex-col md:flex-row  flex rounded-lg justify-between md:items-center gap-10">
      <h2 className="text-2xl font-bold">{career.position}</h2>
      <div className="flex items-center gap-4 text-xs text-white font-bold">
        <h3 className="bg-primary px-3 rounded-lg py-2">
          {career.company_name}
        </h3>
        <h4 className="bg-primary px-3 rounded-lg py-2">{career.location}</h4>
      </div>

      <CustomButton
        className="text-sm w-fit"
        href={`/career/${slugify(career.position)}`}
      >
        Read More
      </CustomButton>
    </div>
  );
};
export default CareerCard;
