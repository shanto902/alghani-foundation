import Breadcrumb from "@/components/common/Breadcrumb";
import React from "react";

const ServicesPage: React.FC = () => {
  return (
    <div>
      <Breadcrumb text="What We Do" />
      <h1>What We Do</h1>
      <p>Welcome to the Alghani Foundation. Here is what we do:</p>
      <ul>
        <li>Community Development</li>
        <li>Education Programs</li>
        <li>Healthcare Services</li>
        <li>Environmental Conservation</li>
        <li>Emergency Relief</li>
      </ul>
    </div>
  );
};

export default ServicesPage;
