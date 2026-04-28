const express = require("express");

const app = express();
const PORT = 3004;

// Return a full HTML page with a title, paragraph, and list.
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Simple HTML Page</title>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #ecfeff, #cffafe);
            color: #0f172a;
          }
          .page {
            max-width: 760px;
            margin: 60px auto;
            padding: 40px;
            background: #ffffff;
            border-radius: 24px;
            box-shadow: 0 20px 44px rgba(8, 145, 178, 0.18);
          }
          h1 {
            margin-top: 0;
            color: #0f766e;
          }
          p {
            font-size: 18px;
            color: #334155;
          }
          ul {
            padding-left: 20px;
          }
          li {
            margin: 10px 0;
            font-size: 17px;
          }
        </style>
      </head>
      <body>
        <div class="page">
          <h1>Simple HTML Page</h1>
          <p>This page is rendered using Express and includes the required title, paragraph, and simple list.</p>
          <ul>
            <li>Node.js</li>
            <li>Express.js</li>
            <li>HTML Response</li>
          </ul>
        </div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Task 4 running at http://localhost:${PORT}`);
});
