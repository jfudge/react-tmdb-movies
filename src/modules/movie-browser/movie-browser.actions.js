import {createAsyncActionCreator} from '../common/redux.helpers';
import * as movieService from './movie-browser.service';

export const keys = {
  'GET_UPCOMING_MOVIES': 'GET_UPCOMING_MOVIES',
  'SEARCH_MOVIES': 'SEARCH_MOVIES',
  'GET_MOVIE_DETAILS': 'GET_MOVIE_DETAILS',
};

export const getUpcoming = (page) => createAsyncActionCreator(
  keys.GET_UPCOMING_MOVIES,
  movieService.getUpcoming, 
  {page}
);

export const searchMovies = (query, page) => createAsyncActionCreator(
  keys.SEARCH_MOVIES,
  movieService.searchMovies, 
  {query, page}
);

export const getMovieDetails = (movieId) => createAsyncActionCreator(
  keys.GET_MOVIE_DETAILS,
  movieService.getMovieDetails, 
  {movieId}
);