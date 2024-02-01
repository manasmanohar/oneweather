export interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {
    "3h": number;
  };
  sys: {
    pod: string;
    sunrise?: number;
    sunset?: number;
  };
  dt: number;
  dt_txt: string;
  name: string;
}

export interface ForecastData {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  rain: {
    "3h": number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
  icon: string;
  date: string;
}

export interface CityData {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}
export type AirQualityIndex = 1 | 2 | 3 | 4 | 5;
export interface ProcessedForecast {
  date: string;
  icon: string;
  maxTemperature: number;
  minTemperature: number;
  chanceOfRain: number;
}

export interface AirQualityData {
  coord: {
    lon: number;
    lat: number;
  };
  list: {
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
    dt: number;
  }[];
}
export type LocationData = {
  latitude: number;
  longitude: number;
};

export type UpdateStateCallback = (data: unknown) => void;

export type WeatherApiParams = {
  location: Location;
  unit: string;
  updateStateCallback: UpdateStateCallback;
};

export type ForecastApiParams = {
  location: Location;
  unit: string;
  updateStateCallback: UpdateStateCallback;
};

export type PollutionApiParams = {
  location: Location;
  updateStateCallback: UpdateStateCallback;
};

export type GeocodingApiParams = {
  query: string;
  limit?: number;
};

export interface Location {
  latitude: number;
  longitude: number;
}

export interface AppComponentProps {
  darkMode?: boolean;
}

export type CustomError = string | Error;

export type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
  unit: string;

  toggleUnit: () => void;
};
