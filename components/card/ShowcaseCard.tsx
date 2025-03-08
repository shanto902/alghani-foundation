import { TProject } from "@/interfaces";
import moment from "moment";
import Image from "next/image";
import React from "react";
import CustomButton from "../common/CustomButton";
export type TProjectShowcaseBlurData = {
  src: {
    id: number;
    projects_id: TProject;
  };
  blurDataURL: string;
};
const ShowcaseCard = ({ project }: { project: TProjectShowcaseBlurData }) => {
  return (
    <section
      key={project.src.id}
      className=" mx-auto w-full hover:shadow-xl transition-all duration-300 space-y-4 border-2 border-primary  flex flex-col items-center rounded-lg  p-5 "
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${project.src.projects_id.image}`}
        alt={project.src.projects_id.title}
        placeholder="blur"
        blurDataURL={project.blurDataURL}
        height={250}
        width={400}
        className="w-full object-cover h-56 rounded-lg"
      />
      <div className="space-y-2 w-full">
        <div className=" flex flex-wrap items-center justify-between w-full">
          <div className="bg-primary text-xs w-fit border border-primary  font-bold px-2 text-white rounded-full py-1">
            {project.src.projects_id.foundation.name}
          </div>

          <p className="text-sm ">{`${moment(
            project.src.projects_id.date_created
          ).format("MMM DD, YYYY")}`}</p>
        </div>
        <h2 className="font-lg font-bold line-clamp-2">
          {project.src.projects_id.title}
        </h2>
        {/* <p className="line-clamp-2 text-sm">{project.src.projects_id.description}</p> */}
        <CustomButton
          className="text-xs px-3 py-2"
          invert
          href={`/${project.src.projects_id.foundation.slug}/${project.src.projects_id.project_status}/${project.src.projects_id.slug}`}
        >
          Read More
        </CustomButton>
      </div>
    </section>
  );
};

export default ShowcaseCard;
