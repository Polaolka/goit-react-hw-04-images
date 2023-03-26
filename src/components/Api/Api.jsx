import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33856079-07df6d61f1845998135abb1f8';
const PARAMS = {
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 12,
};

export async function getImages(query, page) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&page=${page}`;
  try {
    const response = await axios.get(`${url}`, {
      params: PARAMS,
    });
    const totalImg = response.data.totalHits;
    const images = response.data.hits;
    const totalPage = Math.ceil(response.data.totalHits / PARAMS.per_page);
    return { images, totalImg, totalPage };
  } catch (error) {console.log(error.message);}
}
