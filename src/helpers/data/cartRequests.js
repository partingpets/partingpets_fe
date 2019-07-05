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

const addUserCartItem = newCartItem => new Promise((resolve, reject) => {
  axios
    .post(`${petsApiBaseUrl}/api/carts`, newCartItem)
    .then((results) => {
      resolve(results.data);
    })
    .catch((error) => {
      reject(error);
    });
});

const editUserCartItem = cartItem => new Promise((resolve, reject) => {
  const { cartId } = cartItem;
  axios
    .put(`${petsApiBaseUrl}/api/carts/${cartId}`, cartItem)
    .then((result) => {
      resolve(result.data);
    })
    .catch((error) => {
      reject(error);
    });
});

export default {
  getUserCartById,
  deleteUserCartItemByItemId,
  addUserCartItem,
  editUserCartItem,
};
