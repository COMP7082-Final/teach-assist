import React, { useState } from "react";
import { authMethods } from '../components/Auth/AuthMethods'

export const firebaseAuth = React.createContext()

const AuthProvider = (props) => {
    const [inputs, setInputs] = useState({email: '', password: ''})
    const [errors, setErrors] = useState([])
    const [token, setToken] = useState(null)

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

    return (
    <firebaseAuth.Provider 
    value={{ 
        handleSignup, 
        handleLogin, 
        token,
        inputs, 
        setInputs, 
        errors, 
        handleLogout
    }}>
        {props.children}
    </firebaseAuth.Provider>
    );
};
  
  
export default AuthProvider;



