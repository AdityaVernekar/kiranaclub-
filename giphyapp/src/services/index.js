import axios from 'axios';
import {API_KEY, END_POINTS, STATUS_CODES} from '../config';

export const getTrendingGifs = async ({limit, offset}) => {
  try {
    let response = await axios.get(
      `${END_POINTS.TRENDING_GIF}?api_key=${API_KEY}&limit=${limit}&offset=${offset}`,
    );
    console.log(response.status);

    if (response.status == STATUS_CODES.SUCCESS) {
      return {
        data: response.data?.data,
        nextPage: offset + 10,
      };
    }
  } catch (error) {
    console.log(error);
    return new Error('Something went wrong');
  }
};

export const getSearchGifs = async ({limit, offset, query}) => {
  console.log(query, 'wuery');

  try {
    let response = await axios.get(
      `${END_POINTS.SEARCH_GIF}?api_key=${API_KEY}&q=${query}&limit=${limit}&offset=${offset}`,
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return new Error('Something went wrong');
  }
};
