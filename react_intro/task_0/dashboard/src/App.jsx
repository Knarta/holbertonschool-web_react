import './App.css';
import logo from './assets/holberton-logo.jpg';

function App() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <div className="App-header">
        <img src={logo} alt="holberton logo" />
        <h1>School dashboard</h1>
      </div>
      <div className="App-body">
        <p>Login to access the full dashboard</p>
      </div>
      <div className="App-footer">
        <p>Copyright {currentYear} - holberton School</p>
      </div>
    </div>
  );
}

export default App;