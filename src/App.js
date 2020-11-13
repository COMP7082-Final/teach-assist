import logo from './logo.svg';
import './App.css';
import { ClassList, ClassItem } from './components';
import { auth } from './services/firebase'

function App() {
  return (
    <div className="App">
      <ClassList />
    </div>
  );
}

export default App;
