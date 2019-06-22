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

const deletePartner = partnerId => new Promise((resolve, reject) => {
  axios
    .delete(`${partnersApiBaseUrl}/api/partners/${partnerId}`)
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
  getPartnerById,
  getPartnerByPartnerCode,
};
