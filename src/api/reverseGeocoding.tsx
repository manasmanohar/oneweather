import axios from "axios";

import { LocationData } from "../types/types";
const API_BASE_URL_GEOCODING_DIRECT =
  "http://api.openweathermap.org/geo/1.0/direct";
const API_BASE_URL_GEOCODING_ZIPCODE =
  "http://api.openweathermap.org/geo/1.0/zip";

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchReverseGeocoding = async (
  searchQuery: string | number
): Promise<LocationData | null> => {
  try {
    let geocodingEndpoint;
    console.log(typeof searchQuery);
    if (!isNaN(searchQuery as number)) {
      geocodingEndpoint = `${API_BASE_URL_GEOCODING_ZIPCODE}?zip=${searchQuery},in&limit=1&appid=${API_KEY}`;
      console.log("number endpioint");

      const response = await axios.get(geocodingEndpoint);

      if (response.data) {
        const { lat, lon } = response.data;
        console.log(lat, lon);
        return { latitude: lat, longitude: lon };
      }

      return null;
    } else if (typeof searchQuery === "string") {
      geocodingEndpoint = `${API_BASE_URL_GEOCODING_DIRECT}?q=${searchQuery}&limit=1&appid=${API_KEY}`;
      console.log("string endpioint");

      const response = await axios.get(geocodingEndpoint);

      console.log("fetch: Geocoding Data:", response.data);

      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { latitude: lat, longitude: lon };
      }

      return null;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    return null;
  }
};
