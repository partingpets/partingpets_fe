import axios from 'axios';
import apiKeys from '../apiKeys';

const bingKey = apiKeys.bingMaps.key;
const apiBaseUrl = 'https://dev.virtualearth.net/REST/v1/Autosuggest';

// El%20bur&userLocation=47.668697,-122.376373,5&includeEntityTypes=Address,Place&key=<BingMapsKey>';

// `${apiBaseUrl}?q=${query}&ul=${lat},${lng},5000&key=${bingKey}`
const getAutoSuggest = (query, lat, lng) => new Promise((resolve, reject) => {
  axios
    .get(`${apiBaseUrl}?q=${query}&key=${bingKey}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((resp) => {
      const results = resp.data.resourceSets[0].resources[0].value;
      const formattedAddress = results.map(result => result.address.formattedAddress);
      resolve(formattedAddress);
    })
    .catch(error => reject(error));
});

const getAutoSuggestForm = query => new Promise((resolve, reject) => {
  axios
    .get(`${apiBaseUrl}?q=${query}&key=${bingKey}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((resp) => {
      const results = resp.data.resourceSets[0].resources[0].value;
      const formattedAddress = results.map(result => result.address.formattedAddress);
      resolve([formattedAddress, results]);
    })
    .catch(error => reject(error));
});

const getIpLocation = () => new Promise((resolve, reject) => {
  axios
    .get('https://ipapi.co/json')
    .then((results) => {
      resolve(results);
    })
    .catch(error => reject(error));
});

export default { getAutoSuggest, getAutoSuggestForm, getIpLocation };
