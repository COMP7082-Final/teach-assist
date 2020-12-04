import { db } from '../../services/firebase';
import firebase from 'firebase';

export const authMethods = {
    signup: (email, password, role, fname, lname, setErrors, setToken) => {
        firebase.auth().createUserWithEmailAndPassword(email,password) 
        .then ( async res => {
            const token = await Object.entries(res.user)[5][1].b
            //set token to localStorage 
            await localStorage.setItem('token', token)
            //grab token from local storage and set to state. 
            setToken ( window.localStorage.token )

            console.log(res.user.uid, role, fname, lname)
            let users_ref = db.ref('/users');
            users_ref.push({
                uid: res.user.uid,
                fname: fname,
                lname: lname,
                email: email,
                role : role,
            });

        })
        .catch (err => {
            setErrors(prev => ([...prev, err.message]))
        })
    },

    login: (email, password, setErrors, setToken) => {
        firebase.auth().signInWithEmailAndPassword(email,password) 
        .then( async res => {
            const token = await Object.entries(res.user)[5][1].b
            await localStorage.setItem('token', token)
            setToken( window.localStorage.token )
            console.log(res)
        })
        .catch(err => {
            setErrors(prev => ([...prev, err.message]))
        })
    },

    logout: () => {
        console.log('logout')
        firebase.auth().signOut()
        localStorage.clear('token')
    },

    reset: (email, setEmailHasBeenSent, setErrors) => {
        firebase.auth().sendPasswordResetEmail(email) 
        .then(() => {
            setEmailHasBeenSent(true);
            setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
          })
        .catch(err => {
            setErrors(prev => ([...prev, err.message]))
        })
    },
}