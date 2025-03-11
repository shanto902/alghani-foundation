import AboutUsBlock from "@/components/block/AboutUsBlock";
import BreadCrumbBlock from "@/components/block/BreadCrumbBlock";
import DevelopmentBlock from "@/components/block/DevelopmentBlock";
import HeaderBlock from "@/components/block/HeaderBlock";
import HeroSliderBlock from "@/components/block/HeroSliderBlock";
import LocationBlock from "@/components/block/LocationBlock";
import PartnerBlock from "@/components/block/PartnerBlock";
import ProjectBlock from "@/components/block/ProjectBlock";
import ProjectShowcase from "@/components/block/ProjectShowcase";
import RecognitionBlock from "@/components/block/RecognitionBlock";
import ReportBlock from "@/components/block/ReportBlock";
import ServedNumbers from "@/components/block/ServedNumbers";
import ServicesBlock from "@/components/block/ServicesBlock";
import SponsorProgram from "@/components/block/SponsorProgram";
import TeamBlock from "@/components/block/TeamBlock";
import TestimonialBlock from "@/components/block/TestimonialBlock";
import TimelineBlock from "@/components/block/TimelineBlock";
import ModalTrigger from "@/components/ModalTrigger";

import { fetchPage, fetchPages } from "@/helpers/fetchFromDirectus";
import {
  TAboutUsBlock,
  TBlock,
  TBreadCrumbBlock,
  TDevelopmentBlock,
  THeaderBlock,
  THeroSliderBlock,
  TLocationBlock,
  TPartnerBlock,
  TProjectPageBlock,
  TProjectShowcaseBlock,
  TRecognitionBlock,
  TReportBlock,
  TServedNumbersBlock,
  TServiceBlock,
  TSponsorProgramBlock,
  TTeamBlock,
  TTestimonialBlock,
  TTimelineBlock,
} from "@/interfaces";
import directus from "@/lib/directus";
import { getPlaceholderImage } from "@/lib/getBlurData";
import { readItems } from "@directus/sdk";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
interface PageProps {
  params: Promise<{
    permalink: string;
  }>;
}
export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
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

    const previousImages = (await parent).openGraph?.images || [];
    if (result && result.length > 0) {
      const page = result[0];
      return {
        title: page.name || page.permalink,
        description: page.description || "",
        openGraph: {
          images: page.og_image
            ? [{ url: `${process.env.NEXT_PUBLIC_ASSETS_URL}${page.og_image}` }]
            : [...previousImages],
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
        <Suspense>
          <HeroSliderBlock key={block.id} block={block as THeroSliderBlock} />
        </Suspense>
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
        <Suspense>
          <RecognitionBlock key={block.id} block={block as TRecognitionBlock} />
        </Suspense>
      );
    case "block_partners":
      return (
        <Suspense>
          <PartnerBlock key={block.id} block={block as TPartnerBlock} />
        </Suspense>
      );
    case "block_locations":
      return <LocationBlock key={block.id} block={block as TLocationBlock} />;
    case "block_development":
      return (
        <DevelopmentBlock key={block.id} block={block as TDevelopmentBlock} />
      );
    case "block_testimonials":
      return (
        <Suspense>
          <TestimonialBlock key={block.id} block={block as TTestimonialBlock} />
        </Suspense>
      );
    case "page_project":
      return <ProjectBlock key={block.id} block={block as TProjectPageBlock} />;
    case "block_breadcrumb":
      return (
        <BreadCrumbBlock key={block.id} block={block as TBreadCrumbBlock} />
      );
    case "block_reports":
      return <ReportBlock key={block.id} block={block as TReportBlock} />;
    case "block_about_us":
      return <AboutUsBlock key={block.id} block={block as TAboutUsBlock} />;
    case "block_team":
      return <TeamBlock key={block.id} block={block as TTeamBlock} />;
    case "block_timeline":
      return <TimelineBlock key={block.id} block={block as TTimelineBlock} />;
    case "block_product_showcase":
      return (
        <Suspense>
          <ProjectShowcase
            key={block.id}
            block={block as TProjectShowcaseBlock}
          />
        </Suspense>
      );
    case "block_services":
      return <ServicesBlock key={block.id} block={block as TServiceBlock} />;
    default:
      return <h2 key={block.id}>Unknown Block Type</h2>;
  }
};
const Page = async ({ params }: PageProps) => {
  const { permalink } = await params;
  const page = await fetchPage(permalink);
  const imageUrl = `${process.env.NEXT_PUBLIC_ASSETS_URL}${page?.modal_image}`;
  const blurDataURL = await getPlaceholderImage(imageUrl);

  const modal_body = {
    imageUrl,
    blurDataURL,
  };
  if (!page) {
    notFound();
  }

  return (
    <div className="min-h-[80vh]" key={page.id}>
      {page.blocks?.map((block) => renderBlock(block))}
      {page.show_modal === "true" && <ModalTrigger modal_body={modal_body} />}
    </div>
  );
};

export default Page;
