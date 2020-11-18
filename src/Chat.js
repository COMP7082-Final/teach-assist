import React, { Component } from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
    Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import Chat from './pages/Chat';
import Signup from './pages/test_signup';
import Test_login from './pages/test_login';
import { auth } from './services/firebase.js';
import logo from "./logo.svg";

function PrivateRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === false
                ? <Component {...props} />
                : <Redirect to='/chat' />}
        />
    )
}

export default class Chatapp extends Component {
    constructor() {
        super();
        this.state = {
            authenticated: false,
            loading: true,
        };
    }

    componentDidMount() {
        auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    loading: false,
                });
            } else {
                this.setState({
                    authenticated: false,
                    loading: false,
                });
            }
        })
    }

    render() {
        return this.state.loading === true ? <h2>Loading...</h2> : (
            <Router>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <PrivateRoute path="/chat" authenticated={this.state.authenticated} component={Chat}/>
                    <PublicRoute path="/signup" authenticated={this.state.authenticated} component={Signup}/>
                    <PublicRoute path="/login" authenticated={this.state.authenticated} component={Test_login}/>
                </Switch>
            </Router>
        );
    }
}


