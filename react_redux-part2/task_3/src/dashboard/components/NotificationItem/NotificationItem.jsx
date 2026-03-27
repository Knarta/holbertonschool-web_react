import { memo } from 'react';

const NotificationItem = memo(function NotificationItem({
  type,
  value,
  markAsRead,
  id,
}) {
  return (
    <li
      style={{ color: type === 'urgent' ? 'red' : 'blue' }}
      data-notification-type={type}
      onClick={() => markAsRead(id)}
    >
      {value}
    </li>
  );
});

export default NotificationItem;
