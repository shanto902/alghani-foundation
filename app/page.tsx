import HeaderBlock from "@/components/block/HeaderBlock";
import PaddingContainer from "@/components/layout/PaddingContainer";
import PartnerSection from "@/components/section/PartnerSection";
import RecognitionSection from "@/components/section/RecognitionSection";
import StatisticsSection from "@/components/section/StatisticsSection";
import SustainabilitySection from "@/components/section/SustainabilitySection";
import TestimonialSection from "@/components/section/TestimonialSection";
import DonationSlider from "@/components/slider/DonationSlider";
import LocationSection from "@/components/section/LocationSection";
import CTASection from "@/components/section/CTASection";

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

        <HeaderBlock title="Recognitions" />
        <RecognitionSection />

        <HeaderBlock title="Partners" />
        <PartnerSection />

        <LocationSection />
        <SustainabilitySection />
      </PaddingContainer>

      <TestimonialSection />
      <CTASection />
    </>
  );
}
