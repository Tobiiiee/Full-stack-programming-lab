const express = require("express");
const { getTopHeadlines } = require("../services/newsService");

const router = express.Router();

router.get("/:country", async (req, res, next) => {
  try {
    const articles = await getTopHeadlines(req.params.country);
    res.json({
      success: true,
      count: articles.length,
      articles
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;