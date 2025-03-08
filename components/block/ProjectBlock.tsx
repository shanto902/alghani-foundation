import { TProject, TProjectPageBlock } from "@/interfaces";
import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import { getAllProjects } from "@/helpers/fetchFromDirectus";
import Card from "../card/Card";
import PostBody from "../post-body/PostBody";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../common/CustomButton";
import { getBlurData } from "@/lib/getBlurData";

const ProjectBlock = async ({ block }: { block: TProjectPageBlock }) => {
  const projects = await getAllProjects(block.item.foundation.slug);
  const displayedProjects: TProject[] = projects.slice(-6).reverse(); // Reverse only the last 6 projects

  // Extract images safely from body content
  const imageSources = [
    ...(block?.item?.foundation?.body?.matchAll(
      /<img[^>]+src=["']([^"']+)["']/g
    ) || []),
  ].map((match) => match[1]);

  const blurDataMap = await Promise.all(
    imageSources.map((src) =>
      getBlurData(src).then((blurDataURL) => ({
        src,
        blurDataURL,
      }))
    )
  );

  const blurDataMapProjects = await Promise.all(
    displayedProjects.map((src) =>
      getBlurData(`${process.env.NEXT_PUBLIC_ASSETS_URL}${src.image}`).then(
        (blurDataURL) => ({
          src,
          blurDataURL,
        })
      )
    )
  );

  return (
    <PaddingContainer className="my-10">
      {block.item.title === "enabled" ? (
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <h1 className=" text-4xl px-0 md:px-5 font-bold ">
            <strong> {block.item.foundation.name}</strong>
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
      ) : (
        <></>
      )}
      {block.item.foundation.body && block.item.show_body === "enabled" && (
        <article className="max-w-screen-xl mx-auto">
          <PostBody
            body={block.item.foundation.body}
            blurDataMap={blurDataMap}
          />
        </article>
      )}
      <div className="grid gap-5 pb-20 md:px-5 max-w-screen-xl mx-auto grid-cols-1 md:grid-cols-2 w-full">
        {blurDataMapProjects.length > 0 ? (
          blurDataMapProjects.map((project) => (
            <Card key={project.src.id} project={project} />
          ))
        ) : (
          <p>Nothing to Show</p>
        )}
      </div>
      {projects.length > 6 && (
        <div className="flex justify-center">
          <CustomButton
            invert
            href={`${projects[0].foundation.slug}/all-projects/`}
            className="text-sm"
          >
            Load More Projects
          </CustomButton>
        </div>
      )}
    </PaddingContainer>
  );
};

export default ProjectBlock;
