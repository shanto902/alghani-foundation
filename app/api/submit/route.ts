import { NextResponse } from "next/server";
import { createItem } from "@directus/sdk";
import directus from "@/lib/directus";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const data = {
      status: "draft",
      email: formData.get("email") as string,
      full_name: formData.get("full_name") as string,
      gender: formData.get("gender") as string,
      position: formData.get("position") as string,
      experience: formData.get("experience") as string,
      salary: formData.get("salary") as string,
      contact_no: formData.get("contact_no") as string,
      location: formData.get("location") as string,
      cv_link: formData.get("cv_link") as string,
      portfolio_link: (formData.get("portfolio_link") as string) || null,
    };

    // Validate email format
    if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return NextResponse.json(
        { success: false, error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate mobile number (10-15 digits)
    if (!data.contact_no.match(/^\d{10,15}$/)) {
      return NextResponse.json(
        { success: false, error: "Invalid mobile number" },
        { status: 400 }
      );
    }

    // Store in Directus
    const newItem = await directus.request(createItem("career_inbox", data));

    return NextResponse.json({ success: true, data: newItem }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
