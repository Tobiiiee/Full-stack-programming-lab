const request = require("supertest");
const nock = require("nock");

describe("weather routes integration tests", () => {
  let app;

  beforeAll(() => {
    app = require("../../src/app");
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test("returns structured weather data for a valid city", async () => {
    nock("https://geocoding-api.open-meteo.com")
      .get("/v1/search")
      .query((query) => query.name === "London" && String(query.count) === "1" && query.language === "en" && query.format === "json")
      .reply(200, {
        results: [
          {
            name: "London",
            latitude: 51.5072,
            longitude: -0.1276
          }
        ]
      });

    nock("https://api.open-meteo.com")
      .get("/v1/forecast")
      .query((query) => String(query.latitude) === "51.5072" && String(query.longitude) === "-0.1276" && query.current === "temperature_2m,relative_humidity_2m,weather_code" && query.timezone === "auto")
      .reply(200, {
        current: {
          temperature_2m: 21.2,
          relative_humidity_2m: 55,
          weather_code: 0
        }
      });

    const response = await request(app).get("/api/weather/London");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: {
        city: "London",
        temperature: 21.2,
        condition: "Clear",
        humidity: 55
      }
    });
  });

  test("returns 404 when weather city is not found", async () => {
    nock("https://geocoding-api.open-meteo.com")
      .get("/v1/search")
      .query(true)
      .reply(200, { results: [] });

    const response = await request(app).get("/api/weather/InvalidCityName");

    expect(response.status).toBe(404);
    expect(response.body.error.message).toBe("City not found");
  });
});