import React from 'react';

class Login extends React.Component {
  static defaultProps = {
    email: '',
    password: '',
    logIn: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.email,
      password: this.props.password,
      enableSubmit: false,
    };
  }

  handleLoginSubmit = (e) => {
    e.preventDefault();
    this.props.logIn(this.state.email, this.state.password);
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
      <div className="App-body h-full mt-5 ml-5 border-t-2 border-[var(--main-color)] pt-5 max-[640px]:ml-0 max-[640px]:pl-4">
        <p>Login to access the full dashboard</p>
        <form
          className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-x-4 sm:gap-y-2 max-w-md"
          onSubmit={this.handleLoginSubmit}
        >
          <label htmlFor="email" className="mr-0 sm:mr-2">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            className="w-full sm:w-auto min-w-0 sm:mr-4 max-[640px]:max-w-full p-2 border border-gray-300 rounded"
            value={this.state.email}
            onChange={this.handleChangeEmail}
          />
          <label htmlFor="password" className="mr-0 sm:mr-2">Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            className="w-full sm:w-auto min-w-0 sm:mr-4 max-[640px]:max-w-full p-2 border border-gray-300 rounded"
            value={this.state.password}
            onChange={this.handleChangePassword}
          />
          <button
            type="submit"
            className="mt-2 px-4 py-2 self-start"
            disabled={!this.state.enableSubmit}
          >
            OK
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
