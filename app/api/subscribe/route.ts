import { NextResponse } from "next/server";
import { createItem, readItems } from "@directus/sdk";
import directus from "@/lib/directus";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const email = formData.get("email") as string;

    // Validate email format
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await directus.request(
      readItems("subscribers", {
        filter: { email: { _eq: email } },
        limit: 1,
      })
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { success: false, error: "Already subscribed." },
        { status: 400 }
      );
    }

    // Store in Directus
    const newItem = await directus.request(
      createItem("subscribers", { email, status: "subscribed" })
    );

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
