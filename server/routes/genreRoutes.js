const express = require('express');
const router = express.Router();

const {getMoviesByGenre, getSongsByMovies } = require('../controllers/genreController');

router.get('/movies/:genreId', getMoviesByGenre);
router.get('/songs/:movieId', getSongsByMovies);

module.exports = router;
