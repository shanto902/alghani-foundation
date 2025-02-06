import Image from "next/image";

const RecognitionSection = () => {
  const recognitions = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg",
      title: "Recognition Title 1",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg",
      title: "Recognition Title 2",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg",
      title: "Recognition Title 3",
    },
  ];

  return (
    <section className=" py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recognitions.map((recognition) => (
            <div
              key={recognition.id}
              className=" overflow-hidden cursor-pointer  hover:bg-primary bg-primaryLight hover:text-white"
            >
              <div className="relative h-48">
                <Image
                  src={recognition.image}
                  alt={recognition.title}
                  height={192}
                  width={420}
                  className="object-cover w-[420px] h-[192px]"
                />
              </div>
              <div className="p-6">
                <p className="text-lg font-semibold ">{recognition.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecognitionSection;
