import Card from "@/components/common/Card";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostBody from "@/components/post-body/PostBody";
import { getAllProjectsBasedOnFoundation } from "@/helpers/fetchFromDirectus";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import Image from "next/image";
import React from "react";

interface PageProps {
  params: Promise<{
    permalink: string;
    projects: string;
  }>;
}
export const generateStaticParams = async () => {
  try {
    // Fetch data and assert the correct type
    const result = (await directus.request(
      readItems("foundations", {
        fields: ["slug"],
      })
    )) as { slug: string }[]; // Type assertion here

    // console.log(result);

    const projects_status = [
      "on-going-projects",
      "upcoming-project",
      "completed-projects",
      "all-projects",
    ];

    // Generate params for each foundation combined with all project statuses
    const allParams = result.flatMap((item) =>
      projects_status.map((status) => ({
        permalink: item.slug, // Assigning foundation slug correctly
        projects: status, // Assigning project status dynamically
      }))
    );

    return allParams;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new Error("Error fetching posts");
  }
};
const page = async ({ params }: PageProps) => {
  const { permalink, projects: projectData } = await params;

  const project = await getAllProjectsBasedOnFoundation(projectData, permalink);
  console.log(project);
  return (
    <PaddingContainer className="my-10">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-4xl  px-5 font-bold ">
          {project[0]?.foundation.name}
        </h1>
        {project[0]?.foundation.logo && (
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${project[0].foundation.logo}`}
            alt={project[0].foundation.name}
            height={96}
            width={96}
            className="w-32  h-32 object-contain  overflow-hidden"
          />
        )}
      </div>
      {/* {project.foundation.body && (
      <article className="max-w-screen-xl mx-auto  py-10">
        <PostBody body={block.item.foundation.body} />
      </article>
    )} */}
      <div className="grid gap-5 px-5 max-w-screen-xl mx-auto grid-cols-2 w-full">
        {project.length > 0 ? (
          project.map((project) => <Card key={project.id} project={project} />)
        ) : (
          <p>Nothing to Show</p>
        )}
      </div>
    </PaddingContainer>
  );
};

export default page;
