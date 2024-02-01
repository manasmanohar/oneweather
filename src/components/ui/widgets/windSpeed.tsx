// WindSpeedWidget.tsx

import React from "react";
import { FaWind } from "react-icons/fa";
import { WeatherData } from "../../../types/types";

interface WindSpeedWidgetProps {
  weatherData: WeatherData;
}

const WindSpeedWidget: React.FC<WindSpeedWidgetProps> = ({ weatherData }) => {
  const { wind } = weatherData;

  return (
    <div className="flex flex-col justify-between h-full gap-8 ring-1 ring-slate-700 rounded-lg p-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-2 items-center">
          <FaWind size={20} />
          <p className="font-bold text-sm">Wind Speed</p>
        </div>
        <div>
          <p className="font-bold">{wind?.speed} m/s</p>
        </div>
      </div>
    </div>
  );
};

export default WindSpeedWidget;
