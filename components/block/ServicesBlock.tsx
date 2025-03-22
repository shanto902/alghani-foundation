import CustomButton from "@/components/common/CustomButton";
import { DynamicFaIcon } from "@/components/DynamicFaIcon";
import PaddingContainer from "@/components/layout/PaddingContainer";
import { TServiceBlock } from "@/interfaces";
import Link from "next/link";
import React from "react";
import { FaAlignLeft } from "react-icons/fa";
import { FaLeftLong, FaRightLong } from "react-icons/fa6";

const ServicesBlock = ({ block }: { block: TServiceBlock }) => {
  return (
    <PaddingContainer>
      <section className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-0 my-10 ">
        {block.item.services.map((service, i) => (
          <div
            key={service.services_id.id}
            className={` relative ${
              i % 2 === 0 ? "bg-primary text-white" : "bg-white"
            } px-10 pt-10 pb-14 group hover:shadow-2xl group hover:z-10`}
          >
            <DynamicFaIcon
              iconName={service.services_id.icon}
              size={80}
              className=" group-hover:animate-bounce transition-all duration-300"
            />

            <article>
              <h2 className="text-2xl font-bold my-5">
                {service.services_id.title}
              </h2>
              <p className="text-pretty ">{service.services_id.description}</p>
            </article>
            <Link
              href={`/services/${service.services_id.slug}`}
              className="absolute bottom-5 right-10 flex   gap-2 font-bold items-center hover:underline underline-offset-4 transition-all duration-300"
            >
              Read Success Stories <FaRightLong />{" "}
            </Link>
          </div>
        ))}
      </section>
      {block.item.info_text && (
        <h3 className="text-center mt-20 text-lg font-bold">
          {block.item.info_text}
        </h3>
      )}
      {block.item.button === "enabled" && block.item.button_link && (
        <div className="flex justify-center mt-5 mb-20">
          <CustomButton
            target="_blank"
            invert
            className="text-sm"
            href={block.item.button_link}
          >
            {block.item.button_text}
          </CustomButton>
        </div>
      )}
    </PaddingContainer>
  );
};

export default ServicesBlock;
