import { TBlog } from "@/interfaces";
import moment from "moment";
import Image from "next/image";
import React from "react";
import CustomButton from "../common/CustomButton";

interface Blog {
  id: string;
  title: string;
  description: string;
  slug: string;
  tags: string[];
  image: string;
  date_created: string;
  blurDataURL: string;
}

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <div
      key={blog.id}
      className=" mx-auto hover:shadow-xl transition-all duration-300 space-y-4 border-2 border-primary  flex flex-col w-full items-center rounded-lg  p-5 "
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${blog.image}`}
        alt={blog.title}
        placeholder="blur"
        blurDataURL={blog.blurDataURL}
        height={250}
        width={400}
        className="w-full object-cover h-56 rounded-lg"
      />
      <div className="space-y-2 w-full flex justify-start items-start flex-col">
        <div className=" flex flex-wrap w-full items-center justify-between">
          <div className="flex items-center gap-2">
            {blog.tags.map((tag, i) => (
              <div
                className="bg-primary text-xs w-fit border border-primary  font-bold px-2 text-white rounded-full py-1"
                key={i}
              >
                {tag}
              </div>
            ))}
          </div>
          <p className="text-sm">{`${moment(blog.date_created).format(
            "MMM DD, YYYY"
          )}`}</p>
        </div>
        <h2 className="font-lg text-left font-bold text-black line-clamp-2 w-full">
          {blog.title}
        </h2>
        <p className="line-clamp-2 text-left text-sm text-secondary">
          {blog.description}
        </p>
        <CustomButton
          className="text-xs w-fit px-3 py-2"
          href={`/blog/${blog.slug}`}
        >
          Read More
        </CustomButton>
      </div>
    </div>
  );
};

export default BlogCard;
