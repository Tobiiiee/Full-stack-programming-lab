const axios = require("axios");
const ApiError = require("../errors/ApiError");

function mapWeatherCodeToCondition(weatherCode) {
  if (weatherCode === 0) {
    return "Clear";
  }

  if ([1, 2].includes(weatherCode)) {
    return "Partly Cloudy";
  }

  if (weatherCode === 3) {
    return "Cloudy";
  }

  if ([45, 48].includes(weatherCode)) {
    return "Fog";
  }

  if ([51, 53, 55, 56, 57].includes(weatherCode)) {
    return "Drizzle";
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(weatherCode)) {
    return "Rain";
  }

  if ([71, 73, 75, 77, 85, 86].includes(weatherCode)) {
    return "Snow";
  }

  if ([95, 96, 99].includes(weatherCode)) {
    return "Thunderstorm";
  }

  return "Unknown";
}

function validateCity(city) {
  if (typeof city !== "string" || !city.trim()) {
    throw new ApiError(400, "City name is required");
  }

  return city.trim();
}

function mapWeatherResponse(data) {
  if (!data || !data.location || !data.current) {
    throw new ApiError(502, "Invalid weather service response");
  }

  return {
    city: data.location.name,
    temperature: data.current.temperature_2m,
    condition: mapWeatherCodeToCondition(data.current.weather_code),
    humidity: data.current.relative_humidity_2m
  };
}

async function getWeatherByCity(city, options = {}) {
  const normalizedCity = validateCity(city);
  const client = options.client || axios;

  try {
    const geocodeResponse = await client.get("https://geocoding-api.open-meteo.com/v1/search", {
      params: {
        name: normalizedCity,
        count: 1,
        language: "en",
        format: "json"
      }
    });

    const location = geocodeResponse.data && Array.isArray(geocodeResponse.data.results) ? geocodeResponse.data.results[0] : null;

    if (!location) {
      throw new ApiError(404, "City not found");
    }

    const weatherResponse = await client.get("https://api.open-meteo.com/v1/forecast", {
      params: {
        latitude: location.latitude,
        longitude: location.longitude,
        current: "temperature_2m,relative_humidity_2m,weather_code",
        timezone: "auto"
      }
    });

    return mapWeatherResponse({
      location,
      current: weatherResponse.data.current
    });
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error.response) {
      if (error.response.status === 404) {
        throw new ApiError(404, "City not found");
      }

      throw new ApiError(502, "Weather service request failed");
    }

    throw new ApiError(502, "Unable to reach weather service");
  }
}

module.exports = {
  validateCity,
  mapWeatherCodeToCondition,
  mapWeatherResponse,
  getWeatherByCity
};