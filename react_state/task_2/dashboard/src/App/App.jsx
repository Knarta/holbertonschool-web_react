import './App.css';
import React from 'react';
import { getLatestNotification } from '../utils/utils.js';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';
import Footer from '../Footer/Footer.jsx';
import CourseList from '../CourseList/CourseList.jsx';
import BodySectionWithMargin from '../BodySection/BodySectionWithMarginBottom.jsx';
import BodySection from '../BodySection/BodySection.jsx';
import newContext from '../Context/context.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
    };
  }

  static defaultProps = {
    logOut: () => {},
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.logout();
    }
  };

  logout = () => {
    this.setState({
      user: { ...this.state.user, isLoggedIn: false },
    });
    this.props.logOut();
  };

  logIn = (email, password) => {
    this.setState({
      user: {
        email,
        password,
        isLoggedIn: true,
      },
    });
  };

  render() {
    const isLoggedIn =
      this.props.isLoggedIn !== undefined
        ? this.props.isLoggedIn
        : this.state.user.isLoggedIn;
    const notificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: getLatestNotification() },
    ];

    const coursesList = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
    ];

    const contextValue = {
      user: this.state.user,
      logOut: this.logout,
    };

    return (
      <newContext.Provider value={contextValue}>
        <Notifications notifications={notificationsList} />
        <Header />
        {isLoggedIn ? (
          <BodySectionWithMargin title="Course list">
            <CourseList courses={coursesList} />
          </BodySectionWithMargin>
        ) : (
          <BodySectionWithMargin title="Log in to continue">
            <Login
              logIn={this.logIn}
              email={this.state.user.email}
              password={this.state.user.password}
            />
          </BodySectionWithMargin>
        )}
        <Footer />
        <BodySectionWithMargin />
        <BodySection title="News from the School">
          <p>Holberton School News goes here</p>
        </BodySection>
      </newContext.Provider>
    );
  }
}

export default App;