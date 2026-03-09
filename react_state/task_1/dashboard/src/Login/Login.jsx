import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      email: '',
      password: '',
      enableSubmit: false,
    };
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.setState({ isLoggedIn: true });
  };

  handleChangeEmail = (e) => {
    const newEmail = e.target.value;
    this.setState({ email: newEmail }, this.handleSubmitEnable);
  };

  handleChangePassword = (e) => {
    const newPassword = e.target.value;
    this.setState({ password: newPassword }, this.handleSubmitEnable);
  };

  handleSubmitEnable = () => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailValid =
      this.state.email.length > 0 && regex.test(this.state.email);
    const passwordValid = this.state.password.length >= 8;
    if (emailValid && passwordValid) this.setState({ enableSubmit: true });
    else this.setState({ enableSubmit: false });
  };

  render() {
    return (
      <div className="App-body border-t-2 border-(--main-color) h-full">
        <p className="mt-5 tablet:ml-10">Login to access the full dashboard</p>
        <form
          className="tablet:ml-10 mt-5 flex flex-col justify-between tablet:block"
          onSubmit={this.handleLoginSubmit}
        >
          <label htmlFor="email">Email</label>
          <input
            className="w-50 tablet:w-57 border border-black tablet:ml-1.5 rounded p-1 tablet:mt-0 mt-1.5"
            type="email"
            id="email"
            autoComplete="email"
            value={this.state.email}
            onChange={this.handleChangeEmail}
          />
          <label
            className="tablet:ml-1.5 tablet:mt-0 mt-1.5"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-50 tablet:w-57 border border-black tablet:ml-1.5 rounded p-1 tablet:mt-0 mt-1.5"
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.handleChangePassword}
          />
          <input
            type="submit"
            value="OK"
            className="tablet:ml-1.5 tablet:mt-0 mt-1.5 w-8 h-8 cursor-pointer border border-black rounded p-1 text-base font-medium text-center disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!this.state.enableSubmit}
          />
        </form>
      </div>
    );
  }
}

export default Login;