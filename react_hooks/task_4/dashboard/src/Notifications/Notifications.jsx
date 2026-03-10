import React from 'react';
import closeButton from '../assets/close-button.png';
import NotificationItem from './NotificationItem.jsx';

function Notifications({
  notifications = [],
  displayDrawer = false,
  markAsRead,
  handleDisplayDrawer,
  handleHideDrawer,
}) {
  return (
    <>
      <div className="root-notifications absolute left-0 right-0 flex flex-col items-end z-50 pt-2 pr-4">
        <div
          className={`notification-title cursor-pointer ${notifications.length > 0 && !displayDrawer ? 'animate-bounce' : ''}`}
          onClick={handleDisplayDrawer}
        >
          <p className="mb-1.5 text-right text-xs tablet:text-base">
            Your notifications
          </p>
        </div>

        {displayDrawer && (
          <div className="fixed inset-0 z-50 bg-white tablet:relative tablet:inset-auto tablet:bg-transparent tablet:w-1/4 tablet:border-2 tablet:border-dashed tablet:border-(--main-color) tablet:p-1.5">
            <div className="w-full h-full p-4 overflow-auto border-2 border-dashed border-(--main-color) tablet:border-0 tablet:p-0">
              {notifications.length === 0 ? (
                <p className="mb-4 tablet:mb-0">No new notification for now</p>
              ) : (
                <>
                  <p className="mb-4 tablet:mb-0">
                    Here is the list of notifications
                  </p>
                  <ul className="list-disc p-1 pl-6 tablet:pl-4">
                    {notifications.map((notif, index) => (
                      <NotificationItem
                        key={notif.id ?? index}
                        id={notif.id}
                        type={notif.type}
                        value={notif.value}
                        html={notif.html}
                        markAsRead={markAsRead}
                      />
                    ))}
                  </ul>
                </>
              )}
            </div>
            <button
              className="close-button fixed top-4 right-4 w-3 h-3 tablet:w-4 tablet:h-4 tablet:top-12 tablet:right-7 border-0 bg-transparent cursor-pointer z-[1000]"
              aria-label="Close"
              onClick={handleHideDrawer}
            >
              <img
                className="w-full h-full"
                src={closeButton}
                alt="close-button"
              />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default React.memo(Notifications);