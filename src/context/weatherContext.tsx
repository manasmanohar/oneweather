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

interface WeatherContextType {
  loadingWeather: boolean;
  loadingForecast: boolean;
  loadingAirQuality: boolean;
  location: LocationData | null;
  weather: WeatherData | null;
  forecast: ForecastData[] | null;
  airQuality: AirQualityData | null;
  updateData: (location: LocationData) => Promise<void>;
  handleUpdateLocation: () => Promise<void>;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [loadingAirQuality, setLoadingAirQuality] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);

  const updateData: WeatherContextType["updateData"] = async (location) => {
    try {
      setLoadingWeather(true);
      const weatherData = await fetchWeather(location, "metric");
      setWeather(weatherData);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    } finally {
      setLoadingWeather(false);
    }

    try {
      setLoadingForecast(true);
      const forecastData = await fetchForecast(location, "metric");
      setForecast(forecastData);
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    } finally {
      setLoadingForecast(false);
    }

    try {
      setLoadingAirQuality(true);
      const airQualityData = await fetchAirQuality(location);
      setAirQuality(airQualityData);
    } catch (error) {
      console.error("Error fetching air quality data:", error);
    } finally {
      setLoadingAirQuality(false);
    }
  };

  const handleUpdateLocation: WeatherContextType["handleUpdateLocation"] =
    async () => {
      try {
        const gpsLocation = await fetchGeoCoordinates();
        if (gpsLocation) {
          await updateData(gpsLocation);
          setLocation(gpsLocation);
        }
      } catch (error) {
        console.error("Error updating location from GPS:", error);
      }
    };

  return (
    <WeatherContext.Provider
      value={{
        loadingWeather,
        loadingForecast,
        loadingAirQuality,
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
