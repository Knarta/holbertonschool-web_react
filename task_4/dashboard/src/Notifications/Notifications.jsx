import React from 'react';
import closeButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem.jsx';

class Notifications extends React.Component {
  static defaultProps = {
    markAsRead: () => {},
  };

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`);
  }

  render() {
    const { notifications = [], displayDrawer = true } = this.props;
    return (
      <div>
        <div>
          <p>Your notifications</p>
        </div>
        {displayDrawer && (
          <>
            <div className="border-2 border-dotted border-main pl-2">
              {notifications.length === 0 ? (
                <p>No new notification for now</p>
              ) : (
                <>
                  <p>Here is the list of notifications</p>
                  <ul>
                    {notifications.map((notif) => (
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
              className="inline-block w-2 h-2"
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