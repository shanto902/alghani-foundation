import HeaderBlock from "@/components/block/HeaderBlock";
import Breadcrumb from "@/components/common/Breadcrumb";
import CustomButton from "@/components/common/CustomButton";
import PaddingContainer from "@/components/layout/PaddingContainer";
import ExecutiveTeam from "@/components/section/ExecutiveSection";
import HistorySection from "@/components/section/HistorySection";
import OurMissionSection from "@/components/section/OurMissionSection";
import Image from "next/image";

const AboutPage = () => {
  return (
    <div>
      <Breadcrumb text="About Us" />
      <PaddingContainer className="mx-auto">
        <OurMissionSection />
        <HeaderBlock title="Executives" />
        <ExecutiveTeam />
        <HeaderBlock title="History" />
        <HistorySection />
      </PaddingContainer>
    </div>
  );
};

export default AboutPage;
