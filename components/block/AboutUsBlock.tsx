import React from "react";
import CustomButton from "../common/CustomButton";
import Image from "next/image";
import PaddingContainer from "../layout/PaddingContainer";
import { TAboutUsBlock } from "@/interfaces";
import PostBody from "../post-body/PostBody";

const AboutUsBlock = ({ block }: { block: TAboutUsBlock }) => {
  return (
    <PaddingContainer className="my-12">
      {/* Content Section */}
      <div
        className={` flex flex-col ${
          block.item.image_position === "left"
            ? "md:flex-row"
            : block.item.image_position === "right"
            ? "md:flex-row-reverse"
            : ""
        } items-center justify-center gap-10`}
      >
        {/* Left - Image */}
        {block.item.image && block.item.image_position !== "none" && (
          <div className="md:w-1/2">
            <Image
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${block.item.image}`}
              alt="About Us"
              className=" w-full rounded-lg"
              width={600}
              height={400}
            />

            {block.item.button && (
              <div className=" flex justify-center mt-10">
                <CustomButton href={block.item.button_link as string}>
                  {block.item.button_text}
                </CustomButton>
              </div>
            )}
          </div>
        )}

        {/* Right - Text */}
        <div
          className={`${
            block.item.image && block.item.image_position !== "none"
              ? "md:w-1/2 self-start"
              : "self-center md:w-[1280px]"
          }  mt-5 text-secondary `}
        >
          <article className="flex justify-center items-center">
            <PostBody body={block.item.body} />
          </article>

          {/* Call to Action */}
          <div
            className={`mt-6 flex w-full ${
              block.item.button_position === "left"
                ? "justify-start"
                : block.item.button_position === "right"
                ? "justify-end"
                : "justify-center"
            }`}
          >
            {block.item.image_position === "none" && block.item.button && (
              <CustomButton href={block.item.button_link as string}>
                {block.item.button_text}
              </CustomButton>
            )}
          </div>
        </div>
      </div>
    </PaddingContainer>
  );
};

export default AboutUsBlock;
