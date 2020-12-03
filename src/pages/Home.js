import React, {useContext} from 'react';
import {firebaseAuth} from '../providers/AuthProvider'
import { Link } from 'react-router-dom';
import Logout from '../components/Auth/Logout';
import { BrowserRouter as Router, withRouter } from "react-router-dom";

const Home = () => {

    return (
        <div className="home">
            {/*<Header></Header>*/}
            <section>
                <div className="jumbotron jumbotron-fluid py-7 home-margin">
                    <div className="container text-center py-5">
                        <h1 className="display-4 title-margin">Welcome to Teach-Assist</h1>
                        <p className="lead">Assistant application for classroom environments</p>
                        <div className="mt-4">
                            <Link className="btn btn-primary px-5 mr-3" to="/profile">Profile</Link>
                            <Link className="btn btn-primary px-5 mr-3" to="/classlist">Class List</Link>
                            <Router><Logout /></Router>
                        </div>
                    </div>
                </div>
            </section>
            {/*<Footer></Footer>*/}
        </div>
    );
};

export default withRouter(Home);