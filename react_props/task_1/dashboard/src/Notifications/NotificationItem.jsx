function NotificationItem ({ type , html , value }) {
    const style = {
        color: type === "urgent" ? "red" : "blue"
    }

    const text = type === "urgent" ? "New resume available" : "New course available";

    if (html) {
        return (
            <li data-notification-type={type} style={style} dangerouslySetInnerHTML={typeof html === 'object' ? html : { __html: html }}></li>
            );
        }
    else {
        return (
            <li data-notification-type={type} style={style}>{text}</li>
            );
    }
}

export default NotificationItem;