import './App.css';
import Chat from "./pages/Chat.js"
import { ClassList, ClassRoom} from './components';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./pages/Home";
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import Profile from './components/Auth/Profile';
import Reset from './components/Auth/PassReset';
import React, { useContext } from "react";
import {firebaseAuth} from './providers/AuthProvider'

function App() {
    const { handleSignup } = useContext( firebaseAuth )
    const { token } = useContext(firebaseAuth)
    
    return (
        // can add /classlist/:user_id in future
        <Router>
            <Switch>
              <Route exact path="/" render={rProps => token === null ? <Login /> : <Home />} />
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/resetpassword" component={Reset}/>
              <Route path="/classlist" render={rProps => token === null ? <Login /> : <ClassList />} />
              <Route path="/profile" render={rProps => token === null ? <Login /> : <Profile />} />
              {/*<Route path="/classroom/:class_id" render={rProps => token === null ? <Login /> : <ClassRoom />} />*/}
              <Route path="/classroom/:class_id" component={ClassRoom} />
            </Switch>
        </Router>
    );
}

export default App;


