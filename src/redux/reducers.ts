import { combineReducers } from 'redux';

import {
  SEARCH_MOVIE_REQUEST,
  SEARCH_MOVIE_SUCCESS,
  SEARCH_MOVIE_FAILURE,
  ADD_FAVORITE,
} from './actions';

export interface MovieState {
  loading: boolean;
  favorites: any[];
  results: Movie[] | undefined;
  error: string | null;
  lastQuery: string;
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
};

const movieReducer = (
  state = initialState,
  action: { type: string; payload: any },
) => {
  switch (action.type) {
    case SEARCH_MOVIE_REQUEST:
      return { ...state, loading: true, lastQuery: action.payload.query };
    case SEARCH_MOVIE_SUCCESS:
      return { ...state, loading: false, results: action.payload.results };
    case SEARCH_MOVIE_FAILURE:
      return { ...state, loading: false, error: action.payload.error };
    case ADD_FAVORITE:
      return { ...state, favorites: [...state.favorites, action.payload] };
    default:
      return state;
  }
};

export default combineReducers({
  movie: movieReducer,
});
