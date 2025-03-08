import PressCard from "@/components/card/PressCard";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { getAllPress } from "@/helpers/fetchFromDirectus";
import React from "react";

const page = async () => {
  const pressData = await getAllPress();

  return (
    <PaddingContainer>
      <div className="flex flex-col justify-center">
        {pressData?.map((data) => (
          <PressCard key={data.id} data={data} />
        ))}
      </div>
    </PaddingContainer>
  );
};

export default page;
