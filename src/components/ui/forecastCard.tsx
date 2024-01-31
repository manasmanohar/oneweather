import React from "react";
import { ForecastData } from "../../types/types";
import { formatDate } from "../../utils/formating";

interface ForecastCardProps {
  forecastData: ForecastData;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecastData }) => {
  const temperatureSymbol = "°C";

  return (
    <div className="border p-4 mb-4">
      <p>{formatDate(forecastData.dt)}</p>
      <img
        src={`http://openweathermap.org/img/w/${forecastData.weather[0].icon}.png`}
        alt="Weather Icon"
        className="h-12 w-12"
      />
      <p>{forecastData.weather[0].main}</p>
      <p>
        {Math.round(forecastData.main.temp_min)}
        {temperatureSymbol} / {Math.round(forecastData.main.temp_max)}
        {temperatureSymbol}
      </p>
    </div>
  );
};

export default ForecastCard;
