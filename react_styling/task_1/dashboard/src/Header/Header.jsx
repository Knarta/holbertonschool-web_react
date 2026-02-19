import holbertonLogo from "../assets/holberton-logo.jpg";
import "./Header.css";

function Header() {
  return (
    <header className="App-header">
      <img src={holbertonLogo} alt="holberton logo" />
      <h1>School dashboard</h1>
    </header>
  );
}

export default Header;