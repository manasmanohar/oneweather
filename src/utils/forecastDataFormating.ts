import { ForecastData, ProcessedForecast } from "../types/types";

export const processForecastData = (
  forecastData: ForecastData[]
): ProcessedForecast[] => {
  const processedForecast: ProcessedForecast[] = [];
  const forecastByDate: { [date: string]: ForecastData[] } = {};
  forecastData.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!forecastByDate[date]) {
      forecastByDate[date] = [];
    }
    forecastByDate[date].push(item);
  });

  Object.keys(forecastByDate).forEach((date) => {
    const dailyForecast = forecastByDate[date];

    dailyForecast.sort(
      (a, b) => new Date(a.dt_txt).getTime() - new Date(b.dt_txt).getTime()
    );
    const minTemperature = dailyForecast[0].main.temp_min;
    const maxTemperature =
      dailyForecast[dailyForecast.length - 1].main.temp_max;

    const totalChanceOfRain = dailyForecast.reduce(
      (sum, entry) => sum + entry.pop,
      0
    );
    const averageChanceOfRain = totalChanceOfRain / dailyForecast.length;

    const { icon } = dailyForecast[0];

    processedForecast.push({
      date,
      icon,
      maxTemperature,
      minTemperature,
      chanceOfRain: averageChanceOfRain,
    });
  });

  return processedForecast;
};
