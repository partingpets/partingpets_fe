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

const getPartnerByPartnerCode = partnerCode => new Promise((resolve, reject) => {
  axios
    .get(`${partnersApiBaseUrl}/api/Partners/Code/${partnerCode}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

export default { getAllPartners, getPartnerById, getPartnerByPartnerCode };
