import { PureComponent } from 'react'

class NotificationItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    type: 'default',
    value: '',
    html: null,
    markAsRead: () => {},
  }

  handleClick = () => {
    const { id, markAsRead } = this.props;
    console.log(`Notification ${id} has been marked as read`);
    markAsRead(id);
  }

  render() {
    const hasHTML = this.props.html && (typeof this.props.html === 'object' || typeof this.props.html === 'string');

    const colorStyle = {
      color: this.props.type === 'urgent' ? 'red' : 'blue',
    };

    return (
      <li
        data-notification-type={this.props.type}
        style={colorStyle}
        className={
          this.props.type === 'default'
            ? 'text-[var(--default-notification-item)]'
            : 'text-[var(--urgent-notification-item)]'
        }
        onClick={this.handleClick}
        {...(hasHTML ? { dangerouslySetInnerHTML: typeof this.props.html === 'object' ? this.props.html : { __html: this.props.html } } : {})}
      >
        {!hasHTML ? this.props.value : null}
      </li>
    );
  }
}

export default NotificationItem