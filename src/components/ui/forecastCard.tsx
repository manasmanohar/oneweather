import React from "react";
import { ForecastData } from "../../types/types";

interface ForecastCardProps {
  forecastData: ForecastData;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ forecastData }) => {
  const temperatureSymbol = "°C";

  // Extracting day name from the forecast date
  const dayName = new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
    new Date(forecastData.dt * 1000)
  );

  const isToday =
    new Date(forecastData.dt * 1000).toLocaleDateString() ===
    new Date().toLocaleDateString();
  const dayDisplayName = isToday ? "Today" : dayName;

  return (
    <div className="relative rounded-xl  pb-2 px-1">
      <div className="md:text-lg space-y-2 text-base font-normal md:mb-1 border-b-[1px] border-neutral-500 ">
        <div className="flex w-full flex-row items-center justify-between gap-2 last:mb-0">
          <p className="min-w-[3rem] font-medius text-white">
            {dayDisplayName}
          </p>
          <div className="relative invert-0 dark:invert h-8 w-8 ">
            <img
              src={`http://openweathermap.org/img/w/${forecastData.weather[0].icon}.png`}
              alt="Weather Icon"
              className="h-full w-full select-none"
            />
          </div>
          <div className="flex w-[60%] flex-row gap-2 overflow-hidden">
            <div className="flex w-full select-none flex-row items-center justify-between gap-2 pr-2 text-sm">
              <p className="flex w-[3rem] min-w-fit justify-end text-neutral-600 dark:text-neutral-400">
                {Math.round(forecastData.main.temp_min)}
                {temperatureSymbol}
              </p>
              <span className="relative flex w-full max-w-[17rem] touch-none select-none items-center md:max-w-[8rem]">
                <span className="relative h-1.5 w-full grow select-none overflow-hidden rounded-full bg-primary/20">
                  <span
                    className="absolute h-full rounded-full bg-gradient-to-l from-green-300 to-blue-400"
                    style={{
                      left: `${
                        ((forecastData.main.temp - forecastData.main.temp_min) /
                          (forecastData.main.temp_max -
                            forecastData.main.temp_min)) *
                        100
                      }%`,
                      right: `${
                        100 -
                        ((forecastData.main.temp - forecastData.main.temp_min) /
                          (forecastData.main.temp_max -
                            forecastData.main.temp_min)) *
                          100
                      }%`,
                    }}
                  ></span>
                </span>
              </span>
              <p className="flex w-[3rem] min-w-fit justify-end">
                {Math.round(forecastData.main.temp_max)}
                {temperatureSymbol}
              </p>
            </div>
          </div>
        </div>
        <div
          data-orientation="horizontal"
          role="none"
          className="shrink-0 bg-border h-[1px] w-full mt-3"
        ></div>
      </div>
    </div>
  );
};

export default ForecastCard;
