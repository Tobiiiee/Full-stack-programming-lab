const { validateCity, mapWeatherCodeToCondition, mapWeatherResponse } = require("../../src/services/weatherService");

describe("weatherService unit tests", () => {
  test("validateCity trims valid city names", () => {
    expect(validateCity("  London  ")).toBe("London");
  });

  test("validateCity rejects empty input", () => {
    expect(() => validateCity("   ")).toThrow("City name is required");
  });

  test("mapWeatherCodeToCondition maps weather codes", () => {
    expect(mapWeatherCodeToCondition(0)).toBe("Clear");
    expect(mapWeatherCodeToCondition(3)).toBe("Cloudy");
    expect(mapWeatherCodeToCondition(61)).toBe("Rain");
  });

  test("mapWeatherResponse converts Open-Meteo payload", () => {
    const result = mapWeatherResponse({
      location: { name: "London" },
      current: {
        temperature_2m: 19.5,
        relative_humidity_2m: 67,
        weather_code: 3
      }
    });

    expect(result).toEqual({
      city: "London",
      temperature: 19.5,
      condition: "Cloudy",
      humidity: 67
    });
  });
});