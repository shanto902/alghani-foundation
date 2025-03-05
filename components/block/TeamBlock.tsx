"use client";

import Image from "next/image";
import PaddingContainer from "../layout/PaddingContainer";
import { TTeamBlock } from "@/interfaces";

const TeamBlock = ({ block }: { block: TTeamBlock }) => {
  return (
    <PaddingContainer className="py-16 flex justify-center items-center">
      <div className="max-w-[1000px]  grid  gap-0 grid-cols-1 md:grid-cols-2">
        {block.item.team.map((member, index) => (
          <div
            key={index}
            className={` group flex-glow flex ${
              Math.floor(index / 2) % 2 === 0 ? "flex-row" : "flex-row-reverse"
            } `}
          >
            <Image
              alt="Team Member"
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${member.team_id.image}`}
              className="md:max-w-[250px] w-1/2  aspect-square object-cover self-end"
              width={250}
              height={250}
            />
            <div className=" w-1/2 md:max-w-[250px] h-[250px] flex justify-center items-center flex-col p-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
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
