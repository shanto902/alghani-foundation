import Image from "next/image";
import donationIcon from "@/assets/common/donate.png";
import PaddingContainer from "../layout/PaddingContainer";

const HeaderBlock = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <section className="  flex pt-10 flex-col items-center relative">
      <h2 className=" uppercase text-center text-[#27252b] text-[23px] font-black  tracking-wider">
        {title}
      </h2>

      <div className="relative mt-2 flex items-center justify-center">
        <div className="w-[41px] h-px bg-primary" />
        <div className="w-3.5 h-[22px] mx-3 relative">
          <Image src={donationIcon} alt="Donation Icon" fill />
        </div>
        <div className="w-[41px] h-px bg-primary" />
      </div>
      {description && (
        <p className="text-textSecondary text-sm tracking-wide pt-2 pb-5 max-w-3xl text-center">
          {description}
        </p>
      )}
    </section>
  );
};

export default HeaderBlock;
