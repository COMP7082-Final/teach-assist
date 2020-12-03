import React, { useState } from "react";
import { authMethods } from '../components/Auth/AuthMethods'
import PropTypes from 'prop-types';
export const firebaseAuth = React.createContext()

const AuthProvider = (props) => {
    const [inputs, setInputs] = useState({email: '', password: ''})
    const [errors, setErrors] = useState([])
    const [token, setToken] = useState(null)
    const [setEmailHasBeenSent] = useState(false);

    const handleSignup = () => {
        console.log(errors, token, inputs)
        // calling signup from firebase server
        authMethods.signup(inputs.email, inputs.password, inputs.role, 
            inputs.fname, inputs.lname, setErrors, setToken)
    }

    const handleLogin = () => {
        //changed to handleSingin
        console.log('Login')
        console.log(errors, token)
        // made signup signin
        authMethods.login(inputs.email, inputs.password, setErrors, setToken)
      }

    const handleLogout = () => {
        authMethods.logout()
        console.log('Logout')
    }
    
    const handleReset = () => {
        authMethods.reset(inputs.email, setEmailHasBeenSent, setErrors)
        //console.log(setEmailHasBeenSent)
        console.log('Reset')
    }

    return (
    <firebaseAuth.Provider 
    value={{ 
        handleSignup, 
        handleLogin, 
        token,
        inputs, 
        setInputs, 
        errors, 
        handleLogout,
        handleReset
    }}>
        {props.children}
    </firebaseAuth.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.Object,
  };
  
  
export default AuthProvider;



