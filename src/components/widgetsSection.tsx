import React from "react";
import { WeatherData } from "../types/types";
import FeelsLikeWidget from "./ui/widgets/feelsLike";
import HumidityWidget from "./ui/widgets/humidity";
import MapWidget from "./ui/widgets/map";
import PressureWidget from "./ui/widgets/Pressure";
import OtherCitiesWidget from "./ui/widgets/otherCities";
import WindSpeedWidget from "./ui/widgets/windSpeed";
import WindDirectionWidget from "./ui/widgets/windDirection";
import VisibilityWidget from "./ui/widgets/visibility";

const widgetComponents = [
  FeelsLikeWidget,
  HumidityWidget,
  PressureWidget,
  WindSpeedWidget,
  WindDirectionWidget,
  VisibilityWidget,
  OtherCitiesWidget,
  MapWidget,
];

interface WidgetSectionProps {
  weatherData: WeatherData | null;
}

const WidgetSection: React.FC<WidgetSectionProps> = ({ weatherData }) => {
  return (
    <section className="grid h-full grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 my-8">
      {weatherData &&
        widgetComponents.map((WidgetComponent, index) => (
          <div
            key={index}
            className="relative rounded-xl  bg-card  text-card-foreground shadow-sm md:p-6 col-span-2 flex  flex-col justify-between "
          >
            <WidgetComponent weatherData={weatherData} />
          </div>
        ))}
    </section>
  );
};

export default WidgetSection;
