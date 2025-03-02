import { TPageBlock } from "@/interfaces";
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
                            slides_id: ["*"],
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
