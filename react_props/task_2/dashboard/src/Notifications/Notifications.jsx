import closeButton from "../assets/close-button.png";
import "./Notifications.css";
import NotificationItem from "./NotificationItem";

function Notifications({ notifications = [] }) {
  return (
    <>
      <div className="notification-items">
        <p>Here is the list of notifications</p>
        <ul>
          {notifications.map((item) => (
            <NotificationItem key={item.id} type={item.type} html={item.html} value={item.value} />
          ))}
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