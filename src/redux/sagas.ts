import { put, takeLatest } from 'redux-saga/effects';
import {
  SEARCH_MOVIE_REQUEST,
  searchMovieSuccess,
  searchMovieFailure,
} from './actions';
import { API_KEY } from '@env';
import { API_URL } from '@env';
import { Movie } from './reducers';

const convertResponseToMoviesArray = (response: any): Movie[] => {
  if (!response || !response.Search || !Array.isArray(response.Search)) {
    return []; // Retorna un array vacío si no hay resultados válidos
  }

  return response.Search.map((movieData: any) => ({
    id: movieData.imdbID,
    title: movieData.Title,
    type: movieData.Type,
    year: movieData.Year,
    poster: movieData.Poster,
  }));
};


function* searchMovieSaga(action: any): Generator<any, any, any> {
    try {
        // Lógica para realizar la solicitud a la API y obtener los resultados
        // Simplemente una implementación de ejemplo
        console.log('searchMovieSaga', action.payload.query);
        
        const results = yield fetch(`${API_URL}?s=${action.payload.query}&apikey=${API_KEY}`)
            .then((response) => response.json());
        
        const moviesArray = convertResponseToMoviesArray(results);
      
        yield put(searchMovieSuccess(moviesArray));
    } catch (error: any) {
        yield put(searchMovieFailure(error.message));
    }
}

export default function* rootSaga() {
  yield takeLatest(SEARCH_MOVIE_REQUEST, searchMovieSaga);
}
