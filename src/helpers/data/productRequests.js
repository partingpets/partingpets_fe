import axios from 'axios';
import apiKeys from '../apiKeys';

const productsApiBaseUrl = apiKeys.petsApi.apiBaseUrl;

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
  axios.get(`${productsApiBaseUrl}/api/products/categories`)
    .then((result) => {
      console.log(result.data);
      resolve(result.data);
    })
    .catch(error => reject(error));
});

// These below have not been updated //
// const getSingleProduct = productId => new Promise((resolve, reject) => {
//     axios.get(`${firebaseUrl}/products/${productId}.json`)
//       .then((result) => {
//         const singleProduct = result.data;
//         singleProduct.id = productId;
//         resolve(singleProduct);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//   });

//   const deleteProduct = productId => axios.delete(`${firebaseUrl}/products/${productId}.json`);
// const createProduct = productObject => axios.post(`${firebaseUrl}/products.json`, JSON.stringify(productObject));
//   const updateProduct = (productObject, productId) => axios.put(`${firebaseUrl}/products/${productId}.json`, JSON.stringify(productObject));

export default {
  getAllProducts,
  getAllProductCategories,
  // deleteProduct,
  //createProduct,
  // updateProduct,
  // getSingleProduct,
};