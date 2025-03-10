import Image from "next/image";
import PaddingContainer from "../layout/PaddingContainer";
import { TTeamBlock } from "@/interfaces";

import { DynamicFaIcon } from "../DynamicFaIcon";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/getBlurData";

const TeamBlock = async ({ block }: { block: TTeamBlock }) => {
  const teamWithBlur = await Promise.all(
    block?.item?.team?.map(async (member) => ({
      ...member,
      blurDataURL: await getPlaceholderImage(
        `${process.env.NEXT_PUBLIC_ASSETS_URL}${member.team_id.image}`
      ),
    })) || []
  );

  return (
    <div className="py-12 flex justify-center items-center">
      <div className="md:max-w-4xl  grid  md:gap-0 grid-cols-1 md:grid-cols-2">
        {block?.item?.team &&
          teamWithBlur.map((member, index) => (
            <Link
              href={`/team/${member.team_id.slug}`}
              key={index}
              className={` group relative flex-glow justify-center items-center  transition-all duration-300 hover:shadow-lg rounded-lg  md:gap-0 flex ${
                Math.floor(index / 2) % 2 === 0
                  ? "md:flex-row"
                  : "md:flex-row-reverse"
              } ${
                Math.floor(index) % 2 === 0 ? "flex-row" : "flex-row-reverse"
              } `}
            >
              <Image
                alt="Team Member"
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${member.team_id.image}`}
                className=" w-1/2 object-top   aspect-square object-cover self-center md:self-end"
                width={250}
                height={250}
                placeholder="blur"
                blurDataURL={member.blurDataURL}
              />
              <div
                className={`relative md:w-1/2 w-full h-full flex justify-center items-center flex-col p-4 group-hover:bg-primary text-center group-hover:text-white transition-all duration-300 group-hover:shadow-lg bg-white`}
              >
                <h3 className="font-bold  font-lg">{member.team_id.name}</h3>
                <p className="text-sm">{member.team_id.designation}</p>
                <p className="text-sm mt-2 text-center line-clamp-4">
                  {member.team_id.quote}
                </p>
                <hr className="bg-primary h-1 w-12 mt-3 group-hover:bg-white group-hover:shadow-lg transition-all duration-300" />
                <div>
                  {/* <div className="flex flex-wrap items-center">
                    {member.team_id?.socials?.length > 0 &&
                      member.team_id?.socials?.map((social, i) => (
                        <Link
                          href={social.link}
                          target="_blank"
                          key={i}
                          className="  p-2 mt-2   rounded-full group transition-all duration-300"
                        >
                          <DynamicFaIcon
                            iconName={social.icon}
                            size={20}
                            className="group-hover:text-white hover:animate-pulse  text-primary transition-all duration-300"
                          />
                        </Link>
                      ))}
                  </div> */}
                </div>
              </div>
              <div className="absolute top-1/2 rotate-45 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-6 group-hover:bg-primary bg-white transition-all duration-300  " />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default TeamBlock;
