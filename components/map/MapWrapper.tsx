import L, { LatLngExpression } from "leaflet";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Project } from "../section/LocationSection";

const MapWrapper = ({
  projectLocations,
  mapCenter,
  setSelectedProject,
}: {
  projectLocations: Project[];
  mapCenter: LatLngExpression;
  setSelectedProject: (project: Project | null) => void;
}) => {
  return (
    <MapContainer
      center={mapCenter}
      zoom={7}
      scrollWheelZoom={false}
      className="w-full z-0 h-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {projectLocations.map((project) => (
        <Marker
          key={project.id}
          position={[project.lat, project.lng] as LatLngExpression}
          eventHandlers={{ click: () => setSelectedProject(project) }}
          icon={L.icon({
            iconUrl:
              "https://static.vecteezy.com/system/resources/previews/023/435/841/non_2x/check-in-location-icon-free-png.png",
            iconSize: [40, 41],
            iconAnchor: [20, 20],
          })}
        >
          <Popup>
            <strong>{project.name}</strong>
            <p className="!mt-1">{project.summery}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapWrapper;
