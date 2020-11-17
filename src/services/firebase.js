
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAR8DSmDcDgIvIIY8RO6IWdsBryOWmSkzg",
    authDomain: "teach-assist-d8cd6.firebaseapp.com",
    databaseURL: "https://teach-assist-d8cd6.firebaseio.com"
  };
  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();

