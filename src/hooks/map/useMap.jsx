import { useEffect, useState } from "react";
import L from "leaflet";
import { useLandsatContext } from "../../services/landSateContext";
// import CoordinatesFormPopup from "../../components/landsateComponent/CoordinatesFormPopup";

const locationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -30],
});

const useMap = (key) => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [clickedCoords, setClickedCoords] = useState({ latitude: null, longitude: null });
  const { submitDataToServer, setUserData } = useLandsatContext();

  useEffect(() => {
    const newMap = L.map("map").setView([51.505, -0.09], 13);
    setMap(newMap);

    L.tileLayer(`https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=${key}`, {
      attribution: "&copy; MapTiler &copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(newMap);

    const handleClick = (e) => {
      const { lat, lng } = e.latlng;
      setClickedCoords({ latitude: lat, longitude: lng });
      setShowPopup(true);

      if (marker) marker.remove();

      const newMarker = L.marker([lat, lng], { icon: locationIcon })
        .addTo(newMap)
        .bindPopup(`<b>Location:</b><br>Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`)
        .openPopup();

      setMarker(newMarker);
    };

    newMap.on("click", handleClick);

    return () => {
      newMap.off("click", handleClick);
      newMap.remove();
      if (marker) marker.remove();
    };
  }, [key, marker]);

  const handlePopupSubmit = (values) => {
    setUserData({ ...values, ...clickedCoords });
    submitDataToServer({ ...values, ...clickedCoords });
    setShowPopup(false);
  };

  return (
    <>
      {showPopup && (
        <CoordinatesFormPopup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          onSubmit={handlePopupSubmit}
          latitude={clickedCoords.latitude}
          longitude={clickedCoords.longitude}
        />
      )}
    </>
  );
};

export default useMap;
