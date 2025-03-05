"use client";

import Image from "next/image";
import PaddingContainer from "../layout/PaddingContainer";
import { TTeamBlock } from "@/interfaces";

const TeamBlock = ({ block }: { block: TTeamBlock }) => {
  return (
    <PaddingContainer className="py-16 flex justify-center items-center">
      <div className="md:max-w-5xl max-w-sm gap-5 grid  md:gap-0 grid-cols-1 md:grid-cols-2">
        {block.item.team.map((member, index) => (
          <div
            key={index}
            className={` group flex-glow justify-center items-center md:border-0 border-2 md:rounded-none transition-all duration-300 hover:shadow-lg rounded-lg  border-primary md:gap-0 flex flex-col ${
              Math.floor(index / 2) % 2 === 0
                ? "md:flex-row"
                : "md:flex-row-reverse"
            } `}
          >
            <Image
              alt="Team Member"
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${member.team_id.image}`}
              className=" md:w-1/2 object-top   aspect-square object-cover self-center md:self-end"
              width={250}
              height={250}
            />
            <div className=" md:w-1/2 h-full flex justify-center items-center flex-col p-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <h3 className="font-bold font-lg">{member.team_id.name}</h3>
              <p className="text-sm">{member.team_id.designation}</p>
              <p className="text-sm mt-2 text-center">{member.team_id.quote}</p>
              <hr className="bg-primary h-1 w-12 mt-8 group-hover:bg-white transition-all duration-300" />
            </div>
          </div>
        ))}
      </div>
    </PaddingContainer>
  );
};

export default TeamBlock;
