
export interface WeatherData {
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    rainfall: number;
  };
  forecast: Array<{
    day: string;
    temp: number;
    icon: string;
    condition: string;
  }>;
}

export interface Location {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

// Open-Meteo API doesn't require an API key
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

export const getWeatherForLocation = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max&timezone=auto`
    );
    const data = await response.json();

    return {
      current: {
        temp: Math.round(data.current.temperature_2m),
        condition: getWeatherCondition(data.current.weather_code),
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        rainfall: data.current.precipitation,
      },
      forecast: data.daily.time.map((time: string, index: number) => ({
        day: new Date(time).toLocaleDateString('en-US', { weekday: 'short' }),
        temp: Math.round(data.daily.temperature_2m_max[index]),
        icon: getWeatherIcon(data.daily.weather_code[index]),
        condition: getWeatherCondition(data.daily.weather_code[index]),
      })),
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
};

const getWeatherCondition = (code: number): string => {
  if (code === 0) return 'Clear';
  if (code >= 1 && code <= 3) return 'Partly Cloudy';
  if (code >= 45 && code <= 48) return 'Foggy';
  if (code >= 51 && code <= 67) return 'Rainy';
  if (code >= 71 && code <= 77) return 'Snowy';
  if (code >= 80 && code <= 82) return 'Rain Showers';
  if (code >= 95 && code <= 99) return 'Thunderstorm';
  return 'Unknown';
};

const getWeatherIcon = (code: number): string => {
  if (code === 0) return 'weather-sunny';
  if (code >= 1 && code <= 3) return 'weather-partly-cloudy';
  if (code >= 45 && code <= 48) return 'weather-fog';
  if (code >= 51 && code <= 67) return 'weather-rainy';
  if (code >= 71 && code <= 77) return 'weather-snowy';
  if (code >= 80 && code <= 82) return 'weather-pouring';
  if (code >= 95 && code <= 99) return 'weather-lightning';
  return 'weather-cloudy';
};
