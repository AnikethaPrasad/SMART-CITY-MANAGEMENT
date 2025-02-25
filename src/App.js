import React, { useState } from "react";
import MapComponent from "./components/MapComponent";
import axios from "axios";

const App = () => {
  const [location, setLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [coords, setCoords] = useState(null);
  const [destCoords, setDestCoords] = useState(null);
  const [trafficInfo, setTrafficInfo] = useState(null);
  const [roads, setRoads] = useState([]);
  const [route, setRoute] = useState([]);

  const fetchCoordinates = async (place, setCoordsFunc) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
      );
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setCoordsFunc([parseFloat(lat), parseFloat(lon)]);
      } else {
        alert("Location not found!");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  const fetchRoute = async () => {
    if (!coords || !destCoords) return alert("Please enter both locations first!");
    try {
      const response = await axios.post("http://127.0.0.1:8000/route/", {
        start_lat: coords[0],
        start_lon: coords[1],
        end_lat: destCoords[0],
        end_lon: destCoords[1],
      });
  
      const routeCoords = response.data.features[0].geometry.coordinates.map(
        (coord) => [coord[1], coord[0]]
      );
      setRoute(routeCoords);
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };  

  const fetchTrafficInfo = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/traffic/");
      setTrafficInfo(response.data);
    } catch (error) {
      console.error("Error fetching traffic data:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>City Map Assistance</h2>

      <div>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter starting location"
          style={{ padding: "8px", marginRight: "8px" }}
        />
        <button onClick={() => fetchCoordinates(location, setCoords)} style={{ padding: "8px", marginRight: "8px" }}>
          Load Map
        </button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Enter destination"
          style={{ padding: "8px", marginRight: "8px" }}
        />
        <button onClick={() => fetchCoordinates(destination, setDestCoords)} style={{ padding: "8px", marginRight: "8px" }}>
          Set Destination
        </button>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={fetchRoute} disabled={!coords || !destCoords} style={{ padding: "8px", marginRight: "8px" }}>
          Show Route
        </button>
        <button onClick={fetchTrafficInfo} style={{ padding: "8px", marginRight: "8px" }}>
          Show Traffic
        </button>
        <button onClick={() => setRoads([])} style={{ padding: "8px" }}>
          Show Roads
        </button>
      </div>

      {coords && <MapComponent coords={coords} location={location} roads={roads} route={route} destination={destCoords} />}

      {trafficInfo && (
        <div>
          <h3>Traffic Info</h3>
          <pre>{JSON.stringify(trafficInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
