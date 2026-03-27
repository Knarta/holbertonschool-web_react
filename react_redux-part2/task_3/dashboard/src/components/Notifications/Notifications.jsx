import { memo, useCallback, useRef, useState } from 'react';
import { StyleSheet, css } from 'aphrodite';
import closeIcon from '../../assets/close-icon.png';
import NotificationItem from '../NotificationItem/NotificationItem';
import { useSelector, useDispatch } from 'react-redux';
import { markNotificationAsRead } from '../../features/notifications/notificationsSlice';
import { getFilteredNotifications } from '../../features/selectors/notificationSelector';

const opacityKeyframes = {
  from: {
    opacity: 0.5,
  },
  to: {
    opacity: 1,
  },
};

const bounceKeyframes = {
  '0%': {
    transform: 'translateY(0px)',
  },
  '50%': {
    transform: 'translateY(-5px)',
  },
  '100%': {
    transform: 'translateY(5px)',
  },
};

const styles = StyleSheet.create({
  notificationItems: {
    position: 'relative',
    border: '3px dotted #e1003c',
    padding: '5px',
    fontFamily: 'Roboto, sans-serif',
    width: '25%',
    float: 'right',
    marginTop: '20px',
    opacity: 0,
    visibility: 'hidden',
    '@media (max-width: 900px)': {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      border: 'none',
      padding: 0,
      margin: 0,
      fontSize: '20px',
      backgroundColor: 'white',
      zIndex: 1000,
    },
  },
  visible: {
    opacity: 1,
    visibility: 'visible',
  },
  ul: {
    '@media (max-width: 900px)': {
      padding: 0,
    },
  },
  p: {
    margin: 0,
    '@media (max-width: 900px)': {
      fontSize: '20px',
    },
  },
  button: {
    position: 'absolute',
    cursor: 'pointer',
    right: 'calc(0% - 480px)',
    top: 'calc(0% - 480px)',
    background: 'transparent',
    transform: 'scale(0.012)',
    WebkitTransform: 'scale(0.012)',
    MozTransform: 'scale(0.012)',
    msTransform: 'scale(0.012)',
    OTransform: 'scale(0.012)',
  },
  menuItem: {
    float: 'right',
    position: 'absolute',
    right: '10px',
    top: '-5px',
    backgroundColor: '#fff8f8',
    cursor: 'pointer',
    ':hover': {
      animationName: [opacityKeyframes, bounceKeyframes],
      animationDuration: '1s, 0.5s',
      animationIterationCount: '3, 3',
    },
  },
  filterButton: {
    marginRight: '5px',
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    fontSize: '16px',
  },
});

const Notifications = memo(function Notifications() {
  const dispatch = useDispatch();
  const [currentFilter, setCurrentFilter] = useState('all');
  const filteredNotifications = useSelector((state) =>
    getFilteredNotifications(state, currentFilter),
  );
  const loading = useSelector((state) => state.notifications.loading);
  const drawerRef = useRef(null);

  const handleToggleDrawer = useCallback(() => {
    if (drawerRef.current) {
      const visibleClass = css(styles.visible);
      drawerRef.current.classList.toggle(visibleClass);
    }
  }, []);

  const handleMarkNotificationAsRead = useCallback(
    (id) => {
      dispatch(markNotificationAsRead(id));
    },
    [dispatch],
  );

  const handleSetFilterUrgent = useCallback(() => {
    setCurrentFilter((prev) => (prev === 'urgent' ? 'all' : 'urgent'));
  }, []);

  const handleSetFilterDefault = useCallback(() => {
    setCurrentFilter((prev) => (prev === 'default' ? 'all' : 'default'));
  }, []);

  return (
    <>
      <div className={css(styles.menuItem)} onClick={handleToggleDrawer}>
        Your notifications
      </div>
      <div ref={drawerRef} className={css(styles.notificationItems)}>
        {loading ? (
          <p className={css(styles.p)}>Loading...</p>
        ) : filteredNotifications.length > 0 ? (
          <>
            <p className={css(styles.p)}>
              Here is the list of notifications
              <button
                className={css(styles.filterButton)}
                onClick={handleSetFilterUrgent}
                aria-label="Filter urgent"
              >
                ‼️
              </button>
              <button
                className={css(styles.filterButton)}
                onClick={handleSetFilterDefault}
                aria-label="Filter default"
              >
                💠
              </button>
            </p>
            <button
              onClick={handleToggleDrawer}
              aria-label="Close"
              className={css(styles.button)}
            >
              <img src={closeIcon} alt="close icon" />
            </button>
            <ul className={css(styles.ul)}>
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  id={notification.id}
                  key={notification.id}
                  type={notification.type}
                  value={notification.value}
                  markAsRead={handleMarkNotificationAsRead}
                />
              ))}
            </ul>
          </>
        ) : (
          <p className={css(styles.p)}>No new notifications for now</p>
        )}
      </div>
    </>
  );
});

export default Notifications;
