import { expect, test } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
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
  expect(screen.getByText(/Copyright 2026 - holberton School/i));
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

test('should render the Login form when isLoggedIn is false', () => {
  render(<App isLoggedIn={false} />);
  expect(
    screen.getByText(/Login to access the full dashboard/i),
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('should render a CourseList table when isLoggedIn is true', () => {
  render(<App isLoggedIn={true} />);
  expect(screen.getByText(/Available courses/i)).toBeInTheDocument();
  expect(
    screen.queryByText(/Login to access the full dashboard/i),
  ).not.toBeInTheDocument();
});

test('should call logOut when Ctrl+h is pressed', () => {
  const logOut = jest.fn();
  render(<App logOut={logOut} />);
  fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
  expect(logOut).toHaveBeenCalledTimes(1);
});

test('should call alert with Logging you out when Ctrl+h is pressed', () => {
  const alert = jest.spyOn(window, 'alert').mockImplementation(() => {});
  render(<App />);
  fireEvent.keyDown(document, { key: 'h', ctrlKey: true });
  expect(alert).toHaveBeenCalledWith('Logging you out');
  alert.mockRestore();
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
