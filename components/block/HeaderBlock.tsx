import Image from "next/image";
import donationIcon from "@/assets/common/donate.png";
import PaddingContainer from "../layout/PaddingContainer";
import { THeaderBlock } from "@/interfaces";

const HeaderBlock = ({ block }: { block: THeaderBlock }) => {
  return (
    <section className="  flex pt-10 flex-col items-center relative">
      <h2 className=" uppercase text-center text-[#27252b] text-4xl font-black  tracking-wider">
        {block.item.title}
      </h2>

      <div className="relative mt-2 flex items-center justify-center">
        <div className="w-[41px] h-px bg-primary" />
        <div className="w-3.5 h-[22px] mx-3 relative">
          <Image src={donationIcon} alt="Donation Icon" fill />
        </div>
        <div className="w-[41px] h-px bg-primary" />
      </div>
      {block.item.subtitle && (
        <p className="text-textSecondary text-lg tracking-wide pt-2 pb-5 max-w-3xl text-center">
          {block.item.subtitle}
        </p>
      )}
    </section>
  );
};

export default HeaderBlock;
