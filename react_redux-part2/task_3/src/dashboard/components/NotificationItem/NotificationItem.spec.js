import { render, screen, fireEvent } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('Renders default type notification with blue color', () => {
  const { container } = render(
    <NotificationItem
      id={1}
      type="default"
      value="Test notification"
      markAsRead={jest.fn()}
    />,
  );

  const li = container.querySelector('[data-notification-type="default"]');
  expect(li).toBeInTheDocument();
  expect(li).toHaveTextContent('Test notification');
  expect(li).toHaveStyle({ color: 'blue' });
});

test('Renders urgent type notification with red color', () => {
  const { container } = render(
    <NotificationItem
      id={2}
      type="urgent"
      value="Urgent notification"
      markAsRead={jest.fn()}
    />,
  );

  const li = container.querySelector('[data-notification-type="urgent"]');
  expect(li).toBeInTheDocument();
  expect(li).toHaveTextContent('Urgent notification');
  expect(li).toHaveStyle({ color: 'red' });
});

test('Calls markAsRead with the correct id on click', () => {
  const markAsReadMock = jest.fn();
  render(
    <NotificationItem
      id={5}
      type="default"
      value="Click me"
      markAsRead={markAsReadMock}
    />,
  );

  fireEvent.click(screen.getByText('Click me'));
  expect(markAsReadMock).toHaveBeenCalledWith(5);
});
