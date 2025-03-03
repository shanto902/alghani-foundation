import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import Image from "next/image";
import React from "react";

import PostBody from "@/components/post-body/PostBody";
import PaddingContainer from "@/components/layout/PaddingContainer";
import moment from "moment";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { getProjectData } from "@/helpers/fetchFromDirectus";
interface PageProps {
  params: Promise<{
    permalink: string;
    slug: string;
  }>;
}
export const generateStaticParams = async () => {
  try {
    const result = await directus.request(
      readItems("projects", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["slug", "foundation.slug", "project_status"],
      })
    );

    // console.log(result);

    const allParams =
      (
        result as {
          slug: string;
          foundation: {
            slug: string;
          };
        }[]
      ).map((item) => ({
        slug: item.slug,
        permalink: item.foundation.slug,
      })) || [];
    return allParams;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Error fetching posts");
  }
};
const page = async ({ params }: PageProps) => {
  const { slug } = await params;
  const projectsData = await getProjectData(slug);

  return (
    <main>
      <div className="relative h-[85vh] overflow-hidden w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${projectsData.image}`}
          alt={projectsData.title}
          width={1920}
          height={1800}
          style={{ objectPosition: "50% 50%" }}
          className=" w-full h-full object-cover absolute object-bottom"
        />
        <div className=" bg-gradient-to-b from-transparent via-transparent to-black/80 absolute w-full h-full indent-0 z-10"></div>
        <PaddingContainer className="relative  h-full w-full">
          <div className="absolute  left-0 bottom-0 z-20 w-full">
            <h2 className="text-3xl font-extrabold text-white px-5">
              {projectsData.title}
            </h2>
            <div className="flex justify-between px-5">
              <div className="py-5  gap-2 text-sm items-center flex flex-wrap">
                <div className="bg-primary  w-fit font-bold px-3 text-white  rounded-full py-1">
                  {projectsData.project_status}
                </div>
                {projectsData.tags.map((tag, i) => (
                  <div
                    className="bg-primary  w-fit font-bold px-3 text-white  rounded-full py-1"
                    key={i}
                  >
                    {tag}
                  </div>
                ))}
                <p className="text-white text-sm">{`Updated: ${moment(
                  projectsData.date_updated
                ).format("MMM DD, YYYY")}`}</p>
              </div>
              <div className="text-white text-sm md:flex items-center gap-2 hidden ">
                <p className=" text-white text-sm">Share On: </p>

                <FaFacebookF className="bg-primary h-8 w-8 p-2 rounded-full" />
                <FaXTwitter className="bg-primary h-8 w-8 p-2 rounded-full" />
              </div>
            </div>
          </div>
        </PaddingContainer>
      </div>

      <article className="relative max-w-screen-xl mx-auto px-5 py-10">
        <PostBody body={projectsData.body} />
      </article>
    </main>
  );
};

export default page;
