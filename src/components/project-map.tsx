"use client";

import { useMapEvents, MapContainer, Polygon, TileLayer } from "react-leaflet";
import type { LeafletMouseEvent } from "leaflet";

interface ProjectMapProps {
  polygonPoints: Array<{ lat: number; lng: number }>;
  existingPolygons: Array<Array<{ lat: number; lng: number }>>;
  onAddPoint: (point: { lat: number; lng: number }) => void;
}

function MapClickCapture({ onAddPoint }: { onAddPoint: (point: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(event: LeafletMouseEvent) {
      onAddPoint({ lat: event.latlng.lat, lng: event.latlng.lng });
    },
  });

  return null;
}

export function ProjectMap({ polygonPoints, existingPolygons, onAddPoint }: ProjectMapProps) {
  return (
    <MapContainer
      center={[52.2, 5.3]}
      zoom={7}
      scrollWheelZoom
      className="h-80 w-full rounded-md border border-neutral-300"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickCapture onAddPoint={onAddPoint} />
      {existingPolygons.map((polygon, index) => (
        <Polygon key={`existing-${index}`} positions={polygon} pathOptions={{ color: "#2563eb" }} />
      ))}
      {polygonPoints.length >= 2 ? (
        <Polygon positions={polygonPoints} pathOptions={{ color: "#16a34a" }} />
      ) : null}
    </MapContainer>
  );
}
