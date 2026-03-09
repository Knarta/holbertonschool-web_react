import React from 'react';
import { getLatestNotification } from '../utils/utils.js';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';
import Footer from '../Footer/Footer.jsx';
import CourseList from '../CourseList/CourseList.jsx';
import BodySectionWithMargin from '../BodySection/BodySectionWithMarginBottom.jsx';
import BodySection from '../BodySection/BodySection.jsx';
import WithLogging from '../HOC/WithLogging.jsx';
import newContext from '../Context/context.js';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayDrawer: false,
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
      logOut: this.logOut,
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.logOut();
    }
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

  logOut = () => {
    this.setState({
      user: {
        email: '',
        password: '',
        isLoggedIn: false,
      },
    });
  };

  handleDisplayDrawer = () => {
    this.setState({ displayDrawer: true });
  };

  handleHideDrawer = () => {
    this.setState({ displayDrawer: false });
  };

  render() {
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

    return (
      <newContext.Provider
        value={{ user: this.state.user, logOut: this.state.logOut }}
      >
        <div className="flex flex-col min-h-screen relative p-3 tablet:p-0 overflow-x-hidden">
          <Notifications
            notifications={notificationsList}
            displayDrawer={this.state.displayDrawer}
            handleDisplayDrawer={this.handleDisplayDrawer}
            handleHideDrawer={this.handleHideDrawer}
          />
          <Header />
          <main className="flex-1 flex flex-col">
            <div className="flex-1 flex flex-col">
              {this.state.user.isLoggedIn ? (
                <BodySectionWithMargin title="Course list">
                  <CourseListWithLogging courses={coursesList} />
                </BodySectionWithMargin>
              ) : (
                <BodySectionWithMargin title="Log in to continue">
                  <LoginWithLogging
                    logIn={this.logIn}
                    email={this.state.user.email}
                    password={this.state.user.password}
                  />
                </BodySectionWithMargin>
              )}
            </div>
            <BodySectionWithMargin>
              <BodySection title="News from the School">
                <p className="text-xs tablet:text-sm desktop:text-base">
                  Holberton School News goes here
                </p>
              </BodySection>
            </BodySectionWithMargin>
          </main>
          <Footer isIndex={false} />
        </div>
      </newContext.Provider>
    );
  }
}

export default App;