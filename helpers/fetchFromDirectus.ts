import {
  TBlog,
  TCareer,
  TDonation,
  TPageBlock,
  TPress,
  TProject,
  TTeam,
} from "@/interfaces";
import directus from "@/lib/directus";

import { readItems } from "@directus/sdk";
import { cache } from "react";
import { getPlaceholderImage } from "@/lib/getBlurData"; // ✅ Import blur function
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
                    block_reports: [
                      "*",
                      {
                        reports: [{ reports_id: ["*"] }],
                      },
                    ],
                    block_about_us: ["*"],
                    block_team: ["*", { team: [{ team_id: ["*"] }] }],
                    block_timeline: ["*"],
                    block_product_showcase: [
                      "*",
                      {
                        projects: [
                          "*",
                          {
                            projects_id: [
                              "id",
                              "title",
                              "slug",
                              "image",
                              "project_status",
                              "date_created",
                              "date_updated",
                              { foundation: ["name", "slug"] },
                            ],
                          },
                        ],
                      },
                    ],
                    block_services: [
                      "*",
                      { services: ["*", { services_id: ["*"] }] },
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
        fields: ["permalink", "date_updated", "date_created"],
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
        sort: ["sort"],
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
          sort: ["sort"],
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
          sort: ["sort"],
          fields: [
            "image",
            "id",
            "sort",
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

export const getCareerData = cache(async (slug: string): Promise<TCareer> => {
  try {
    const results = await directus.request(
      readItems("careers", {
        filter: {
          status: {
            _eq: "published",
          },
          slug,
        },
        sort: ["sort"],
        fields: ["*"],
      })
    );

    return results[0] as TCareer;
  } catch (error) {
    console.error("Error fetching career data:", error);
    throw new Error("Error fetching careers");
  }
});

export const getPartialCareersData = cache(async (): Promise<TCareer[]> => {
  try {
    const results = await directus.request(
      readItems("careers", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        sort: ["sort"],
        fields: ["id", "position", "company_name", "job_type", "location"],
      })
    );

    return results as TCareer[];
  } catch (error) {
    console.error("Error fetching career data:", error);
    throw new Error("Error fetching careers");
  }
});

export const getAllPress = cache(async (): Promise<TPress[]> => {
  try {
    const results = await directus.request(
      readItems("press", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        sort: ["sort"],
        fields: ["*"],
      })
    );

    return results as TPress[];
  } catch (error) {
    console.error("Error fetching press data:", error);
    throw new Error("Error fetching press");
  }
});

export const getAllBlogs = cache(
  async (
    page: number,
    limit: number
  ): Promise<{
    results: TBlog[];
    totalPages: number;
  }> => {
    try {
      // ✅ Fetch paginated blog posts from Directus
      const results = (await directus.request(
        readItems("blogs", {
          filter: {
            status: {
              _eq: "published",
            },
          },
          page: page,
          limit: limit,
          sort: ["sort"],
          fields: [
            "id",
            "date_created",
            "date_updated",
            "title",
            "description",
            "slug",
            "tags",
            "image",
          ],
        })
      )) as TBlog[];

      // ✅ Fetch total count for pagination
      const totalCount = await directus.request(
        readItems("blogs", {
          aggregate: { count: ["id"] },
          filter: { status: { _eq: "published" } },
        })
      );

      const totalPages = Math.ceil(totalCount[0].count.id / limit);

      // ✅ Generate blur placeholders for all blog images
      const blogsWithBlur = await Promise.all(
        results.map(async (blog) => ({
          ...blog,
          blurDataURL: await getPlaceholderImage(
            `${process.env.NEXT_PUBLIC_ASSETS_URL}${blog.image}`
          ), // ✅ Ensure blur is fetched
        }))
      );

      return { results: blogsWithBlur, totalPages };
    } catch (error) {
      console.error("Error fetching blogs:", error);
      throw new Error("Error fetching blogs");
    }
  }
);

export const getBlogData = cache(async (slug: string): Promise<TBlog> => {
  try {
    const result = await directus.request(
      readItems("blogs", {
        filter: {
          slug: {
            _eq: slug,
          },
        },
        sort: ["sort"],
        fields: ["*"],
      })
    );

    return result[0] as TBlog;
  } catch (error) {
    console.error("Error fetching member data:", error);
    throw new Error("Error fetching post");
  }
});

export const getTeamData = cache(async (slug: string): Promise<TTeam> => {
  try {
    const results = await directus.request(
      readItems("team", {
        filter: {
          slug,
        },
        sort: ["sort"],
        fields: ["*"],
      })
    );
    const newData = {
      team_id: {
        ...results[0],
      },
    };

    return newData as TTeam;
  } catch (error) {
    console.error("Error fetching career data:", error);
    throw new Error("Error fetching careers");
  }
});

export const getDonationData = cache(async (id: string): Promise<TDonation> => {
  try {
    const results = await directus.request(
      readItems("donations", {
        filter: {
          id,
        },
        sort: ["sort"],
        fields: ["*"],
      })
    );

    return results[0] as TDonation;
  } catch (error) {
    console.error("Error fetching donation data:", error);
    throw new Error("Error fetching donation ");
  }
});

export const getAllDonations = cache(async (): Promise<TDonation[]> => {
  try {
    const results = await directus.request(
      readItems("donations", {
        filter: {
          status: {
            _eq: "published",
          },
        },
        sort: ["sort"],
        fields: ["*"],
      })
    );

    return results as TDonation[];
  } catch (error) {
    console.error("Error fetching press data:", error);
    throw new Error("Error fetching press");
  }
});
