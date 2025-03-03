"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { THeroSliderBlock, TSlider } from "@/interfaces";
import parser from "html-react-parser";
import PaddingContainer from "../layout/PaddingContainer";

const HeroSliderBlock = ({ block }: { block: THeroSliderBlock }) => {
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
    <Slider {...settings} className="overflow-hidden h-[700px]">
      {block.item.sliders.map((slide) => (
        <div key={slide.sliders_id.id} className="relative h-[700px]">
          <Image
            width={1260}
            height={750}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${slide.sliders_id.image}`}
            alt={slide.sliders_id.text}
            className="w-full h-full object-cover object-center"
          />

          <PaddingContainer className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-2 w-full">
              {slide.sliders_id.position === "left" ? (
                <>
                  {/* Content on the Left */}
                  <div className="flex flex-col col-span-2 md:col-span-1 justify-center items-center ">
                    <div className="slider-text">
                      {parser(slide.sliders_id.text)}
                    </div>
                    <button className="bg-primary text-xl mt-4 px-8 py-3 hover:text-black hover:bg-white font-bold text-white rounded transition-all duration-300">
                      {slide.sliders_id.button_text}
                    </button>
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
                    <div className="slider-text">
                      {parser(slide.sliders_id.text)}
                    </div>
                    <button className="bg-primary text-xl mt-4 px-8 py-3 hover:text-black hover:bg-white font-bold text-white rounded transition-all duration-300">
                      {slide.sliders_id.button_text}
                    </button>
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

export default HeroSliderBlock;
