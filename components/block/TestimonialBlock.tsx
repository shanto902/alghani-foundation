"use client";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TTestimonialBlock } from "@/interfaces";
import { FaRegStar, FaStar } from "react-icons/fa";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex">
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} className="text-yellow-400">
          {index < rating ? <FaStar /> : <FaRegStar />}
        </span>
      ))}
    </div>
  );
};

// Define the type for custom arrow props
interface ArrowProps {
  onClick?: () => void;
}

// Custom Next Arrow
const NextArrow = ({ onClick }: ArrowProps) => {
  return (
    <div
      className="absolute top-1/2 right-0 transform -translate-y-1/2 cursor-pointer text-white text-4xl z-10"
      onClick={onClick}
    >
      &gt;
    </div>
  );
};

// Custom Previous Arrow
const PrevArrow = ({ onClick }: ArrowProps) => {
  return (
    <div
      className="absolute top-1/2 left-0 transform -translate-y-1/2 cursor-pointer text-white text-4xl z-10"
      onClick={onClick}
    >
      &lt;
    </div>
  );
};

// Settings for the slider
const settings: Settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 8000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const TestimonialBlock = ({ block }: { block: TTestimonialBlock }) => {
  return (
    <section className="overflow-hidden h-[500px] flex items-center bg-primary py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full mx-auto text-center relative">
        <div>
          <Slider {...settings}>
            {block.item.testimonials.map((testimonial) => (
              <div
                key={testimonial.testimonial_id.id}
                className="px-4 h-full pb-5 md:pb-10 "
              >
                <div className="   bg-white relative rounded-3xl h-full flex flex-col items-start text-left px-5">
                  <div className="mt-5">
                    <StarRating rating={testimonial.testimonial_id.ratings} />
                    <p className=" my-2 tracking-wide  italic">
                      {testimonial.testimonial_id.quote}
                    </p>
                  </div>
                  <div className="flex gap-5 items-center pb-4 justify-start w-full">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${testimonial.testimonial_id.image}`}
                      alt={testimonial.testimonial_id.name}
                      height={96}
                      width={96}
                      className="w-14  h-14 object-cover rounded-full overflow-hidden"
                    />

                    <div className="text-left">
                      <h3 className="text-xl pt-2 font-semibold ">
                        {testimonial.testimonial_id.name}
                      </h3>
                      <p className="text-left text-sm  mb-4">
                        {testimonial.testimonial_id.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialBlock;
