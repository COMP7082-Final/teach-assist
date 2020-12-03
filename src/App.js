import './App.css';
import { ClassList, ClassRoom} from './components';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Profile from './components/Auth/Profile';
import Reset from './components/Auth/PassReset';
import React, { useContext } from "react";
import {firebaseAuth} from './providers/AuthProvider'

function PrivateRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                authenticated === null ? (
                    <Redirect
                        to={{ pathname: "/login", state: { from: props.location } }}
                    />
                ) : (
                    <Component {...props} />
                )
            }
        />
    );
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={props =>
                authenticated === null ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: "/", state: { from: props.location } }} />
                )
            }
        />
    );
}

function App() {
    const { token } = useContext(firebaseAuth);
    
    return (
        <Router>
            <Switch>
              <PublicRoute path="/login" authenticated={token} component={Login}/>
              <PublicRoute path="/signup" authenticated={token} component={Signup}/>
              <PublicRoute path="/resetpassword" authenticated={token} component={Reset}/>
              <PrivateRoute path="/classroom/:class_id" authenticated={token} component={ClassRoom} />
              <PrivateRoute path="/classlist" authenticated={token} component={ClassList} />
              <PrivateRoute path="/profile" authenticated={token} component={Profile} />
              <PrivateRoute path="/" authenticated={token} component={Home} />
            </Switch>
        </Router>
    );
}

export default App;


