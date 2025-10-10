import { getCurrentLang } from "../utils/Language";

const API_KEY = "9f5cb161f4b193daf8f29c2ae49266bb";
const BASE_URL = "https://api.openweathermap.org";

export async function getWeatherByZIP(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=${getCurrentLang()}`
    );
    if (!response.ok) {
      return { error: `Error ${response.status}: ${response.statusText}` };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}

export async function getWeatherByLatLon(lat, lon) {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${getCurrentLang()}`
    );

    if (!response.ok) {
      return { error: `Error ${response.status}: ${response.statusText}` };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}

export async function getForecastByZIP(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=${getCurrentLang()}`
    );
    if (!response.ok) {
      return { error: `Error ${response.status}: ${response.statusText}` };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}

export async function getForecastByLatLon(lat, lon) {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${getCurrentLang()}`
    );
    if (!response.ok) {
      return { error: `Error ${response.status}: ${response.statusText}` };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}

export async function getWeatherByGeocoding(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}&lang=${getCurrentLang()}`
    );
    if (!response.ok) {
      return { error: `Error ${response.status}: ${response.statusText}` };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message || "Unknown error" };
  }
}
