"use client";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PartnerSection = () => {
  const partners = [
    {
      id: 1,
      logo: "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg",
      name: "Partner 1",
    },
    {
      id: 2,
      logo: "https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg",
      name: "Partner 2",
    },
    {
      id: 3,
      logo: "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg",
      name: "Partner 3",
    },
    {
      id: 4,
      logo: "https://images.pexels.com/photos/3184295/pexels-photo-3184295.jpeg",
      name: "Partner 4",
    },
    {
      id: 5,
      logo: "https://images.pexels.com/photos/3184294/pexels-photo-3184294.jpeg",
      name: "Partner 5",
    },
    {
      id: 6,
      logo: "https://images.pexels.com/photos/3184293/pexels-photo-3184293.jpeg",
      name: "Partner 6",
    },
  ];

  // Settings for the slider (mobile only)
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
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
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Our Partners
        </h2>
        <div className="mt-10">
          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex items-center justify-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-32 h-16">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile: Slider */}
          <div className="md:hidden">
            <Slider {...sliderSettings}>
              {partners.map((partner) => (
                <div key={partner.id} className="px-2">
                  <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative w-32 h-16">
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;
