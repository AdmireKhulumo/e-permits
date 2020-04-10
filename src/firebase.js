import firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAlZrmnsLL4Y2HJ2LyeTa0ybtNMtPdvWCE",
    authDomain: "botswana-covid-19-e-permits.firebaseapp.com",
    databaseURL: "https://botswana-covid-19-e-permits.firebaseio.com",
    projectId: "botswana-covid-19-e-permits",
    storageBucket: "botswana-covid-19-e-permits.appspot.com",
    messagingSenderId: "1033390107467",
    appId: "1:1033390107467:web:2b924757054e1b29ca56ce",
    measurementId: "G-75JW8V6SJ1"
  };

const firebaseApp=firebase.initializeApp(config);

const db =  firebaseApp.firestore();

export {db};