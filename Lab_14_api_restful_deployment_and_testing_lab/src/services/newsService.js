const axios = require("axios");
const ApiError = require("../errors/ApiError");

function validateCountryCode(country) {
  if (typeof country !== "string" || !/^[a-z]{2}$/i.test(country.trim())) {
    throw new ApiError(400, "Country code must be a 2-letter ISO code");
  }

  return country.trim().toLowerCase();
}

function mapNewsResponse(data, limit = 5) {
  if (!data || !Array.isArray(data.articles)) {
    throw new ApiError(502, "Invalid news service response");
  }

  return data.articles
    .filter((article) => article && article.title && article.url && article.source && article.source.name)
    .slice(0, limit)
    .map((article) => ({
      title: article.title,
      sourceName: article.source.name,
      url: article.url,
      publicationDate: article.publishedAt
    }));
}

async function getTopHeadlines(country, options = {}) {
  const normalizedCountry = validateCountryCode(country);
  const apiKey = options.apiKey || process.env.GNEWS_API_KEY;
  const client = options.client || axios;
  const limit = options.limit || 5;

  if (!apiKey) {
    throw new ApiError(500, "GNEWS_API_KEY is not configured");
  }

  try {
    const response = await client.get("https://gnews.io/api/v4/top-headlines", {
      params: {
        country: normalizedCountry,
        lang: "en",
        max: limit,
        apikey: apiKey
      }
    });

    return mapNewsResponse(response.data, limit);
  } catch (error) {
    if (error.response) {
      throw new ApiError(502, "News service request failed");
    }

    throw new ApiError(502, "Unable to reach news service");
  }
}

module.exports = {
  validateCountryCode,
  mapNewsResponse,
  getTopHeadlines
};