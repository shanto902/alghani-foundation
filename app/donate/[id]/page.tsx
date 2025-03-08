import { getDonationData } from "@/helpers/fetchFromDirectus";
import directus from "@/lib/directus";
import { getBlurData } from "@/lib/getBlurData";
import { readItems } from "@directus/sdk";
import React from "react";

interface PageProps {
  params: Promise<{
    permalink: string;
    id: string;
  }>;
}
export const generateStaticParams = async () => {
  try {
    const result = await directus.request(
      readItems("donations", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["id"],
      })
    );

    const allParams =
      (
        result as {
          id: string;
        }[]
      ).map((item) => ({
        id: item.id,
        permalink: "donation",
      })) || [];

    return allParams;
  } catch (error) {
    console.error("Error fetching career:", error);
    throw new Error("Error fetching Career");
  }
};

const page = async ({ params }: PageProps) => {
  const { id } = await params;
  const blogData = await getDonationData(id);

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

  const currentURL = `${process.env.NEXT_PUBLIC_SITE_URL}donation/${blogData.id}`;

  // Facebook share URL
  const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`;

  const xShareURL = `https://twitter.com/intent/tweet?url=${currentURL}&text=${`${blogData.title}`}`;
  return <div>page</div>;
};

export default page;
