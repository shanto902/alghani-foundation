import { TBlog } from "@/interfaces";
import moment from "moment";
import Image from "next/image";
import React from "react";
import CustomButton from "../common/CustomButton";
type TBlogBlur = {
  src: TBlog;
  blurDataURL: string;
};

const BlogCard = ({ blog }: { blog: TBlogBlur }) => {
  return (
    <div
      key={blog.src.id}
      className=" mx-auto hover:shadow-xl transition-all duration-300 space-y-4 border-2 border-primary  flex flex-col items-center rounded-lg  p-5 "
    >
      <Image
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${blog.src.image}`}
        alt={blog.src.title}
        placeholder="blur"
        blurDataURL={blog.blurDataURL}
        height={250}
        width={400}
        className="w-full object-cover h-56 rounded-lg"
      />
      <div className="space-y-2">
        <div className=" flex flex-wrap items-center justify-between">
          {blog.src.tags.map((tag, i) => (
            <div
              className="bg-primary text-xs w-fit border border-primary  font-bold px-2 text-white rounded-full py-1"
              key={i}
            >
              {tag}
            </div>
          ))}
          <p className="text-sm ">{`${moment(blog.src.date_created).format(
            "MMM DD, YYYY"
          )}`}</p>
        </div>
        <h2 className="font-lg font-bold line-clamp-2">{blog.src.title}</h2>
        <p className="line-clamp-2 text-sm">{blog.src.description}</p>
        <CustomButton
          className="text-xs px-3 py-2"
          href={`/blog/${blog.src.slug}`}
        >
          Read More
        </CustomButton>
      </div>
    </div>
  );
};

export default BlogCard;
