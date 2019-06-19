import axios from 'axios';
import apiKeys from '../apiKeys';

const petsApiBaseUrl = apiKeys.petsApi.apiBaseUrl;

const getPetsByUserId = uid => new Promise((resolve, reject) => {
  axios
    .get(`${petsApiBaseUrl}/api/pets/my-pets/${uid}`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

const getAllPets = () => new Promise((resolve, reject) => {
  axios
    .get(`${petsApiBaseUrl}/api/pets`)
    .then((result) => {
      resolve(result.data);
    })
    .catch(error => reject(error));
});

const getSinglePet = petId => axios.get(`${petsApiBaseUrl}/api/pets/${petId}`)

const createPet = pet => axios.post(`${petsApiBaseUrl}/api/pets`, pet);

const editPet = (petId, petObject) => axios.put(`${petsApiBaseUrl}/api/pets/${petId}`, petObject);

const deletePet = petId => axios.delete(`${petsApiBaseUrl}/api/pets${petId}`);

export default { 
  getPetsByUserId,
  getAllPets,
  getSinglePet,
  createPet,
  editPet,
  deletePet,
};