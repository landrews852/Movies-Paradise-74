export const SEARCH_MOVIE_REQUEST = 'SEARCH_MOVIE_REQUEST';
export const SEARCH_MOVIE_SUCCESS = 'SEARCH_MOVIE_SUCCESS';
export const SEARCH_MOVIE_FAILURE = 'SEARCH_MOVIE_FAILURE';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const SEARCH_MOVIE_BY_ID = 'SEARCH_MOVIE_BY_ID';
export const SEARCH_MOVIE_BY_ID_SUCCESS = 'SEARCH_MOVIE_BY_ID_SUCCESS';
export const SEARCH_MOVIE_BY_ID_FAILURE = 'SEARCH_MOVIE_BY_ID_FAILURE';

export interface SearchMovieRequestAction {
  type: typeof SEARCH_MOVIE_REQUEST;
  payload: {
    query: string;
  };
}

export const searchMovieRequest = (
  query: string,
): SearchMovieRequestAction => ({
  type: SEARCH_MOVIE_REQUEST,
  payload: { query },
});

export const searchMovieSuccess = (results: any) => ({
  type: SEARCH_MOVIE_SUCCESS,
  payload: { results },
});

export const searchMovieFailure = (error: any) => ({
  type: SEARCH_MOVIE_FAILURE,
  payload: { error },
});

export const searchMovieById = (id: string) => ({
  type: SEARCH_MOVIE_BY_ID,
  payload: { id },
});

export const searchByIdMovieSuccess = (results: any) => ({
  type: SEARCH_MOVIE_BY_ID_SUCCESS,
  payload: { results },
});

export const searchByIdMovieFailure = (error: any) => ({
  type: SEARCH_MOVIE_BY_ID_FAILURE,
  payload: { error },
});

export const removeFavorite = (id: string) => ({
  type: REMOVE_FAVORITE,
  payload: { id },
});

export const addFavorite = (movie: any) => ({
  type: ADD_FAVORITE,
  payload: movie,
});
