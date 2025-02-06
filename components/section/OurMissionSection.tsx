import React from "react";
import CustomButton from "../common/CustomButton";
import Image from "next/image";
import PaddingContainer from "../layout/PaddingContainer";

const OurMissionSection = () => {
  return (
    <section className="my-12">
      {/* Content Section */}
      <div className=" flex flex-col md:flex-row items-center gap-10">
        {/* Left - Image */}
        <div className="md:w-1/2">
          <Image
            src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg"
            alt="About Us"
            className=" w-full"
            width={600}
            height={400}
          />
        </div>

        {/* Right - Text */}
        <div className="md:w-1/2 text-secondary self-start">
          <h3 className="mt-6 text-xl font-semibold">Our Mission</h3>
          <p className="mt-4 leading-relaxed">
            Our mission is to bring positive change by providing education,
            healthcare, and support to underprivileged communities. Through
            various initiatives, we aim to empower individuals and create a
            better future.
          </p>

          <h3 className="mt-6 text-xl font-semibold">Our Vision</h3>
          <p className="mt-4 leading-relaxed">
            We envision a world where every child has access to education and
            healthcare. By collaborating with volunteers and donors, we strive
            to uplift communities and spread hope.
          </p>

          {/* Call to Action */}
          <div className="mt-6">
            <CustomButton href="#">Causes To Donate </CustomButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMissionSection;
