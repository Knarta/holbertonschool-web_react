import { render } from '@testing-library/react';
import NotificationItem from './NotificationItem';

test('Renders default type notification in blue', () => {
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
});

test('Renders urgent type notification in red', () => {
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
});
