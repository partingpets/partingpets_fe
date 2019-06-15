import axios from 'axios';
import apiKeys from '../apiKeys';

const petsApiBaseUrl = apiKeys.petsApi.apiBaseUrl;

const getPetsByUserId = uid => new Promise((resolve, reject) => {
  axios
    .get(`${petsApiBaseUrl}/api/pets/${uid}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

export default {
  getPetsByUserId,
};
