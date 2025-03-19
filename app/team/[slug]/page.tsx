import { DynamicFaIcon } from "@/components/DynamicFaIcon";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostBody from "@/components/post-body/PostBody";
import { getTeamData } from "@/helpers/fetchFromDirectus";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface PageProps {
  params: Promise<{
    permalink: string;
    slug: string;
  }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const member = await getTeamData(slug);

    const previousImages = (await parent).openGraph?.images || [];
    if (member !== null) {
      return {
        title: member.team_id.name,
        description:
          `${member.team_id.designation} - ${member.team_id.quote}` || "",
        openGraph: {
          images: member.team_id.image
            ? [
                {
                  url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${member.team_id.image}`,
                },
              ]
            : [...previousImages],
        },
      };
    }

    // Default metadata if the page is not found
    return {
      title: "member not Found",
      description: "This page does not exist.",
    };
  } catch (error) {
    console.error("Error fetching page metadata:", error);

    // Return default metadata in case of error
    return {
      title: "Error",
      description: "Failed to fetch page metadata.",
    };
  }
}
export const generateStaticParams = async () => {
  try {
    const result = await directus.request(
      readItems("team", {
        fields: ["slug"],
      })
    );

    const allParams =
      (
        result as {
          slug: string;
        }[]
      ).map((item) => ({
        slug: item.slug,
        permalink: "team",
      })) || [];

    return allParams;
  } catch (error) {
    console.error("Error fetching career:", error);
    throw new Error("Error fetching Career");
  }
};

const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const teamData = await getTeamData(slug);

  return (
    <section>
      <header className="bg-primary md:h-56  pb-10 relative ">
        <PaddingContainer className="flex overflow-visible relative justify-end">
          <Image
            alt="Team Member"
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${teamData.team_id.image}`}
            className=" absolute bg-white border-8 shadow-lg border-white   size-32 md:size-56 l  top-[85%]  lg:top-12 left-5 md:left-0 md:top-[40%] lg:left-20 aspect-square object-cover object-top"
            width={200}
            height={300}
          />
          <div className="flex flex-col justify-end items-end">
            <h1 className="text-[clamp(2.2rem,4vw,5rem)]   text-right font-bold text-white text-shadow-lg  pt-5">
              {teamData.team_id.name}
            </h1>
            <h2 className="text-[clamp(1rem,3.2vw,2.2rem)] font-bold text-right w-2/3 md:w-full text-white text-shadow-lg">
              {teamData.team_id.designation}
            </h2>
            <div className="flex flex-wrap items-center  justify-end ">
              {teamData.team_id?.socials?.length > 0 &&
                teamData.team_id?.socials?.map((social, i) => (
                  <Link
                    href={social.link}
                    target="_blank"
                    key={i}
                    className="  mt-2   rounded-full group transition-all duration-300"
                  >
                    <DynamicFaIcon
                      iconName={social.icon}
                      size={20}
                      className=" hover:animate-pulse  text-white transition-all duration-300"
                    />
                  </Link>
                ))}
            </div>
          </div>
        </PaddingContainer>
      </header>

      {teamData.team_id?.body && (
        <PaddingContainer className="max-w-[960px] mt-20 xl:mt-14">
          <PostBody body={teamData.team_id.body} />
        </PaddingContainer>
      )}
    </section>
  );
};

export default page;
