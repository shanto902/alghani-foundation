import { NextRequest, NextResponse } from "next/server";
import directus from "@/lib/directus"; // Import your Directus SDK
import { readItems } from "@directus/sdk";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Slug is Required" }, { status: 400 });
  }

  try {
    // Fetch career item from Directus using SDK
    const result = await directus.request(
      readItems("careers", {
        filter: {
          slug: {
            _eq: slug,
          },
        },
        fields: ["slug", "position"],
      })
    );

    if (!result || result?.length === 0) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    return NextResponse.json(result[0]); // Return the first matching career
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
