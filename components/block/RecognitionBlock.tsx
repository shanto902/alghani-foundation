"use client";

import { TRecognition, TRecognitionBlock } from "@/interfaces";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const RecognitionBlock = ({ block }: { block: TRecognitionBlock }) => {
  const [selectedRecognition, setSelectedRecognition] =
    useState<TRecognition | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [Autoplay()]
  );

  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, block]);

  return (
    <>
      {/* Main Section */}
      <section className="py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex space-x-4">
              {block.item.recognitions.map((recognition) => (
                <div
                  key={recognition.recognition_id.id}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 p-4 cursor-pointer hover:bg-primary bg-white hover:text-white transition-all duration-300"
                  onClick={() => setSelectedRecognition(recognition)}
                >
                  <div className="relative h-48">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${recognition.recognition_id?.image}`}
                      alt={recognition.recognition_id.title}
                      height={192}
                      width={420}
                      className="object-cover w-full h-full rounded-sm"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-lg font-semibold">
                      {recognition.recognition_id.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {selectedRecognition && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center h-full justify-center z-50 p-4"
          onClick={() => setSelectedRecognition(null)}
        >
          <div className="relative max-w-5xl w-full flex flex-col items-center">
            <Zoom>
              <Image
                src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${selectedRecognition.recognition_id.image}`}
                alt={selectedRecognition.recognition_id.title}
                width={1200}
                height={800}
                className="w-full h-screen object-contain rounded-lg"
              />
            </Zoom>
            {/* Black Overlay for Description */}
            <div className="absolute bottom-0 left-0 w-full bg-black hover:bg-opacity-100 bg-opacity-70 text-white text-center p-4">
              <h2 className="text-xl font-semibold">
                {selectedRecognition.recognition_id.title}
              </h2>
              <p className="text-sm mt-2">
                {selectedRecognition.recognition_id.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecognitionBlock;
