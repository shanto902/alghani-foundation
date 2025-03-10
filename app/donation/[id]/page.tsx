import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostBody from "@/components/post-body/PostBody";
import { getDonationData } from "@/helpers/fetchFromDirectus";
import { TSetting } from "@/interfaces";
import directus from "@/lib/directus";
import { getPlaceholderImage } from "@/lib/getBlurData";
import { readItems, readSingleton } from "@directus/sdk";
import { Metadata, ResolvingMetadata } from "next";
import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import parse from "html-react-parser";

interface PageProps {
  params: Promise<{
    permalink: string;
    id: string;
  }>;
}
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const { id } = await params;
    const donation = await getDonationData(id);
    const bodyText = donation?.body
      ? parse(donation.body.toString().slice(0, 200))
      : "";
    const previousImages = (await parent).openGraph?.images || [];

    if (donation !== null) {
      return {
        title: donation.title,
        description: `${bodyText}` || "",
        openGraph: {
          images: donation.image
            ? [
                {
                  url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${donation.image}`,
                },
              ]
            : [...previousImages],
        },
      };
    }

    // Default metadata if the page is not found
    return {
      title: "Donation not Found",
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
  const donationData = await getDonationData(id);
  const settings = await directus.request(readSingleton("settings"));
  const imageSources = donationData.body
    ? [...donationData.body.matchAll(/<img[^>]+src=["']([^"']+)["']/g)].map(
        (match) => match[1]
      )
    : [];
  const blurDataMap = await Promise.all(
    imageSources.map(async (src) => ({
      src,
      blurDataURL: await getPlaceholderImage(src),
    }))
  );

  const currentURL = `${process.env.NEXT_PUBLIC_SITE_URL}donation/${donationData.id}`;

  const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${currentURL}`;

  const xShareURL = `https://twitter.com/intent/tweet?url=${currentURL}&text=${`${donationData.title}`}`;
  return (
    <div>
      <header className="bg-primary  pb-10 relative ">
        <PaddingContainer className="flex overflow-visible flex-col relative justify-center items-center">
          <h1 className="text-[clamp(2.2rem,4vw,3rem)]   text-center font-bold text-white text-shadow-lg  pt-5">
            {donationData.title}
          </h1>
          <hr className="h-px w-full my-3 bg-white" />
          <div className="text-white text-sm flex  self-end items-center gap-2 ">
            <p className=" text-white text-sm">Share On</p>

            <div className="flex gap-2">
              <a target="_blank" href={facebookShareURL}>
                <FaFacebookF className="bg-white hover:bg-primary hover:text-white h-8 w-8 p-2 rounded-full text-primary transition-all duration-300" />
              </a>
              <a target="_blank" href={xShareURL}>
                <FaXTwitter className="bg-white hover:bg-primary hover:text-white h-8 w-8 p-2 rounded-full text-primary transition-all duration-300" />
              </a>
            </div>
          </div>
        </PaddingContainer>
      </header>
      <PaddingContainer className="max-w-screen-lg my-5">
        <PostBody body={donationData.body} blurDataMap={blurDataMap} />
      </PaddingContainer>

      <section className="bg-primary  py-10 gap-10 text-white">
        <h2 className="text-center text-3xl font-bold uppercase mb-10">
          Payment method
        </h2>
        <PaddingContainer className="flex max-w-screen flex-col md:flex-row items-start justify-between">
          <div className="md:w-1/2 w-full">
            <PostBody body={settings.bank_details}></PostBody>
          </div>
          <div className="md:w-1/2 w-full">
            <PostBody body={settings.bkash_details}></PostBody>
            <hr className="h-px bg-white" />
            <div className="my-5 space-y-2">
              <p className="text-lg font-bold">For More Details Information</p>
              <CustomButton className="text-sm" href="/contact">
                Contact us
              </CustomButton>
            </div>
          </div>
        </PaddingContainer>
      </section>
    </div>
  );
};

export default page;
