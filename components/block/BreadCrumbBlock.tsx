import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import Link from "next/link";
import { TBreadCrumbBlock } from "@/interfaces";

const BreadCrumbBlock = ({ block }: { block: TBreadCrumbBlock }) => {
  // console.log(block);
  return (
    <div className="w-full h-40 bg-primary flex flex-col justify-center">
      <PaddingContainer>
        <h2 className="text-2xl text-white  uppercase tracking-[2.40px] font-black">
          {block.item.section_name || block.item.page_name}
        </h2>
        <div className="bg-white p-4 w-fit mt-4 font-bold text-sm uppercase tracking-widest">
          {" "}
          <Link className="text-primary" href={"/"}>
            Home
          </Link>{" "}
          : : <span> {block.item.page_name}</span>
        </div>
      </PaddingContainer>
    </div>
  );
};

export default BreadCrumbBlock;
