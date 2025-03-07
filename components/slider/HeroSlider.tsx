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
    autoplaySpeed: 10000,
  };
  return (
    <Slider {...settings} className="overflow-hidden h-screen md:h-[700px]">
      {block.map((slide) => (
        <div
          key={slide.src.sliders_id.id}
          className="relative h-screen md:h-[700px]"
        >
          <Image
            width={1260}
            height={750}
            priority
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${slide.src.sliders_id.image}`}
            alt={slide.src.sliders_id.text}
            className="w-full h-full object-cover object-center"
            placeholder="blur"
            blurDataURL={slide.blurDataURL}
          />

          <PaddingContainer className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 w-full">
              {slide.src.sliders_id.position === "left" ? (
                <>
                  <div className="flex flex-col   col-span-2 md:col-span-1 justify-center items-center">
                    <div className="pt-10 md:pt-20 w-auto slider-text">
                      {parser(slide.src.sliders_id.text)}
                    </div>
                    <CustomButton
                      className={`bg-primary mb-10 md:mb-20 mt-4 !text-sm hover:bg-white text-white hover:text-primary self-${slide.src.sliders_id.button_position}`}
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
                  <div className="flex flex-col col-span-2 md:col-span-1 justify-center items-center">
                    <div className="pt-10 md:pt-20 w-auto slider-text ">
                      {parser(slide.src.sliders_id.text)}
                    </div>
                    <CustomButton
                      className={`bg-primary mb-10 md:mb-20 mt-4 md:mx-20 !text-sm hover:bg-white text-white hover:text-primary self-${slide.src.sliders_id.button_position}`}
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
      ))}
    </Slider>
  );
};

export default HeroSlider;
