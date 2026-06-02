const request = require("supertest");
const nock = require("nock");

describe("weather system tests", () => {
  let server;
  let app;

  beforeAll(() => {
    app = require("../../src/app");
    server = app.listen(0);
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test("serves weather data over a live HTTP server", async () => {
    nock("https://geocoding-api.open-meteo.com")
      .get("/v1/search")
      .query((query) => query.name === "Paris")
      .reply(200, {
        results: [
          {
            name: "Paris",
            latitude: 48.8566,
            longitude: 2.3522
          }
        ]
      });

    nock("https://api.open-meteo.com")
      .get("/v1/forecast")
      .query((query) => String(query.latitude) === "48.8566" && String(query.longitude) === "2.3522")
      .reply(200, {
        current: {
          temperature_2m: 24,
          relative_humidity_2m: 48,
          weather_code: 0
        }
      });

    const response = await request(server).get("/api/weather/Paris");

    expect(response.status).toBe(200);
    expect(response.body.data.city).toBe("Paris");
    expect(response.body.data.condition).toBe("Clear");
  });
});