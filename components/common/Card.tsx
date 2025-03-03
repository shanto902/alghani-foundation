// components/Card.tsx
import { TProject } from "@/interfaces";
import Image from "next/image";
import React from "react";
import parser from "html-react-parser";
import moment from "moment";
import { formatStatus } from "../block/ProjectBlock";
import Link from "next/link";
const Card = ({
  project,
  projectStatus,
}: {
  project: TProject;
  projectStatus: string;
}) => {
  return (
    <Link
      href={`/${projectStatus}/${project.slug}`}
      className="border w-full gap-2 rounded-2xl  flex overflow-hidden shadow-lg my-5 "
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${project.image}`}
        width={300}
        height={200}
        alt={project.title}
        className="  object-cover p-2 rounded-2xl
          aspect-[4/3]  "
      />

      <div className="px-3 flex flex-col gap-2 justify-center">
        <h2 className="text-xl font-bold">{project.title}</h2>
        <div className="py-2  gap-2 text-sm items-center flex flex-wrap">
          <div className="bg-primary  w-fit font-bold px-3 text-white  rounded-full py-1">
            {formatStatus(project.project_status)} Project
          </div>
          {project.tags.map((tag, i) => (
            <div
              className="bg-primary  w-fit font-bold px-3 text-white  rounded-full py-1"
              key={i}
            >
              {tag}
            </div>
          ))}
        </div>
        <p className=" text-sm">{`Updated: ${moment(
          project.date_created
        ).format("MMM DD, YYYY")}`}</p>
      </div>
    </Link>
  );
};

export default Card;
