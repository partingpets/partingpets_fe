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

const deletePartner = partnerId => axios.delete(`${partnersApiBaseUrl}/api/partners/${partnerId}`);



export default { 
    getAllPartners, 
    deletePartner,
};