import axios from "axios";
import { AirQualityData, LocationData } from "../types/types";
const API_BASE_URL_AIR_POLLUTION =
  "https://api.openweathermap.org/data/2.5/air_pollution";

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchAirQuality = async (
  location: LocationData
): Promise<AirQualityData | null> => {
  try {
    const response = await axios.get(API_BASE_URL_AIR_POLLUTION, {
      params: {
        lat: location.latitude,
        lon: location.longitude,
        appid: API_KEY,
      },
    });
    console.log("fetch: Pollution Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pollution data:", error);
    return null;
  }
};
