// server.js

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const port = 3000;

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "testdb",
});

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to handle form submission
app.post("/submit", (req, res) => {
  const username = req.body.username;

  connection.query(
    "INSERT INTO test_table (username) VALUES (?)",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Server error");
        return;
      }
      res.send(`Username "${username}" successfully added in list!`);
    }
  );
});

// Route to serve HTML form
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "public", "index.html") /* `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Username Entry</title>
    </head>
    <body>
        <h1>Enter Username</h1>
        <form action="/submit" method="POST">
            <input type="text" name="username" placeholder="Enter username" required>
            <button type="submit">Submit</button>
        </form>
    </body>
    </html>
  ` */
  );
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
