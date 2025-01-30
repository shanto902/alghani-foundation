import facebookBtb from "@/assets/svg/facebook.svg";
import instagramBtb from "@/assets/svg/instagram.svg";
import linkedinBtb from "@/assets/svg/linkedin.svg";
import youtubeBtb from "@/assets/svg/youtube.svg";
import twitterBtn from "@/assets/svg/twitter.svg";
import SvgGenerator from "../common/SvgGenerator";
const TopBar = () => {
  return (
    <div className="hidden md:block w-full h-12 bg-[#fbfbfb] drop-shadow-sm">
      <div className="max-w-screen-2xl flex justify-center items-center h-full mx-auto">
        <div className=" px-8 w-full  flex justify-between items-center h-full">
          <p className="text-[#27252b] text-sm ">
            <span className="font-normal ">Call Us :</span>{" "}
            <span className="font-bold ">+8801720015780</span>
          </p>
          <div className="flex ">
            <SvgGenerator src={facebookBtb} alt="facebook" />
            <SvgGenerator src={instagramBtb} alt="facebook" />
            <SvgGenerator src={linkedinBtb} alt="facebook" />
            <SvgGenerator src={youtubeBtb} alt="facebook" />
            <SvgGenerator src={twitterBtn} alt="facebook" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
