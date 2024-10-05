import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create the Landsat context
const LandsatContext = createContext();

export const useLandsatContext = () => useContext(LandsatContext);

export const LandsatProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));

  return (
    <LandsatContext.Provider value={{ userData, setUserData, authToken, setAuthToken }}>
      {children}
    </LandsatContext.Provider>
  );
};
