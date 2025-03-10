import Card from "@/components/card/Card";
import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostBody from "@/components/post-body/PostBody";
import { projectsDropdown } from "@/const";
import { getAllProjectsBasedOnFoundation } from "@/helpers/fetchFromDirectus";
import { TProject } from "@/interfaces";
import directus from "@/lib/directus";
import { formatStatus } from "@/lib/format";
import { getPlaceholderImage } from "@/lib/getBlurData";

import { readItems } from "@directus/sdk";
import { ChevronDown } from "lucide-react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PageProps {
  params: Promise<{
    permalink: string;
    project_status: string;
  }>;
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { permalink, project_status } = await params;
    const project = await directus.request(
      readItems("projects", {
        filter: {
          foundation: {
            slug: {
              _eq: permalink,
            },
          },
          project_status,
        },
        sort: ["sort"],
        fields: ["title", { foundation: ["name"] }],
      })
    );

    if (project !== null) {
      return {
        title: project[0].foundation.name || project[0].title,
      };
    }
    return {
      title: "Project not Found",
      description: "This page does not exist.",
    };
  } catch (error) {
    console.error("Error fetching page metadata:", error);
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
        project_status: item.project_status,
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
  const { permalink, project_status } = await params;

  const projectType =
    project_status === "all-projects" ? "all-projects" : project_status;
  const project = await getAllProjectsBasedOnFoundation(projectType, permalink);

  // ✅ Fetch blurDataURL for each project image before rendering
  const projectWithBlur = await Promise.all(
    project.map(async (proj) => ({
      ...proj,
      blurDataURL: await getPlaceholderImage(
        `${process.env.NEXT_PUBLIC_ASSETS_URL}${proj.image}`
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
                <strong> {project[0]?.foundation.name}</strong>
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
                {project_status === "all-projects"
                  ? "All Published Projects"
                  : project_status?.length > 0 &&
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
          projectWithBlur.map((project) => (
            <Card key={project.id} project={project} />
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
