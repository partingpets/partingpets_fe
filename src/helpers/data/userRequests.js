import axios from 'axios';
import apiKeys from '../apiKeys';

const petsApiBaseUrl = apiKeys.petsApi.apiBaseUrl;

const getUserByFbId = uid => new Promise((resolve, reject) => {
  axios
    .get(`${petsApiBaseUrl}/api/Users/${uid}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch((error) => {
      reject(error);
    });
});

const createUser = newUser => axios.post(`${petsApiBaseUrl}/api/Users/`, newUser);

const updateUser = newUser => new Promise((resolve, reject) => {
  axios
    .put(`${petsApiBaseUrl}/api/Users/${newUser.id}`, newUser)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => console.error('Error updating using', error));
});

export default {
  getUserByFbId,
  createUser,
  updateUser,
};
