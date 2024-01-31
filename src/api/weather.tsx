import axios from "axios";
import { WeatherData, LocationData } from "../types/types";

const API_BASE_URL_WEATHER = "https://api.openweathermap.org/data/2.5/weather";
const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchWeather = async (
  location: LocationData,
  unit: string
): Promise<WeatherData | null> => {
  try {
    const response = await axios.get(API_BASE_URL_WEATHER, {
      params: {
        lat: location.latitude,
        lon: location.longitude,
        appid: API_KEY,
        units: unit,
      },
    });
    console.log("fetch: Weather Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};
