import axios from 'axios';
import apiKeys from '../apiKeys';

const ordersApiBaseUrl = apiKeys.petsApi.apiBaseUrl;

const createOrder = newOrder => new Promise((resolve, reject) => {
    axios
        .post(`${ordersApiBaseUrl}/api/orders/`, newOrder)
        .then((result) => {
            resolve(result);
        })
        .catch(error => reject(error));
});

export default { createOrder };