const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET /api/news/:countryCode  (e.g., us, pk, gb)
router.get("/:countryCode", async (req, res) => {
  const country = req.params.countryCode.toLowerCase();
  const apiKey = process.env.NEWS_API_KEY;

  // Basic validation — country codes are 2 letters
  if (country.length !== 2) {
    return res.status(400).json({ error: "Invalid country code. Use 2-letter codes like 'us', 'pk', 'gb'." });
  }

  try {
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&pageSize=10&apiKey=${apiKey}`;
    const response = await axios.get(url);
    const articles = response.data.articles;

    if (!articles || articles.length === 0) {
      return res.status(404).json({ error: "No headlines found for this country." });
    }

    const headlines = articles.map((article) => ({
      title: article.title,
      source: article.source.name,
      url: article.url,
      publishedAt: article.publishedAt
    }));

    res.json({
      country: country.toUpperCase(),
      totalResults: headlines.length,
      headlines
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news. Check your API key or try again later." });
  }
});

module.exports = router;