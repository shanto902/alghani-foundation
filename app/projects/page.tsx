import HeaderBlock from "@/components/block/HeaderBlock";
import Breadcrumb from "@/components/common/Breadcrumb";
import ProjectSection from "@/components/section/ProjectSection";
import React from "react";

const page = () => {
  return (
    <div>
      <Breadcrumb text="Projects" />

      <ProjectSection />
    </div>
  );
};

export default page;
