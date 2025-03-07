import { TBlog } from "@/interfaces";
import moment from "moment";
import Image from "next/image";
import React from "react";

const BlogCard = ({ blog }: { blog: TBlog }) => {
  return (
    <section>
      <Image
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${blog.image}`}
        alt={blog.title}
        height={200}
        width={96}
        className="w-full h-56 object-contain overflow-hidden"
      />
      <div>
        <div>
          {blog.tags.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
          {moment(blog.date_created).format("MMM DD, YYYY")}
        </div>
      </div>
    </section>
  );
};

export default BlogCard;
