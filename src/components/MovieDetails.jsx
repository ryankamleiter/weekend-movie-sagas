import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export default function MovieDetails() {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);
  const genres = useSelector(store => store.genres);
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: id });
  }, [dispatch, id]);

  const movie = movies.find(movie => movie.id === Number(id));



  console.log(movie)


  return (
    <div data-testid="movieDetails">
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <img src={movie.poster} alt={movie.title} />
      <p>Genres: {movie.genres}</p>
      <Link to="/" data-testid="toList">
        Back to Movie List
      </Link>
    </div>
  );
}
