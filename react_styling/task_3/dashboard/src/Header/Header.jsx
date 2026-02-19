import holbertonLogo from "../assets/holberton-logo.jpg";

function Header() {
  return (
    <header className="App-header flex border-b-2 border-[var(--main-color)]">
      <img src={holbertonLogo} alt="holberton logo" className="h-[250px] w-[250px]" />
      <h1 className="flex items-center text-[var(--main-color)]">School dashboard</h1>
    </header>
  );
}

export default Header;