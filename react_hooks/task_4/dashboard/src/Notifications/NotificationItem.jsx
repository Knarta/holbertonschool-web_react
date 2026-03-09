import React, { memo } from 'react';

function NotificationItem({
  type = 'default',
  value = '',
  html = null,
  id,
  markAsRead = () => {},
}) {
  const hasHTML = html && (typeof html === 'object' || typeof html === 'string');
  const colorStyle = {
    color: type === 'urgent' ? 'red' : 'blue',
  };

  const handleClick = () => {
    if (markAsRead && id !== undefined) {
      markAsRead(id);
    }
  };

  return (
    <li
      data-notification-type={type}
      style={colorStyle}
      className={
        (type === 'default'
          ? 'text-[var(--default-notification-item)]'
          : 'text-[var(--urgent-notification-item)]') +
        ' text-sm sm:text-base max-[912px]:text-base max-[912px]:py-2 max-[912px]:px-2 max-[912px]:border-b max-[912px]:border-gray-200 max-[912px]:last:border-b-0'
      }
      onClick={handleClick}
      {...(hasHTML
        ? {
            dangerouslySetInnerHTML:
              typeof html === 'object' ? html : { __html: html },
          }
        : {})}
    >
      {!hasHTML ? value : null}
    </li>
  );
}

export default memo(NotificationItem);
