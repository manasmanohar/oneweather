import React from "react";
import { FaRegCompass } from "react-icons/fa";
import { WeatherData } from "../../../types/types";

interface WindDirectionProps {
  weatherData: WeatherData;
}

const WindDirection: React.FC<WindDirectionProps> = ({ weatherData }) => {
  const { wind } = weatherData;

  const getWindDirection = (degree: number | undefined): string => {
    if (degree === undefined) return "N/A";

    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round((degree % 360) / 45);
    return directions[index % 8];
  };

  return (
    <div className="flex flex-col justify-between h-full gap-8 ring-1 ring-slate-700 rounded-lg p-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-2 items-center">
          <FaRegCompass size={20} />
          <p className="font-bold text-sm">Wind Direction</p>
        </div>
        <div>
          <p className="font-bold">{getWindDirection(wind?.deg)}</p>
        </div>
      </div>
    </div>
  );
};

export default WindDirection;
