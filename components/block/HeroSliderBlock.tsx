"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { THeroSliderBlock, TSlider } from "@/interfaces";

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

  //console.log(block.item.sliders);
  return (
    <Slider {...settings} className="overflow-hidden">
      {block.item.sliders.map((slide, index) => (
        <div key={slide.slides_id.id} className="relative">
          {/* Background Image */}
          <Image
            width={1260}
            height={750}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${slide.slides_id.image}`}
            alt={slide.slides_id.title}
            className="w-full h-[600px] object-cover"
          />

          {/* Content Section */}
          <div className="absolute bottom-20 left-0 w-full bg-[#045856] bg-opacity-90 text-white text-center ">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center max-w-6xl mx-auto items-center px-6">
              {/* Left: Title & Description */}
              <div className="md:w-2/3 text-start">
                <h2 className="text-xl md:text-2xl tracking-[2.40px] font-bold">
                  {slide.slides_id.title}
                </h2>
                <p className="mt-2 text-sm md:text-base">
                  {slide.slides_id.description}
                </p>
              </div>

              {/* Right: Raised & To Go Section */}
              <div className=" relative md:w-1/3 bg-[#0ec8c4] text-[#003c3b] flex flex-col text-center shadow-lg">
                {/* Urgent Cause Badge */}
                {slide.slides_id.type === "urgent" && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-[#003c3b] text-xs font-bold px-3 py-1 shadow-md">
                    URGENT CAUSE
                  </div>
                )}

                <div className="bg-[#0ec8c4] text-[#003c3b] w-full flex justify-between items-center">
                  <div className="w-1/2 flex flex-col items-center py-4 border-r-2 border-[#003c3b]">
                    <span className="text-xs font-bold">RAISED</span>
                    <span className="text-3xl font-bold">
                      ${slide.slides_id.earned_funds}
                    </span>
                  </div>
                  <div className="w-1/2 flex flex-col items-center py-4">
                    <span className="text-xs font-bold">TO GO</span>
                    <span className="text-3xl font-bold">
                      {slide.slides_id.earned_funds >=
                      slide.slides_id.total_funds
                        ? "DONE"
                        : `$${
                            slide.slides_id.total_funds -
                            slide.slides_id.earned_funds
                          }`}
                    </span>
                  </div>
                </div>

                {/* Donate Button */}
                <button className="w-full text-[#003c3b] bg-[#0ec8c4] border-t-2 hover:bg-black hover:text-white border-[#003c3b] font-bold py-3">
                  DONATE NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default HeroSliderBlock;
