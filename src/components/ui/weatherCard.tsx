import React from "react";
import { WeatherData, AirQualityData } from "../../types/types";
import { formatDate } from "../../utils/formating";
import { MdOutlineGpsFixed } from "react-icons/md";

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
  const weatherDescription = capitalizeEveryWord(
    weatherData.weather[0]?.description || ""
  );
  return (
    <div className=" p-4 my-2 rounded-xl flex flex-col  border-neutral-400 w-full border-[1px] ">
      <div className="flex justify-between w-full ">
        <div className="flex flex-col ">
          <p className="font-bold">{formatDate(weatherData.dt)}</p>
          <p className="flex  items-center gap-1">
            {weatherData.name}
            <MdOutlineGpsFixed />
          </p>
        </div>
        <div>
          <p className="font-bold">12:27:16 PM</p>
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
            <p className=" text-neutral-400 mr-4">
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
