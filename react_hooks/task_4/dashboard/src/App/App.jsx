import React, { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';
import Footer from '../Footer/Footer.jsx';
import CourseList from '../CourseList/CourseList.jsx';
import BodySectionWithMargin from '../BodySection/BodySectionWithMarginBottom.jsx';
import BodySection from '../BodySection/BodySection.jsx';
import WithLogging from '../HOC/WithLogging.jsx';
import AppContext from '../Context/context.js';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

const defaultUser = {
  email: '',
  password: '',
  isLoggedIn: false,
};

const coursesList = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState(defaultUser);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios.get('/notifications.json').then((response) => {
      const data = response.data;
      const list = Array.isArray(data) ? data : (data?.list ?? []);
      setNotifications(list);
    }).catch(() => {
      setNotifications([]);
    });
  }, []);

  const logIn = useCallback((email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true,
    });
  }, []);

  const logOut = useCallback(() => {
    setUser({
      email: '',
      password: '',
      isLoggedIn: false,
    });
  }, []);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  return (
    <AppContext.Provider value={{ user, logOut }}>
      <div className="flex flex-col min-h-screen relative p-3 tablet:p-0 overflow-x-hidden">
        <Notifications
          notifications={notifications}
          markAsRead={markNotificationAsRead}
          displayDrawer={displayDrawer}
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
        />
        <Header />
        <main className="flex-1 flex flex-col">
          <div className="flex-1 flex flex-col">
            {user.isLoggedIn ? (
              <BodySectionWithMargin title="Course list">
                <CourseListWithLogging courses={coursesList} />
              </BodySectionWithMargin>
            ) : (
              <BodySectionWithMargin title="Log in to continue">
                <LoginWithLogging
                  logIn={logIn}
                  email={user.email}
                  password={user.password}
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
    </AppContext.Provider>
  );
}

export default App;
