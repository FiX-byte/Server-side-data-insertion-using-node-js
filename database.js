// database.js

const mysql = require("mysql2");

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost", // Replace with your database host
  user: "root", // Replace with your database user
  password: "root", // Replace with your database password
  database: "testdb", // Replace with your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");

  // Perform a sample query
  connection.query("SELECT * FROM test_table", (err, results, fields) => {
    if (err) {
      console.error("Error executing query:", err);
      return;
    }
    console.log("Query results:", results);
  });

  // Close the connection
  connection.end();
});
