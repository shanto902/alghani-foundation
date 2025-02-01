import HeaderBlock from "@/components/block/HeaderBlock";
import HoverCard from "@/components/common/HoverCard";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PartnerSection from "@/components/section/PartnerSection";
import RecognitionSection from "@/components/section/RecognitionSection";
import StatisticsSection from "@/components/section/StatisticsSection";
import TestimonialSection from "@/components/section/TestimonialSection";
import DonationSlider from "@/components/slider/DonationSlider";

export default function Home() {
  return (
    <>
      <DonationSlider />
      <PaddingContainer>
        <HeaderBlock
          description="Integer sit amet augue iaculis, ultricies justo nec, commodo nisi. Class aptent
taciti sociosqu ad litora torquent per conubia nostra"
          title="Statistics"
        />
        <StatisticsSection />
        <HeaderBlock title="Testimonial" />
        <TestimonialSection />
        <HeaderBlock title="Recognitions" />
        <RecognitionSection />

        <HeaderBlock title="Partners" />
        <PartnerSection />
        <HoverCard />
        <div className="h-96">Working</div>
      </PaddingContainer>
    </>
  );
}
