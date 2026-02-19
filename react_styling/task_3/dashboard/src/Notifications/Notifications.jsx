import { Component } from 'react'
import closeButton from '../assets/close-button.png'
import NotificationItem from './NotificationItem.jsx'

class Notifications extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    notifications: [],
    displayDrawer: true
  }

  markAsRead(id) {
    console.log(`Notification ${id} has been marked as read`)
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.notifications.length !== nextProps.notifications.length) {
      return true
    }
    return false
  }

  render() {
    return (
      <div className='root-notifications fixed top-0 right-0 flex flex-col items-end w-[min(600px,25vw)] min-w-[200px]'>
        <div className='notification-title text-right w-full min-w-[200px] max-w-[600px]'>
          Your notifications
        </div>
        { this.props.displayDrawer ? (
          <>
            { this.props.notifications.length === 0 ? (
              <>
                <div className='notification-items border border-dashed border-[var(--main-color)] w-full min-w-[200px] max-w-[600px] p-[6px]'>
                  <p>no new notification for now</p>
                </div>
              </>
            ) : (
              <>
                <div className='notification-items border border-dashed border-[var(--main-color)] w-full min-w-[200px] max-w-[600px] p-[6px]'>
                  <p>Here is the list of notifications</p>
                  <ul>
                    {
                      this.props.notifications.map(notification => {
                        return <NotificationItem 
                          key={notification.id}
                          type={notification.type}
                          value={notification.value}
                          html={notification.html}
                          markAsRead={() => {this.markAsRead(notification.id)}}
                        />
                      })
                    }
                  </ul>
                </div>
                <button
                  className="w-2 h-2 border-0 bg-transparent absolute top-2.5 right-5 p-0"
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
        )
        }
      </div>
    )
  }
}

export default Notifications