import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyCWxYDZp0zwlttGVE1GosQQw5GUESExopI",
  authDomain: "projeto-teste-6cea5.firebaseapp.com",
  databaseURL: "https://projeto-teste-6cea5.firebaseio.com",
  projectId: "projeto-teste-6cea5",
  storageBucket: "projeto-teste-6cea5.appspot.com",
  messagingSenderId: "133787536516"
};
firebase.initializeApp(config);
  console.disableYellowBox = true;

  export default firebase;