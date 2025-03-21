import HeaderBlock from "@/components/block/HeaderBlock";
import Breadcrumb from "@/components/common/Breadcrumb";
import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import FAQSection from "@/components/section/FAQSection";
import SponsorBenefitSection from "@/components/section/SponsorBenefitSection";
import { getAllDonations } from "@/helpers/fetchFromDirectus";
import { THeaderBlock } from "@/interfaces";
import directus from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import moment from "moment";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
export const metadata: Metadata = {
  title: "Donations",
};
const block = {
  item: {
    title: "Our Current Causes",
  },
};
const page = async () => {
  const donations = await getAllDonations();
  const settings = await directus.request(readSingleton("settings"));

  return (
    <div>
      <SponsorBenefitSection />
      <HeaderBlock block={block as THeaderBlock} />
      <PaddingContainer className="grid lg:grid-cols-4 py-10 gap-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {donations.map((donation) => (
          <div
            key={donation.id}
            className="p-4 border-2 w-full rounded-lg border-primary overflow-hidden hover:shadow-xl  transition-all duration-300"
          >
            <Link href={`/donation/${donation.id}`}>
              <Image
                className=" rounded-lg object-cover   "
                height={400}
                width={400}
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${donation.image}`}
                alt={donation.title}
              />
            </Link>
            <div>
              <h2 className="py-3 text-xl line-clamp-2 font-bold">
                {donation.title}
              </h2>
              <div className="flex justify-between items-center">
                <p>{moment(donation.date_created).format("MMM DD, YYYY")}</p>
                <div className="flex gap-2">
                  <CustomButton
                    invert
                    href={`/donation/${donation.id}#payment-section`}
                    className="text-xs py-2 px-3 "
                  >
                    Donate
                  </CustomButton>
                </div>
              </div>
            </div>
          </div>
        ))}
      </PaddingContainer>
      <FAQSection faqs={settings.faq} />
    </div>
  );
};

export default page;
