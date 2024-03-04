import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export default function MovieDetails() {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);
  const movieDetails = useSelector(store => store.movieDetails);

  


  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_DETAILS', payload: id });
    dispatch({ type: 'FETCH_GENRES' });
  }, []);

  const movie = movies.find(movie => movie.id === Number(id));
  




  console.log('genres', movieDetails)


  return (
    <div data-testid="movieDetails">
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <img src={movie.poster} alt={movie.title} />
      <p>Genres: {movieDetails.map(genre => {
                return (
                    <>
                    <li key={genre.id}>{genre.name}</li>
                    </>
                )
            })}</p>
      <Link to="/" data-testid="toList">
        Back to Movie List
      </Link>
    </div>
  );
}
