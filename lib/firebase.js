import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyApvlnRMs1Jwf2HXxGH3JOPHrBimG0owBM",
    authDomain: "shoot-the-breeze2.firebaseapp.com",
    databaseURL: "https://shoot-the-breeze2.firebaseio.com",
    storageBucket: "shoot-the-breeze2.appspot.com",
    messagingSenderId: "903977819404"
  };

firebase.initializeApp(config);

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export const signIn = () => auth.signInWithPopup(provider);
export const reference = firebase.database().ref('messages');
