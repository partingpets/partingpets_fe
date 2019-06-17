import axios from 'axios';
import firebase from 'firebase/app';
import apiKeys from '../apiKeys';

const productsApiBaseUrl = apiKeys.petsApi.apiBaseUrl;

const getCurrentUid = () => firebase.auth().currentUser.uid;

// Get All Products For Store Page //
const getAllProducts = () => new Promise((resolve, reject) => {
  axios
    .get(`${productsApiBaseUrl}/api/products/`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

// Get Products By Partner ID for Partner Page //
const getAllProductsByPartnerId = partnerId => new Promise((resolve, reject) => {
  axios
    .get(`${productsApiBaseUrl}/api/products/partner/${partnerId}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

// Get All Product Categories for Product Modal //
const getAllProductCategories = () => new Promise((resolve, reject) => {
  axios
    .get(`${productsApiBaseUrl}/api/products/categories`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

// Create Product Call //
const createProduct = newProduct => new Promise((resolve, reject) => {
  axios
    .post(`${productsApiBaseUrl}/api/Products/`, newProduct)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

export default {
  getAllProducts,
  getAllProductCategories,
  createProduct,
  getCurrentUid,
  getAllProductsByPartnerId,
};
