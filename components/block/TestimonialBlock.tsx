"use client";
import Image from "next/image";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TTestimonialBlock } from "@/interfaces";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  quote: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    role: "CEO, Company A",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    quote: "This is the best service I've ever used. Highly recommended!",
  },
  {
    id: 2,
    name: "Jane Smith",
    role: "Marketing Manager, Company B",
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    quote: "Amazing experience! The team is very professional and responsive.",
  },
  {
    id: 3,
    name: "Alex Johnson",
    role: "Founder, Company C",
    image:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
    quote:
      "Great results and excellent customer support. Will definitely work with them again.",
  },
];

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
  infinite: true,
  speed: 500,
  slidesToShow: 1,
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
  //   console.log(block);
  return (
    <section className="overflow-hidden bg-primary py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center relative">
        <div>
          <Slider {...settings}>
            {block.item.testimonials.map((testimonial) => (
              <div key={testimonial.testimonial_id.id} className="px-4">
                <div className="p-6 relative h-full flex flex-col items-center text-center">
                  <p className="text-white tracking-wide max-w-[959px] pb-5 italic">
                    {testimonial.testimonial_id.quote}
                  </p>
                  <div className="flex gap-5 justify-center items-center">
                    <div className="w-14 h-14 overflow-hidden">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${testimonial.testimonial_id.image}`}
                        alt={testimonial.testimonial_id.name}
                        height={96}
                        width={96}
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl pt-2 font-semibold text-white">
                        {testimonial.testimonial_id.name}
                      </h3>
                      <p className="text-left text-sm text-gray-200 mb-4">
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
