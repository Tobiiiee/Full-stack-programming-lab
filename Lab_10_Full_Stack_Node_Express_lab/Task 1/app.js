const express = require("express");

const app = express();
const PORT = 3001;

// Student data is stored in an array as required by the lab.
const students = ["Ayaan", "Abdul", "Ali", "Ahmed"];

// Display the student list in the browser using HTML li tags.
app.get("/", (req, res) => {
  const studentItems = students.map((student) => `<li>${student}</li>`).join("");

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Task 1 - Student List</title>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #eef2ff, #dbeafe);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .card {
            width: 420px;
            padding: 32px;
            border-radius: 20px;
            background: #ffffff;
            box-shadow: 0 20px 45px rgba(37, 99, 235, 0.18);
          }
          h1 {
            margin-top: 0;
            color: #1e3a8a;
            text-align: center;
          }
          p {
            text-align: center;
            color: #475569;
          }
          ul {
            padding: 0;
            list-style: none;
          }
          li {
            margin: 12px 0;
            padding: 14px 16px;
            border-radius: 12px;
            background: #eff6ff;
            border-left: 5px solid #2563eb;
            color: #0f172a;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>Student List</h1>
          <p>Students stored in an array and displayed with HTML list items.</p>
          <ul>${studentItems}</ul>
        </div>
      </body>
    </html>
  `);
});

app.listen(PORT, () => {
  console.log(`Task 1 running at http://localhost:${PORT}`);
});
