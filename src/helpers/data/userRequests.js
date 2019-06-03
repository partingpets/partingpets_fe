import axios from 'axios';
import apiKeys from '../apiKeys';

const petsApiBaseUrl = apiKeys.petsApi.apiBaseUrl;

const getUserByFbId = uid => new Promise((resolve, reject) => {
  axios
    .get(`${petsApiBaseUrl}/api/Users/${uid}`)
    .then((result) => {
      console.log(result.data);
      resolve(result.data);
    })
    .catch(error => reject(error));
});

export default {
  getUserByFbId,
};
