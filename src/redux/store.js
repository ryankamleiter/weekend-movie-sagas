import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, select } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies);
  yield takeEvery('NAVIGATE_TO_DETAILS', handleDetailsNav);
  yield takeEvery('FETCH_DETAILS', fetchMovieDetails);
  yield takeEvery('FETCH_GENRES', fetchGenres); 
}

function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}
function* fetchMovieDetails() {
  try {
    
    const response = yield axios.get(`/api/movies`);
    console.log('Movie ID:', );
    yield put({ type: 'SET_MOVIE_DETAILS', payload: response.data })
  } catch (error) {
    console.log('fetchMovieDetails error:', error);
  }
}

function* fetchGenres() {
  try {
    const genresResponse = yield axios.get('/api/genres');
    console.log('genres response', genresResponse)
    yield put({
      type: 'SET_GENRES',
      payload: genresResponse.data
    });
  } catch (error) {
    console.log('fetchGenres error:', error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

const movieDetails = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MOVIE_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

function* handleDetailsNav(action) {

  // Dispatch an action to navigate to the details page with the movie ID
  yield put({
    type: 'NAVIGATE_TO_MOVIE_DETAILS',
    payload: action.payload
  });
}




// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    movieDetails
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;