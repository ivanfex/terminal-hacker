import firebase from 'firebase';
var config = {
    apiKey: "AIzaSyDl7jB5mhun1nLBhaXRaONbVaMOWj2fJ7o",
    authDomain: "terminal-hacker.firebaseapp.com",
    databaseURL: "https://terminal-hacker.firebaseio.com",
    projectId: "terminal-hacker",
    storageBucket: "terminal-hacker.appspot.com",
    messagingSenderId: "366782480664"
};

firebase.initializeApp(config);
export default firebase;
