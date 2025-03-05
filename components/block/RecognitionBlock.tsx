"use client";

import { TRecognition, TRecognitionBlock } from "@/interfaces";
import Image from "next/image";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Custom Left Arrow
const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-primary/80 text-white hover:text-primary p-3 rounded-full shadow-md hover:bg-white border-2 border-primary transition-all"
  >
    <FaChevronLeft size={20} />
  </button>
);

// Custom Right Arrow
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 bg-primary/80 text-white hover:text-primary p-3 rounded-full shadow-md hover:bg-white border-2 border-primary transition-all"
  >
    <FaChevronRight size={20} />
  </button>
);

const RecognitionBlock = ({ block }: { block: TRecognitionBlock }) => {
  const [selectedRecognition, setSelectedRecognition] =
    useState<TRecognition | null>(null);

  // Slick settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />, // Assign custom left arrow
    nextArrow: <NextArrow />, // Assign custom right arrow
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      {/* Main Section */}
      <section className="md:py-5 px-12 sm:px-12 lg:px-20 relative">
        <div className="max-w-7xl  mx-auto text-center relative">
          <Slider className="px-5 " {...settings}>
            {block.item.recognitions.map((recognition) => (
              <div
                key={recognition.recognition_id.id}
                className="p-3 cursor-pointer rounded-lg  hover:bg-primary bg-white hover:text-white transition-all duration-300"
                onClick={() => setSelectedRecognition(recognition)}
              >
                <div className="relative h-48">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${recognition.recognition_id?.image}`}
                    alt={recognition.recognition_id.title}
                    height={192}
                    width={420}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div className="p-4">
                  <p className="text-lg font-semibold">
                    {recognition.recognition_id.title}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {selectedRecognition && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center h-full justify-center z-50 p-4"
          onClick={() => setSelectedRecognition(null)}
        >
          <div className="relative max-w-5xl  w-full flex flex-col items-center">
            <Zoom>
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${selectedRecognition.recognition_id.image}`}
                alt={selectedRecognition.recognition_id.title}
                width={1200}
                height={800}
                className="w-full h-screen object-contain rounded-lg"
              />
            </Zoom>
            {/* Black Overlay for Description */}
            <div className="absolute bottom-0 left-0 w-full bg-black hover:bg-opacity-100 bg-opacity-70 text-white text-center p-4">
              <h2 className="text-xl font-semibold">
                {selectedRecognition.recognition_id.title}
              </h2>
              <p className="text-sm mt-2">
                {selectedRecognition.recognition_id.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecognitionBlock;
