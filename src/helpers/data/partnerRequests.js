import axios from 'axios';
import apiKeys from '../apiKeys';

const partnersApiBaseUrl = apiKeys.petsApi.apiBaseUrl;

const getAllPartners = () => new Promise((resolve, reject) => {
    axios
        .get(`${partnersApiBaseUrl}/api/partners/`)
        .then((result) => {
            console.log(result.data);
            resolve(result.data)
        })
        .catch(error => reject(error));
});

const getSinglePartner = partnerId => new Promise((resolve, reject) => {
    axios
        .get(`${partnersApiBaseUrl}/api/partners/${partnerId}`)
        .then((result) => {
            console.log(result.data);
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

export default { 
    getAllPartners, 
    deletePartner,
    createPartner,
    editPartner,
    getSinglePartner,
};