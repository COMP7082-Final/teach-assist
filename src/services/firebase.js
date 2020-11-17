import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyC4JYikOvi0WJmkfmWEX2ODVsjx0lybjpg",
    authDomain: "final-project-a4a9f.firebaseapp.com",
    databaseURL: "https://final-project-a4a9f.firebaseio.com"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();