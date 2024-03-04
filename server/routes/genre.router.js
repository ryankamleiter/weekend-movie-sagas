const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  // Add query to get all genres
  const movieId = req.params.id;
  console.log('in router get')
  const queryText = `
  SELECT genres.id, genres.name
  FROM genres
  JOIN movies_genres ON genres.id = movies_genres.genre_id
  WHERE movies_genres.movie_id = $1;
  `;
  pool.query(queryText)
  .then(result => {
      console.log(result.rows)
      res.send(result.rows);
    })
    .catch(error => {
      console.log('Error fetching movie details:', error);
      res.sendStatus(500);
    });
});



module.exports = router;