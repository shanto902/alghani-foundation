import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PostBody from "@/components/post-body/PostBody";
import { getDonationData } from "@/helpers/fetchFromDirectus";
import { TSetting } from "@/interfaces";
import directus from "@/lib/directus";
import { getBlurData } from "@/lib/getBlurData";
import { readItems, readSingleton } from "@directus/sdk";
import React from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

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
  const donationData = await getDonationData(id);
  const settings = await directus.request(readSingleton("settings"));
  // const imageUrl = `${process.env.NEXT_PUBLIC_ASSETS_URL}${donationData.image}`;
  // const blurDataURL = await getBlurData(imageUrl);

  const imageSources = [
    ...(donationData.body.matchAll(/<img[^>]+src=["']([^"']+)["']/g) || []),
  ].map((match) => match[1]);

  const blurDataMap = await Promise.all(
    imageSources.map((src) =>
      getBlurData(src).then((blurDataURL) => ({
        src,
        blurDataURL,
      }))
    )
  );

  const currentURL = `${process.env.NEXT_PUBLIC_SITE_URL}donation/${donationData.id}`;

  // Facebook share URL
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
        <PaddingContainer className="flex max-w-screen-xl  items-start justify-between">
          <div className="w-1/2">
            <PostBody body={settings.bank_details}></PostBody>
          </div>
          <div className="w-1/2">
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
