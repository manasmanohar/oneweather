// MapWidget.tsx

import React from "react";

const API_KEY = import.meta.env.VITE_API_KEY;

interface MapWidgetProps {
  weatherData: any; // Replace 'any' with the actual type of your weather data
}

const MapWidget: React.FC<MapWidgetProps> = ({ weatherData }) => {
  const { lon, lat } = weatherData;
  console.log(lon, lat);
  const mapUrl = `https://tile.openweathermap.org/map/precipitation_new/4/1/8.png?appid=${API_KEY}`;

  return (
    <div className="flex flex-col gap-4 w-full border-white p-4">
      <div className="w-full">
        {/* Replace the placeholder with your map component */}
        <img src={mapUrl} alt="Weather Map" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default MapWidget;
