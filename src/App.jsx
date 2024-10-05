import { BrowserRouter, Routes, Route } from "react-router-dom";
import Instruction from "./components/home/Instructions";
import About from "./components/home/About";
import SatelliteMap from "./pages/SatelliteMap";
import Home from "./pages/Home";
import ForgetPass from "./components/ForgetPass";
import PrivateRoute from "./helper/PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider, useModal } from "./services/contextApi";

export default function App() {
  const queryClient = new QueryClient();
  
  return (
    <QueryClientProvider client={queryClient}>
      {/* Move ModalProvider outside to wrap everything */}
      <ModalProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ModalProvider>
    </QueryClientProvider>
  );
}

// Separated Routes to its own component
function AppRoutes() {
  const { openLogin } = useModal();  // Now useModal is called within ModalProvider context
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/instruction" element={<Instruction />} />
      <Route path="/about" element={<About />} />
      <Route path="/forgetpass" element={<ForgetPass />} />

      {/* Private route for the SatelliteMap */}
      <Route
        path="/map"
        element={
          <PrivateRoute openLogin={openLogin}>
            <SatelliteMap />
          </PrivateRoute>
        }
      />
      {/* Redirect any unknown path to Home */}
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
