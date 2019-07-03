import axios from 'axios';
import apiKeys from '../apiKeys';

const petsApiBaseUrl = apiKeys.petsApi.apiBaseUrl;

const getPaymentOptions = uid => new Promise((resolve, reject) => {
  axios
    .get(`${petsApiBaseUrl}/api/paymentTypes/user-pt/${uid}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

const createPaymentOption = newPaymentOption => axios.post(`${petsApiBaseUrl}/api/paymentTypes`, newPaymentOption);

const editPaymentOption = (paymentId, paymentObject) => axios.put(`${petsApiBaseUrl}/api/paymentTypes/${paymentId}`, paymentObject);

const deletePaymentOption = paymentId => axios.put(`${petsApiBaseUrl}/api/paymentTypes/${paymentId}`);

export default {
  getPaymentOptions,
  createPaymentOption,
  editPaymentOption,
  deletePaymentOption,
}