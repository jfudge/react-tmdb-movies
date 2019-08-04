
const MOVIE_DB_API_KEY = '765a2ca7e4d93f88eec415b4c25989d3';
const MOVIE_DB_BASE_URL = 'https://api.themoviedb.org/3';

const createMovieDbUrl = (relativeUrl, queryParams) => {
  let baseUrl = `${MOVIE_DB_BASE_URL}${relativeUrl}?api_key=${MOVIE_DB_API_KEY}&language=en-US`;
  if (queryParams) {
    Object.keys(queryParams)
      .forEach(paramName => baseUrl += `&${paramName}=${queryParams[paramName]}`);
  }
  return baseUrl;
}

export const getUpcoming = async ({page}) => {
  const fullUrl = createMovieDbUrl('/movie/upcoming', {
    page
  });
  return fetch(fullUrl);
}

export const searchMovies = async ({ page, query}) => {
  const fullUrl = createMovieDbUrl('/search/movie', {
    page,
    query
  });
  return fetch(fullUrl);
}

export const getMovieDetails = async ({movieId}) => {
  const fullUrl = createMovieDbUrl(`/movie/${movieId}`);
  return fetch(fullUrl);
}
