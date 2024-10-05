import "leaflet/dist/leaflet.css";
import useMap from "../hooks/map/useMap";

// MapTiler API key
const mapTilerApiKey = "HPHMrcw0Q5i62yGZp9KB";

const SatelliteMap = () => {
  // Destructure the functionality from useMap hook
  let { onCheckOverpass } = useMap(mapTilerApiKey);

  return (
    <div>
      <div id="map" style={{ height: "100vh" }}></div>
      <div id="controls" style={{ position: "absolute", top: "10px", left: "10px", zIndex: "1000" }}>
        <button id="overpassBtn" onClick={onCheckOverpass}>
          Check Overpass Time
        </button>
      </div>
    </div>
  );
};

export default SatelliteMap;
