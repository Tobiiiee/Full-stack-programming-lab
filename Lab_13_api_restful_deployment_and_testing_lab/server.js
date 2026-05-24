const express = require("express");
require("dotenv").config();

const weatherRoutes = require("./weatherRoutes");
const newsRoutes = require("./newsRoutes");

const app = express();
app.use(express.json());

// Routes
app.use("/api/weather", weatherRoutes);
app.use("/api/news", newsRoutes);

// Root test
app.get("/", (req, res) => {
  res.json({ message: "Lab 13 API is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});