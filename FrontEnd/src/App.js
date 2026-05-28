import logo from './logo.svg';
import './App.css';
import Routing from './controller/Routing';
import { Provider } from 'react-redux';
import {store} from './utility/store'


function App() {
  return (
    <Provider store={store}>


      <div className="App">
     <Routing/>
    </div>
    </Provider>
    
    
  );
}

export default App;
