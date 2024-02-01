import React from "react";
import { IoSpeedometerOutline } from "react-icons/io5";
import { WeatherData } from "../../../types/types";

interface PressureWidgetProps {
  weatherData: WeatherData;
}

const PressureWidget: React.FC<PressureWidgetProps> = ({ weatherData }) => {
  const { main } = weatherData;

  return (
    <div className="flex flex-col justify-between h-full gap-8 ring-1 ring-slate-700 rounded-lg p-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-2 items-center">
          <IoSpeedometerOutline size={20} />
          <p className="font-bold text-sm">Pressure</p>
        </div>
        <div>
          <p className="font-bold">{main?.pressure} hPa</p>
        </div>
      </div>
    </div>
  );
};

export default PressureWidget;
