import requests
import json

# ORS API URL for Heavy Goods Vehicles (HGV)
url_traffic = "https://api.openrouteservice.org/v2/directions/driving-hgv"

headers = {
    "Authorization": "5b3ce3597851110001cf62480bbe945e79694b058f6fdd534f5e8dec",
    "Content-Type": "application/json"
}

# Define coordinates (Start -> Destination)
coordinates = [[8.681495, 49.41461], [8.687872, 49.420318]]

# Request payload (Remove 'traffic_conditions')
data_traffic = {
    "coordinates": coordinates,
    "format": "geojson",
    "extra_info": ["waytype", "surface", "roadaccessrestrictions"],  # ✅ Correct parameters
    "instructions": True,  # Optional: Include turn-by-turn directions
}

# Send traffic-aware route request
response_traffic = requests.post(url_traffic, headers=headers, json=data_traffic)

# Print response
if response_traffic.status_code == 200:
    print("\n**Traffic-Aware Route Response:**")
    print(json.dumps(response_traffic.json(), indent=4))  # Pretty print JSON response
else:
    print(f"Error {response_traffic.status_code}: {response_traffic.text}")
