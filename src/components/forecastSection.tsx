import React from "react";
import { ForecastData } from "../types/types";
import ForecastCard from "./ui/forecastCard";
import { CiCalendarDate } from "react-icons/ci";

interface ForecastSectionProps {
  forecastData: ForecastData[] | null;
}

const ForecastSection: React.FC<ForecastSectionProps> = ({ forecastData }) => {
  const filterDataPerDay = (data: ForecastData[]) => {
    const uniqueDays = new Set<string>();
    const filteredData: ForecastData[] = [];

    for (const entry of data) {
      const day = new Date(entry.dt * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });

      if (!uniqueDays.has(day)) {
        uniqueDays.add(day);
        filteredData.push(entry);
      }
    }

    return filteredData;
  };

  const filteredForecastData = forecastData
    ? filterDataPerDay(forecastData)
    : null;

  return (
    <div className="flex flex-col w-full border rounded-lg p-4">
      <div className="flex gap-2 items-center mb-2">
        <CiCalendarDate size={22} />
        <p className="text-md font-bold text-neutral-400"> Forecast Section</p>
      </div>
      <div className="flex flex-col gap-3">
        {filteredForecastData?.map((forecast, index) => (
          <ForecastCard key={index} forecastData={forecast} />
        ))}
      </div>
    </div>
  );
};

export default ForecastSection;
