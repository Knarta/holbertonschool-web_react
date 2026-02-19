import { PureComponent } from 'react'

class NotificationItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    type: 'default',
    value: '',
    html: null
  }

  render() {
    const hasHTML = this.props.html && (typeof this.props.html === 'object' || typeof this.props.html === 'string');

    return (
      <li
        data-notification-type={this.props.type}
        // style={{ color: this.props.type === 'default' ? 'blue' : 'red' }}
        className={
          this.props.type === 'default'
            ? 'text-[var(--default-notification-item)]'
            : 'text-[var(--urgent-notification-item)]'
        }
        onClick={this.props.markAsRead}
        {...(hasHTML ? { dangerouslySetInnerHTML: typeof this.props.html === 'object' ? this.props.html : { __html: this.props.html } } : {})}
      >
        {!hasHTML ? this.props.value : null}
      </li>
    );
  }
}

export default NotificationItem