import React from 'react';

function NotificationItem({
  id,
  type = 'default',
  html = null,
  value = null,
  markAsRead,
}) {
  const handleClick = () => {
    console.log(`Notification ${id} has been marked as read`);
    if (markAsRead) {
      markAsRead(id);
    }
  };

  const hasHTML =
    html && (typeof html === 'object' || typeof html === 'string');

  const colorClass =
    type === 'default'
      ? 'text-[var(--default-notification-item)]'
      : 'text-[var(--urgent-notification-item)]';

  return (
    <>
      <li
        onClick={handleClick}
        data-notification-type={type}
        className={`tablet:text-base text-base ${colorClass}`}
        {...(hasHTML
          ? {
              dangerouslySetInnerHTML:
                typeof html === 'object' ? html : { __html: html },
            }
          : {})}
      >
        {!hasHTML ? value : null}
      </li>
      <span className="block tablet:hidden h-px w-full -ml-1 bg-black mt-2 mb-2"></span>
    </>
  );
}

export default React.memo(NotificationItem);