import { LocationData } from "../types/types";

export const fetchGeoCoordinates = async (): Promise<LocationData | null> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(
            "Lat/Long:",
            position.coords.latitude,
            position.coords.longitude
          );
        },
        (error) => {
          console.error("Error getting location:", error);
          reject(null);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      reject(null);
    }
  });
};
