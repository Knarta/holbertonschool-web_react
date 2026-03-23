import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { StyleSheet, css } from 'aphrodite';
import Notifications from './components/Notifications/Notifications';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import CourseList from './pages/CourseList/CourseList';
import { getLatestNotification } from './utils/utils';
import BodySectionWithMarginBottom from './components/BodySectionWithMarginBottom/BodySectionWithMarginBottom';
import BodySection from './components/BodySection/BodySection';
import { login as loginAction, logout as logoutAction } from './features/auth/authSlice';
import {
  setNotifications,
  toggleDrawer,
  markNotificationRead,
} from './features/notifications/notificationsSlice';
import { setCourses } from './features/courses/coursesSlice';

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
  notifications: `${API_BASE_URL}/notifications.json`,
};

const styles = StyleSheet.create({
  app: {
    position: 'relative'
  }
});

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const notifications = useSelector((state) => state.notifications.notifications);
  const displayDrawer = useSelector((state) => state.notifications.displayDrawer);
  const courses = useSelector((state) => state.courses);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(ENDPOINTS.notifications);
        const latestNotif = {
          id: 3,
          type: "urgent",
          html: { __html: getLatestNotification() }
        };

        const currentNotifications = response.data.notifications;
        const indexToReplace = currentNotifications.findIndex(
          notification => notification.id === 3
        );

        const updatedNotifications = [...currentNotifications];
        if (indexToReplace !== -1) {
          updatedNotifications[indexToReplace] = latestNotif;
        } else {
          updatedNotifications.push(latestNotif);
        }

        dispatch(setNotifications(updatedNotifications));
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [dispatch]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(ENDPOINTS.courses);
        dispatch(setCourses(response.data.courses));
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    if (!user.isLoggedIn) {
      dispatch(setCourses([]));
      return;
    }

    fetchCourses();
  }, [user.isLoggedIn, dispatch]);

  const handleDisplayDrawer = useCallback(() => {
    dispatch(toggleDrawer());
  }, [dispatch]);

  const handleHideDrawer = useCallback(() => {
    dispatch(toggleDrawer());
  }, [dispatch]);

  const logIn = (email, password) => {
    dispatch(loginAction({ email, password }));
  };

  const logOut = () => {
    dispatch(logoutAction());
  };

  const markNotificationAsRead = useCallback((id) => {
    dispatch(markNotificationRead(id));
    console.log(`Notification ${id} has been marked as read`);
  }, [dispatch]);

  return (
    <div className={css(styles.app)}>
      <Notifications
        notifications={notifications}
        handleHideDrawer={handleHideDrawer}
        handleDisplayDrawer={handleDisplayDrawer}
        displayDrawer={displayDrawer}
        markNotificationAsRead={markNotificationAsRead}
      />
      <>
        <Header user={user} logOut={logOut} />
        {!user.isLoggedIn ? (
          <BodySectionWithMarginBottom title='Log in to continue'>
            <Login
              logIn={logIn}
              email={user.email}
              password={user.password}
            />
          </BodySectionWithMarginBottom>
        ) : (
          <BodySectionWithMarginBottom title='Course list'>
            <CourseList courses={courses} />
          </BodySectionWithMarginBottom>
        )}
        <BodySection title="News from the School">
          <p>Holberton School news goes here</p>
        </BodySection>
      </>
      <Footer user={user} />
    </div>
  );
}
