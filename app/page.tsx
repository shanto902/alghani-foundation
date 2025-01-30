import NavBar from "@/components/layout/NavBar";
import PaddingContainer from "@/components/layout/PaddingContainer";
import DonationSlider from "@/components/slider/DonationSlider";

export default function Home() {
  return (
    <>
      <NavBar />
      <DonationSlider />
      <PaddingContainer>
        <div className="h-96">Working</div>
      </PaddingContainer>
    </>
  );
}
