const express = require("express");
const { getWeatherByCity } = require("../services/weatherService");

const router = express.Router();

router.get("/:city", async (req, res, next) => {
  try {
    const weather = await getWeatherByCity(req.params.city);
    res.json({
      success: true,
      data: weather
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;