import { useEffect } from 'react'
import L from 'leaflet';

const useMap = (key) => {
    useEffect(() => {
        // Initialize map when the component is mounted
        const map = L.map('map').setView([51.505, -0.09], 13);
    
        // Add MapTiler Satellite tiles
        L.tileLayer(`https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${key}`, {
          attribution: '&copy; <a href="https://www.maptiler.com/copyright/">MapTiler</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          maxZoom: 19
        }).addTo(map);
    
        // Popup for the map
        const popup = L.popup();
    
        // Handle map click event
        const onMapClick = (e) => {
          // Display coordinates in the popup
          popup
            .setLatLng(e.latlng)
            .setContent('You clicked the map at ' + e.latlng.toString())
            .openOn(map);
    
          // Prompt for satellite selection (Landsat 8 or 9)
          const satellite = prompt('Enter satellite (LANDSAT 8 or LANDSAT 9):', 'LANDSAT 8');
    
          // Validate satellite input
          if (satellite !== 'LANDSAT 8' && satellite !== 'LANDSAT 9') {
            alert('Invalid satellite! Please enter either "LANDSAT 8" or "LANDSAT 9".');
            return;
          }
    
          // Send coordinates and satellite to Flask backend to calculate the distance
          sendToFlaskAPI('distance', {
            latitude: e.latlng.lat,
            longitude: e.latlng.lng,
            satellite,
          })
            .then(data => {
              alert(`The distance to ${data.satellite} is: ${data.distance_km} km`);
            })
            .catch(error => {
              console.error('Error:', error);
              alert('Error communicating with the server: ' + error.message);
            });
        };
    
        // Add click event to map
        map.on('click', onMapClick);
    
        // Clean up the map when the component is unmounted
        return () => {
          map.off('click', onMapClick);
          map.remove();
        };
      }, []);
    
      // Function to send the request to Flask API
      const sendToFlaskAPI = async (endpoint, data) => {
        const response = await fetch(`http://127.0.0.1:5000/${endpoint}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          throw new Error(`Server returned status: ${response.status}`);
        }
    
        return response.json();
      };
    
      // Handle overpass time request
      const getOverpassTime = (latitude, longitude, satellite) => {
        sendToFlaskAPI('overpass', {
          latitude,
          longitude,
          satellite,
        })
          .then(data => {
            alert(`The overpass time for ${satellite} is: ${data.overpass_time}`);
          })
          .catch(error => {
            console.error('Error:', error);
            alert('Error communicating with the server: ' + error.message);
          });
      };
    
      // Example function to check overpass time when button is clicked
      const onCheckOverpass = () => {
        const latitude = 51.505; // Example latitude
        const longitude = -0.09; // Example longitude
        const satellite = 'LANDSAT 8'; // Example satellite
    
        // Call the function to get overpass time
        getOverpassTime(latitude, longitude, satellite);
      };
      return {
        onCheckOverpass
    }
}

export default useMap