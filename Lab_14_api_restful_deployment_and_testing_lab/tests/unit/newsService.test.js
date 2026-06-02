const { validateCountryCode, mapNewsResponse } = require("../../src/services/newsService");

describe("newsService unit tests", () => {
  test("validateCountryCode normalizes uppercase codes", () => {
    expect(validateCountryCode("US")).toBe("us");
  });

  test("validateCountryCode rejects invalid country codes", () => {
    expect(() => validateCountryCode("usa")).toThrow("Country code must be a 2-letter ISO code");
  });

  test("mapNewsResponse filters and maps top headlines", () => {
    const result = mapNewsResponse({
      articles: [
        {
          title: "Headline 1",
          source: { name: "Source One" },
          url: "https://example.com/1",
          publishedAt: "2026-06-02T10:00:00Z"
        },
        {
          title: "Missing URL",
          source: { name: "Source Two" }
        }
      ]
    });

    expect(result).toEqual([
      {
        title: "Headline 1",
        sourceName: "Source One",
        url: "https://example.com/1",
        publicationDate: "2026-06-02T10:00:00Z"
      }
    ]);
  });
});