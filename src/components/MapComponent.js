import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ coords, location, roads, route, destination }) => {
  const roadPolylines = roads
    .filter((way) => way.type === "way" && way.geometry)
    .map((way, index) => (
      <Polyline
        key={index}
        positions={way.geometry.map((point) => [point.lat, point.lon])}
        color="red"
      />
    ));

  const routePolyline = route.length > 0 ? <Polyline positions={route} color="blue" /> : null;

  return (
    <MapContainer center={coords} zoom={13} style={{ height: "400px", width: "80%", margin: "20px auto" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={coords}>
        <Popup>{location || "Start Location"}</Popup>
      </Marker>
      {destination && (
        <Marker position={destination}>
          <Popup>Destination</Popup>
        </Marker>
      )}
      {roadPolylines}
      {routePolyline}
    </MapContainer>
  );
};

export default MapComponent;
