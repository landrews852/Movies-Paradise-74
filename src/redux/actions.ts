export const SEARCH_MOVIE_REQUEST = 'SEARCH_MOVIE_REQUEST';
export const SEARCH_MOVIE_SUCCESS = 'SEARCH_MOVIE_SUCCESS';
export const SEARCH_MOVIE_FAILURE = 'SEARCH_MOVIE_FAILURE';
export const ADD_FAVORITE = 'ADD_FAVORITE';

export interface SearchMovieRequestAction {
  type: typeof SEARCH_MOVIE_REQUEST;
  payload: {
    query: string;
  };
}

export const searchMovieRequest = (query: string): SearchMovieRequestAction => ({
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
