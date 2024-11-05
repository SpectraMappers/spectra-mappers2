import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import { useLandsatContext } from "../../services/landSateContext";
import CoordinatesForm from "../../components/landsateComponent/CoordinatesForm";

const locationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

const useMap = (key) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  const [clickedCoords, setClickedCoords] = useState({ latitude: null, longitude: null });
  const { submitDataToServer, setUserData } = useLandsatContext();

  useEffect(() => {
    if (!mapRef.current) {
      const newMap = L.map("map").setView([51.505, -0.09], 13);
      mapRef.current = newMap;

      L.tileLayer(
        `https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${key}`,
        {
          attribution: "&copy; MapTiler &copy; OpenStreetMap contributors",
          maxZoom: 19,
        }
      ).addTo(newMap);

      const handleClick = (e) => {
        const { lat, lng } = e.latlng;
        setClickedCoords({ latitude: lat, longitude: lng });

        // Remove the existing marker if any
        if (markerRef.current) {
          markerRef.current.remove();
        }

        // Create a new marker with a popup containing a button
        const newMarker = L.marker([lat, lng], { icon: locationIcon })
          .addTo(newMap)
          .bindPopup(`
            <b>Location:</b><br>Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}
            <br><button class="show-meta-data-button">Show Meta Data</button>
          `)
          .openPopup();

        markerRef.current = newMarker;

        // Add event listener to the button in the popup
        newMarker.on("popupopen", () => {
          const button = document.querySelector(".show-meta-data-button");
          if (button) {
            button.onclick = () => setShowPopup(true);
          }
        });
      };

      newMap.on("click", handleClick);

      // Cleanup function to remove map and marker when component unmounts
      return () => {
        if (mapRef.current) {
          mapRef.current.off("click", handleClick);
          mapRef.current.remove();
          mapRef.current = null;
        }
        if (markerRef.current) {
          markerRef.current.remove();
          markerRef.current = null;
        }
      };
    }
  }, [key]);

  // Submit handler for CoordinatesForm
  const handlePopupSubmit = (values) => {
    setUserData({ ...values, ...clickedCoords });
    submitDataToServer({ ...values, ...clickedCoords });
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <CoordinatesForm
          onSubmit={handlePopupSubmit}
          latitude={clickedCoords.latitude}
          longitude={clickedCoords.longitude}
          onClose={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default useMap;
