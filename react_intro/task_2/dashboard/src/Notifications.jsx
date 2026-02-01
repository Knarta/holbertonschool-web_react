import closeIcon from './assets/close-button.png';
import { getLatestNotification } from './utils.js';


function Notifications() {
    return (
        <div className="notification-items">
            <p>Here is the list of notifications</p>
                <ul>
                    <li data-priority="default">New course available</li>
                    <li data-priority="urgent">New resume available</li>
                    <li data-priority="urgent" dangerouslySetInnerHTML={{ __html: getLatestNotification() }}></li>
                </ul>
                <button aria-label="Close" onClick={() => console.log('Close button has been clicked')}>
                    <img src={closeIcon} alt="close button" />
                </button>
        </div>
     );
}

export default Notifications;