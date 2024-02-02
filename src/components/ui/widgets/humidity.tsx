import React from "react";
import { WiHumidity } from "react-icons/wi";
import { WeatherData } from "../../../types/types";

interface HumidityWidgetProps {
  weatherData: WeatherData;
}

const HumidityWidget: React.FC<HumidityWidgetProps> = ({ weatherData }) => {
  const { main } = weatherData;

  return (
    <div className="flex flex-col justify-between h-full gap-8 ring-1 ring-gray-700/30  rounded-lg p-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-2 items-center">
          <WiHumidity size={20} />
          <p className="font-bold text-sm">Humidity</p>
        </div>
        <div>
          <p className="font-bold">{main?.humidity}%</p>
        </div>
      </div>
    </div>
  );
};

export default HumidityWidget;
