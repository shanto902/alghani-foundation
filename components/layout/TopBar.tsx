import { TSetting } from "@/interfaces";
import Link from "next/link";
const TopBar = ({ settings }: { settings: TSetting }) => {
  return (
    <div className="hidden md:block w-full h-12 bg-[#fbfbfb] drop-shadow-sm">
      <div className="max-w-screen-2xl flex justify-center items-center h-full mx-auto">
        <div className=" px-8 w-full  flex justify-between items-center h-full">
          <p className="text-[#27252b] text-sm ">
            <span className="font-normal ">Call Us :</span>{" "}
            <a
              href={`tel:+88${settings.contact_no.replace(/\s+/g, "")}`}
              className="font-bold"
            >
              {settings.contact_no}
            </a>
          </p>
          <div className="flex ">
            <Link
              href={`/${settings.press_link}`}
              className="bg-transparent text-black border-2 border-primary px-4 py-1 rounded-tl-lg rounded-bl-lg hover:bg-primary hover:text-white transition-colors duration-300"
            >
              Press
            </Link>
            <Link
              href={`/${settings.career_link}`}
              className="bg-transparent text-black border-2 border-primary px-4 py-1 rounded-br-lg rounded-tr-lg hover:bg-primary hover:text-white transition-colors duration-300"
            >
              Careers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
