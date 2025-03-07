import { TPress } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const PressCard = ({ data }: { data: TPress }) => {
  return (
    <article className="flex flex-col mx-auto md:flex-row max-w-2xl gap-6 justify-center items-start p-5 border-2 border-primary rounded-lg hover:shadow-xl m-5 transition-all duration-300">
      {data.image && (
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${data.image}`}
          width={100}
          height={100}
          alt={data.title}
          className="rounded-lg"
        />
      )}
      <div>
        <div>
          <h2 className="text-2xl font-bold">{data.title}</h2>
          <p>{}</p>
        </div>
        {data.description && <p className="text-sm">{data.description}</p>}
        {data.links && data.links.length > 0 && (
          <ul className="list-disc pl-4 my-2">
            {data.links.map((link, index) => (
              <li key={index}>
                <Link
                  className="hover:text-primary hover:underline break-all"
                  href={link.link}
                >
                  {link.link}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
};

export default PressCard;
