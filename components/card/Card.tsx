// components/Card.tsx
import { TProject } from "@/interfaces";
import Image from "next/image";
import React from "react";
import parser from "html-react-parser";
import moment from "moment";

import Link from "next/link";
import { formatStatus } from "@/lib/format";
const Card = ({
  project,
}: {
  project: {
    src: TProject;
    blurDataURL: string;
  };
}) => {
  return (
    <div className="mb-0 border-2 border-primary w-full p-3 rounded-lg flex flex-col lg:grid grid-cols-3 overflow-hidden shadow-none my-5 hover:shadow-2xl transition-all duration-300">
      <Link
        className="h-full w-full p-2  "
        href={`/${project.src.foundation.slug}/${project.src.project_status}/${project.src.slug}`}
      >
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${project.src.image}`}
          width={300}
          height={400}
          alt={project.src.title}
          placeholder="blur"
          blurDataURL={project.blurDataURL}
          className="w-full h-full aspect-video lg:aspect-[3/4] object-cover rounded-lg"
        />
      </Link>

      <div className="p-4 col-span-2 flex flex-col gap-2 justify-center">
        <Link
          href={`/${project.src.foundation.slug}/${project.src.project_status}/${project.src.slug}`}
          className="text-xl font-bold  transition-all duration-300 line-clamp-2"
        >
          {project.src.title}
        </Link>
        <div className="py-2 gap-2 text-sm items-center flex   flex-wrap">
          <Link
            href={`/${project.src.foundation.slug}/${project.src.project_status}`}
            className="bg-primary hover:bg-white border border-primary w-fit text-xs font-bold px-3 text-white rounded-full py-2 hover:text-primary transition-all duration-300"
          >
            {formatStatus(project.src.project_status)} Project
          </Link>
          {project.src.tags.map((tag, i) => (
            <div
              className="bg-primary text-xs w-fit border border-primary  font-bold px-3 text-white rounded-full py-2"
              key={i}
            >
              {tag}
            </div>
          ))}
        </div>
        <p className="text-sm font-semibold">{`Published on: ${moment(
          project.src.date_created
        ).format("MMM DD, YYYY")}`}</p>
      </div>
    </div>
  );
};

export default Card;
