// OtherCitiesWidget.tsx

import React from "react";
import { WeatherData } from "../../../types/types";
import { useWeatherContext } from "../../../context/weatherContext";
import { fetchReverseGeocoding } from "../../../api/reverseGeocoding";

interface OtherCitiesWidgetProps {
  weatherData: WeatherData;
}

const OtherCitiesWidget: React.FC<OtherCitiesWidgetProps> = ({
  weatherData,
}) => {
  const { updateData } = useWeatherContext();
  const { name } = weatherData;

  // Sample list of other cities
  const otherCities = ["New York", "London", "Paris", "Tokyo"];
  console.log(name);
  const handleCityButtonClick = async (cityName: string) => {
    try {
      // Perform API call to fetch weather data for the selected city
      const newLocation = await fetchReverseGeocoding(cityName);

      // Update weather data in the context
      if (newLocation) {
        await updateData(newLocation);
      }
    } catch (error) {
      console.error("Error handling city button click:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full gap-8 ring-1 ring-gray-700/30  rounded-lg p-4">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-2 items-center">
          <p className="font-bold text-sm">Other Cities</p>
        </div>
        <div className="flex flex-col w-full gap-2 ">
          {otherCities.map((city) => (
            <button
              key={city}
              className=" ring-1 ring-gray-700/30   rounded p-2 hover:bg-gray-400 focus:outline-none"
              onClick={() => handleCityButtonClick(city)}
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherCitiesWidget;
