import { TProject, TProjectShowcaseBlock } from "@/interfaces";
import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import ShowcaseCard, { TProjectShowcaseBlurData } from "../card/ShowcaseCard";
import CustomButton from "../common/CustomButton";
import { getPlaceholderImage } from "@/lib/getBlurData";

const ProjectShowcase = async ({ block }: { block: TProjectShowcaseBlock }) => {
  const blurDataMap = await Promise.all(
    (block.item.projects || []).slice(0, block.item.limit).map(async (src) => ({
      src,
      blurDataURL: await getPlaceholderImage(
        `${process.env.NEXT_PUBLIC_ASSETS_URL}${src?.projects_id?.image}`
      ),
    }))
  );

  return (
    <PaddingContainer className="max-w-screen-xl">
      <div
        key={block.item.id}
        className=" my-5
    grid lg:grid-cols-3 gap-5 md:grid-cols-2 grid-cols-1  mx-auto"
      >
        {blurDataMap.map((card) => (
          <ShowcaseCard
            key={card.src.projects_id.id}
            project={card as TProjectShowcaseBlurData}
          />
        ))}
      </div>
      <CustomButton
        invert
        className="mx-auto w-fit mb-10 justify-center flex"
        href="/our-projects"
      >
        See More Latest Projects
      </CustomButton>
    </PaddingContainer>
  );
};

export default ProjectShowcase;
