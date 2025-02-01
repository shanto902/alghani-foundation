import Image from "next/image";

const RecognitionSection = () => {
  const recognitions = [
    {
      id: 1,
      image: "/assets/recognition/recognition_1.png", // Replace with your image paths
      title: "Recognition Title 1",
    },
    {
      id: 2,
      image: "/assets/recognition/recognition_2.png",
      title: "Recognition Title 2",
    },
    {
      id: 3,
      image: "/assets/recognition/recognition_3.png",
      title: "Recognition Title 3",
    },
  ];

  return (
    <section className=" py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recognitions.map((recognition) => (
            <div
              key={recognition.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-48">
                <Image
                  src={recognition.image}
                  alt={recognition.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-6">
                <p className="text-lg font-semibold text-gray-900">
                  {recognition.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecognitionSection;
