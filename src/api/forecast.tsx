import axios from "axios";
import { ForecastData, LocationData } from "../types/types";

const API_BASE_URL_FORECAST =
  "https://api.openweathermap.org/data/2.5/forecast";
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchForecast = async (
  location: LocationData,
  unit: string
): Promise<ForecastData[] | null> => {
  try {
    const response = await axios.get(API_BASE_URL_FORECAST, {
      params: {
        lat: location.latitude,
        lon: location.longitude,
        appid: API_KEY,
        units: unit,
      },
    });
    console.log("fetch: Forecast Data:", response.data.list);
    return response.data.list;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    return null;
  }
};
