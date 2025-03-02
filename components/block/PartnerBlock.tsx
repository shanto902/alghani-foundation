"use client";
import { TPartnerBlock } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

const PartnerBlock = ({ block }: { block: TPartnerBlock }) => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto text-center">
        <Marquee speed={50} pauseOnHover={true} gradient={true} autoFill={true}>
          {block?.item?.partners?.map((partner) => (
            <div key={partner.partner_id.id} className="mx-8 cursor-pointer">
              <Link
                href={partner.partner_id.link}
                className="relative w-24 h-24"
                title={partner.partner_id.name}
              >
                <Image
                  className="object-cover aspect-square opacity-60 hover:opacity-100 transition-opacity duration-300"
                  src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${partner.partner_id.logo}`}
                  alt={partner.partner_id.name}
                  height={96}
                  width={96}
                />
              </Link>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default PartnerBlock;
