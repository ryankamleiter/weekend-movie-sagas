import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

export default function MovieDetails() {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);
  const movieGenres = useSelector(store => store.genres);

  


  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_GENRES', payload: id });
  }, []);

  const movie = movies.find(movie => movie.id === Number(id));
  




  console.log('genres', movieGenres)


  return (
    <div data-testid="movieDetails" key={movie.id}>
      <h2>{movie.title}</h2>
      <p>{movie.description}</p>
      <img src={movie.poster} alt={movie.title} />
      <p>Genres: {movieGenres.map(genre => {
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
