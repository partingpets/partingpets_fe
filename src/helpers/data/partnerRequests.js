import axios from 'axios';
import apiKeys from '../apiKeys';

const partnersApiBaseUrl = apiKeys.petsApi.apiBaseUrl;

const getAllPartners = () => new Promise((resolve, reject) => {
  axios
    .get(`${partnersApiBaseUrl}/api/partners/`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

const getPartnerById = partnerId => new Promise((resolve, reject) => {
  axios
    .get(`${partnersApiBaseUrl}/api/partners/${partnerId}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

const getSinglePartner = partnerId => new Promise((resolve, reject) => {
    axios
        .get(`${partnersApiBaseUrl}/api/partners/${partnerId}`)
        .then((result) => {
            resolve(result.data)
        })
        .catch(error => reject(error));
});

const deletePartner = partnerId => new Promise((resolve, reject) => {
  axios
    .delete(`${partnersApiBaseUrl}/api/partners/${partnerId}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

const createPartner = newPartner => new Promise((resolve, reject) => {
    axios
        .post(`${partnersApiBaseUrl}/api/partners/`, newPartner)
        .then((result) => {
            resolve(result.data);
        })
        .catch(error => reject(error));
});

const editPartner = (partnerId, partnerObject) => new Promise((resolve, reject) => {
    axios
        .put(`${partnersApiBaseUrl}/api/partners/${partnerId}`, partnerObject)
        .then((result) => {
            resolve(result.data);
        })
        .catch(error => reject(error));
});

const getPartnerByPartnerCode = partnerCode => new Promise((resolve, reject) => {
  axios
    .get(`${partnersApiBaseUrl}/api/Partners/Code/${partnerCode}`)
    .then((result) => {
      resolve(result);
    })
    .catch((error) => {
      const statusResponse = error.response.status;
      if (statusResponse === 404) {
        resolve(statusResponse);
      } else {
        reject(error);
      }
    });
});

export default {
  getAllPartners,
  deletePartner,
  createPartner,
  editPartner,
  getSinglePartner,
  getPartnerById,
  getPartnerByPartnerCode,
};

