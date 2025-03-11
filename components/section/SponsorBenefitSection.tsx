import directus from "@/lib/directus";
import { readSingleton } from "@directus/sdk";
import PostBody from "../post-body/PostBody";
import { DynamicFaIcon } from "../DynamicFaIcon";

const SponsorBenefitSection = async () => {
  const donation = await directus.request(readSingleton("donation_page"));

  return (
    <section className="bg-primary text-white text-center py-10 px-6">
      <PostBody body={donation.body} />

      <div className="grid grid-cols-2 mt-5 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {donation.sectors?.map(
          (item: { icon: string; label: string }, index: number) => (
            <div key={index} className="flex flex-col items-center">
              <DynamicFaIcon size={40} iconName={item.icon} />
              <p className="text-sm mt-2">{item.label}</p>
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default SponsorBenefitSection;
