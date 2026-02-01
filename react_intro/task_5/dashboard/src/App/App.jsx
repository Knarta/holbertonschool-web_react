import './App.css';
import './Notifications.css';
import Notifications from '../Notifications/Notifications.jsx';
import logo from './assets/holberton-logo.jpg';
import { getCurrentYear, getFooterCopy } from '../utils/utils.js';

function App() {

  return (
    <div>
      <div className="root-notification">
        <Notifications />
      </div>
      <div className="App">
        <div className="App-header">
          <img src={logo} alt="holberton logo" />
          <h1>School dashboard</h1>
        </div>
        <div className="App-body">
          <p>Login to access the full dashboard</p>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <button>OK</button>
          
        </div>
        <div className="App-footer">
          <p>Copyright {getCurrentYear()} - {getFooterCopy(true)}</p>
        </div>
      </div>
    </div>
  );
}

export default App;