import { BrowserRouter, Routes, Route } from "react-router-dom";
import Instruction from "./components/home/Instructions";
import About from "./components/home/About";
import SatelliteMap from "./pages/SatelliteMap";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/instruction" element={<Instruction />} />
        <Route path="/about" element={<About />} />
        <Route path="/map" element={<SatelliteMap />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
