const BASE_URL = 'https://api.giphy.com/v1/gifs';
export const API_KEY = 'S2T2OM19Z6a9qLo41o93j9unJfK16Pu4';

export const END_POINTS = {
  TRENDING_GIF: BASE_URL + '/trending',
  SEARCH_GIF: BASE_URL + '/search',
};

export const STATUS_CODES = {
  SUCCESS: 200,
  ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  UNAUTHORIZED: 401,
};
