"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const slides = [
  {
    image:
      "https://images.pexels.com/photos/6995106/pexels-photo-6995106.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "SEND AFRICAN CHILDREN TO SCHOOL",
    raised: "$56,354",
    toGo: "$115,699",
  },
  {
    image:
      "https://images.pexels.com/photos/1739842/pexels-photo-1739842.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "HELP CHILDREN GET EDUCATION",
    raised: "$40,000",
    toGo: "$100,000",
  },
];

const DonationSlider = () => {
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
    <Slider {...settings} className="overflow-hidden">
      {slides.map((slide, index) => (
        <div key={index} className="relative">
          {/* Background Image */}
          <Image
            width={1260}
            height={750}
            src={slide.image}
            alt={slide.title}
            className="w-full h-[600px] object-cover"
          />

          {/* Content Section */}
          <div className="absolute bottom-20 left-0 w-full bg-[#045856] bg-opacity-90 text-white text-center ">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 justify-center max-w-6xl mx-auto items-center px-6">
              {/* Left: Title & Description */}
              <div className="md:w-2/3 text-start">
                <h2 className="text-xl md:text-2xl tracking-[2.40px] font-bold">
                  {slide.title}
                </h2>
                <p className="mt-2 text-sm md:text-base">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              {/* Right: Raised & To Go Section */}
              <div className=" relative md:w-1/3 bg-[#0ec8c4] text-[#003c3b] flex flex-col text-center shadow-lg">
                {/* Urgent Cause Badge */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-[#003c3b] text-xs font-bold px-3 py-1 shadow-md">
                  URGENT CAUSE
                </div>

                <div className="bg-[#0ec8c4] text-[#003c3b] w-full flex justify-between items-center">
                  <div className="w-1/2 flex flex-col items-center py-4 border-r-2 border-[#003c3b]">
                    <span className="text-xs font-bold">RAISED</span>
                    <span className="text-3xl font-bold">{slide.raised}</span>
                  </div>
                  <div className="w-1/2 flex flex-col items-center py-4">
                    <span className="text-xs font-bold">TO GO</span>
                    <span className="text-3xl font-bold">{slide.toGo}</span>
                  </div>
                </div>

                {/* Donate Button */}
                <button className="w-full text-[#003c3b] bg-[#0ec8c4] border-t-2 border-[#003c3b] font-bold py-3">
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

export default DonationSlider;
