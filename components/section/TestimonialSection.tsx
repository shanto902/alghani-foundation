"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialSection = () => {
  const testimonials = [
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
      quote:
        "Amazing experience! The team is very professional and responsive.",
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

  // Settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
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

  return (
    <section className=" bg-primary py-5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div>
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-4">
                <div className=" p-6 relative h-full flex flex-col items-center text-center">
                  <p className="text-white tracking-wide w-[959px] pb-5 italic">
                    {testimonial.quote}
                  </p>
                  <div className="flex gap-5 justify-center items-center">
                    <div className=" w-14 h-14  overflow-hidden ">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        height={96}
                        width={96}
                      />
                    </div>
                    <div className=" text-left">
                      <h3 className="text-xl pt-2 font-semibold text-white">
                        {testimonial.name}
                      </h3>
                      <p className=" text-left text-sm text-gray-200 mb-4">
                        {testimonial.role}
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

export default TestimonialSection;
