import React from 'react';
import { getLatestNotification } from '../utils/utils.js';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';
import Footer from '../Footer/Footer.jsx';
import CourseList from '../CourseList/CourseList.jsx';
import BodySectionWithMargin from '../BodySection/BodySectionWithMarginBottom.jsx';
import BodySection from '../BodySection/BodySection.jsx';

class App extends React.Component {
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

  logout() {
    this.props.logOut();
  }

  render() {
    const { isLoggedIn = false } = this.props;
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
      <div className="min-h-screen flex flex-col w-full px-4 sm:px-6 md:px-8">
        <Notifications notifications={notificationsList} />
        <Header />
        <main className="flex-1 flex flex-col">
          {isLoggedIn ? (
            <BodySectionWithMargin title="Course list">
              <CourseList courses={coursesList} />
            </BodySectionWithMargin>
          ) : (
            <BodySectionWithMargin title="Log in to continue">
              <Login />
            </BodySectionWithMargin>
          )}
          <Footer />
          <BodySectionWithMargin />
          <BodySection title="News from the School">
            <>
            <p>ipsum Lorem ipsum dolor sit amet consectetur, adipisicing elit. Similique, asperiores architecto blanditiis fuga doloribus sit illum aliquid ea distinctio minus accusantium, impedit quo voluptatibus ut magni dicta. Recusandae, quia dicta?</p>
            <p>Holberton School News goes here</p>
          </>
          </BodySection>
        </main>
      </div>
    );
  }
}

export default App;