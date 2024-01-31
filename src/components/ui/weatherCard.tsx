import React from "react";
import { WeatherData, AirQualityData } from "../../types/types";
import { HiLocationMarker } from "react-icons/hi";
import { formatDate } from "../../utils/formating";
import { capitalizeEveryWord } from "../../utils/formating";
interface WeatherCardProps {
  weatherData: WeatherData | null;
  airQualityData: AirQualityData | null;
  onUpdateLocation: () => void;
  unit: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  airQualityData,
  onUpdateLocation,
  unit,
}) => {
  if (!weatherData) {
    return null;
  }

  const temperatureSymbol = unit === "metric" ? "°F" : "°C";
  const minTemp = Math.round(weatherData.main.temp_min);
  const maxTemp = Math.round(weatherData.main.temp_max);
  const feelsLikeTemp = Math.round(weatherData.main.feels_like);
  const weatherDescription = capitalizeEveryWord(
    weatherData.weather[0]?.description || ""
  );
  return (
    <div className=" p-4 rounded-md">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex">
            <div>
              <p className="text-4xl font-bold">
                {Math.round(weatherData.main.temp)}
              </p>
            </div>
            <div>
              <p className="mt-1">{temperatureSymbol}</p>
            </div>
          </div>
          <div
            className="flex flex-col cursor-pointer"
            onClick={onUpdateLocation}
          >
            <div className="flex items-center">
              <HiLocationMarker size={18} className="mr-1" />
              <p className="text-xl font-bold">{weatherData.name}</p>
            </div>
          </div>

          <div>
            <p>
              {minTemp}
              {temperatureSymbol}/{maxTemp}
              {temperatureSymbol}
            </p>
            <p className="">Feels like {feelsLikeTemp}</p>
            <p>{formatDate(weatherData.dt)}</p>
            <p> {weatherDescription}</p>
          </div>
        </div>
        <div className="flex items-center w-full justify-center">
          <img
            src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
            alt="Weather Icon"
            className="h-40 w-40"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <div className="border-2 rounded-xl p-4">
          <p>AQI </p>
          <p>{airQualityData?.list[0].main.aqi}</p>
        </div>
        <div className="border-2 rounded-xl p-4">
          <p>Humidity </p>
          <p> {weatherData.main.humidity}%</p>
        </div>
        <div className="border-2 rounded-xl p-4">
          <p>Wind</p>
          <p> {weatherData.wind.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
