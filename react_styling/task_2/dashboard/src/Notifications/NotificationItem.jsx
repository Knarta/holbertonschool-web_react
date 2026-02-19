import React from 'react';

class NotificationItem extends React.PureComponent {
  handleClick = () => {
    const { id, markAsRead } = this.props;
    console.log(`Notification ${id} has been marked as read`);
    if (markAsRead) {
      markAsRead(id);
    }
  };

  render() {
    const { type = null, html = null, value = null } = this.props;
    const textColorClass =
      type === 'urgent'
        ? 'text-[var(--urgent-notification-item)]'
        : 'text-[var(--default-notification-item)]';

    if (html) {
      return (
        <li
          onClick={this.handleClick}
          data-notification-type={type}
          className={textColorClass}
          dangerouslySetInnerHTML={
            typeof html === 'object' ? html : { __html: html }
          }
        />
      );
    }

    return (
      <li
        onClick={this.handleClick}
        data-notification-type={type}
        className={textColorClass}
      >
        {value}
      </li>
    );
  }
}

export default NotificationItem;