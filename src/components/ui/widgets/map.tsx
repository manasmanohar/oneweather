import React from "react";
const API_KEY = import.meta.env.VITE_API_KEY;

interface MapWidgetProps {
  weatherData: any;
}

const MapWidget: React.FC<MapWidgetProps> = ({ weatherData }) => {
  const { lon, lat } = weatherData;
  console.log(lon, lat);
  const mapUrl = `https://tile.openweathermap.org/map/precipitation_new/4/1/8.png?appid=${API_KEY}`;

  return (
    <div className="p-4 rounded-xl   flex flex-col bg-[#18181b] ring-1 ring-gray-700/30 w-full ">
      <p className="font-bold">Precipitation Map</p>
      <div className="w-full h-74  ">
        <img
          src={mapUrl}
          alt="Weather Map"
          className="w-full mt-2  h-72 p-4  rounded-xl  bg-[#18181b] ring-1 ring-gray-700/30  "
        />
      </div>
    </div>
  );
};

export default MapWidget;
