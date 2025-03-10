import { NextResponse } from "next/server";
import { createItem } from "@directus/sdk";
import directus from "@/lib/directus";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data = {
      status: "draft",
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      contact: formData.get("contact") as string,
      message: formData.get("message") as string,
    };

    // Validate email format
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate mobile number (10-15 digits)
    if (!data.contact.match(/^\d{10,15}$/)) {
      return NextResponse.json(
        { success: false, error: "Invalid mobile number" },
        { status: 400 }
      );
    }

    // Store in Directus
    const newItem = await directus.request(
      createItem("inbox_contact_us", data)
    );

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
