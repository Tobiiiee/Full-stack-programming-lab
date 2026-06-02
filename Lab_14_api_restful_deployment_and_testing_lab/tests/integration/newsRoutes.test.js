const request = require("supertest");
const nock = require("nock");

describe("news routes integration tests", () => {
  let app;

  beforeAll(() => {
    process.env.GNEWS_API_KEY = "test-news-key";
    app = require("../../src/app");
  });

  afterEach(() => {
    nock.cleanAll();
  });

  test("returns structured news headlines for a valid country", async () => {
    nock("https://gnews.io")
      .get("/api/v4/top-headlines")
      .query((query) => query.country === "us" && query.lang === "en" && String(query.max) === "5" && query.apikey === "test-news-key")
      .reply(200, {
        articles: [
          {
            title: "Breaking News 1",
            source: { name: "Daily News" },
            url: "https://news.example.com/1",
            publishedAt: "2026-06-02T08:00:00Z"
          },
          {
            title: "Breaking News 2",
            source: { name: "World Times" },
            url: "https://news.example.com/2",
            publishedAt: "2026-06-02T09:00:00Z"
          }
        ]
      });

    const response = await request(app).get("/api/news/us");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      count: 2,
      articles: [
        {
          title: "Breaking News 1",
          sourceName: "Daily News",
          url: "https://news.example.com/1",
          publicationDate: "2026-06-02T08:00:00Z"
        },
        {
          title: "Breaking News 2",
          sourceName: "World Times",
          url: "https://news.example.com/2",
          publicationDate: "2026-06-02T09:00:00Z"
        }
      ]
    });
  });

  test("returns 400 for invalid country codes", async () => {
    const response = await request(app).get("/api/news/usa");

    expect(response.status).toBe(400);
    expect(response.body.error.message).toBe("Country code must be a 2-letter ISO code");
  });
});