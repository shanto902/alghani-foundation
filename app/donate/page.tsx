import Breadcrumb from "@/components/common/Breadcrumb";
import FAQSection from "@/components/section/FAQSection";
import SponsorBenefitSection from "@/components/section/SponsorBenefitSection";
import React from "react";

const page = () => {
  return (
    <div>
      {/* <Breadcrumb text="Donate a Child" /> */}
      <SponsorBenefitSection />
      <FAQSection />
    </div>
  );
};

export default page;
