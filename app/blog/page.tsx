import Spinner from "@/components/common/Spinner";
import Pagination from "@/components/Pagination";
import { getAllBlogs, getBlogData } from "@/helpers/fetchFromDirectus";
import Image from "next/image";
import React, { Suspense } from "react";
import parse from "html-react-parser";
import moment from "moment";
import CustomButton from "@/components/common/CustomButton";
import { getBlurData } from "@/lib/getBlurData";
import { TBlog } from "@/interfaces";
import BlogCard from "@/components/card/BlogCard";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const page = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 10;
  const blogData = await getAllBlogs(currentPage, limit);
  const blurDataMap = await Promise.all(
    blogData.results.map((src) =>
      getBlurData(`${process.env.NEXT_PUBLIC_ASSETS_URL}${src.image}`).then(
        (blurDataURL) => ({
          src,
          blurDataURL,
        })
      )
    )
  );
  return (
    <div className="w-full lg:max-w-screen-lg xl:max-w-screen-xl max-w-screen-sm mx-auto px-5 my-10 flex flex-col ">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {blurDataMap.map((blog) => (
          <BlogCard key={blog.src.id} blog={blog} />
        ))}
      </div>

      {/* Add Pagination Here  */}
      <div>
        <Pagination
          currentPage={currentPage}
          totalPages={blogData.totalPages}
        />
      </div>
    </div>
  );
};

export default page;
