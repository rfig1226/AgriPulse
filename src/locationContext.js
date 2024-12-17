import React, { createContext, useContext, useState } from "react";

// Create the context
const LocationContext = createContext();

// Context Provider
export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({ lat: null, lon: null });

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use LocationContext
export const useLocation = () => {
  return useContext(LocationContext);
};
