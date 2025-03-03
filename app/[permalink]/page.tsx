import BreadCrumbBlock from "@/components/block/BreadCrumbBlock";
import DevelopmentBlock from "@/components/block/DevelopmentBlock";
import HeaderBlock from "@/components/block/HeaderBlock";
import HeroSliderBlock from "@/components/block/HeroSliderBlock";
import LocationBlock from "@/components/block/LocationBlock";
import PartnerBlock from "@/components/block/PartnerBlock";
import ProjectBlock from "@/components/block/ProjectBlock";
import RecognitionBlock from "@/components/block/RecognitionBlock";
import ServedNumbers from "@/components/block/ServedNumbers";
import SponsorProgram from "@/components/block/SponsorProgram";
import TestimonialBlock from "@/components/block/TestimonialBlock";
import { fetchPage, fetchPages } from "@/helpers/fetchFromDirectus";
import {
  TBlock,
  TBreadCrumbBlock,
  TDevelopmentBlock,
  THeaderBlock,
  THeroSliderBlock,
  TLocationBlock,
  TPartner,
  TPartnerBlock,
  TProjectPageBlock,
  TRecognitionBlock,
  TServedNumbersBlock,
  TSponsorProgramBlock,
  TTestimonial,
  TTestimonialBlock,
} from "@/interfaces";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
interface PageProps {
  params: Promise<{
    permalink: string;
  }>;
}
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const { permalink } = await params;
    const result = await directus.request(
      readItems("pages", {
        filter: {
          permalink: {
            _eq: permalink,
          },
        },
        limit: 1,
        fields: ["permalink", "name", "description", "og_image"],
      })
    );

    if (result && result.length > 0) {
      const page = result[0];
      return {
        title: page.name || page.permalink,
        description: page.description || "",
        openGraph: {
          images: page.og_image ?? [
            { url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${page.og_image}` },
          ],
        },
        twitter: {
          card: "summary_large_image",
        },
      };
    }

    return {
      title: "Page not found",
      description: "This page does not exist.",
    };
  } catch (error) {
    console.error("Error fetching page metadata:", error);
    return {
      title: "Error",
      description: "Failed to fetch page metadata.",
    };
  }
}

export async function generateStaticParams() {
  try {
    const pages = await fetchPages();
    return pages.map((page) => ({
      permalink: page.permalink,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    throw new Error("Error fetching categories");
  }
}

const renderBlock = (block: TBlock) => {
  switch (block.collection) {
    case "block_hero_slider":
      return (
        <HeroSliderBlock key={block.id} block={block as THeroSliderBlock} />
      );
    case "block_sponsor_program":
      return (
        <SponsorProgram key={block.id} block={block as TSponsorProgramBlock} />
      );
    case "block_header":
      return <HeaderBlock key={block.id} block={block as THeaderBlock} />;
    case "block_served_numbers":
      return (
        <ServedNumbers key={block.id} block={block as TServedNumbersBlock} />
      );
    case "block_recognition":
      return (
        <RecognitionBlock key={block.id} block={block as TRecognitionBlock} />
      );
    case "block_partners":
      return <PartnerBlock key={block.id} block={block as TPartnerBlock} />;
    case "block_locations":
      return <LocationBlock key={block.id} block={block as TLocationBlock} />;
    case "block_development":
      return (
        <DevelopmentBlock key={block.id} block={block as TDevelopmentBlock} />
      );
    case "block_testimonials":
      return (
        <TestimonialBlock key={block.id} block={block as TTestimonialBlock} />
      );
    case "page_project":
      return <ProjectBlock key={block.id} block={block as TProjectPageBlock} />;
    case "block_breadcrumb":
      return (
        <BreadCrumbBlock key={block.id} block={block as TBreadCrumbBlock} />
      );
    default:
      return <h2 key={block.id}>Unknown Block Type</h2>;
  }
};
const Page = async ({ params }: PageProps) => {
  const { permalink } = await params;
  const page = await fetchPage(permalink);
  // console.log(page?.blocks);
  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-[80vh]">
      {page.blocks?.map((block) => renderBlock(block))}
    </div>
  );
};

export default Page;
