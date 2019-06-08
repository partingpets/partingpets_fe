import axios from 'axios';
import apiKeys from '../apiKeys';
// import utils from '../utils/utils';

const firebaseDbURL = apiKeys.firebaseConfig.databaseURL;

const getAllStates = () => new Promise((resolve, reject) => {
  axios
    .get(`${firebaseDbURL}/states.json`)
    .then((res) => {
      const statesArr = [];
      if (res.data !== null) {
        Object.keys(res.data).forEach((key) => {
          res.data[key].id = key;
          statesArr.push(res.data[key]);
        });
      }
      resolve(statesArr);
    })
    .catch(error => reject(error));
});

export default { getAllStates };
