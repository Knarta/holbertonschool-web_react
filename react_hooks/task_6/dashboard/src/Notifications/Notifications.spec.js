import '@testing-library/jest-dom';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import Notifications from './Notifications.jsx';
import { getLatestNotification } from '../utils/utils.js';

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  {
    id: 3,
    type: 'urgent',
    value: 'Urgent requirement - complete by EOD',
    html: getLatestNotification(),
  },
];

afterEach(() => {
  cleanup();
});

describe('Notifications component - displayDrawer is false', () => {
  test('should display "Your notifications" text', () => {
    render(
      <Notifications displayDrawer={false} notifications={notificationsList} />,
    );
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });

  test('should not display close button', () => {
    render(
      <Notifications displayDrawer={false} notifications={notificationsList} />,
    );
    expect(screen.queryByLabelText(/close/i)).not.toBeInTheDocument();
  });

  test('should not display "Here is the list of notifications" text', () => {
    render(
      <Notifications displayDrawer={false} notifications={notificationsList} />,
    );
    expect(
      screen.queryByText(/Here is the list of notifications/i),
    ).not.toBeInTheDocument();
  });

  test('should not display notification items', () => {
    render(
      <Notifications displayDrawer={false} notifications={notificationsList} />,
    );
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('clicking on the menu item calls handleDisplayDrawer', () => {
    const handleDisplayDrawer = jest.fn();
    render(
      <Notifications
        displayDrawer={false}
        notifications={notificationsList}
        handleDisplayDrawer={handleDisplayDrawer}
      />,
    );
    fireEvent.click(screen.getByText(/Your notifications/i));
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });
});

describe('Notifications component - displayDrawer is true', () => {
  test('should display "Your notifications" text', () => {
    render(
      <Notifications displayDrawer={true} notifications={notificationsList} />,
    );
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });

  test('should display close button', () => {
    render(
      <Notifications displayDrawer={true} notifications={notificationsList} />,
    );
    expect(screen.getByLabelText(/close/i)).toBeInTheDocument();
  });

  test('should display "Here is the list of notifications" text', () => {
    render(
      <Notifications displayDrawer={true} notifications={notificationsList} />,
    );
    expect(
      screen.getByText(/Here is the list of notifications/i),
    ).toBeInTheDocument();
  });

  test('should render 3 notification items with appropriate text', () => {
    render(
      <Notifications displayDrawer={true} notifications={notificationsList} />,
    );
    const items = screen.getAllByRole('listitem');

    expect(items).toHaveLength(3);

    expect(items[0]).toHaveTextContent('New course available');
    expect(items[0]).toHaveAttribute('data-notification-type', 'default');
    expect(items[0]).toHaveStyle({ color: 'var(--default-notification-item)' });

    expect(items[1]).toHaveTextContent('New resume available');
    expect(items[1]).toHaveAttribute('data-notification-type', 'urgent');
    expect(items[1]).toHaveStyle({ color: 'var(--urgent-notification-item)' });

    expect(items[2]).toHaveTextContent('Urgent requirement - complete by EOD');
    expect(items[2]).toHaveAttribute('data-notification-type', 'urgent');
    expect(items[2]).toHaveStyle({ color: 'var(--urgent-notification-item)' });

    const strongElement = items[2].querySelector('strong');
    expect(strongElement).toBeInTheDocument();
    expect(strongElement).toHaveTextContent('Urgent requirement');
  });

  test('clicking on the close button calls handleHideDrawer', () => {
    const handleHideDrawer = jest.fn();
    render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
        handleHideDrawer={handleHideDrawer}
      />,
    );
    fireEvent.click(screen.getByLabelText(/close/i));
    expect(handleHideDrawer).toHaveBeenCalled();
  });

  test('should call markAsRead prop when notification item is clicked', () => {
    const mockMarkAsRead = jest.fn();
    render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
        markAsRead={mockMarkAsRead}
      />,
    );

    const items = screen.getAllByRole('listitem');
    fireEvent.click(items[0]);

    expect(mockMarkAsRead).toHaveBeenCalledWith(1);
  });

  test('should log correct message when notification item is clicked', () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});
    render(
      <Notifications displayDrawer={true} notifications={notificationsList} />,
    );

    const items = screen.getAllByRole('listitem');
    fireEvent.click(items[0]);

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read',
    );

    consoleLogSpy.mockRestore();
  });
});

describe('Notifications component - displayDrawer is true and notifications is empty', () => {
  test('should display "Your notifications" text', () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });

  test('should display "No new notification for now" text', () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);
    expect(
      screen.getByText(/No new notification for now/i),
    ).toBeInTheDocument();
  });

  test('should not display "Here is the list of notifications" text', () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);
    expect(
      screen.queryByText(/Here is the list of notifications/i),
    ).not.toBeInTheDocument();
  });

  test('should not display notification items', () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('React.memo: does not re-render if props remain the same', () => {
    const { rerender } = render(
      <Notifications displayDrawer={true} notifications={notificationsList} />,
    );
    // Verify initial render shows 3 items
    expect(screen.getAllByRole('listitem')).toHaveLength(3);

    // Rerender with the exact same props - should remain 3 items
    rerender(
      <Notifications displayDrawer={true} notifications={notificationsList} />,
    );

    // React.memo should not re-render because props are identical
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });

  test('React.memo: re-renders when props change', () => {
    const { rerender } = render(
      <Notifications displayDrawer={true} notifications={notificationsList} />,
    );
    // Verify initial render shows 3 items
    expect(screen.getAllByRole('listitem')).toHaveLength(3);

    // Rerender with different notifications array
    const newNotificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
    ];
    rerender(
      <Notifications
        displayDrawer={true}
        notifications={newNotificationsList}
      />,
    );

    // React.memo should re-render because notifications prop changed
    // Verify the UI updated to show only 1 item
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
  });
});