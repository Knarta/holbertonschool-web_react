function NotificationItem({ type, html, value }) {
    const style = {
      color: type === "urgent" ? "red" : "blue",
    };
  
    if (html) {
      return (
        <li
          data-notification-type={type}
          style={style}
          dangerouslySetInnerHTML={typeof html === "object" ? html : { __html: html }}
        />
      );
    } else {
      return (
        <li data-notification-type={type} style={style}>
          {value}
        </li>
      );
    }
  }
  
  export default NotificationItem;
  