import { render, fireEvent, screen } from '@testing-library/react';
import Notifications from './Notifications.jsx';
import { getLatestNotification } from '../utils/utils';

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: 'Urgent requirement - complete by EOD', html: getLatestNotification() },
];

describe('Notifications component - displayDrawer is false', () => {
  test('should display "Your notifications" text', () => {
    render(<Notifications displayDrawer={false} notifications={notificationsList} />);
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });

  test('should not display close button', () => {
    render(<Notifications displayDrawer={false} notifications={notificationsList} />);
    expect(screen.queryByLabelText(/close/i)).not.toBeInTheDocument();
  });

  test('should not display "Here is the list of notifications" text', () => {
    render(<Notifications displayDrawer={false} notifications={notificationsList} />);
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('should not display notification items', () => {
    render(<Notifications displayDrawer={false} notifications={notificationsList} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});

describe('Notifications component - displayDrawer is true', () => {
  test('should display "Your notifications" text', () => {
    render(<Notifications displayDrawer={true} notifications={notificationsList} />);
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });

  test('should display close button', () => {
    render(<Notifications displayDrawer={true} notifications={notificationsList} />);
    expect(screen.getByLabelText(/close/i)).toBeInTheDocument();
  });

  test('should display "Here is the list of notifications" text', () => {
    render(<Notifications displayDrawer={true} notifications={notificationsList} />);
    expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  });

  test('should render 3 notification items with appropriate text', () => {
    render(<Notifications displayDrawer={true} notifications={notificationsList} />);
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

  test('should log message with notification id when an item is clicked', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<Notifications displayDrawer={true} notifications={notificationsList} />);
    const items = screen.getAllByRole('listitem');

    fireEvent.click(items[0]);

    expect(logSpy).toHaveBeenCalledWith(
      'Notification 1 has been marked as read',
    );

    logSpy.mockRestore();
  });

  test('should log message when close button is clicked', () => {
    const logSpy = jest.spyOn(console, 'log');
    render(<Notifications displayDrawer={true} notifications={notificationsList} />);
    fireEvent.click(screen.getByLabelText(/close/i));
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringMatching(/Close button has been clicked/i),
    );
  });
});

describe('Notifications component - displayDrawer is true and notifications is empty', () => {
  test('should display "Your notifications" text', () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);
    expect(screen.getByText(/Your notifications/i)).toBeInTheDocument();
  });

  test('should display "No new notification for now" text', () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);
    expect(screen.getByText(/No new notification for now/i)).toBeInTheDocument();
  });

  test('should not display "Here is the list of notifications" text', () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);
    expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
  });

  test('should not display notification items', () => {
    render(<Notifications displayDrawer={true} notifications={[]} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});