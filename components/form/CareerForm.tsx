"use client";

import Spinner from "@/components/common/Spinner";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CareerForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [position, setPosition] = useState<string | null>(null);
  const [isValidSlug, setIsValidSlug] = useState<boolean | null>(null);
  const searchParams = useSearchParams();
  const slug = searchParams.get("slug");

  useEffect(() => {
    const fetchCareer = async () => {
      if (!slug) return;
      try {
        const response = await fetch(`/api/careers?slug=${slug}`);
        const data = await response.json();

        if (data?.position) {
          setPosition(data.position);
          setIsValidSlug(true);
        } else {
          setIsValidSlug(false);
        }
      } catch (error) {
        console.error("Error fetching career data:", error);
        setIsValidSlug(false);
      }
    };

    fetchCareer();
  }, [slug]);

  if (isValidSlug === false) return notFound(); // Redirect to 404 if slug is invalid
  if (isValidSlug === null)
    return (
      <div className="flex flex-col justify-center h-full items-center gap-5">
        <Spinner />
        <h3 className="text-2xl font-bold">Please Wait, Form is Loading</h3>
      </div>
    );

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};

    const email = formData.get("email") as string;
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Invalid email format";
    }

    const contactNo = formData.get("contact_no") as string;
    if (!contactNo.match(/^\d{10,15}$/)) {
      newErrors.contact_no = "Invalid mobile number";
    }

    return newErrors;
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!position) {
      alert("Position data is not available. Please try again.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    console.log("Position:", position); // Debugging

    // Append position to formData only if it's available
    formData.append("position", position);

    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    // Submit form data
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (result.success) {
      alert("Data submitted successfully!");
      form.reset();
    } else {
      alert("Submission failed: " + result.error);
    }
  }

  return (
    <PaddingContainer className="flex w-full flex-col justify-center items-center">
      <h3 className="font-bold text-2xl my-10">{position || "Loading..."}</h3>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="block w-full p-2 border rounded mb-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          required
          className="block w-full p-2 border rounded mb-2"
        />

        <div className="mb-2 flex flex-col">
          <label>Gender:</label>
          <label>
            <input type="radio" name="gender" value="male" required /> Male
          </label>
          <label>
            <input type="radio" name="gender" value="female" /> Female
          </label>
          <label>
            <input type="radio" name="gender" value="prefer not to say" />{" "}
            Prefer not to say
          </label>
        </div>

        <input
          type="text"
          name="experience"
          placeholder="Experience"
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="text"
          name="salary"
          placeholder="Expected Salary"
          required
          className="block w-full p-2 border rounded mb-2"
        />

        <input
          type="text"
          name="contact_no"
          placeholder="Contact Number"
          required
          className="block w-full p-2 border rounded mb-2"
        />
        {errors.contact_no && (
          <p className="text-red-500 text-sm">{errors.contact_no}</p>
        )}

        <input
          type="text"
          name="location"
          placeholder="Location"
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="url"
          name="cv_link"
          placeholder="CV Link"
          required
          className="block w-full p-2 border rounded mb-2"
        />
        <input
          type="url"
          name="portfolio_link"
          placeholder="Portfolio Link (Optional)"
          className="block w-full p-2 border rounded mb-2"
        />

        <button
          type="submit"
          className="w-full p-2 bg-primary text-white rounded"
        >
          Submit
        </button>
      </form>
    </PaddingContainer>
  );
}
