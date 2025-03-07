import CareerCard from "@/components/card/CareerCard";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { getPartialCareersData } from "@/helpers/fetchFromDirectus";
import React from "react";

const page = async () => {
  const careers = await getPartialCareersData();

  return (
    <PaddingContainer className="py-10">
      <p className="text-center">Open Positions</p>
      <h2 className="text-center text-4xl font-bold py-5">
        Become a Part of Our Team
      </h2>
      <div className="flex my-10 flex-col items-center w-full">
        {careers.map((career) => (
          <CareerCard key={career.id} career={career} />
        ))}
      </div>
    </PaddingContainer>
  );
};

export default page;
