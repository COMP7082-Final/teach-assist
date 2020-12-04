import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../../providers/AuthProvider'
import {withRouter} from 'react-router-dom'
import './Auth.css';

const Signup = (props) => {

    const {handleSignup, inputs, setInputs, errors} = useContext(firebaseAuth)  

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('handleSubmit')
        await handleSignup()
        props.history.push('/')
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
                    <h1 className="display-4">Sign Up</h1>
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
                        <label htmlFor="Password">Role</label>
                        <select id="role" className="form-control" name="role" onChange={handleChange} value={inputs.role}>
                            <option value="0" defaultValue>Choose...</option>
                            <option value="1">Instructor</option>
                            <option value="2">Student</option>
                        </select>
                    </div>
                    <div className="form-group margin">
                        <label htmlFor="Firstname">Firstname</label>
                        <input
                            className="form-control"
                            placeholder="Firstname"
                            name="fname"
                            type="text"
                            onChange={handleChange}
                            value={inputs.fname}
                        />
                    </div>
                    <div className="form-group margin">
                        <label htmlFor="Lastname">Lastname</label>
                        <input
                            className="form-control"
                            placeholder="Lastname"
                            name="lname"
                            type="text"
                            onChange={handleChange}
                            value={inputs.lname}
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
                            Signup
                        </button>
                        {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p> ) : null}
                    </div>
                    <hr />
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default withRouter(Signup);

