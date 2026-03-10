import { useReducer, useCallback, useEffect } from 'react';
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
import { appReducer, initialState, APP_ACTIONS } from './appReducer.js';

const LoginWithLogging = WithLogging(Login);
const CourseListWithLogging = WithLogging(CourseList);

const notificationsCache = { data: null };

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const { displayDrawer, user, notifications, courses } = state;

  useEffect(() => {
    if (notificationsCache.data !== null) {
      dispatch({
        type: APP_ACTIONS.SET_NOTIFICATIONS,
        payload: notificationsCache.data,
      });
      return;
    }
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5173/notifications.json'
        );
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
        dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, payload: data });
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch notifications:', err);
        }
        notificationsCache.data = [];
        dispatch({ type: APP_ACTIONS.SET_NOTIFICATIONS, payload: [] });
      }
    };
    fetchNotifications();
  }, []);

  useEffect(() => {
    if (!user.isLoggedIn) {
      return;
    }
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5173/courses.json'
        );
        const coursesData = response.data.courses || response.data;
        dispatch({ type: APP_ACTIONS.SET_COURSES, payload: coursesData });
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Failed to fetch courses:', err);
        }
        dispatch({ type: APP_ACTIONS.SET_COURSES, payload: [] });
      }
    };
    fetchCourses();
  }, [user.isLoggedIn]);

  const logIn = useCallback((email, password) => {
    dispatch({
      type: APP_ACTIONS.LOGIN,
      payload: { email, password },
    });
  }, []);

  const logOut = useCallback(() => {
    dispatch({ type: APP_ACTIONS.LOGOUT });
  }, []);

  const handleDisplayDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER, payload: true });
  }, []);

  const handleHideDrawer = useCallback(() => {
    dispatch({ type: APP_ACTIONS.TOGGLE_DRAWER, payload: false });
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    console.log(`Notification ${id} has been marked as read`);
    dispatch({ type: APP_ACTIONS.MARK_NOTIFICATION_READ, payload: id });
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.ctrlKey && event.key === 'h') {
        alert('Logging you out');
        logOut();
      }
    },
    [logOut]
  );

  useEffect(() => {
    if (state.notifications !== notificationsCache.data) {
      notificationsCache.data = state.notifications;
    }
  }, [state.notifications]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="flex flex-col min-h-screen relative p-3 tablet:p-0 overflow-x-hidden">
      <Notifications
        notifications={notifications}
        markAsRead={markNotificationAsRead}
        displayDrawer={displayDrawer}
        handleDisplayDrawer={handleDisplayDrawer}
        handleHideDrawer={handleHideDrawer}
      />
      <Header user={user} logOut={logOut} />
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
      <Footer isIndex={false} user={user} />
    </div>
  );
}

export default App;
/* eslint-disable-next-line react-refresh/only-export-components -- needed for test cleanup */
export function resetNotificationsCache() {
  notificationsCache.data = null;
}
