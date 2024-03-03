const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/api/movies/:id', (req, res) => {
  // Add query to get all genres
  const movieId = req.params.id;
  console.log(movieId)
  const queryText = `
  SELECT movies.id, movies.title, movies.poster, movies.description
  FROM movies
  LEFT JOIN movies_genres ON movies.id = movies_genres.movie_id
  LEFT JOIN genres ON movies_genres.genre_id = genres.id
  WHERE movies.id = $1
  GROUP BY movies.id, movies.title, movies.poster, movies.description;
`;
  pool.query(queryText, [movieId])
    .then(result => {
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error fetching movie details:', error);
      res.sendStatus(500);
    });
});

module.exports = router;