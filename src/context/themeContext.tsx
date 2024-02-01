import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { fetchWeather } from "../api/weather";
import { fetchForecast } from "../api/forecast";
import { LocationData } from "../types/types";

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
  unit: string;
  toggleUnit: () => void;
  updateData: (location: LocationData) => Promise<void>;
  location: LocationData | null;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [location] = useState<LocationData | null>(null);
  const [theme, setTheme] = useState("dark");
  const [unit, setUnit] = useState("metric");

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  const toggleUnit = () => {
    setUnit((currentUnit) =>
      currentUnit === "metric" ? "imperial" : "metric"
    );
  };

  const updateData: ThemeContextType["updateData"] = async (location) => {
    try {
      console.log(location); // Fetch weather data with the new unit
      await fetchWeather(location, unit);
      // Fetch forecast data with the new unit
      await fetchForecast(location, unit);
      // Add similar calls for other data (air quality, etc.) if needed
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Update data whenever location or unit changes
  useEffect(() => {
    if (location) {
      updateData(location);
    }
  }, [unit]);

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, unit, toggleUnit, updateData, location }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext<ThemeContextType | null>(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
