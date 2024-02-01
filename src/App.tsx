import { useState, useEffect } from "react";
import WeatherCard from "./components/ui/weatherCard";
import ForecastSection from "./components/forecastSection";
import Loader from "./components/ui/loader";
import { useTheme } from "./context/themeContext";
import { useWeatherContext } from "./context/weatherContext";

import FeelsLikeWidget from "./components/ui/widgets/feelsLike";
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

const App: React.FC = () => {
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [loadingForecast, setLoadingForecast] = useState(false);
  const [loadingAirQuality, setLoadingAirQuality] = useState(false);

  const [location, setLocation] = useState<LocationData | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[] | null>(null);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const { unit } = useTheme(); //set default unit to metric
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

  const handleUpdateLocation = async () => {
    console.log("handleUpdateLocation");
    try {
      const gpsLocation = await fetchGeoCoordinates();
      console.log("fetchGeoCoordinates");

      if (gpsLocation) {
        console.log(gpsLocation + "gpsLocation");
        await updateData(gpsLocation);
        setLocation(gpsLocation);
        console.log(location + "location from handleUpdateLocation");
      }
    } catch (error) {
      handleError("Error updating location from GPS:", error);
    }
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
  // const temperatureSymbol = unit === "metric" ? "°C" : "°F";

  const handleError = (message: string, error: unknown) => {
    console.error(message, error);
  };

  return (
    <div className="mx-auto p-4 bg-primarybg ">
      {loadingWeather || loadingForecast || loadingAirQuality ? (
        <Loader />
      ) : (
        <div className="flex flex-col gap-2">
          <WeatherCard
            weatherData={weather}
            airQualityData={airQuality}
            onUpdateLocation={handleUpdateLocation}
            unit={unit}
          />
          <ForecastSection forecastData={forecast} />
          <div>
            <p>Widgets</p>
            <FeelsLikeWidget />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
