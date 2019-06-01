import firebase from 'firebase/app';
import 'firebase/auth';

const googleAuth = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
};

const logoutUser = () => firebase.auth().signOut();

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default {
  googleAuth,
  logoutUser,
  getCurrentUid,
};
