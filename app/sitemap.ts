import { fetchPages } from "@/helpers/fetchFromDirectus";
import { TBlog, TCareer, TDonation, TProject } from "@/interfaces";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import { MetadataRoute } from "next";
import { cache } from "react";

export const fetchProjectPages = cache(async (): Promise<TProject[]> => {
  try {
    const result = await directus.request(
      readItems("projects", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: [
          "slug",
          "date_updated",
          "foundation.slug",
          "project_status",
          "date_created",
        ],
      })
    );

    return result as TProject[];
  } catch (error) {
    throw new Error("Failed to fetch project pages for sitemaps.");
  }
});

export const fetchBlogPages = cache(async (): Promise<TBlog[]> => {
  try {
    const result = await directus.request(
      readItems("blogs", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["slug", "date_created", "date_updated"],
      })
    );
    return result as TBlog[];
  } catch (error) {
    throw new Error("Failed to fetch blog pages for sitemaps.");
  }
});

export const fetchCareersPages = cache(async (): Promise<TCareer[]> => {
  try {
    const result = await directus.request(
      readItems("careers", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["slug", "date_created", "date_updated"],
      })
    );
    return result as TCareer[];
  } catch (error) {
    throw new Error("Failed to fetch careers pages for sitemaps.");
  }
});

export const fetchDonationPages = cache(async (): Promise<TDonation[]> => {
  try {
    const result = await directus.request(
      readItems("donations", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        fields: ["id", "date_updated", "date_created"],
      })
    );
    return result as TDonation[];
  } catch (error) {
    throw new Error("Failed to fetch donation pages for sitemaps.");
  }
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = await fetchPages();

  const pageEntries: MetadataRoute.Sitemap = pages.map((page) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${page.permalink}`,
    lastModified: `${
      page.date_updated ? page.date_updated : page.date_created
    }`,
  }));

  const projects = await fetchProjectPages();
  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}${project.foundation.slug}/${project.project_status}/${project.slug}`,
    lastModified: `${
      project.date_updated ? project.date_updated : project.date_created
    }`,
  }));

  const blogs = await fetchBlogPages();
  const blogEntries: MetadataRoute.Sitemap = blogs.map((blog) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}blog/${blog.slug}`,
    lastModified: `${
      blog.date_updated ? blog.date_updated : blog.date_created
    }`,
  }));

  const careers = await fetchCareersPages();
  const careerEntries: MetadataRoute.Sitemap = careers.map((career) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}career/${career.slug}`,
    lastModified: `${
      career.date_updated ? career.date_updated : career.date_created
    }`,
  }));

  const donations = await fetchDonationPages();
  const donationEntries: MetadataRoute.Sitemap = donations.map((donation) => ({
    url: `${process.env.NEXT_PUBLIC_SITE_URL}donation/${donation.id}`,
    lastModified: `${
      donation.date_updated ? donation.date_updated : donation.date_created
    }`,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
    },
    ...pageEntries,
    ...projectEntries,
    ...blogEntries,
    ...careerEntries,
    ...donationEntries,
  ];
}
