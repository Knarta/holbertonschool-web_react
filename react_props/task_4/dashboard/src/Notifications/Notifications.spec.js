import { render, fireEvent, screen } from '@testing-library/react';
import Notifications from './Notifications.jsx';
import { getLatestNotification } from '../utils/utils';

const notificationsList = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', value: 'Urgent requirement - complete by EOD', html: getLatestNotification() },
];

test('should render title', () => {
  render(<Notifications notifications={notificationsList} />);
  expect(screen.getByText(/Here is the list of notifications/i));
});

test('should render without crashing when no notifications prop is passed', () => {
  render(<Notifications />);
  expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/close/i)).toBeInTheDocument();
  expect(screen.queryAllByRole('listitem')).toHaveLength(0);
});

test('should render button in notifications', () => {
  render(<Notifications notifications={notificationsList} />);
  expect(screen.getByLabelText(/close/i));
});

test('should render 3 notification items with appropriate text', () => {
  render(<Notifications notifications={notificationsList} />);
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

test('should log message when close button is clicked', () => {
  const logSpy = jest.spyOn(console, 'log');
  render(<Notifications notifications={notificationsList} />);
  fireEvent.click(screen.getByLabelText(/close/i));
  expect(logSpy).toHaveBeenCalledWith(
    expect.stringMatching(/Close button has been clicked/i),
  );
});