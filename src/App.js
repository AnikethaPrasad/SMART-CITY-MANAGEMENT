import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import axios from "axios";
import { fetchRouteData, fetchTrafficData } from "./utils.js";

const App = () => {
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [coords, setCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [route, setRoute] = useState([]);
  const [trafficRoute, setTrafficRoute] = useState([]);

  // Fetch coordinates from OpenStreetMap API
  const fetchCoordinates = async (place, setCoordsFunc) => {
    if (!place.trim()) {
      alert("Please enter a valid location!");
      return;
    }

    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoordsFunc([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Location not found! Try again.");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
      alert("Failed to fetch location. Please check your internet connection.");
    }
  };

  // Fetch normal route
  const fetchRoute = async () => {
    if (!coords || !destCoords) {
      alert("Please enter both locations first!");
      return;
    }

    const routeCoords = await fetchRouteData(coords, destCoords);
    setRoute(routeCoords);
  };

  // Fetch traffic-aware route
  const fetchTrafficRoute = async () => {
    if (!coords) {
      alert("Please enter a location first!");
      return;
    }

    const trafficCoords = await fetchTrafficData(coords);
    setTrafficRoute(trafficCoords);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>City Map Assistance</h2>

      <div>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Enter starting location" />
        <button onClick={() => fetchCoordinates(location, setCoords)}>Load Map</button>
      </div>

      <div>
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Enter destination" />
        <button onClick={() => fetchCoordinates(destination, setDestCoords)}>Set Destination</button>
      </div>

      <div>
        <button onClick={fetchRoute} disabled={!coords || !destCoords}>Show Route</button>
        <button onClick={fetchTrafficRoute} disabled={!coords}>Show Traffic</button>
      </div>

      {coords && <MapComponent coords={coords} location={location} route={route} trafficRoute={trafficRoute} destination={destCoords} />}
    </div>
  );
};

export default App;
