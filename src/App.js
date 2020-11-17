
import './App.css';

import React, {Component} from "react";
import Chatapp from "./Chat.js"
import { ClassList, ClassRoom } from './components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    // can add /classlist/:user_id in future
  <div className="App">
    <Router>
        <Switch>

          <Route 
            path="/classlist" 
            component={ClassList}
          />

          <Route 
            path="/classroom/:class_id" 
            component={ClassRoom} 
          />
          
        </Switch>
      </Router>
      
    </div>
  );
}


