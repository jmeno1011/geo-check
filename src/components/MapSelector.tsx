import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { LatLng } from 'leaflet';

interface MapSelectorProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialPosition: { lat: number; lng: number };
}

const LocationMarker: React.FC<{
  position: LatLng;
  setPosition: (position: LatLng) => void;
  onLocationSelect: (lat: number, lng: number) => void;
}> = ({ position, setPosition, onLocationSelect }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : <Marker position={position}></Marker>;
};

const MapSelector: React.FC<MapSelectorProps> = ({ onLocationSelect, initialPosition }) => {
  const [position, setPosition] = useState<LatLng>(new LatLng(initialPosition.lat, initialPosition.lng));

  return (
    <MapContainer center={initialPosition} zoom={13} style={{ height: '600px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocationMarker position={position} setPosition={setPosition} onLocationSelect={onLocationSelect} />
    </MapContainer>
  );
};

export default MapSelector;
