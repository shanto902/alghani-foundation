import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostBody from "@/components/post-body/PostBody";
import { getServiceData } from "@/helpers/fetchFromDirectus";
import directus from "@/lib/directus";
import { getPlaceholderImage } from "@/lib/getBlurData";
import { readItems } from "@directus/sdk";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
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
    const service = await getServiceData(slug);

    const previousImages = (await parent).openGraph?.images || [];
    if (service !== null) {
      return {
        title: service.title,
        description: `${service.description}` || "",
        openGraph: {
          images: service.image
            ? [
                {
                  url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${service.image}`,
                },
              ]
            : [...previousImages],
        },
      };
    }

    // Default metadata if the page is not found
    return {
      title: "Service not Found",
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
      readItems("services", {
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
        permalink: "services",
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

    const serviceData = await getServiceData(slug);

    const imageUrl = `${process.env.NEXT_PUBLIC_ASSETS_URL}${serviceData.image}`;
    const blurDataURL = await getPlaceholderImage(imageUrl);

    // ✅ Extract images from blog body for placeholder blur effect
    const imageSources = serviceData.body
      ? [...serviceData.body.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(
          (match) => match[1]
        )
      : [];

    const blurDataMap = await Promise.all(
      imageSources.map(async (src) => ({
        src,
        blurDataURL: await getPlaceholderImage(src),
      }))
    );
    return (
      <main>
        <div className="relative h-[85vh] overflow-hidden w-full">
          <Image
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${serviceData.image}`}
            alt={serviceData.title}
            width={1920}
            height={1080}
            blurDataURL={blurDataURL}
            placeholder="blur"
            className="w-full h-full object-cover absolute object-center"
          />
          <div className="bg-gradient-to-b from-transparent via-transparent to-black/80 absolute w-full h-full z-10"></div>
          <PaddingContainer className="relative h-full w-full">
            <div className="absolute left-0 bottom-0 z-20 w-full">
              <h2 className="text-4xl font-extrabold text-white px-5 my-10">
                {serviceData.title}
              </h2>
            </div>
          </PaddingContainer>
        </div>

        <article className="relative max-w-screen-xl mx-auto px-5 py-10">
          <PostBody body={serviceData?.body || ""} blurDataMap={blurDataMap} />
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
        <CustomButton invert href="/services" className="">
          Go Back to Services
        </CustomButton>
      </div>
    );
  }
};

export default page;
