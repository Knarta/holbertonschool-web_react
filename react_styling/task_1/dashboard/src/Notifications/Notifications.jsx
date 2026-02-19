import React from 'react';
import closeButton from '../assets/close-button.png';
import './Notifications.css';
import NotificationItem from './NotificationItem.jsx';

class Notifications extends React.Component {
  static defaultProps = {
    notifications: [],
    displayDrawer: true,
    markAsRead: () => {},
  };

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  shouldComponentUpdate(nextProps) {
    return (
      this.props.notifications !== nextProps.notifications ||
      this.props.displayDrawer !== nextProps.displayDrawer
    );
  }

  render() {
    return (
      <div className="root-notifications">
        <div className="notifications-title">
          <p>Your notifications</p>
        </div>
        {this.props.displayDrawer && (
          <>
            <div className="notification-items">
              {this.props.notifications.length === 0 ? (
                <p>No new notification for now</p>
              ) : (
                <>
                  <p>Here is the list of notifications</p>
                  <ul>
                    {this.props.notifications.map((notif) => (
                      <NotificationItem
                        key={notif.id}
                        id={notif.id}
                        type={notif.type}
                        value={notif.value}
                        html={notif.html}
                        markAsRead={this.markAsRead}
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
  }
}

export default Notifications;