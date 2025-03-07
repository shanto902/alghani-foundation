"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import parser from "html-react-parser";

import L, { LatLngExpression } from "leaflet";

import dynamic from "next/dynamic";
import Image from "next/image";
import { TLocation, TLocationBlock } from "@/interfaces";
import Spinner from "../common/Spinner";
import Link from "next/link";
import { FaEnvelope } from "react-icons/fa";
import { MoveLeft, MoveRight } from "lucide-react";
const MapWrapper = dynamic(() => import("../map/MapWrapper"), {
  ssr: false,
  loading: () => <Spinner />,
});

const LocationBlock = ({ block }: { block: TLocationBlock }) => {
  const [selectedProject, setSelectedProject] = useState<TLocation | null>(
    null
  );

  const [lng, lat] = block.item.map_center.coordinates;

  const mapCenter: LatLngExpression = [lat, lng];

  return (
    <div className="relative container mx-auto px-6 py-12  overflow-hidden">
      <div className="w-full h-96  overflow-hidden">
        <MapWrapper
          mapCenter={mapCenter}
          projectLocations={block.item.locations}
          setSelectedProject={setSelectedProject}
        />
      </div>

      {selectedProject && (
        <div className="mt-4 rounded-lg p-4 bg-primary flex md:flex-row flex-col gap-5  ">
          <div className="self-center  border-b-2 md:border-b-0 md:pb-0 md:border-r-2 md:pr-5 pb-5 border-white">
            <Image
              className=" rounded-lg aspect-square object-cover "
              height={300}
              width={300}
              src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${selectedProject.locations_id.image}`}
              alt={selectedProject.locations_id.title}
            />
          </div>
          <div className="">
            <Link
              target="_blank"
              href={selectedProject.locations_id.google_map_link}
              className="text-3xl pb-5 font-semibold text-white hover:underline "
            >
              {selectedProject.locations_id.title}
            </Link>
            <div className="text-gray-200">
              {parser(selectedProject.locations_id.description)}
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end">
        <Link
          className="flex text-lg px-3 py-2 text-primary hover:underline underline-offset-4 hover:animate-pulse font-bold items-center gap-2 "
          href={"/contact"}
        >
          CONTACT US FOR MORE INFORMATION <MoveRight />
        </Link>
      </div>
    </div>
  );
};

export default LocationBlock;
