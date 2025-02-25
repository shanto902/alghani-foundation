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
import SponsorSection from "@/components/section/SponsorSection";

export default function Home() {
  return (
    <>
      <DonationSlider />
      <PaddingContainer>
        <SponsorSection />
        <HeaderBlock
          description="Integer sit amet augue iaculis, ultricies justo nec, commodo nisi. Class aptent
taciti sociosqu ad litora torquent per conubia nostra"
          title="Total Served Numbers"
        />
        <StatisticsSection />

        <HeaderBlock title="Recognitions" />
        <RecognitionSection />

        <HeaderBlock title="Partners" />
        <PartnerSection />
        <HeaderBlock
          description="Integer sit amet augue iaculis, ultricies justo nec, commodo nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra"
          title="Location"
        />
        <LocationSection />
        <HeaderBlock
          description="Integer sit amet augue iaculis, ultricies justo nec, commodo nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra"
          title="Sustainable Development "
        />
      </PaddingContainer>
      <SustainabilitySection />
      <PaddingContainer>
        <HeaderBlock
          description="Integer sit amet augue iaculis, ultricies justo nec, commodo nisi. Class aptent taciti sociosqu ad litora torquent per conubia nostra"
          title="WHAT People SAYS ABOUT US"
        />
      </PaddingContainer>
      <TestimonialSection />
      <CTASection />
    </>
  );
}
