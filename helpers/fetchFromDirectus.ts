import { TPageBlock, TProject } from "@/interfaces";
import directus from "@/lib/directus";

import { readItems } from "@directus/sdk";
import { cache } from "react";

export const fetchPage = cache(
  async (permalink: string): Promise<TPageBlock | null> => {
    try {
      const result = await directus.request(
        readItems("pages", {
          filter: {
            permalink: {
              _eq: permalink,
            },
          },
          sort: ["blocks.sort"],
          fields: [
            {
              blocks: [
                "*",
                {
                  item: {
                    block_hero_slider: [
                      {
                        sliders: [
                          {
                            sliders_id: ["*"],
                          },
                        ],
                      },
                    ],
                    block_sponsor_program: ["*"],
                    block_header: ["*"],
                    block_served_numbers: ["*"],
                    block_recognition: [
                      { recognitions: [{ recognition_id: ["*"] }] },
                    ],
                    block_partners: [
                      "*",
                      {
                        partners: [
                          {
                            partner_id: ["*"],
                          },
                        ],
                      },
                    ],
                    block_locations: [
                      "*",
                      {
                        locations: [
                          {
                            locations_id: ["*"],
                          },
                        ],
                      },
                    ],
                    block_development: [
                      "*",
                      { sectors: [{ sector_id: ["*"] }] },
                    ],
                    block_testimonials: [
                      "*",
                      { testimonials: [{ testimonial_id: ["*"] }] },
                    ],
                    block_breadcrumb: ["*"],
                    page_project: [
                      "*",
                      {
                        foundation: ["*"],
                      },
                    ],
                  },
                },
              ],
            },
          ],
        })
      );

      return result[0] as TPageBlock; // Changed from `TPageBlock[]`
    } catch (error) {
      console.error("Failed to fetch about page data:", error);
      return null;
    }
  }
);

export const fetchPages = async (): Promise<TPageBlock[]> => {
  try {
    const result = await directus.request(
      readItems("pages", {
        fields: ["permalink", "date_updated"],
      })
    );
    return result as TPageBlock[];
  } catch (error) {
    console.error("Error generating sitemaps:", error);
    throw new Error("Failed to fetch all pages for sitemaps.");
  }
};

export const getProjectData = cache(async (slug: string): Promise<TProject> => {
  try {
    const result = await directus.request(
      readItems("projects", {
        filter: {
          slug: {
            _eq: slug,
          },
        },
        fields: ["*", { foundation: ["*"] }],
      })
    );

    return result[0] as TProject;
  } catch (error) {
    console.error("Error fetching member data:", error);
    throw new Error("Error fetching post");
  }
});

export const getAllProjectsBasedOnFoundation = cache(
  async (
    projectStatus: string,
    foundationSlug: string
  ): Promise<TProject[]> => {
    try {
      const filter: any = {
        foundation: {
          slug: {
            _eq: foundationSlug,
          },
        },
      };

      if (projectStatus !== "all-projects") {
        filter.project_status = {
          _eq: projectStatus,
        };
      }

      const results = await directus.request(
        readItems("projects", {
          filter,
          fields: ["*", "foundation.*"],
        })
      );

      return results as TProject[];
    } catch (error) {
      console.error("Error fetching project data:", error);
      throw new Error("Error fetching projects");
    }
  }
);

export const getAllProjects = cache(
  async (foundationSlug: string): Promise<TProject[]> => {
    try {
      const results = await directus.request(
        readItems("projects", {
          filter: {
            status: {
              _eq: "published",
            },
            foundation: {
              slug: {
                _eq: foundationSlug,
              },
            },
          },
          fields: [
            "image",
            "id",
            "title",
            "foundation.slug",
            "date_created",
            "tags",
            "slug",
            "project_status",
          ],
        })
      );

      return results as TProject[];
    } catch (error) {
      console.error("Error fetching project data:", error);
      throw new Error("Error fetching projects");
    }
  }
);
