const dbConnection = require("../config/dbConfig.js");
const oracledb = require("oracledb");
const conn = await dbConnection();

const getMoviesByGenre = async (req, res) => {
  try {
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
};

const getMoviesByTags = async (req, res) => {
  try {
    const { tag } = req.params;
    const result = await conn.execute(
      `
            SELECT m.*, t.COLUMN_VALUE AS TAG
            FROM movies m, TABLE(m.tags) t
            WHERE t.COLUMN_VALUE = :tag
            `,
      [tag],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching movies by tags: ", err);
    res.status(500).send("Error fetching movies by tags: " + err.message);
  }
};

module.exports = { getMoviesByGenre };
