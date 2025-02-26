import axios from "axios";

// Function to decode polyline
export function decodePolyline(encoded) {
    let index = 0,
        lat = 0,
        lng = 0,
        coordinates = [];

    while (index < encoded.length) {
        let shift = 0, result = 0, byte;
        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        let deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
        lat += deltaLat;

        shift = 0;
        result = 0;
        do {
            byte = encoded.charCodeAt(index++) - 63;
            result |= (byte & 0x1f) << shift;
            shift += 5;
        } while (byte >= 0x20);

        let deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
        lng += deltaLng;

        coordinates.push([lat / 1e5, lng / 1e5]);
    }

    return coordinates;
}

// Function to fetch normal route
export async function fetchRouteData(start, end) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/route/", {
            start_lat: start[0],
            start_lon: start[1],
            end_lat: end[0],
            end_lon: end[1],
        });

        if (response.data.routes?.length > 0 && response.data.routes[0].geometry) {
            return decodePolyline(response.data.routes[0].geometry);
        } else {
            console.error("No route data received!");
            return [];
        }
    } catch (error) {
        console.error("Error fetching route:", error);
        return [];
    }
}

// Function to fetch traffic-aware route
export async function fetchTrafficData(start) {
    try {
        const response = await axios.post("http://127.0.0.1:8000/traffic/", {
            start_lat: start[0],
            start_lon: start[1],
        });

        if (response.data.routes?.length > 0 && response.data.routes[0].geometry) {
            return decodePolyline(response.data.routes[0].geometry);
        } else {
            console.error("No traffic data received!");
            return [];
        }
    } catch (error) {
        console.error("Error fetching traffic route:", error);
        return [];
    }
}
