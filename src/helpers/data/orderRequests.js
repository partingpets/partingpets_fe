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

const getAllOrders = () => new Promise((resolve, reject) => {
    axios
        .get(`${ordersApiBaseUrl}/api/orders`)
        .then((result) => {
            resolve(result.data);
        })
        .catch(error => reject(error));
});

const getOrderById = orderId => new Promise((resolve, reject) => {
    axios
    .get(`${ordersApiBaseUrl}/api/orders/${orderId}`)
    .then((result) => {
        resolve(result.data);
    })
    .catch(error => reject(error));
});

export default { 
    createOrder, 
    getAllOrders, 
    getOrderById, 
};