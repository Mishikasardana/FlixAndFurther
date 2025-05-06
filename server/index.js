const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const oracledb = require("oracledb");

// Database Connection File
const dbConnection = require("./config/dbConfig.js");
const initDb = require("./models/initDb.js");

// Setup Environment Variables
require("dotenv").config();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connection to the database
initDb();


// To fetch all genres
app.get("/genre", async (req, res) => {
  let conn;
  try {
    conn = await dbConnection();
    const result = await conn.execute(`SELECT * FROM Genre`);

    console.log("Fetched Rows:", JSON.stringify(result.rows, null, 2));
    // Only return result.rows to avoid circular structure
    res.status(200).json({
      data: result.rows,
      message: "Genres fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching genres: ", err);
    res.status(500).send("Error fetching genres: " + err.message);
  } finally {
    if (conn) {
      try {
        await conn.close(); // always close the connection!
      } catch (closeErr) {
        console.error("Error closing connection: ", closeErr);
      }
    }
  }
});


// To fetch all movies
app.get("/movies", async (req, res) => {
  let conn;
  try {
    oracledb.fetchAsString = [oracledb.CLOB];
    conn = await dbConnection();
    const result = await conn.execute(
      `SELECT MOVID, TITLE, GID, RELEASE_YEAR, LANGUAGE, RATING, DESCRIPTION, TAGS FROM Movies`,
      [], // No bind parameters
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // <<< THIS LINE FIXES THE ERROR
    );


    console.log("Fetched Rows:", result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching movies: ", err);
    res.status(500).send("Error fetching movies: " + err.message);
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (closeErr) {
        console.error("Error closing connection: ", closeErr);
      }
    }
  }
});


// To fetch all users
app.get("/users", async (req, res) => {
    let conn;
    try {
      oracledb.fetchAsString = [oracledb.CLOB];
      conn = await dbConnection();
      const result = await conn.execute(
        `SELECT * FROM Users`,
        [], // No bind parameters
        { outFormat: oracledb.OUT_FORMAT_OBJECT } // <<< THIS LINE FIXES THE ERROR
      );
  
  
      console.log("Fetched Rows:", result.rows);
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("Error fetching movies: ", err);
      res.status(500).send("Error fetching movies: " + err.message);
    } finally {
      if (conn) {
        try {
          await conn.close();
        } catch (closeErr) {
          console.error("Error closing connection: ", closeErr);
        }
      }
    }
  });

// Listen to the port
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
