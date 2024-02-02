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
  toggleUnit: (unit: string) => void;
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
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const toggleUnit = async (unit: string) => {
    const currentLocation = location;

    const updatedUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(updatedUnit);
    console.log("updated unit", updatedUnit);

    console.log(location, "toggleUnit");
    if (currentLocation) {
      await updateData(currentLocation);
    }
  };

  const updateData: ThemeContextType["updateData"] = async (location) => {
    try {
      console.log(location);
      await fetchWeather(location, unit);
      await fetchForecast(location, unit);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  useEffect(() => {
    if (location) {
      updateData(location);
    }
  }, [unit, location]);

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
