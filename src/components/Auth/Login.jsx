import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../../providers/AuthProvider'
import './Auth.css';

const Login = () => {

    const {handleLogin, inputs, setInputs, errors} = useContext(firebaseAuth)  

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('handleSubmit')
        handleLogin()
    }

    const handleChange = e => {
        const {name, value} = e.target
        console.log(inputs)
        setInputs(prev => ({...prev, [name]: value}))
    }

    return (
        <div className="jumbotron jumbotron-fluid py-5">
            <div className="container col-5 py-5">
                <form onSubmit={handleSubmit}>
                    <h1 className="display-4">Login</h1>
                    <div className="form-group margin">
                        <label htmlFor="Email">Email address</label>
                        <input
                            className="form-control"
                            placeholder="name@example.com"
                            name="email"
                            type="email"
                            onChange={handleChange}
                            value={inputs.email}
                        />
                    </div>
                    <div className="form-group margin">
                        <label htmlFor="Password">Password</label>
                        <input
                            className="form-control"
                            placeholder="Password"
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={inputs.password}
                        />
                    </div>
                    <div className="form-group margin">
                        <button className="btn btn-primary px-5 mr-3" type="submit">
                            Login
                        </button>
                        {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p> ) : null}
                    </div>
                    <p><Link to="/resetpassword">Forgot Password?</Link></p>
                    <hr />
                    <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
                </form>
            </div>
        </div>
    );
};

export default Login;
