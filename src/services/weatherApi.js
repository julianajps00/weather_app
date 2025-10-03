// src/api/weatherApi.js

const API_KEY = "9f5cb161f4b193daf8f29c2ae49266bb";
const BASE_URL = "https://api.openweathermap.org";

export async function getWeatherByZIP(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
}

export async function getWeatherByLatLon(lat, lon) {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
}

export async function getForecastByZIP(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("Unable to get forecast");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error when searching for forecast:", error);
    throw error;
  }
}

export async function getForecastByLatLon(lat, lon) {
  try {
    const response = await fetch(
      `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
}

export async function getWeatherByGeocoding(city) {
  try {
    const response = await fetch(
      `${BASE_URL}/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    throw error;
  }
}
