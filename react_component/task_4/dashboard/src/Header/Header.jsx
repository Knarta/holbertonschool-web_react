import holbertonLogo from "../assets/holberton-logo.jpg";

function Header() {
  return (
    <header className="flex border-b-2 border-main">
      <img src={holbertonLogo} alt="holberton logo" className="h-[250px] w-[250px]" />
      <h1 className="flex items-center text-main text-2xl">School dashboard</h1>
    </header>
  );
}

export default Header;