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
      `SELECT * FROM Movies`,
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

app.get("/songs", async (req, res) => {
  let conn;
  try {
    oracledb.fetchAsString = [oracledb.CLOB];
    conn = await dbConnection();
    const result = await conn.execute(
      `SELECT * FROM Songs`,
      [], // No bind parameters
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // <<< THIS LINE FIXES THE ERROR
    );


    console.log("Fetched Rows:", result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching songs: ", err);
    res.status(500).send("Error fetching songs: " + err.message);
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

  // To fetch all series
app.get("/series", async (req, res) => {
  let conn;
  try {
    oracledb.fetchAsString = [oracledb.CLOB];
    conn = await dbConnection();
    const result = await conn.execute(
      `SELECT * FROM WebSeries`,
      [], // No bind parameters
      { outFormat: oracledb.OUT_FORMAT_OBJECT } // <<< THIS LINE FIXES THE ERROR
    );


    console.log("Fetched Rows:", result.rows);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching series: ", err);
    res.status(500).send("Error fetching series: " + err.message);
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

// Fetch song sby movie id
app.get("/songs/:movieId", async(req ,res) => {
  let conn;
  try {
      conn = await dbConnection();
      oracledb.fetchAsString = [oracledb.CLOB];
      const { movieId } = req.params;
      const result = await conn.execute(
        `
              SELECT s.*, m.TITLE AS MOVIE_TITLE
              FROM songs s, movies m
              WHERE s.MOVID = m.MOVID AND m.MOVID = :movieId
              `,
        [movieId],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("Error fetching songs by movies: ", err);
      res.status(500).send("Error fetching songs by movies: " + err.message);
    }
})

app.get("/movies/:genreId", async (req, res) => {
  let conn;
  try {
      conn = await dbConnection();
      oracledb.fetchAsString = [oracledb.CLOB];
      const { genreId } = req.params;
      const result = await conn.execute(
        `SELECT MOVID, TITLE, GID, RELEASE_YEAR, LANGUAGE, RATING, DESCRIPTION FROM Movies WHERE GID = :genreId`,
        [genreId],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
  
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("Error fetching movies by genre: ", err);
      res.status(500).send("Error fetching movies by genre: " + err.message);
    }
});

app.get("/series/:genreId", async (req, res) => {
  let conn;
  try {
      conn = await dbConnection();
      oracledb.fetchAsString = [oracledb.CLOB];
      const { genreId } = req.params;
      const result = await conn.execute(
        `SELECT * FROM WebSeries WHERE GID = :genreId`,
        [genreId],
        { outFormat: oracledb.OUT_FORMAT_OBJECT }
      );
  
      res.status(200).json(result.rows);
    } catch (err) {
      console.error("Error fetching movies by genre: ", err);
      res.status(500).send("Error fetching movies by genre: " + err.message);
    }
});



// Listen to the port
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
