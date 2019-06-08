import axios from 'axios';
import apiKeys from '../apiKeys';

const { key } = apiKeys.mapBox;
const mapBoxBaseUrl = 'https://api.mapbox.com';

const getReverseGeoRegion = (lng, lat) => new Promise((resolve, reject) => {
  axios
    .get(`${mapBoxBaseUrl}/geocoding/v5/mapbox.places/${lng},${lat}.json?types=region&access_token=${key}`)
    .then((res) => {
      resolve(res.data.features[0].text);
    })
    .catch(error => reject(error));
});

const getForwardGeocode = searchString => new Promise((resolve, reject) => {
  axios
    .get(
      `${mapBoxBaseUrl}/geocoding/v5/mapbox.places/${searchString}.json?
        &fuzzyMatch=false&access_token=${key}`,
    )
    .then((res) => {
      const resData = res.data.features[0].center;
      const regData = res.data.features[0].context.find(ctx => ctx.id.includes('region')).text;
      const resPosition = {
        lng: resData[0],
        lat: resData[1],
        region: regData,
      };
      resolve(resPosition);
    })
    .catch(error => reject(error));
});

export default { getReverseGeoRegion, getForwardGeocode };
