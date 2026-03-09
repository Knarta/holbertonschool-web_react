import NotificationItem from './NotificationItem';
import { render, screen, fireEvent } from '@testing-library/react';

describe('NotificationItem', () => {
  test('li has blue color and data-notification-type is default when type is default', () => {
    render(<NotificationItem type="default" value="New course available" />);
    const item = screen.getByRole('listitem');
    expect(item).toHaveStyle({ color: 'blue' });
    expect(item).toHaveAttribute('data-notification-type', 'default');
  });

  test('li has red color and data-notification-type is urgent when type is urgent', () => {
    render(<NotificationItem type="urgent" value="New resume available" />);
    const item = screen.getByRole('listitem');
    expect(item).toHaveStyle({ color: 'red' });
    expect(item).toHaveAttribute('data-notification-type', 'urgent');
  });

  test('markAsRead is called with the right ID when notification item is clicked', () => {
    const markAsReadMock = jest.fn();
    const testId = 123;
    render(
      <NotificationItem
        type="default"
        value="Test notification"
        id={testId}
        markAsRead={markAsReadMock}
      />,
    );
    const item = screen.getByRole('listitem');
    fireEvent.click(item);
    expect(markAsReadMock).toHaveBeenCalledTimes(1);
    expect(markAsReadMock).toHaveBeenCalledWith(testId);
  });

  test('calls markAsRead with id when notification item is clicked and markAsRead is provided', () => {
    const markAsReadMock = jest.fn();
    render(
      <NotificationItem
        type="default"
        value="Test notification"
        id={1}
        markAsRead={markAsReadMock}
      />,
    );
    const item = screen.getByRole('listitem');
    fireEvent.click(item);
    expect(markAsReadMock).toHaveBeenCalledWith(1);
  });
});