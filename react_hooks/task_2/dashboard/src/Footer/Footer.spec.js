import { expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Footer from './Footer.jsx';
import AppContext from '../Context/context.js';

test('should render footer with copyright text', () => {
  render(<Footer />);
  expect(screen.getByText(/Copyright/i)).toBeInTheDocument();
});

test('should render footer with current year', () => {
  render(<Footer />);
  const currentYear = new Date().getFullYear();
  expect(
    screen.getByText(new RegExp(currentYear.toString())),
  ).toBeInTheDocument();
});

test('when user is logged out in context, Contact us link is not displayed', () => {
  const user = { email: '', password: '', isLoggedIn: false };
  const logOut = () => {};
  render(
    <AppContext.Provider value={{ user, logOut }}>
      <Footer />
    </AppContext.Provider>,
  );
  expect(screen.queryByRole('link', { name: /Contact us/i })).not.toBeInTheDocument();
});

test('when user is logged in within context, Contact us link is displayed', () => {
  const user = { email: 'test@test.com', password: 'pass123', isLoggedIn: true };
  const logOut = () => {};
  render(
    <AppContext.Provider value={{ user, logOut }}>
      <Footer />
    </AppContext.Provider>,
  );
  const contactLink = screen.getByRole('link', { name: /Contact us/i });
  expect(contactLink).toBeInTheDocument();
});
