
import './App.css';
import { ClassList, ClassRoom } from './components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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

export default App;
