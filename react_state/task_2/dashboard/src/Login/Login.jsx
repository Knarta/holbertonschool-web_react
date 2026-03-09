import './Login.css';
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
      <div className="App-body">
        <p>Login to access the full dashboard</p>
        <form onSubmit={this.handleLoginSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            autoComplete="email"
            value={this.state.email}
            onChange={this.handleChangeEmail}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.password}
            onChange={this.handleChangePassword}
          />
          <button type="submit" disabled={!this.state.enableSubmit}>
            OK
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
