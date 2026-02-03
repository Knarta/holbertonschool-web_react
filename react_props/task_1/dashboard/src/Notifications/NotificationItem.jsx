function NotificationItem ({ type , html , value }) {
    const style = {
        color: type === "urgent" ? "blue" : "red"
    }

    if (html) {
        return (
            <li data-notification-type={type} style={style} dangerouslySetInnerHTML={typeof html === 'object' ? html : { __html: html }}></li>
            );
        }
    else {
        return (
            <li data-notification-type={type} style={style}>{value}</li>
            );
    }
}

export default NotificationItem;