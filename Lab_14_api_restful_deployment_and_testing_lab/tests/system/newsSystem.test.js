const request = require("supertest");
const nock = require("nock");

describe("news system tests", () => {
  let server;
  let app;

  beforeAll(() => {
    process.env.GNEWS_API_KEY = "system-news-key";
    app = require("../../src/app");
    server = app.listen(0);
  });

  afterAll(() => {
    server.close();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test("serves news data over a live HTTP server", async () => {
    nock("https://gnews.io")
      .get("/api/v4/top-headlines")
      .query((query) => query.country === "gb" && query.lang === "en" && String(query.max) === "5" && query.apikey === "system-news-key")
      .reply(200, {
        articles: [
          {
            title: "System News",
            source: { name: "UK Press" },
            url: "https://news.example.com/system",
            publishedAt: "2026-06-02T11:00:00Z"
          }
        ]
      });

    const response = await request(server).get("/api/news/gb");

    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);
    expect(response.body.articles[0].sourceName).toBe("UK Press");
  });
});