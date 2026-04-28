const express = require("express");

const app = express();
const PORT = 3002;

function renderPage(title, message, color) {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #f8fafc, #e0f2fe);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .box {
            width: 480px;
            padding: 36px;
            border-radius: 22px;
            background: #ffffff;
            box-shadow: 0 18px 40px rgba(15, 23, 42, 0.16);
            text-align: center;
          }
          h1 {
            margin: 0 0 12px;
            color: ${color};
          }
          p {
            font-size: 18px;
            color: #334155;
          }
          .links a {
            margin: 0 8px;
            color: #2563eb;
            text-decoration: none;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>${title}</h1>
          <p>${message}</p>
          <div class="links">
            <a href="/home">Home</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
          </div>
        </div>
      </body>
    </html>
  `;
}

// Create the required message routes.
app.get("/home", (req, res) => {
  res.send(renderPage("Home Page", "Welcome Home", "#2563eb"));
});

app.get("/about", (req, res) => {
  res.send(renderPage("About Page", "Welcome to the About Page", "#7c3aed"));
});

app.get("/contact", (req, res) => {
  res.send(renderPage("Contact Page", "Welcome to the Contact Page", "#db2777"));
});

app.listen(PORT, () => {
  console.log(`Task 2 running at http://localhost:${PORT}`);
});
