"use client";

import { TSetting } from "@/interfaces";
import React, { useState } from "react";
import parse from "html-react-parser";
import { toast } from "sonner"; // ✅ Importing Sooner for notifications

const ContactSection = ({ settings }: { settings: TSetting }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("contact", formData.contact);
    data.append("message", formData.message);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Message sent successfully!"); // ✅ Sooner success notification
        setFormData({ name: "", email: "", contact: "", message: "" }); // Reset form
      } else {
        toast.error(result.error || "Something went wrong!"); // ✅ Sooner error notification
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again later."); // ✅ Error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white shadow-lg flex-col rounded-lg w-full md:flex-row max-w-4xl flex overflow-hidden">
        {/* Left Side - Contact Info */}
        <div className="md:w-1/2 bg-primary text-white p-8 flex flex-col justify-center">
          <h2 className="text-xl font-bold mb-4">CONTACT INFORMATION</h2>
          <div>{parse(settings.contact_details)}</div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="md:w-1/2 p-8 bg-gray-100">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-2 border rounded-lg"
              required
            />
            <input
              type="tel"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="Phone"
              className="w-full p-2 border rounded-lg"
              required
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              className="w-full p-2 border rounded-lg"
              rows={4}
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-primary text-white hover:text-primary font-bold py-2 rounded-lg hover:bg-white transition-all duration-300 border border-primary"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
