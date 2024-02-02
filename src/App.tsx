import React, { useEffect, useState } from "react";
import WeatherCard from "./components/ui/weatherCard";
import ForecastSection from "./components/forecastSection";
import { useWeatherContext } from "./context/weatherContext";
import { fetchGeoCoordinates } from "./api/geoCoordinates";
import { BounceLoaderComponent } from "./components/ui/bounceLoader";
import WidgetSection from "./components/widgetsSection";

const App: React.FC = () => {
  const {
    updateData,
    // handleUpdateLocation,
    loading,
    // location,
    weather,
    forecast,
    airQuality,
  } = useWeatherContext();

  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    initializeApp();
  }, []);
  useEffect(() => {
    if (weather) {
      document.title = `${weather.name}: ${weather.main.temp}°C - Plutoo`;
    }
  }, [weather]);

  const initializeApp = async () => {
    try {
      const defaultLocation = { latitude: 12.9716, longitude: 77.5946 };
      await updateData(defaultLocation);

      const gpsLocation = await fetchGeoCoordinates();
      if (gpsLocation) {
        setFirstLoad(false);
        await updateData(gpsLocation);
      }
    } catch (error) {
      handleError("Error initializing app:", error);
    }
  };

  const handleError = (message: string, error: unknown) => {
    console.error(message, error);
  };

  return (
    <div className=" p-4 bg-[#18181B] relative">
      <div>
        <WeatherCard
          weatherData={weather}
          airQualityData={airQuality}
          unit="metric"
          timezone={weather?.timezone || 0}
        />
        {/* <WeatherCard
        weatherData={weather}
        airQualityData={airQuality}
        onUpdateLocation={handleUpdateLocation}
        unit="metric"
      /> */}
        <ForecastSection forecastData={forecast} />
        <div>
          <WidgetSection weatherData={weather} />
        </div>
        <BounceLoaderComponent
          active={loading && !firstLoad}
          color="lightgreen"
          size={30}
        />
      </div>
    </div>
  );
};

export default App;
