import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import Image from "next/image";
import React from "react";
import PostBody from "@/components/post-body/PostBody";
import parse from "html-react-parser";
import PaddingContainer from "@/components/layout/PaddingContainer";
import moment from "moment";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { getProjectData } from "@/helpers/fetchFromDirectus";
import { formatStatus } from "@/lib/format";
import Link from "next/link";
import { getPlaceholderImage } from "@/lib/getBlurData";
import { Metadata, ResolvingMetadata } from "next";
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
    const project = await getProjectData(slug);

    const previousImages = (await parent).openGraph?.images || [];
    if (project !== null) {
      return {
        title: project.title,
        description: `${project.foundation.name}` || "",
        openGraph: {
          images: project.image
            ? [
                {
                  url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${project.image}`,
                },
              ]
            : [...previousImages],
        },
      };
    }

    // Default metadata if the page is not found
    return {
      title: "Project not Found",
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
      readItems("projects", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["slug", "project_status", "foundation.slug"],
      })
    );

    const allParams =
      (
        result as {
          slug: string;
          project_status: string;
          foundation: {
            slug: string;
          };
        }[]
      ).map((item) => ({
        slug: item.slug,
        projects_status: item.project_status,
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

  const blurDataURL = await getPlaceholderImage(
    `${process.env.NEXT_PUBLIC_ASSETS_URL}${projectsData.image}`
  );

  const imageSources = projectsData?.body
    ? [...projectsData.body.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(
        (match) => match[1]
      )
    : [];

  const blurDataMap = await Promise.all(
    imageSources.map(async (src) => ({
      src,
      blurDataURL: await getPlaceholderImage(src), // Ensure it's resolved
    }))
  );

  const currentURL = `${process.env.NEXT_PUBLIC_SITE_URL}${projectsData.foundation.slug}/${projectsData.project_status}/${projectsData.slug}`;

  // Facebook share URL
  const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`;

  const xShareURL = `https://twitter.com/intent/tweet?url=${currentURL}&text=${`Check out this project: ${projectsData.title}`}`;
  return (
    <main>
      {/* Desktop layout  */}
      <div className="sm:block hidden relative h-screen overflow-hidden w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${projectsData.image}`}
          alt={projectsData.title}
          width={1920}
          height={1080}
          blurDataURL={blurDataURL}
          placeholder="blur"
          style={{ objectPosition: "50% 50%" }}
          className=" w-full h-full object-cover absolute object-center"
        />
        <div className=" bg-gradient-to-b from-transparent via-transparent to-black/80 absolute w-full h-full indent-0 z-10"></div>
        <PaddingContainer className="relative  h-full w-full">
          <div className="absolute  left-0 bottom-0 z-20 w-full">
            <h2 className="text-4xl font-extrabold text-white px-5">
              {projectsData.title}
            </h2>

            {projectsData.description && (
              <p className="!text-white py-3 max-w-screen-md text-pretty px-5">
                {projectsData.description}
              </p>
            )}

            <div className="flex justify-between px-5 py-3">
              <div className="pb-5  gap-2 text-sm items-center flex flex-wrap">
                <Link
                  href={`/${projectsData.foundation.slug}/${projectsData.project_status}`}
                  className="bg-primary hover:bg-white hover:text-primary  transition-all duration-300  w-fit font-bold px-3 text-white  rounded-full py-1"
                >
                  {formatStatus(projectsData.project_status)} Projects
                </Link>
                {projectsData.tags.map((tag, i) => (
                  <div
                    className="bg-primary  w-fit font-bold px-3 text-white  rounded-full py-1"
                    key={i}
                  >
                    {tag}
                  </div>
                ))}
                <p className="text-white text-sm">{`Updated: ${
                  projectsData?.date_updated
                    ? moment(projectsData.date_updated).format("MMM DD, YYYY")
                    : moment(projectsData.date_created).format("MMM DD, YYYY")
                }`}</p>
              </div>
              <div className="text-white text-sm md:flex items-center gap-2 hidden ">
                <p className=" text-white text-sm">Share On: </p>

                <a target="_blank" href={facebookShareURL}>
                  <FaFacebookF className="bg-primary hover:bg-white hover:text-primary h-8 w-8 p-2 rounded-full transition-all duration-300" />
                </a>
                <a target="_blank" href={xShareURL}>
                  <FaXTwitter className="bg-primary hover:bg-white hover:text-primary h-8 w-8 p-2 rounded-full transition-all duration-300" />
                </a>
              </div>
            </div>
          </div>
        </PaddingContainer>
      </div>

      {/* Mobile Layout  */}
      <div className="sm:hidden block relative  overflow-hidden w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${projectsData.image}`}
          alt={projectsData.title}
          width={1920}
          height={1080}
          blurDataURL={blurDataURL}
          placeholder="blur"
          style={{ objectPosition: "50% 50%" }}
          className=" w-full h-full "
        />
        <div className=" absolute bottom-0 bg-gradient-to-b from-transparent via-transparent to-black/80  w-full h-full indent-0 z-10" />
        <PaddingContainer className="absolute bottom-0 left-0 z-20  h-full w-full">
          <div className=" flex flex-col justify-end   items-start h-full  w-full pb-5">
            <h2 className=" text-2xl pb-1 font-extrabold text-white ">
              {projectsData.title}
            </h2>
            {projectsData.description && (
              <p className=" text-white  text-sm">{projectsData.description}</p>
            )}
            {/* <div className="flex justify-between">
              <div className="pb-5  gap-2 text-sm items-center flex flex-wrap">
                <Link
                  href={`/${projectsData.foundation.slug}/${projectsData.project_status}`}
                  className="bg-primary hover:bg-white hover:text-primary  transition-all duration-300  w-fit font-bold px-3 text-white  rounded-full py-1"
                >
                  {formatStatus(projectsData.project_status)} Projects
                </Link>
                {projectsData.tags.map((tag, i) => (
                  <div
                    className="bg-primary  w-fit font-bold px-3 text-white  rounded-full py-1"
                    key={i}
                  >
                    {tag}
                  </div>
                ))}
                <p className="text-white text-sm">{`Updated: ${
                  projectsData?.date_updated
                    ? moment(projectsData.date_updated).format("MMM DD, YYYY")
                    : moment(projectsData.date_created).format("MMM DD, YYYY")
                }`}</p>
              </div>
              <div className="text-white text-sm md:flex items-center gap-2 hidden ">
                <p className=" text-white text-sm">Share On: </p>

                <a target="_blank" href={facebookShareURL}>
                  <FaFacebookF className="bg-primary hover:bg-white hover:text-primary h-8 w-8 p-2 rounded-full transition-all duration-300" />
                </a>
                <a target="_blank" href={xShareURL}>
                  <FaXTwitter className="bg-primary hover:bg-white hover:text-primary h-8 w-8 p-2 rounded-full transition-all duration-300" />
                </a>
              </div>
            </div> */}
          </div>
        </PaddingContainer>
      </div>

      <article className="relative max-w-screen-xl mx-auto px-5 py-10">
        <PostBody body={projectsData.body} blurDataMap={blurDataMap} />
      </article>
    </main>
  );
};

export default page;
