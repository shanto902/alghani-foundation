import Spinner from "@/components/common/Spinner";
import Pagination from "@/components/Pagination";
import { getAllBlogs, getBlogData } from "@/helpers/fetchFromDirectus";
import Image from "next/image";
import React, { Suspense } from "react";
import parse from "html-react-parser";
import moment from "moment";
import CustomButton from "@/components/common/CustomButton";
import { getBlurData } from "@/lib/getBlurData";
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const page = async (props: { searchParams: SearchParams }) => {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 10;
  const blogData = await getAllBlogs(currentPage, limit);
  const blurDataMap = await Promise.all(
    blogData.results.map(async (src) => ({
      src,
      blurDataURL: await getBlurData(
        `${process.env.NEXT_PUBLIC_ASSETS_URL}${src.image}`
      ),
    }))
  );

  return (
    <div className="w-full lg:max-w-screen-lg xl:max-w-screen-xl max-w-screen-sm mx-auto px-5 my-10 flex flex-col ">
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {blurDataMap.map((blog) => (
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
                <p className="text-sm ">{`${moment(
                  blog.src.date_created
                ).format("MMM DD, YYYY")}`}</p>
              </div>
              <h2 className="font-lg font-bold line-clamp-2">
                {blog.src.title}
              </h2>
              <p className="line-clamp-2 text-sm">{blog.src.description}</p>
              <CustomButton
                className="text-xs px-3 py-2"
                href={`/blog/${blog.src.slug}`}
              >
                Read More
              </CustomButton>
            </div>
          </div>
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
