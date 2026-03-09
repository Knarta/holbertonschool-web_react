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
      <Notifications
        displayDrawer={false}
        notifications={notificationsList}
        markNotificationAsRead={() => {}}
      />,
    );
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });

  test('should not display close button', () => {
    render(
      <Notifications
        displayDrawer={false}
        notifications={notificationsList}
        markNotificationAsRead={() => {}}
      />,
    );
    expect(screen.queryByLabelText(/close/i)).not.toBeInTheDocument();
  });

  test('should not display "Here is the list of notifications" text', () => {
    render(
      <Notifications
        displayDrawer={false}
        notifications={notificationsList}
        markNotificationAsRead={() => {}}
      />,
    );
    expect(
      screen.queryByText(/Here is the list of notifications/i),
    ).not.toBeInTheDocument();
  });

  test('should not display notification items', () => {
    render(
      <Notifications
        displayDrawer={false}
        notifications={notificationsList}
        markNotificationAsRead={() => {}}
      />,
    );
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});

describe('Notifications component - displayDrawer is true', () => {
  test('should display "Your notifications" text', () => {
    render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
        markNotificationAsRead={() => {}}
      />,
    );
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });

  test('should display close button', () => {
    render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
        markNotificationAsRead={() => {}}
      />,
    );
    expect(screen.getByLabelText(/close/i)).toBeInTheDocument();
  });

  test('should display "Here is the list of notifications" text', () => {
    render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
        markNotificationAsRead={() => {}}
      />,
    );
    expect(
      screen.getByText(/Here is the list of notifications/i),
    ).toBeInTheDocument();
  });

  test('should render 3 notification items with appropriate text', () => {
    render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
        markNotificationAsRead={() => {}}
      />,
    );
    const items = screen.getAllByRole('listitem');

    expect(items).toHaveLength(3);

    expect(items[0]).toHaveTextContent('New course available');
    expect(items[0]).toHaveAttribute('data-notification-type', 'default');
    expect(items[0]).toHaveStyle({ color: 'blue' });

    expect(items[1]).toHaveTextContent('New resume available');
    expect(items[1]).toHaveAttribute('data-notification-type', 'urgent');
    expect(items[1]).toHaveStyle({ color: 'red' });

    expect(items[2]).toHaveTextContent('Urgent requirement - complete by EOD');
    expect(items[2]).toHaveAttribute('data-notification-type', 'urgent');
    expect(items[2]).toHaveStyle({ color: 'red' });

    const strongElement = items[2].querySelector('strong');
    expect(strongElement).toBeInTheDocument();
    expect(strongElement).toHaveTextContent('Urgent requirement');
  });

  test('should call handleHideDrawer when close button is clicked', () => {
    const handleHideDrawerMock = jest.fn();
    render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
        markNotificationAsRead={() => {}}
        handleHideDrawer={handleHideDrawerMock}
      />,
    );
    fireEvent.click(screen.getByLabelText(/close/i));
    expect(handleHideDrawerMock).toHaveBeenCalled();
  });

  test('should call markNotificationAsRead when notification item is clicked', () => {
    const markNotificationAsReadMock = jest.fn();
    render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
        markNotificationAsRead={markNotificationAsReadMock}
      />,
    );

    const items = screen.getAllByRole('listitem');
    fireEvent.click(items[0]);

    expect(markNotificationAsReadMock).toHaveBeenCalledWith(1);
  });
});

describe('Notifications component - displayDrawer is true and notifications is empty', () => {
  test('should display "Your notifications" text', () => {
    render(
      <Notifications
        displayDrawer={true}
        notifications={[]}
        markNotificationAsRead={() => {}}
      />,
    );
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });

  test('should display "no new notification for now" text', () => {
    render(
      <Notifications
        displayDrawer={true}
        notifications={[]}
        markNotificationAsRead={() => {}}
      />,
    );
    expect(
      screen.getByText(/no new notification for now/i),
    ).toBeInTheDocument();
  });

  test('should not display "Here is the list of notifications" text', () => {
    render(
      <Notifications
        displayDrawer={true}
        notifications={[]}
        markNotificationAsRead={() => {}}
      />,
    );
    expect(
      screen.queryByText(/Here is the list of notifications/i),
    ).not.toBeInTheDocument();
  });

  test('should not display notification items', () => {
    render(
      <Notifications
        displayDrawer={true}
        notifications={[]}
        markNotificationAsRead={() => {}}
      />,
    );
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('component does not re-render when props are referentially equal (PureComponent)', () => {
    const markNotificationAsRead = () => {};
    const { rerender } = render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
        markNotificationAsRead={markNotificationAsRead}
      />,
    );
    const renderSpy = jest.spyOn(Notifications.prototype, 'render');
    rerender(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
        markNotificationAsRead={markNotificationAsRead}
      />,
    );
    expect(renderSpy).not.toHaveBeenCalled();
    renderSpy.mockRestore();
  });

  test('component re-renders when notifications prop changes (PureComponent)', () => {
    const markNotificationAsRead = () => {};
    const { rerender } = render(
      <Notifications
        displayDrawer={true}
        notifications={notificationsList}
        markNotificationAsRead={markNotificationAsRead}
      />,
    );
    const newNotificationsList = [
      { id: 1, type: 'default', value: 'New course available' },
    ];
    rerender(
      <Notifications
        displayDrawer={true}
        notifications={newNotificationsList}
        markNotificationAsRead={markNotificationAsRead}
      />,
    );
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(1);
  });
});
