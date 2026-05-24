const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET /api/weather/:city
router.get("/:city", async (req, res) => {
  const city = req.params.city;

  try {
    // Step 1: Convert city name → coordinates
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoRes = await axios.get(geoUrl);

    if (!geoRes.data.results || geoRes.data.results.length === 0) {
      return res.status(404).json({ error: "City not found. Please enter a valid city name." });
    }

    const { latitude, longitude, name, country } = geoRes.data.results[0];

    // Step 2: Get weather using coordinates
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`;
    const weatherRes = await axios.get(weatherUrl);
    const current = weatherRes.data.current;

    // Map WMO weather code to human-readable condition
    const getCondition = (code) => {
      if (code === 0) return "clear sky";
      if (code <= 3) return "partly cloudy";
      if (code <= 48) return "foggy";
      if (code <= 67) return "rainy";
      if (code <= 77) return "snowy";
      if (code <= 82) return "rain showers";
      if (code <= 86) return "snow showers";
      if (code <= 99) return "thunderstorm";
      return "unknown";
    };

    res.json({
      city: name,
      country: country,
      temperature: `${current.temperature_2m}°C`,
      condition: getCondition(current.weather_code),
      humidity: `${current.relative_humidity_2m}%`
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather data. Try again later." });
  }
});

module.exports = router;