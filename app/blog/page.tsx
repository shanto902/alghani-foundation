import BlogList from "@/components/BlogList";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Blog",
};
export default function BlogPage() {
  try {
    return <BlogList currentPage={1} />;
  } catch (error) {
    console.error("Error rendering BlogPage:", error);
    return (
      <div className="h-[60vh] flex flex-col justify-center items-center text-center">
        <h2 className="text-2xl font-bold text-red-600">
          Something went wrong!
        </h2>
        <p className="text-gray-500">
          We could not load the blog page. Please try again later.
        </p>
        <Link
          href="/"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Home
        </Link>
      </div>
    );
  }
}
