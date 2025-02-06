import React from "react";
import CustomButton from "../common/CustomButton";

const CTASection = () => {
  return (
    <div className="h-44 w-full bg-black flex items-center justify-center">
      <div className=" border-r-2 pr-5 text-white text-2xl font-bold  uppercase leading-9 tracking-wider">
        Make Bangladesh healthy, safe and just
      </div>

      <CustomButton
        href="#"
        className="bg-black text-primaryLight px-6 py-2 ml-8  "
      >
        Donate Now
      </CustomButton>
    </div>
  );
};

export default CTASection;
