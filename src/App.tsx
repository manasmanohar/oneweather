import { useState, useEffect } from "react";
import WeatherCard from "./components/ui/weatherCard";
import ForecastSection from "./components/forecastSection";
import Loader from "./components/ui/loader";

import {
  LocationData,
  WeatherData,
  ForecastData,
  AirQualityData,
} from "./types/types";

import { fetchGeoCoordinates } from "./api/geoCoordinates";
import { fetchWeather } from "./api/weather";
import { fetchForecast } from "./api/forecast";
import { fetchAirQuality } from "./api/airQuality";
import { fetchReverseGeocoding } from "./api/reverseGeocoding";

const App: React.FC = () => {
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [loadingAirQuality, setLoadingAirQuality] = useState(false);

  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);

  const [unit, setUnit] = useState("metric");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const defaultLocation = { latitude: 12.9716, longitude: 77.5946 };

      await updateData(defaultLocation);

      const gpsLocation = await fetchGeoCoordinates();
      if (gpsLocation) {
        await updateData(gpsLocation);
        setLocation(gpsLocation);
      }
    } catch (error) {
      handleError("Error initializing app:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const newLocation = await fetchReverseGeocoding(searchQuery);
      console.log(newLocation);
      if (newLocation) {
        await updateData(newLocation);
        setLocation(newLocation);
      }
    } catch (error) {
      handleError("Error handling search:", error);
    }
  };

  const handleUpdateLocation = async () => {
    try {
      const gpsLocation = await fetchGeoCoordinates();
      if (gpsLocation) {
        await updateData(gpsLocation);
        setLocation(gpsLocation);
        console.log(location);
      }
    } catch (error) {
      handleError("Error updating location from GPS:", error);
    }
  };
  const toggleUnit = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    updateData(location!);
  };

  const updateData = async (location: LocationData) => {
    try {
      setLoadingWeather(true);
      const weather = await fetchWeather(location, unit);
      setWeather(weather);
    } catch (error) {
      handleError("Error fetching weather data:", error);
    } finally {
      setLoadingWeather(false);
    }

    try {
      setLoadingForecast(true);
      const forecast = await fetchForecast(location, unit);
      setForecast(forecast);
    } catch (error) {
      handleError("Error fetching forecast data:", error);
    } finally {
      setLoadingForecast(false);
    }

    try {
      setLoadingAirQuality(true);
      const airQuality = await fetchAirQuality(location);
      setAirQuality(airQuality);
    } catch (error) {
      handleError("Error fetching air quality data:", error);
    } finally {
      setLoadingAirQuality(false);
    }
  };
  const temperatureSymbol = unit === "metric" ? "°C" : "°F";

  const handleError = (message: string, error: unknown) => {
    console.error(message, error);
  };

  return (
    <div className="mx-auto p-4">
      <div className="flex mb-4 ">
        <input
          type="text"
          placeholder="Enter location"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mr-2 p-2 border border-gray-300 w-2/3"
        />
        <div className="flex ">
          <button
            onClick={handleSearch}
            className="p-2 mr-2 w-24 bg-blue-500 text-white rounded"
          >
            Search
          </button>
          <button
            onClick={toggleUnit}
            className="p-2 w-12 bg-blue-500 text-white rounded"
          >
            {temperatureSymbol}
          </button>{" "}
        </div>
      </div>

      {loadingWeather || loadingForecast || loadingAirQuality ? (
        <Loader />
      ) : (
        <>
          <WeatherCard
            weatherData={weather}
            airQualityData={airQuality}
            onUpdateLocation={handleUpdateLocation}
            unit={unit}
          />
          <ForecastSection forecastData={forecast} />
        </>
      )}
    </div>
  );
};

export default App;
