import axios from 'axios';
import firebase from 'firebase/app';
import apiKeys from '../apiKeys';

const productsApiBaseUrl = apiKeys.petsApi.apiBaseUrl;

const getCurrentUid = () => firebase.auth().currentUser.uid;

const getAllProducts = () => new Promise((resolve, reject) => {
  axios
    .get(`${productsApiBaseUrl}/api/products/`)
    .then((result) => {
      console.log(result.data);
      resolve(result.data);
    })
    .catch(error => reject(error));
});

const getAllProductCategories = () => new Promise((resolve, reject) => {
  axios
    .get(`${productsApiBaseUrl}/api/products/categories`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

const createProduct = (newProduct) => {
  axios.post(`${productsApiBaseUrl}/api/Products/`, newProduct);
};

export default {
  getAllProducts,
  getAllProductCategories,
  createProduct,
  getCurrentUid,
};
