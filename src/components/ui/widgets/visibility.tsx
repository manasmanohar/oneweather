import React from "react";
import { FaBinoculars } from "react-icons/fa";
import { WeatherData } from "../../../types/types";

interface VisibilityWidgetProps {
  weatherData: WeatherData;
}

const VisibilityWidget: React.FC<VisibilityWidgetProps> = ({ weatherData }) => {
  const { visibility } = weatherData;

  return (
    <div className="flex flex-col justify-between h-full gap-8 ring-1 ring-gray-700/30   rounded-lg p-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-2 items-center">
          <FaBinoculars size={20} />
          <p className="font-bold text-sm">Visibility</p>
        </div>
        <div>
          <p className="font-bold">{visibility} meters</p>
        </div>
      </div>
    </div>
  );
};

export default VisibilityWidget;
