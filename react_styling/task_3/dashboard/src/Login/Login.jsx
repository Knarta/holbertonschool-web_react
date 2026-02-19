function Login() {
  return (
    <div className="App-body h-full mt-5 ml-5 border-t-2 border-[var(--main-color)] pt-5">
      <p>Login to access the full dashboard</p>
      <form className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <label htmlFor="email" className="mr-2">Email:</label>
        <input type="email" id="email" autoComplete="email" className="mr-4" />
        <label htmlFor="password" className="mr-2">Password:</label>
        <input type="password" id="password" autoComplete="current-password" className="mr-4" />
      </form>
      <button>OK</button>
    </div>
  );
}

export default Login;