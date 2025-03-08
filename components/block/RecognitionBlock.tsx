"use client";

import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { TRecognition, TRecognitionBlock } from "@/interfaces";

// Custom Left Arrow
const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 hover:animate-pulse text-primary p-3 transition-all"
  >
    <FaChevronLeft size={20} />
  </button>
);
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 hover:animate-pulse text-primary p-3 transition-all"
  >
    <FaChevronRight size={20} />
  </button>
);

const RecognitionBlock = ({ block }: { block: TRecognitionBlock }) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Convert images to Lightbox format with title & description
  const images = block.item.recognitions.map((recognition) => ({
    src: `${process.env.NEXT_PUBLIC_ASSETS_URL}${recognition.recognition_id.image}`,
    title: recognition.recognition_id.title,
    description: recognition.recognition_id.description,
  }));

  // Slick slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      {/* Main Section */}
      <section className="md:py-5 px-12 sm:px-12 lg:px-20 relative">
        <div className="max-w-7xl mx-auto text-center relative">
          <Slider {...settings}>
            {block.item.recognitions.map((recognition, index) => (
              <div
                key={recognition.recognition_id.id}
                className="p-3 cursor-pointer rounded-lg hover:bg-primary bg-white hover:text-white transition-all duration-300"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="relative h-48">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${recognition.recognition_id.image}`}
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

      {/* Lightbox for Zoom with Captions Plugin */}
      {lightboxIndex !== null && (
        <Lightbox
          slides={images} // Pass all images with titles + descriptions
          open={lightboxIndex !== null}
          index={lightboxIndex} // Start from the selected image
          close={() => setLightboxIndex(null)}
          animation={{ fade: 400 }}
          plugins={[Captions]} // Enable Captions Plugin
          captions={{
            showToggle: true, // Show toggle button for captions
            descriptionTextAlign: "center", // Align text in center
            descriptionMaxLines: 3, // Limit description to 3 lines
          }}
        />
      )}
    </>
  );
};

export default RecognitionBlock;
