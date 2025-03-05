import { TProjectPageBlock } from "@/interfaces";
import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import { getAllProjects } from "@/helpers/fetchFromDirectus";
import Card from "../common/Card";
import PostBody from "../post-body/PostBody";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../common/CustomButton";

const ProjectBlock = async ({ block }: { block: TProjectPageBlock }) => {
  const projects = await getAllProjects(block.item.foundation.slug);
  const displayedProjects = projects.reverse().slice(0, 6); // Show only the first 6 projects

  return (
    <PaddingContainer className="my-10">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        <h1 className="text-4xl px-0 md:px-5 font-bold ">
          {block.item.foundation.name}
        </h1>

        {block.item.foundation.logo && (
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${block.item.foundation.logo}`}
            alt={block.item.foundation.name}
            height={96}
            width={96}
            className="w-32 h-32 object-contain overflow-hidden"
          />
        )}
      </div>
      {block.item.foundation.body && (
        <article className="max-w-screen-xl mx-auto">
          <PostBody body={block.item.foundation.body} />
        </article>
      )}
      <div className="grid gap-5 pb-20 md:px-5 max-w-screen-xl mx-auto grid-cols-1 md:grid-cols-2 w-full">
        {displayedProjects.length > 0 ? (
          displayedProjects.map((project) => (
            <Card key={project.id} project={project} />
          ))
        ) : (
          <p>Nothing to Show</p>
        )}
      </div>
      {projects.length > 6 && (
        <div className="flex justify-center">
          <CustomButton
            href={`${projects[0].foundation.slug}/all-projects/`}
            className=""
          >
            Load More Projects
          </CustomButton>
        </div>
      )}
    </PaddingContainer>
  );
};

export default ProjectBlock;
