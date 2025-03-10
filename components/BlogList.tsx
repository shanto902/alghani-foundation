import BlogCard from "@/components/card/BlogCard";
import Pagination from "@/components/Pagination";
import { getAllBlogs } from "@/helpers/fetchFromDirectus";

import Link from "next/link";
import HeaderBlock from "./block/HeaderBlock";
import { THeaderBlock } from "@/interfaces";

interface BlogListProps {
  currentPage: number;
}

export default async function BlogList({ currentPage }: BlogListProps) {
  const limit = 10; // ✅ Number of blogs per page

  try {
    // ✅ Fetch blog posts from Directus (SSG + ISR)
    const { results, totalPages } = await getAllBlogs(currentPage, limit);

    // ✅ If no blogs are found, redirect to `/blog`
    if (results.length === 0 && currentPage !== 1) {
      return <meta httpEquiv="refresh" content="0; url=/blog" />;
    }

    return (
      <div className="w-full lg:max-w-screen-lg xl:max-w-screen-xl max-w-screen-sm mx-auto px-5 mb-10 flex flex-col">
        <HeaderBlock
          block={
            {
              item: {
                title: "News & Articles",
              },
            } as THeaderBlock
          }
        />
        <section className="text-center mt-5 text-gray-500">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {results.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>

        {/* ✅ Pagination */}
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);

    return (
      <div className="h-[60vh] flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Something went wrong!
        </h2>
        <p className="text-gray-500">
          We could not load the blogs. Please try again later.
        </p>
        <Link
          href="/blog"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back to Blog
        </Link>
      </div>
    );
  }
}
