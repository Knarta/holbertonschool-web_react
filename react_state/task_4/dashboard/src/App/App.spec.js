import { expect, test } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

test('should render title', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /School dashboard/i }),
  ).toHaveTextContent(/School dashboard/i);
});

test('should render two paragraphs', () => {
  render(<App />);
  expect(screen.getByText(/Login to access the full dashboard/i));
  expect(screen.getByText(/Copyright.*holberton School/i));
});

test('should render the image', () => {
  render(<App />);
  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});

test('should render two inputs for login', () => {
  render(<App />);
  const inputs = screen.getAllByRole('textbox');
  const password = screen.getByLabelText(/password/i);
  expect(password);
  expect(inputs.length + 1).toBe(2);
});

test('should render two label elements', () => {
  render(<App />);
  const labels = screen.getAllByText(/email|password/i);
  expect(labels).toHaveLength(2);
});

test('should render one button', () => {
  render(<App />);
  expect(screen.getByText(/ok/i));
});

test('should render the Login form when user is not logged in (default state)', () => {
  render(<App />);
  expect(
    screen.getByText(/Login to access the full dashboard/i),
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('should render CourseList after successful login', async () => {
  const user = userEvent.setup();
  render(<App />);

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole('button', { name: /ok/i });

  await user.type(emailInput, 'test@test.com');
  await user.type(passwordInput, 'password123');
  await user.click(submitButton);

  expect(screen.getByText(/Available courses/i)).toBeInTheDocument();
  expect(
    screen.queryByText(/Login to access the full dashboard/i),
  ).not.toBeInTheDocument();
});

test('clicking on a notification item removes it and logs the expected string', () => {
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  render(<App />);

  const notificationItems = screen.getAllByRole('listitem');
  expect(notificationItems).toHaveLength(3);

  fireEvent.click(notificationItems[0]);

  expect(consoleLogSpy).toHaveBeenCalledWith(
    'Notification 1 has been marked as read',
  );
  expect(screen.getAllByRole('listitem')).toHaveLength(2);

  consoleLogSpy.mockRestore();
});

test('should call alert when Ctrl+h is pressed', () => {
  const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
  render(<App />);
  fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
  expect(alertMock).toHaveBeenCalledWith('Logging you out');
  alertMock.mockRestore();
});

test('displays title "News from the School" and paragraph "Holberton School News goes here" by default', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: 'News from the School' }),
  ).toBeInTheDocument();
  const paragraph = screen.getByText('Holberton School News goes here');
  expect(paragraph).toBeInTheDocument();
  expect(paragraph.tagName).toBe('P');
});
