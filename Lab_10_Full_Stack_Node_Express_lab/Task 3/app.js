const express = require("express");

const app = express();
const PORT = 3003;

// Display the name sent in the URL.
app.get("/user/:name", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Task 3 - Dynamic User</title>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            min-height: 100vh;
            display: grid;
            place-items: center;
            background: linear-gradient(135deg, #fef3c7, #fde68a);
          }
          .card {
            width: 500px;
            padding: 36px;
            border-radius: 24px;
            text-align: center;
            background: #ffffff;
            box-shadow: 0 18px 42px rgba(146, 64, 14, 0.18);
          }
          h1 {
            margin: 0 0 12px;
            color: #92400e;
          }
          p {
            color: #57534e;
            font-size: 18px;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Hello ${req.params.name}</h1>
          <p>This name is coming from the dynamic route parameter.</p>
        </div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Task 3 running at http://localhost:${PORT}`);
});
