import { useState, useCallback, useEffect, useMemo } from 'react';
import axios from 'axios';
import { getLatestNotification } from '../utils/utils.js';
import Notifications from '../Notifications/Notifications.jsx';
import Header from '../Header/Header.jsx';
import Login from '../Login/Login.jsx';
import Footer from '../Footer/Footer.jsx';
import CourseList from '../CourseList/CourseList.jsx';
import BodySectionWithMargin from '../BodySection/BodySectionWithMarginBottom.jsx';
import BodySection from '../BodySection/BodySection.jsx';
import WithLogging from '../HOC/WithLogging.jsx';
import AppContext, { defaultUser } from '../Context/context.js';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

const notificationsCache = { data: null };

function App() {
  const [displayDrawer, setDisplayDrawer] = useState(true);
  const [user, setUser] = useState({ ...defaultUser });
  const [notifications, setNotifications] = useState(
    () => notificationsCache.data ?? []
  );
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (notificationsCache.data !== null) {
      return;
    }
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5173/notifications.json');
        const rawData = response.data.notifications || response.data;
        const data = rawData.map((notif) => {
          if (notif.type === 'urgent' && !notif.value && !notif.html) {
            return { ...notif, html: { __html: getLatestNotification() } };
          }
          if (notif.id === 3) {
            return { ...notif, html: { __html: getLatestNotification() } };
          }
          return notif;
        });
        notificationsCache.data = data;
        setNotifications(data);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch notifications:', err);
        }
        notificationsCache.data = [];
        setNotifications([]);
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!user.isLoggedIn) {
      setCourses([]);
      return;
    }
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5173/courses.json');
        const coursesData = response.data.courses || response.data;
        setCourses(coursesData);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch courses:', err);
        }
        setCourses([]);
      }
    };
    fetchCourses();
  }, [user.isLoggedIn]);

  const logIn = useCallback((email, password) => {
    setUser({
      email,
      password,
      isLoggedIn: true,
    });
  }, []);

  const logOut = useCallback(() => {
    setUser({ ...defaultUser });
  }, []);

  const handleDisplayDrawer = useCallback(() => {
    setDisplayDrawer(true);
  }, []);

  const handleHideDrawer = useCallback(() => {
    setDisplayDrawer(false);
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    setNotifications((prev) => {
      const next = prev.filter((notif) => notif.id !== id);
      notificationsCache.data = next;
      return next;
    });
  }, []);

  const handleKeyDown = useCallback((event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      logOut();
    }
  }, [logOut]);

  const contextValue = useMemo(() => ({
    user,
    logOut
  }), [user, logOut]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <AppContext.Provider value={contextValue}>
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
                <CourseListWithLogging courses={courses} />
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
/* eslint-disable-next-line react-refresh/only-export-components -- needed for test cleanup */
export function resetNotificationsCache() {
  notificationsCache.data = null;
}