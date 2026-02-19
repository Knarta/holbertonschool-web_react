function Login() {
  return (
    <div className="h-full mt-5 ml-5 border-t-2 border-main pt-5">
      <p>Login to access the full dashboard</p>
      <form className="flex flex-wrap items-center gap-2">
        <label htmlFor="email" className="mr-2">Email:</label>
        <input type="email" id="email" autoComplete="email" className="mr-4 p-1 border rounded" />
        <label htmlFor="password" className="mr-2">Password:</label>
        <input type="password" id="password" autoComplete="current-password" className="mr-4 p-1 border rounded" />
      </form>
      <button className="mt-2 px-4 py-2">OK</button>
    </div>
  );
}

export default Login;