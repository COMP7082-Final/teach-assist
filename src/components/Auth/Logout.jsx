import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { firebaseAuth } from '../../providers/AuthProvider'
import { withRouter } from 'react-router-dom'
import './Auth.css';

const Logout = (props) => {
    const {handleLogout,} = useContext(firebaseAuth)
    const refresh = () => {
        props.history.push('/')
        window.location.reload();
    }
    return (
        <Link className="btn btn-primary px-5 mr-3" to="/" onClick={() => {handleLogout(); refresh();}}>Sign Out </Link>
    )
}

export default withRouter(Logout);
