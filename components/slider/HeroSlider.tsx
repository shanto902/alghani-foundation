"use client";
import { THeroSliderBlock } from "@/interfaces";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import parser from "html-react-parser";
import PaddingContainer from "../layout/PaddingContainer";
import CustomButton from "../common/CustomButton";
import Image from "next/image";
import { TSliderBlurData } from "../block/HeroSliderBlock";
const HeroSlider = ({ block }: { block: TSliderBlurData[] }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <Slider {...settings} className="overflow-hidden h-full ">
      {block.map((slide) => (
        <div key={slide.src.sliders_id.id}>
          {/* desktop view  */}
          <div className=" hidden sm:block relative h-[calc(100vh-150px)] ">
            <Image
              priority
              fill
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${slide.src.sliders_id.image}`}
              alt={slide.src.sliders_id.text}
              className={`w-full h-full object-cover  ${
                slide.src.sliders_id.position === "left"
                  ? "object-right"
                  : slide.src.sliders_id.position === "right"
                  ? "object-left"
                  : "object-center"
              }`}
              placeholder="blur"
              blurDataURL={slide.blurDataURL}
            />

            <PaddingContainer className="absolute inset-0 flex items-center justify-center">
              <div className="grid grid-cols-2 w-full">
                {slide.src.sliders_id.position === "left" ? (
                  <>
                    <div className="flex flex-col col-span-2 md:col-span-1 ">
                      <div className="pt-10 md:pt-20 w-auto slider-text">
                        {parser(slide.src.sliders_id.text)}
                      </div>
                      <CustomButton
                        className={` mb-10 md:mb-20 mt-4 !text-sm  self-${
                          slide.src.sliders_id.button_position
                        } ${
                          slide.src.sliders_id.button_style === "inverted"
                            ? "btn"
                            : slide.src.sliders_id.button_style === "primary"
                            ? "btn-invert"
                            : ""
                        }`}
                        href={slide.src.sliders_id.button_link}
                      >
                        {slide.src.sliders_id.button_text}
                      </CustomButton>
                    </div>
                    {/* Empty Right Side */}
                    <div className="none md:static"></div>
                  </>
                ) : (
                  <>
                    {/* Empty Left Side */}
                    <div className="none md:static"></div>
                    {/* Content on the Right */}
                    <div className="flex flex-col col-span-2 md:col-span-1 ">
                      <div className="pt-10 md:pt-20 w-auto slider-text ">
                        {parser(slide.src.sliders_id.text)}
                      </div>
                      <CustomButton
                        className={` mb-10 md:mb-20 mt-4 md:mx-20 !text-sm self-${
                          slide.src.sliders_id.button_position
                        }${
                          slide.src.sliders_id.button_style === "inverted"
                            ? "btn"
                            : slide.src.sliders_id.button_style === "primary"
                            ? "btn-invert"
                            : ""
                        }`}
                        href={slide.src.sliders_id.button_link}
                      >
                        {slide.src.sliders_id.button_text}
                      </CustomButton>
                    </div>
                  </>
                )}
              </div>
            </PaddingContainer>
          </div>

          {/* mobile view  */}
          <div className=" block sm:hidden relative h-[calc(100vh-100px)] ">
            <Image
              priority
              fill
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${slide.src.sliders_id.mobile_image}`}
              alt={slide.src.sliders_id.text}
              className={`w-full h-full object-cover  `}
              placeholder="blur"
              blurDataURL={slide.blurDataURL}
            />

            <PaddingContainer
              className="absolute 
             bottom-0 "
            >
              <div className="w-auto slider-text ">
                {slide.src.sliders_id.mobile_text &&
                  parser(slide.src.sliders_id.mobile_text)}
              </div>
              <div
                className={`flex w-full justify-${slide.src.sliders_id.button_position}`}
              >
                <CustomButton
                  className={`!text-xs ${
                    slide.src.sliders_id.button_style === "inverted"
                      ? "btn"
                      : slide.src.sliders_id.button_style === "primary"
                      ? "btn-invert"
                      : ""
                  }`}
                  href={slide.src.sliders_id.button_link}
                >
                  {slide.src.sliders_id.button_text}
                </CustomButton>
              </div>
            </PaddingContainer>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HeroSlider;
