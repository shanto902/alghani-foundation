"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import parser from "html-react-parser";

import L, { LatLngExpression } from "leaflet";

import dynamic from "next/dynamic";
import Image from "next/image";
import { TLocation, TLocationBlock } from "@/interfaces";
const MapWrapper = dynamic(() => import("../map/MapWrapper"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const LocationBlock = ({ block }: { block: TLocationBlock }) => {
  const [selectedProject, setSelectedProject] = useState<TLocation | null>(
    null
  );

  const [lng, lat] = block.item.map_center.coordinates;

  const mapCenter: LatLngExpression = [lat, lng];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="w-full h-96  overflow-hidden">
        <MapWrapper
          mapCenter={mapCenter}
          projectLocations={block.item.locations}
          setSelectedProject={setSelectedProject}
        />
      </div>

      {selectedProject && (
        <div className="mt-4 p-4 bg-primary flex md:flex-row flex-col gap-10  ">
          <Image
            className="self-center aspect-square object-cover border-b-2 md:border-b-0 md:pb-0 md:border-r-2 md:pr-5 pb-5 border-primaryLight"
            height={200}
            width={200}
            src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${selectedProject.locations_id.image}`}
            alt={selectedProject.locations_id.title}
          />
          <div className="px-5">
            <h3 className="text-3xl pb-5 font-semibold text-white">
              {selectedProject.locations_id.title}
            </h3>
            <div className="text-gray-200">
              {parser(selectedProject.locations_id.description)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationBlock;
