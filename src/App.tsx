import React, { useEffect, useState } from "react";
import WeatherCard from "./components/ui/weatherCard";
import ForecastSection from "./components/forecastSection";
import FeelsLikeWidget from "./components/ui/widgets/feelsLike";
import { useWeatherContext } from "./context/weatherContext";
import { fetchGeoCoordinates } from "./api/geoCoordinates";
import { BounceLoaderComponent } from "./components/ui/bounceLoader"; // Corrected import

const App: React.FC = () => {
  const {
    updateData,
    handleUpdateLocation,
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
    <div className=" p-4 bg-primarybg relative">
      <div>
        <WeatherCard
          weatherData={weather}
          airQualityData={airQuality}
          onUpdateLocation={handleUpdateLocation}
          unit="metric"
        />
        <ForecastSection forecastData={forecast} />
        <div>
          <p>Widgets</p>
          <FeelsLikeWidget />
        </div>
      </div>
      <BounceLoaderComponent
        active={loading && !firstLoad}
        color="lightgreen"
        size={30}
      />
    </div>
  );
};

export default App;
