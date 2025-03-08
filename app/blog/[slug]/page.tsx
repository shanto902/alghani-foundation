import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import Image from "next/image";
import React from "react";
import { getPlaiceholder } from "plaiceholder";
import PostBody from "@/components/post-body/PostBody";
import PaddingContainer from "@/components/layout/PaddingContainer";
import moment from "moment";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { getBlogData, getProjectData } from "@/helpers/fetchFromDirectus";
import { formatStatus } from "@/lib/format";
import Link from "next/link";
import { getBlurData } from "@/lib/getBlurData";
interface PageProps {
  params: Promise<{
    permalink: string;
    slug: string;
  }>;
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
  const { slug } = await params;
  const blogData = await getBlogData(slug);

  const imageUrl = `${process.env.NEXT_PUBLIC_ASSETS_URL}${blogData.image}`;
  const blurDataURL = await getBlurData(imageUrl);

  const imageSources = [
    ...(blogData.body.matchAll(/<img[^>]+src=["']([^"']+)["']/g) || []),
  ].map((match) => match[1]);

  const blurDataMap = await Promise.all(
    imageSources.map((src) =>
      getBlurData(src).then((blurDataURL) => ({
        src,
        blurDataURL,
      }))
    )
  );

  const currentURL = `${process.env.NEXT_PUBLIC_SITE_URL}blog/${blogData.slug}`;

  // Facebook share URL
  const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`;

  const xShareURL = `https://twitter.com/intent/tweet?url=${currentURL}&text=${`Check out this project: ${blogData.title}`}`;
  return (
    <main>
      <div className="relative h-[85vh] overflow-hidden w-full">
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${blogData.image}`}
          alt={blogData.title}
          width={1920}
          height={1800}
          blurDataURL={blurDataURL}
          placeholder="blur"
          style={{ objectPosition: "50% 50%" }}
          className=" w-full h-full object-cover absolute object-bottom"
        />
        <div className=" bg-gradient-to-b from-transparent via-transparent to-black/80 absolute w-full h-full indent-0 z-10"></div>
        <PaddingContainer className="relative  h-full w-full">
          <div className="absolute  left-0 bottom-0 z-20 w-full">
            <h2 className="text-4xl font-extrabold text-white px-5">
              {blogData.title}
            </h2>
            <div className="flex justify-between p-5">
              <div className="py-5  gap-2 text-sm items-center flex flex-wrap">
                {blogData.tags.map((tag, i) => (
                  <div
                    className="bg-primary  w-fit font-bold px-3 text-white  rounded-full py-1"
                    key={i}
                  >
                    {tag}
                  </div>
                ))}
                <p className="text-white text-sm">{`Updated: ${moment(
                  blogData.date_updated
                ).format("MMM DD, YYYY")}`}</p>
              </div>
              <div className="text-white text-sm md:flex items-center gap-2 hidden ">
                <p className=" text-white text-sm">Share On: </p>

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
};

export default page;
