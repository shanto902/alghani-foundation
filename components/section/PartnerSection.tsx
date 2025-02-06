"use client";
import Image from "next/image";
import Marquee from "react-fast-marquee";

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

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto text-center">
        <Marquee speed={50} pauseOnHover={true} gradient={true} autoFill={true}>
          {partners.map((partner) => (
            <div key={partner.id} className="mx-8 cursor-pointer">
              <div className="relative w-24 h-24">
                <Image
                  className="object-cover aspect-square opacity-60 hover:opacity-100 transition-opacity duration-300"
                  src={partner.logo}
                  alt={partner.name}
                  height={96}
                  width={96}
                />
              </div>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnerSection;
