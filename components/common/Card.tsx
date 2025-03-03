// components/Card.tsx
import { TProject } from "@/interfaces";
import Image from "next/image";
import React from "react";
import parser from "html-react-parser";
import moment from "moment";

import Link from "next/link";
import { formatStatus } from "@/lib/format";
const Card = ({ project }: { project: TProject }) => {
  return (
    <div className="border w-full gap-2 p-3 rounded-2xl flex-col md:flex-row flex overflow-hidden shadow-lg my-5 ">
      <Link
        className="h-full w-full  "
        href={`/${project.foundation.slug}/${project.project_status}/${project.slug}`}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${project.image}`}
          width={300}
          height={300}
          alt={project.title}
          className=" w-full h-full aspect-square object-cover p-2 rounded-2xl
           "
        />
      </Link>

      <div className="  p-4 flex flex-col gap-2 justify-center">
        <h2 className="text-xl font-bold">{project.title}</h2>
        <div className="py-2  gap-2 text-sm items-center flex flex-wrap">
          <Link
            href={`/${project.foundation.slug}/${project.project_status}`}
            className="bg-primary  w-fit text-sm font-bold px-3 text-white  rounded-full py-2"
          >
            {formatStatus(project.project_status)} Project
          </Link>
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
    </div>
  );
};

export default Card;
