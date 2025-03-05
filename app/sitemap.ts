import { fetchPages } from "@/helpers/fetchFromDirectus";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await fetchPages();

  const postEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${page.permalink}`,
    lastModified: `${page.date_updated}`,
  }));

  // const members = await fetchTeamPages();
  // const memberEntries: MetadataRoute.Sitemap = members.map((member) => ({
  //   url: `${process.env.NEXT_PUBLIC_SITE_URL}team/${member.slug}`,
  //   lastModified: `${member.date_updated}`,
  // }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    },
    ...postEntries,
    //   ...memberEntries,
  ];
}
