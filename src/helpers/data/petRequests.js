import axios from 'axios';
import apiKeys from '../apiKeys';

const petsApiBaseUrl = apiKeys.petsApi.apiBaseUrl;

const getPetsByUserId = uid => new Promise((resolve, reject) => {
  axios
    .get(`${petsApiBaseUrl}/api/pets/${uid}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

const getAllPets = new Promise((resolve, reject) => {
  axios
    .get(`${petsApiBaseUrl}/api/pets/`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

const createPet = pet => axios.post(`${petsApiBaseUrl}/api/pets`, pet);

const editPet = (petId, petObject) => axios.put(`${petsApiBaseUrl}/api/pets/update/${petId}`, petObject);

export default { 
  getPetsByUserId,
  getAllPets,
  createPet,
  editPet,
};