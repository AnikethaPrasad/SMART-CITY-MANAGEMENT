import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ coords, location, route, trafficRoute, destination }) => {
  useEffect(() => {
    console.log("Route updated:", route);
    console.log("Traffic Route updated:", trafficRoute);
  }, [route, trafficRoute]);

  return (
    <div>
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
        {route.length > 0 && <Polyline positions={route} color="blue" weight={4} />}
        {trafficRoute.length > 0 && <Polyline positions={trafficRoute} color="red" weight={4} />}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
