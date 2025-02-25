"use client";

import Image from "next/image";
import { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

type Recognition = {
  id: number;
  image: string;
  title: string;
  description: string;
};

const RecognitionSection = () => {
  const recognitions: Recognition[] = [
    {
      id: 1,
      image:
        "https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg",
      title: "Recognition Title 1",
      description:
        "This is a description for Recognition 1. It highlights key achievements and contributions.",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/3184297/pexels-photo-3184297.jpeg",
      title: "Recognition Title 2",
      description:
        "This is a description for Recognition 2. It showcases excellence in the respective field.",
    },
    {
      id: 3,
      image:
        "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg",
      title: "Recognition Title 3",
      description:
        "This is a description for Recognition 3. Acknowledging outstanding performance and dedication.",
    },
  ];

  const [selectedRecognition, setSelectedRecognition] =
    useState<Recognition | null>(null);

  return (
    <>
      {/* Main Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recognitions.map((recognition) => (
              <div
                key={recognition.id}
                className="overflow-hidden cursor-pointer hover:bg-primary bg-white hover:text-white p-4  transition-all duration-300"
                onClick={() => setSelectedRecognition(recognition)}
              >
                <div className="relative h-48">
                  <Image
                    src={recognition.image}
                    alt={recognition.title}
                    height={192}
                    width={420}
                    className="object-cover w-[420px] h-[192px] rounded-sm"
                  />
                </div>
                <div className="p-4">
                  <p className="text-lg font-semibold">{recognition.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {selectedRecognition && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedRecognition(null)}
        >
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            <Zoom>
              <Image
                src={selectedRecognition.image}
                alt={selectedRecognition.title}
                width={1200}
                height={800}
                className="w-full h-screen object-contain rounded-lg"
              />
            </Zoom>
            {/* Black Overlay for Description */}
            <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-80 text-white text-center p-4">
              <h2 className="text-xl font-semibold">
                {selectedRecognition.title}
              </h2>
              <p className="text-sm mt-2">{selectedRecognition.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecognitionSection;
