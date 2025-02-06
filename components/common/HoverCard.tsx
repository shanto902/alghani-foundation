import Image from "next/image";

const HoverCard = () => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 group relative">
      <div className="md:flex">
        <div className="md:shrink-0">
          <div className="h-48 w-full md:h-full md:w-48 relative overflow-hidden">
            <Image
              src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg"
              alt="Descriptive Alt Text"
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-300 ease-in-out transform group-hover:translate-x-0 -translate-x-full"
            />
          </div>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-red-600 font-semibold">
            URGENT
          </div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">
            GIVE THEM SOME FOODS
          </h2>
          <p className="mt-2 text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            accumsan elit viv erra, placerat dolor quis, pulvinar velit. Sed
            auctor lacus eu purus.
          </p>
          <div className="mt-4">
            <span className="text-gray-700">
              $56,354.00 / $1,14,700.00 (61%)
            </span>
          </div>
          <button className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
            DONATE NOW
          </button>
        </div>
      </div>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">
          SAVE THE CHILD GIRLS
        </div>
        <p className="mt-2 text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          accumsan elit viv erra, placerat dolor quis, pulvinar velit. Sed
          auctor lacus eu purus.
        </p>
        <div className="mt-4">
          <span className="text-gray-700">$56,354.00 / $1,14,700.00 (90%)</span>
        </div>
        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          DONATE NOW
        </button>
      </div>
    </div>
  );
};

export default HoverCard;
