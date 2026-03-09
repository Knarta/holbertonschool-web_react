import { PureComponent } from 'react';
import closeButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem.jsx';

class Notifications extends PureComponent {
  static defaultProps = {
    notifications: [],
    displayDrawer: true,
    markNotificationAsRead: () => {},
  };

  render() {
    const { notifications, displayDrawer, markNotificationAsRead } = this.props;

    return (
      <div className='root-notifications fixed top-0 right-0 flex flex-col items-end w-[min(600px,25vw)] min-w-[200px] max-[912px]:inset-0 max-[912px]:w-full max-[912px]:min-w-0 max-[912px]:h-full max-[912px]:z-50'>
        <div className='notification-title text-right w-full min-w-[200px] max-w-[600px] max-[912px]:max-w-none'>
          Your notifications
        </div>
        {displayDrawer ? (
          <>
            {notifications.length === 0 ? (
              <>
                <div className='notification-items border border-dashed border-[var(--main-color)] w-full min-w-[200px] max-w-[600px] p-[6px] max-[912px]:max-w-none max-[912px]:min-w-0 max-[912px]:p-3 max-[912px]:m-3 max-[912px]:flex-1 max-[912px]:overflow-auto'>
                  <p>no new notification for now</p>
                </div>
              </>
            ) : (
              <>
                <div className='notification-items border border-dashed border-[var(--main-color)] w-full min-w-[200px] max-w-[600px] p-[6px] max-[912px]:max-w-none max-[912px]:min-w-0 max-[912px]:p-3 max-[912px]:m-3 max-[912px]:flex-1 max-[912px]:overflow-auto max-[912px]:relative'>
                  <p>Here is the list of notifications</p>
                  <ul className='max-[912px]:list-disc max-[912px]:pl-6 max-[912px]:space-y-3 max-[912px]:mt-2'>
                    {notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        id={notification.id}
                        type={notification.type}
                        value={notification.value}
                        html={notification.html}
                        markAsRead={markNotificationAsRead}
                      />
                    ))}
                  </ul>
                </div>
                <button
                  className="w-2 h-2 border-0 bg-transparent absolute top-2.5 right-5 p-0 max-[912px]:top-3 max-[912px]:right-3 max-[912px]:z-10"
                  aria-label='Close'
                  onClick={() => console.log('Close button has been clicked')}
                >
                  <img src={closeButton} alt='close-button' className="w-2 h-2" />
                </button>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
}

export default Notifications;
