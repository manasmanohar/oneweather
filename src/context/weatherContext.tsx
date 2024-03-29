import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  WeatherData,
  ForecastData,
  AirQualityData,
  LocationData,
} from "../types/types";

import { fetchAirQuality } from "../api/airQuality";
import { fetchForecast } from "../api/forecast";
import { fetchGeoCoordinates } from "../api/geoCoordinates";
import { fetchWeather } from "../api/weather";
import { useTheme } from "./themeContext";

interface WeatherContextType {
  loading: boolean;
  location: LocationData | null;
  weather: WeatherData | null;
  forecast: ForecastData[] | null;
  airQuality: AirQualityData | null;
  updateData: (location: LocationData, unit: string) => Promise<void>; // Accept both location and unit
  handleUpdateLocation: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const { unit } = useTheme();

  const fetchData = async (location: LocationData, unit: string) => {
    try {
      setLoading(true);
      setLocation(location);

      console.log(unit, "unit before calling fetch");
      const weatherData = await fetchWeather(location, unit);
      setWeather(weatherData);

      const forecastData = await fetchForecast(location, unit);

      console.log(unit, "unit in weather context");
      setForecast(forecastData);

      const airQualityData = await fetchAirQuality(location);
      setAirQuality(airQualityData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateData: WeatherContextType["updateData"] = async (location) => {
    await fetchData(location, unit);
  };

  const handleUpdateLocation: WeatherContextType["handleUpdateLocation"] =
    async () => {
      try {
        const gpsLocation = await fetchGeoCoordinates();
        if (gpsLocation) {
          await fetchData(gpsLocation, unit);
          setLocation(gpsLocation);
        }
      } catch (error) {
        console.error("Error updating location from GPS:", error);
      }
    };

  return (
    <WeatherContext.Provider
      value={{
        loading,
        location,
        weather,
        forecast,
        airQuality,
        updateData,
        handleUpdateLocation,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeatherContext = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeatherContext must be used within a WeatherProvider");
  }
  return context;
};
