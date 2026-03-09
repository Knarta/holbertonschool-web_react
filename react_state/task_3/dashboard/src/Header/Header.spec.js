import { expect, test } from '@jest/globals';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header.jsx';
import AppContext from '../Context/context.js';

test('should render header with logo', () => {
  render(<Header />);
  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});

test('should render header with title', () => {
  render(<Header />);
  expect(screen.getByRole('heading')).toHaveTextContent(/School dashboard/i);
});

test('when using default context value, logoutSection is not rendered', () => {
  const { container } = render(<Header />);
  expect(container.querySelector('#logoutSection')).toBeNull();
});

test('when user context has isLoggedIn true with email and password, logoutSection is rendered', () => {
  const user = { email: 'test@test.com', password: 'password123', isLoggedIn: true };
  const logOut = () => {};
  render(
    <AppContext.Provider value={{ user, logOut }}>
      <Header />
    </AppContext.Provider>,
  );
  const logoutSection = document.getElementById('logoutSection');
  expect(logoutSection).toBeInTheDocument();
  expect(logoutSection).toHaveTextContent('Welcome test@test.com');
  expect(logoutSection).toHaveTextContent('logout');
});

test('when user is logged in, clicking logout link calls logOut', () => {
  const user = { email: 'test@test.com', password: 'password123', isLoggedIn: true };
  const logOut = jest.fn();
  render(
    <AppContext.Provider value={{ user, logOut }}>
      <Header />
    </AppContext.Provider>,
  );
  const logoutLink = screen.getByRole('link', { name: /logout/i });
  fireEvent.click(logoutLink);
  expect(logOut).toHaveBeenCalledTimes(1);
});
