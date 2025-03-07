import Card from "@/components/card/Card";
import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostBody from "@/components/post-body/PostBody";
import { projectsDropdown } from "@/const";
import { getAllProjectsBasedOnFoundation } from "@/helpers/fetchFromDirectus";
import directus from "@/lib/directus";
import { formatStatus } from "@/lib/format";
import { getBlurData } from "@/lib/getBlurData";
import { readItems } from "@directus/sdk";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: Promise<{
    permalink: string;
    projects: string;
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
        fields: ["project_status", "foundation.slug"],
      })
    );

    const allParams =
      (
        result as {
          project_status: string;
          foundation: {
            slug: string;
          };
        }[]
      ).map((item) => ({
        projects: item.project_status,
        permalink: item.foundation.slug,
      })) || [];

    // Add 'all-projects' to static params
    const allProjectsParams = result.map((item) => ({
      projects: "all-projects",
      permalink: item.foundation.slug, // Ensure correct foundation reference
    }));

    return [...allParams, ...allProjectsParams];
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Error fetching posts");
  }
};

const page = async ({ params }: PageProps) => {
  const { permalink, projects: projectData } = await params;

  const project =
    projectData === "all-projects"
      ? await getAllProjectsBasedOnFoundation("all-projects", permalink)
      : await getAllProjectsBasedOnFoundation(projectData, permalink);

  const blurDataMap = await Promise.all(
    project.map(async (src) => ({
      src,
      blurDataURL: await getBlurData(
        `${process.env.NEXT_PUBLIC_ASSETS_URL}${src.image}`
      ),
    }))
  );

  return (
    <PaddingContainer className="py-10">
      <div className="max-w-screen-xl mx-auto ">
        <div className=" mx-auto  flex justify-between items-center">
          <div>
            <Link href={`/${project[0]?.foundation.slug}`}>
              <h1 className="text-4xl px-0 md:px-5 font-bold ">
                {project[0]?.foundation.name}
              </h1>
            </Link>
          </div>
          {project[0]?.foundation.logo && (
            <Link href={`/${project[0]?.foundation.slug}`}>
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${project[0].foundation.logo}`}
                alt={project[0].foundation.name}
                height={96}
                width={96}
                className="w-28  h-28 object-contain  overflow-hidden"
              />
            </Link>
          )}
        </div>
        {project[0]?.foundation && (
          <div className=" md:px-5">
            <div className="relative">
              <input
                type="checkbox"
                id="dropdown-toggle"
                className="peer hidden"
              />
              <label
                htmlFor="dropdown-toggle"
                className=" font-bold text-lg flex  items-center gap-2 cursor-pointer"
              >
                {projectData === "all-projects"
                  ? "All Published Projects"
                  : projectData.length > 0 &&
                    formatStatus(project[0]?.project_status) + " Projects"}
                <ChevronDown
                  size={16}
                  className="text-primary transition-transform peer-checked:rotate-180"
                />
              </label>

              <ul className="absolute left-0 mt-2 transition-all duration-300 hidden peer-checked:block bg-primary shadow-lg rounded-lg w-48 py-2 text-white">
                {projectsDropdown.map((item, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 hover:text-primary transition"
                  >
                    <Link className="flex " href={item.link}>
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="grid gap-5 md:px-5 grid-cols-1 pb-10 max-w-screen-xl mx-auto md:grid-cols-2 w-full">
        {project.length > 0 ? (
          blurDataMap.map((project) => (
            <Card key={project.src.id} project={project} />
          ))
        ) : (
          <p className="text-center col-span-2 my-32 text-2xl font-bold flex flex-col gap-20 justify-center items-center">
            Nothing to Show
          </p>
        )}
      </div>
    </PaddingContainer>
  );
};

export default page;
