function Login() {
  return (
    <div className="App-body h-full mt-5 ml-5 border-t-2 border-[var(--main-color)] pt-5 max-[640px]:ml-0 max-[640px]:pl-4">
      <p>Login to access the full dashboard</p>
      <form className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-x-4 sm:gap-y-2 max-w-md">
        <label htmlFor="email" className="mr-0 sm:mr-2">Email:</label>
        <input type="email" id="email" autoComplete="email" className="w-full sm:w-auto min-w-0 sm:mr-4 max-[640px]:max-w-full p-2 border border-gray-300 rounded" />
        <label htmlFor="password" className="mr-0 sm:mr-2">Password:</label>
        <input type="password" id="password" autoComplete="current-password" className="w-full sm:w-auto min-w-0 sm:mr-4 max-[640px]:max-w-full p-2 border border-gray-300 rounded" />
      </form>
      <button className="mt-2 px-4 py-2 self-start">OK</button>
    </div>
  );
}

export default Login;