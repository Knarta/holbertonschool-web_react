import closeButton from "../assets/close-button.png";
import "./Notifications.css";
import { getLatestNotification } from "../utils/utils.js";

function Notifications() {
  const markup = { __html: getLatestNotification() };
  return (
    <>
      <div className="notification-items">
        <p>Here is the list of notifications</p>
        <ul>
          <li data-priority="default">New course available</li>
          <li data-priority="urgent">New resume available</li>
          <li data-priority="urgent" dangerouslySetInnerHTML={markup}></li>
        </ul>
      </div>
      <button
        style={{
          width: "8px",
          height: "8px",
          border: "0px",
          background: "none",
          position: "absolute",
          top: "10px",
          right: "20px",
        }}
        aria-label="Close"
        onClick={() => console.log("Close button has been clicked")}
      >
        <img src={closeButton} alt="close-button" />
      </button>
    </>
  );
}

export default Notifications;