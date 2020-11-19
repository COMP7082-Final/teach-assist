import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { firebaseAuth } from '../../providers/AuthProvider'
import './Auth.css';

const PassReset = () => {

  //const [email, setEmail] = useState("");
  //const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  //const [error, setError] = useState(null);
  const {handleReset, inputs, setInputs, emailHasBeenSent, errors} = useContext(firebaseAuth)

    const handleChange = e => {
        const { name, value } = e.target
        setInputs(prev => ({...prev, [name]: value}))
        console.log(inputs)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('handleReset')
        handleReset()
    }

    return (
        <div className="jumbotron jumbotron-fluid py-5">
            <div className="container col-5 py-5">
                <form onSubmit={handleSubmit}>
                    <h1 className="display-4">Reset Password</h1>
                    {emailHasBeenSent && (
                        <div className="py-3 bg-green-400 w-full text-white text-center mb-3">
                        An email has been sent to you!
                        </div>
                    )}
                    <label htmlFor="userEmail">Email address</label>
                    <input
                        className="form-control"
                        placeholder="name@example.com"
                        name="email"
                        type="email"
                        onChange={handleChange}
                        value={inputs.email}
                    />
                    <button className="btn btn-primary px-5 mr-3 margin">
                        Send me a reset link
                    </button>
                    {errors.length > 0 ? errors.map(error => <p style={{color: 'red'}}>{error}</p> ) : null}
                    <hr />
                    <p>Back to login page. <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    );
};

export default PassReset;