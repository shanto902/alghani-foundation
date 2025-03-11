import { redirect } from "next/navigation";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import Image from "next/image";
import React from "react";
import PostBody from "@/components/post-body/PostBody";
import PaddingContainer from "@/components/layout/PaddingContainer";
import moment from "moment";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { getBlogData } from "@/helpers/fetchFromDirectus";
import { getPlaceholderImage } from "@/lib/getBlurData";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import CustomButton from "@/components/common/CustomButton";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { slug } = await params;
    const blog = await getBlogData(slug);
    const previousImages = (await parent).openGraph?.images || [];
    if (blog !== null) {
      return {
        title: blog.title,
        description: `${blog.description}` || "",
        openGraph: {
          images: blog.image
            ? [
                {
                  url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${blog.image}`,
                },
              ]
            : [...previousImages],
        },
      };
    }

    // Default metadata if the page is not found
    return {
      title: "Blog not Found",
      description: "This page does not exist.",
    };
  } catch (error) {
    console.error("Error fetching page metadata:", error);

    // Return default metadata in case of error
    return {
      title: "Error",
      description: "Failed to fetch page metadata.",
    };
  }
}

export const generateStaticParams = async () => {
  try {
    const result = await directus.request(
      readItems("blogs", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["slug"],
      })
    );

    const allParams =
      (
        result as {
          slug: string;
        }[]
      ).map((item) => ({
        slug: item.slug,
        permalink: "blog",
      })) || [];

    return allParams;
  } catch (error) {
    console.error("Error fetching career:", error);
    throw new Error("Error fetching Career");
  }
};

const page = async ({ params }: PageProps) => {
  try {
    const { slug } = await params;

    // ✅ Fetch blog data
    const blogData = await getBlogData(slug);

    // ✅ Redirect to `/blog` if no blog is found
    if (!blogData) {
      console.error(`Blog not found for slug: ${slug}`);
      redirect("/blog");
    }

    // ✅ Fetch placeholder image for blur effect
    const imageUrl = `${process.env.NEXT_PUBLIC_ASSETS_URL}${blogData.image}`;
    const blurDataURL = await getPlaceholderImage(imageUrl);

    // ✅ Extract images from blog body for placeholder blur effect
    const imageSources = blogData.body
      ? [...blogData.body.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(
          (match) => match[1]
        )
      : [];

    const blurDataMap = await Promise.all(
      imageSources.map(async (src) => ({
        src,
        blurDataURL: await getPlaceholderImage(src),
      }))
    );

    // ✅ Social Sharing URLs
    const currentURL = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${blogData.slug}`;
    const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`;
    const xShareURL = `https://twitter.com/intent/tweet?url=${currentURL}&text=${`Check out this blog: ${blogData.title}`}`;

    return (
      <main>
        <div className="relative h-[85vh] overflow-hidden w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${blogData.image}`}
            alt={blogData.title}
            width={1920}
            height={1080}
            blurDataURL={blurDataURL}
            placeholder="blur"
            className="w-full h-full object-cover absolute object-center"
          />
          <div className="bg-gradient-to-b from-transparent via-transparent to-black/80 absolute w-full h-full z-10"></div>
          <PaddingContainer className="relative h-full w-full">
            <div className="absolute left-0 bottom-0 z-20 w-full">
              <h2 className="text-4xl font-extrabold text-white px-5">
                {blogData.title}
              </h2>
              <div className="flex justify-between p-5">
                <div className="py-5 gap-2 text-sm items-center flex flex-wrap">
                  {blogData.tags.map((tag, i) => (
                    <div
                      className="bg-primary w-fit font-bold px-3 text-white rounded-full py-1"
                      key={i}
                    >
                      {tag}
                    </div>
                  ))}
                  <p className="text-white text-sm">{`Updated: ${
                    blogData?.date_updated
                      ? moment(blogData.date_updated).format("MMM DD, YYYY")
                      : moment(blogData.date_created).format("MMM DD, YYYY")
                  }`}</p>
                </div>
                <div className="text-white text-sm md:flex items-center gap-2 hidden">
                  <p className="text-white text-sm">Share On:</p>
                  <a target="_blank" href={facebookShareURL}>
                    <FaFacebookF className="bg-primary hover:bg-white hover:text-primary h-8 w-8 p-2 rounded-full transition-all duration-300" />
                  </a>
                  <a target="_blank" href={xShareURL}>
                    <FaXTwitter className="bg-primary hover:bg-white hover:text-primary h-8 w-8 p-2 rounded-full transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </PaddingContainer>
        </div>

        <article className="relative max-w-screen-xl mx-auto px-5 py-10">
          <PostBody body={blogData.body} blurDataMap={blurDataMap} />
        </article>
      </main>
    );
  } catch (error) {
    console.error("Error rendering blog post:", error);

    return (
      <div className="h-[60vh] space-y-10 flex flex-col justify-center items-center text-center">
        <h2 className="text-5xl font-bold uppercase text-red-600">
          Page Not Found
        </h2>
        <p className="text-gray-500">
          We could not load this service post. Please try again later.
        </p>
        <CustomButton invert href="/blog" className="">
          Go Back to Blog
        </CustomButton>
      </div>
    );
  }
};

export default page;
