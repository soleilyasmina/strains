import axios from 'axios';

const BASE_URL =  `http://strainapi.evanbusse.com/${process.env.REACT_APP_API_KEY}`;

async function getAllStrains() {
  const resp = await axios({
    method: 'get',
    url: `${BASE_URL}/strains/search/all`
  })
  return resp.data;
}

async function getEffects() {
  const resp = await axios({
    method: 'get',
    url: `${BASE_URL}/searchdata/effects`
  })
  return resp.data;
}

async function getFlavors() {
  const resp = await axios({
    method: 'get',
    url: `${BASE_URL}/searchdata/flavors`
  })
  return resp.data;
}

export {
  getAllStrains,
  getEffects,
  getFlavors
}
