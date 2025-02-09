"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

import L, { LatLngExpression } from "leaflet";

import dynamic from "next/dynamic";
import Image from "next/image";
const MapWrapper = dynamic(() => import("../map/MapWrapper"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
// Define types for project locations
export interface Project {
  id: number;
  name: string;
  lat: number;
  lng: number;
  summery: string;
  description?: string;
  image: string;
}

// Project locations
const projectLocations: Project[] = [
  {
    id: 1,
    name: "Dhaka Project",
    lat: 23.8103,
    lng: 90.4125,
    summery: "Providing education and healthcare.",
    description:
      "Dhaka Project is a project that focuses on providing education and healthcare to the people of Dhaka.",
    image: "https://images.pexels.com/photos/1231234/pexels-photo-1231234.jpeg",
  },
  {
    id: 2,
    name: "Bogura Project",
    lat: 24.85,
    lng: 89.37,
    summery: "Supporting rural development.",
    description:
      "Bogura Project aims to support rural development through various initiatives including agriculture and infrastructure improvement.",
    image:
      "https://images.pexels.com/photos/15804050/pexels-photo-15804050/free-photo-of-rescuing-of-a-girl.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    name: "Chattogram Project",
    lat: 22.3569,
    lng: 91.7832,
    summery: "Focusing on clean water initiatives.",
    description:
      "Chattogram Project focuses on providing clean water initiatives to ensure safe drinking water for the community.",
    image:
      "https://images.pexels.com/photos/5371545/pexels-photo-5371545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const LocationSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Define center position with LatLngExpression type
  const mapCenter: LatLngExpression = [23.8103, 90.4125];

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="w-full h-96  overflow-hidden">
        <MapWrapper
          mapCenter={mapCenter}
          projectLocations={projectLocations}
          setSelectedProject={setSelectedProject}
        />
      </div>

      {selectedProject && (
        <div className="mt-4 p-4 bg-primary flex">
          <Image
            className="aspect-square object-cover border-r-2 pr-5 border-primaryLight"
            height={400}
            width={400}
            src={selectedProject.image}
            alt={selectedProject.name}
          />
          <div className="px-5">
            <h3 className="text-3xl pb-5 font-semibold text-white">
              {selectedProject.name}
            </h3>
            <p className="text-gray-200">{selectedProject.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSection;
