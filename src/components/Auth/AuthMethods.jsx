import { db } from '../../services/firebase';
import firebase from 'firebase';

export const authMethods = {
    // firebase helper methods go here... 
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
        //change from create users to...
        firebase.auth().signInWithEmailAndPassword(email,password) 
        //everything is almost exactly the same as the function above
        .then( async res => {
            const token = await Object.entries(res.user)[5][1].b
            //set token to localStorage 
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
        // signOut is a no argument function
        firebase.auth().signOut()
        //remove the token
        localStorage.clear('token')
    },

    reset: (email, setEmailHasBeenSent, setErrors) => {
        //change from create users to...
        firebase.auth().sendPasswordResetEmail(email) 
        //everything is almost exactly the same as the function above
        .then(() => {
            setEmailHasBeenSent(true);
            setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
            //console.log(setEmailHasBeenSent)
          })
        .catch(err => {
            setErrors(prev => ([...prev, err.message]))
        })
    },
}