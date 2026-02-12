import closeButton from '../assets/close-button.png';
import './Notifications.css';
import NotificationItem from './NotificationItem.jsx';

class Notifications extends React.Component {
  static defaultProps = {
    markAsRead: () => {},
  };

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }
  
  render () {
  const { notifications = [], displayDrawer = true } = this.props;
  return (
    <div className="root-notifications">
      <div className="notifications-title">
        <p>Your notifications</p>
      </div>
      {displayDrawer && (
        <>
          <div className="notification-items">
            {notifications.length === 0 ? (
              <p>No new notification for now</p>
            ) : (
              <>
                <p>Here is the list of notifications</p>
                <ul>
                  {notifications.map((notif) => (
                    <NotificationItem
                      key={notif.id}
                      type={notif.type}
                      value={notif.value}
                      html={notif.html}
                    />
                  ))}
                </ul>
              </>
            )}
          </div>
          <button
            className="close-button"
            aria-label="Close"
            onClick={() => console.log('Close button has been clicked')}
          >
            <img src={closeButton} alt="close-button" />
          </button>
        </>
      )}
    </div>
  );
}}


export default Notifications;