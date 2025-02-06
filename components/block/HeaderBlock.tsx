import Image from "next/image";
import donationIcon from "@/assets/common/donate.png";

const HeaderBlock = ({
  title,
  description,
}: {
  title: string;
  description?: string;
}) => {
  return (
    <div className="flex pt-10 flex-col items-center relative">
      <h2 className="text-center text-[#27252b] text-[23px] font-black uppercase tracking-wider">
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
        <p className="text-[#74727f] tracking-wide py-5">{description}</p>
      )}
    </div>
  );
};

export default HeaderBlock;
