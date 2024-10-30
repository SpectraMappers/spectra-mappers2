import { BrowserRouter, Routes, Route } from "react-router-dom";
import Instruction from "./components/home/Instructions";
import About from "./components/home/About";
import SatelliteMap from "./pages/SatelliteMap";
import Home from "./pages/Home";
import ForgetPass from "./components/ForgetPass";
import PrivateRoute from "./helper/PrivateRoute";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ModalProvider, useModal } from "./services/contextApi";
import LandsatForm from "./components/landsateComponent/DataGround";
import { AuthProvider } from "./services/useAuth"; // Import AuthProvider
import { LandsatProvider } from "./services/landSateContext"; // Import LandsatProvider

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ModalProvider>
          <AuthProvider>
            <LandsatProvider>
              <AppRoutes />
            </LandsatProvider>
          </AuthProvider>
        </ModalProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

function AppRoutes() {
  const { openLogin } = useModal();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/instruction" element={<Instruction />} />
      <Route path="/about" element={<About />} />
      <Route path="/forgetpass" element={<ForgetPass />} />
      <Route path="/landsatForm" element={<LandsatForm />} />

      <Route
        path="/map"
        element={
          <PrivateRoute openLogin={openLogin}>
            <SatelliteMap />
          </PrivateRoute>
        }
      />

      <Route path="*" element={<Home />} />
    </Routes>
  );
}
