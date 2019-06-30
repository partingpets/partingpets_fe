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

const deleteUserCartItemByItemId = (userId, ItemId) => new Promise((resolve, reject) => {
  axios
    .delete(`${petsApiBaseUrl}/api/carts/${userId}/${ItemId}`)
    .then((results) => {
      resolve(results.data);
    })
    .catch((error) => {
      reject(error);
    });
});

export default { getUserCartById, deleteUserCartItemByItemId };
