import Image, { StaticImageData } from "next/image";

const SvgGenerator = ({ src, alt }: { src: StaticImageData; alt: string }) => {
  return (
    <div className="  border-r-[1px]  p-3 h-full w-full  ">
      <Image className="" src={src} alt={alt} />
    </div>
  );
};

export default SvgGenerator;
