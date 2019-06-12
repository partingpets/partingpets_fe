import firebase from 'firebase/app';
import 'firebase/auth';
import axios from 'axios';

axios.interceptors.request.use(
  request => getCurrentUserJwt()
    .then(() => {
      const token = sessionStorage.getItem('token');
      if (token != null) {
        request.headers.Authorization = `Bearer ${token}`;
      }
      return request;
    })
    .catch(error => console.error(error)),
  err => Promise.reject(err),
);

axios.interceptors.response.use(response => response, errorResponse => Promise.reject(errorResponse));

const googleAuth = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(getCurrentUserJwt);
};

const logoutUser = () => firebase.auth().signOut();

const getCurrentUid = () => firebase.auth().currentUser.uid;

const getCurrentUser = () => firebase.auth().currentUser;

const getCurrentUserJwt = () => firebase
  .auth()
  .currentUser.getIdToken()
  .then(token => sessionStorage.setItem('token', token));

export default {
  googleAuth,
  logoutUser,
  getCurrentUser,
  getCurrentUid,
  getCurrentUserJwt,
};
