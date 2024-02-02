import React, { useEffect, useState } from "react";
import WeatherCard from "./components/ui/weatherCard";
import ForecastSection from "./components/forecastSection";
import { useWeatherContext } from "./context/weatherContext";
import { fetchGeoCoordinates } from "./api/geoCoordinates";
import { BounceLoaderComponent } from "./components/ui/bounceLoader";
import WidgetSection from "./components/widgetsSection";
import { useTheme } from "./context/themeContext";
const App: React.FC = () => {
  const { updateData, loading, weather, forecast, airQuality } =
    useWeatherContext();

  const [firstLoad, setFirstLoad] = useState(true);
  const { unit } = useTheme();

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      const defaultLocation = { latitude: 12.9716, longitude: 77.5946 };
      await updateData(defaultLocation, unit);

      const gpsLocation = await fetchGeoCoordinates();
      if (gpsLocation) {
        setFirstLoad(false);
        await updateData(gpsLocation, unit);
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
