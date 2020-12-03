import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAR8DSmDcDgIvIIY8RO6IWdsBryOWmSkzg",
    authDomain: "teach-assist-d8cd6.firebaseapp.com",
    databaseURL: "https://teach-assist-d8cd6.firebaseio.com",
    projectId: "teach-assist-d8cd6",
    storageBucket: "teach-assist-d8cd6.appspot.com",
    messagingSenderId: "815544466772",
    appId: "1:815544466772:web:ee8656e07cc604bd83dcc1",
    measurementId: "G-ERZD0FS8CG"
};
firebase.initializeApp(config);
export const auth = firebase.auth();
export const db = firebase.database();
export const firestore = firebase.firestore();
// export const analytics = firebase.analytics();

export default { config }