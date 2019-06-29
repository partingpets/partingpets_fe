import axios from 'axios';
import apiKeys from '../apiKeys';

const petsApiBaseUrl = apiKeys.petsApi.apiBaseUrl;

const getUserCartById = userId => new Promise((resolve, reject) => {
  axios
    .get(`${petsApiBaseUrl}/api/carts/${userId}`)
    .then((results) => {
      resolve(results.data);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getUserCartById };
