import React from "react";
import { WeatherData, AirQualityData } from "../../types/types";
import { FaLocationArrow } from "react-icons/fa6";
import { capitalizeEveryWord } from "../../utils/formating";
import Clock from "./clock";

interface WeatherCardProps {
  weatherData: WeatherData | null;
  airQualityData: AirQualityData | null;
  unit: string;
  timezone: number;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  weatherData,
  airQualityData,
  unit,
}) => {
  if (!weatherData) {
    return null;
  }

  const temperatureSymbol = unit === "metric" ? "°F" : "°C";
  const minTemp = Math.round(weatherData.main.temp_min);
  const maxTemp = Math.round(weatherData.main.temp_max);
  const weatherDescription = capitalizeEveryWord(
    weatherData.weather[0]?.description || ""
  );

  return (
    <div className="p-4 mb-8 rounded-xl flex flex-col bg-[#18181b] ring-1 ring-gray-700/30 w-full">
      <div className="flex justify-between w-full">
        <div className="flex justify-between w-full">
          <div>
            <p className="flex items-center justify-between gap-1">
              {weatherData.name}
              <FaLocationArrow />
            </p>
          </div>
          <div>
            {" "}
            <Clock timezoneOffset={weatherData.timezone} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <p className="text-[4rem] font-bold">27</p>
      </div>
      <div className="flex flex-row justify-between">
        <div>
          <div>
            {" "}
            <img
              src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`}
              alt="Weather Icon"
              className="h-10 w-10"
            />
            <p>{weatherDescription}</p>
          </div>
          <div className="flex">
            <p className="text-neutral-400 mr-4">
              H:{minTemp}
              {temperatureSymbol}
            </p>
            <p className="text-neutral-400">
              L:{maxTemp}
              {temperatureSymbol}
            </p>
          </div>
        </div>
        <div className="flex items-end">
          <p className="text-neutral-400">
            AQI: {airQualityData?.list[0].main.aqi}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
