import { useEffect } from 'react';
import L from 'leaflet';

const useMap = (key) => {
  let map;

  useEffect(() => {
    // Initialize map when the component is mounted
    map = L.map('map').setView([51.505, -0.09], 13);

    // Add MapTiler Satellite tiles
    L.tileLayer(`https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${key}`, {
      attribution: '&copy; MapTiler &copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map);

    // Clean up the map when the component is unmounted
    return () => {
      map.remove();
    };
  }, []);

  // Function to zoom in the map
  const zoomIn = () => {
    if (map) map.zoomIn();
  };

  // Function to zoom out the map
  const zoomOut = () => {
    if (map) map.zoomOut();
  };

  // Function to add a marker
  const addMarker = (lat, lng) => {
    if (map) {
      L.marker([lat, lng]).addTo(map)
        .bindPopup(`<b>New Marker</b><br />Marker at ${lat}, ${lng}.`).openPopup();
    }
  };

  // Function to show an alert
  const showAlert = () => {
    alert('Search functionality clicked!');
  };

  // Example function to check overpass time when button is clicked
  const onCheckOverpass = () => {
    const latitude = 51.505; // Example latitude
    const longitude = -0.09; // Example longitude
    const satellite = 'LANDSAT 8'; // Example satellite

    alert('Overpass Time Checked!');
  };

  return {
    onCheckOverpass,
    zoomIn,
    zoomOut,
    addMarker,
    showAlert,
  };
};

export default useMap;
