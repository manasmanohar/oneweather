import React from "react";
import { ForecastData } from "../types/types";
import ForecastCard from "./ui/forecastCard";

interface ForecastSectionProps {
  forecastData: ForecastData[] | null;
}

const ForecastSection: React.FC<ForecastSectionProps> = ({ forecastData }) => {
  return (
    <div className="flex flex-col w-full">
      <h2 className="text-xl font-bold mb-4">Forecast Section</h2>
      <div className="flex flex-wrap gap-4">
        {forecastData?.map((forecast, index) => (
          <ForecastCard key={index} forecastData={forecast} />
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;
