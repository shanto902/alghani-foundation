"use client";
import React from "react";
import PaddingContainer from "../layout/PaddingContainer";
import { getYouTubeVideoID } from "@/lib/getYoutubeVideo";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Left Arrow
const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute left-[-40px] top-1/2 transform -translate-y-1/2 z-10 hover:animate-pulse text-primary p-3 transition-all"
  >
    <FaChevronLeft size={20} />
  </button>
);

// Custom Right Arrow
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="absolute right-[-40px] top-1/2 transform -translate-y-1/2 z-10 hover:animate-pulse text-primary p-3 transition-all"
  >
    <FaChevronRight size={20} />
  </button>
);

const VideoBlock = ({ latest_videos }: { latest_videos: any }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <PaddingContainer className="my-10 relative max-w-screen-xl">
      <Slider {...settings}>
        {latest_videos?.videos?.map((video: { link: string }, i: number) => (
          <div key={i} className="px-2">
            <iframe
              className="w-full h-full aspect-video rounded-lg"
              src={`https://www.youtube.com/embed/${getYouTubeVideoID(
                video.link
              )}`}
              allowFullScreen
            />
          </div>
        ))}
      </Slider>
    </PaddingContainer>
  );
};

export default VideoBlock;
