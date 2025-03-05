import { getPlaiceholder } from "plaiceholder";

/**
 * Generates a blurDataURL for Next.js Image component
 * @param imageUrl - The full URL of the image
 * @returns A base64 encoded blur placeholder
 */
export const getBlurData = async (imageUrl: string): Promise<string> => {
  try {
    const buffer = await fetch(imageUrl).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );

    const { base64 } = await getPlaiceholder(buffer);
    return base64;
  } catch (error) {
    console.error("Error generating blurDataURL:", error);
    return ""; // Return empty string if there's an error
  }
};
