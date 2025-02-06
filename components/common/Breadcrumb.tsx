import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import Link from "next/link";

const Breadcrumb = ({ text }: { text: string }) => {
  return (
    <div className="w-full h-40 bg-[#fbfbfb] flex flex-col justify-center">
      <PaddingContainer>
        <h2 className="text-2xl uppercase tracking-[2.40px] font-black">
          {text}
        </h2>
        <div className="bg-white p-4 w-fit mt-2 font-bold text-sm uppercase tracking-widest">
          {" "}
          <Link className="text-primary" href={"/"}>
            Home
          </Link>{" "}
          : : <span>{text}</span>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default Breadcrumb;
