import React from "react";
import { FiSunset } from "react-icons/fi";
import { WeatherData } from "../../../types/types";

interface FeelsLikeWidgetProps {
  weatherData: WeatherData;
}

const FeelsLikeWidget: React.FC<FeelsLikeWidgetProps> = ({ weatherData }) => {
  const { sys } = weatherData;

  const convertUnixTimeToTimeString = (
    unixTime: number | undefined
  ): string => {
    if (!unixTime) return "";

    const date = new Date(unixTime * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="flex flex-col justify-between h-full gap-8 ring-1 ring-gray-700/30  rounded-lg p-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-2 top items-center">
          <FiSunset size={20} />
          <p className="font-bold text-sm">Sunset</p>
        </div>
        <div>
          <p className="font-bold">
            {convertUnixTimeToTimeString(sys?.sunset)}
          </p>
        </div>
      </div>
      <div className="mt-">
        <p>Sunrise: {convertUnixTimeToTimeString(sys?.sunrise)}</p>
      </div>
    </div>
  );
};

export default FeelsLikeWidget;
