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

const getSinglePaymentOption = paymentId => axios.get(`${petsApiBaseUrl}/api/paymentTypes/${paymentId}`);

const createPaymentOption = newPaymentOption => axios.post(`${petsApiBaseUrl}/api/paymentTypes`, newPaymentOption);

const editPaymentOption = (paymentId, paymentObject) => axios.put(`${petsApiBaseUrl}/api/paymentTypes/${paymentId}`, paymentObject);

const deletePaymentOption = paymentId => axios.put(`${petsApiBaseUrl}/api/paymentTypes/delete-pt/${paymentId}`);

export default {
  getPaymentOptions,
  getSinglePaymentOption,
  createPaymentOption,
  editPaymentOption,
  deletePaymentOption,
}
