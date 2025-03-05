import Image from "next/image";
import CustomButton from "../common/CustomButton";
import { TSponsorProgramBlock } from "@/interfaces";
import parser from "html-react-parser";
import PaddingContainer from "../layout/PaddingContainer";
const SponsorProgram = ({ block }: { block: TSponsorProgramBlock }) => {
  return (
    <PaddingContainer className="my-10 flex  gap-10 flex-col md:flex-row items-center  overflow-hidden p-6">
      {/* Left side - Image */}
      <div className="md:w-1/2  w-full relative">
        <Image
          src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${block.item.image}`}
          alt={block.item.headline}
          width={600}
          height={400}
          className="w-full object-top object-cover rounded-lg aspect-[4/3]"
        />
      </div>

      {/* Right side - Content */}
      <div className="md:w-1/2 w-full md:p-6">
        <h2 className="text-2xl font-bold mb-4">{block.item.headline}</h2>
        <div className="mb-4">{parser(block.item.description)}</div>

        <CustomButton
          className="bg-primary hover:bg-white text-white hover:text-primary"
          href={block.item.button_link}
        >
          {block.item.button_text}
        </CustomButton>
      </div>
    </PaddingContainer>
  );
};

export default SponsorProgram;
