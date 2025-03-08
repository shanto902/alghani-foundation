import Breadcrumb from "@/components/common/Breadcrumb";
import ContactSection from "@/components/section/ContactSection";
import { TSetting } from "@/interfaces";
import directus from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import React from "react";

const ContactPage = async () => {
  const settings = await directus.request(readSingleton("settings"));
  return (
    <div className="min-h-[80vh] flex justify-center items-center">
      <ContactSection settings={settings as TSetting} />
    </div>
  );
};

export default ContactPage;
