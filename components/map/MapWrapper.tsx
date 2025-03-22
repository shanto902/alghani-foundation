import L, { LatLngExpression } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import { TLocation } from "@/interfaces";
import Link from "next/link";

const MapWrapper = ({
  projectLocations,
  mapCenter,
  setSelectedProject,
}: {
  projectLocations: TLocation[];
  mapCenter: LatLngExpression;
  setSelectedProject: (project: TLocation | null) => void;
}) => {
  return (
    <MapContainer
      center={mapCenter}
      zoom={2.4}
      scrollWheelZoom={false}
      className="w-full z-0 h-full rounded-lg"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {projectLocations.map((project) => {
        const [lng, lat] = project.locations_id.location.coordinates;
        return (
          <Marker
            key={project.locations_id.id}
            position={[lat, lng] as LatLngExpression}
            eventHandlers={{ click: () => setSelectedProject(project) }}
            icon={L.icon({
              iconUrl:
                "https://static.vecteezy.com/system/resources/previews/023/435/841/non_2x/check-in-location-icon-free-png.png",
              iconSize: [40, 41],
              iconAnchor: [20, 20],
            })}
          >
            <Popup>
              <Link
                target="_blank"
                className="hover:underline font-bold !text-primary"
                href={project.locations_id.google_map_link}
              >
                {project.locations_id.title}
              </Link>
              <p className="!mt-1">{project.locations_id.subtitle}</p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
};

export default MapWrapper;
