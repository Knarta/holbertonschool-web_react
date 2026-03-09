import React, { useState } from 'react';

function Login(props) {
  const { logIn = () => {} } = props;
  const [enableSubmit, setEnableSubmit] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmitEnable = (emailVal, passwordVal) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid = emailVal.length > 0 && regex.test(emailVal);
    const passwordValid = passwordVal.length >= 8;
    setEnableSubmit(emailValid && passwordValid);
  };

  const handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    setFormData((prev) => ({ ...prev, email: newEmail }));
    handleSubmitEnable(newEmail, formData.password);
  };

  const handleChangePassword = (e) => {
    const newPassword = e.target.value;
    setFormData((prev) => ({ ...prev, password: newPassword }));
    handleSubmitEnable(formData.email, newPassword);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    logIn(formData.email, formData.password);
  };

  return (
    <div className="App-body h-full mt-5 ml-5 border-t-2 border-[var(--main-color)] pt-5 max-[640px]:ml-0 max-[640px]:pl-4">
      <p>Login to access the full dashboard</p>
      <form
        className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-x-4 sm:gap-y-2 max-w-md"
        onSubmit={handleLoginSubmit}
      >
        <label htmlFor="email" className="mr-0 sm:mr-2">Email:</label>
        <input
          type="email"
          id="email"
          autoComplete="email"
          className="w-full sm:w-auto min-w-0 sm:mr-4 max-[640px]:max-w-full p-2 border border-gray-300 rounded"
          value={formData.email}
          onChange={handleChangeEmail}
        />
        <label htmlFor="password" className="mr-0 sm:mr-2">Password:</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          className="w-full sm:w-auto min-w-0 sm:mr-4 max-[640px]:max-w-full p-2 border border-gray-300 rounded"
          value={formData.password}
          onChange={handleChangePassword}
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 self-start"
          disabled={!enableSubmit}
        >
          OK
        </button>
      </form>
    </div>
  );
}

export default Login;
