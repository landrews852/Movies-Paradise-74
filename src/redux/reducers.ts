import { combineReducers } from 'redux';

import {
  SEARCH_MOVIE_REQUEST,
  SEARCH_MOVIE_SUCCESS,
  SEARCH_MOVIE_FAILURE,
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SEARCH_MOVIE_BY_ID_SUCCESS,
  SEARCH_MOVIE_BY_ID,
  SEARCH_MOVIE_BY_ID_FAILURE,
} from './actions';

export interface MovieState {
  loading: boolean;
  favorites: any[];
  results: Movie[] | undefined;
  error: string | null;
  lastQuery: string;
  detail: any;
  errorDetail: string | null;
}

export type Movie = {
  id: string;
  title: string;
  type: string;
  year: string;
  poster: string;
};

const initialState: MovieState = {
  loading: false,
  favorites: [],
  results: [],
  error: null,
  lastQuery: '',
  detail: null,
  errorDetail: null,
};

const movieReducer = (
  state = initialState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case SEARCH_MOVIE_REQUEST:
      return { ...state, loading: true, lastQuery: action.payload.query };
    case SEARCH_MOVIE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        results: action.payload.results,
      };
    case SEARCH_MOVIE_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case SEARCH_MOVIE_BY_ID:
      return { ...state, loading: true };
    case SEARCH_MOVIE_BY_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        errorDetail: null,
        detail: action.payload.results,
      };
    case SEARCH_MOVIE_BY_ID_FAILURE:
      return { ...state, loading: false, errorDetail: action.payload.error };
    case ADD_FAVORITE:
      if (state.favorites.some(movie => movie.id === action.payload.id)) {
        console.log('Ya existe en favoritos');
        return state;
      }
      console.log('Agregando a favoritos');

      return { ...state, favorites: [...state.favorites, action.payload] };
    case REMOVE_FAVORITE:
      console.log('Removiendo de favoritos');
      console.log('id', action.payload.id);
      console.log('state', state.favorites);

      return {
        ...state,
        favorites: state.favorites.filter(
          movie => movie.id !== action.payload.id,
        ),
      };
    default:
      return state;
  }
};

export default combineReducers({
  movie: movieReducer,
});
