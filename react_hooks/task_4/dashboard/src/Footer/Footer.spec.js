import { render, screen } from '@testing-library/react';
import Footer from './Footer';
// eslint-disable-next-line no-unused-vars
import newContext from '../Context/context';

describe('Footer component', () => {
  test('should render Copyright with current year and Holberton School', () => {
    render(<Footer />);
    const copyright = screen.getByText(/Copyright \d{4} - Holberton School/i);
    expect(copyright).toBeInTheDocument();
  });

  test('should not display "Contact us" link when user is logged out', () => {
    const contextValue = {
      user: { email: '', password: '', isLoggedIn: false },
      logOut: () => {},
    };
    render(
      <newContext.Provider value={contextValue}>
        <Footer />
      </newContext.Provider>,
    );
    expect(screen.queryByText('Contact us')).not.toBeInTheDocument();
  });

  test('should display "Contact us" link when user is logged in', () => {
    const contextValue = {
      user: { email: 'test@test.com', password: 'password', isLoggedIn: true },
      logOut: () => {},
    };
    render(
      <newContext.Provider value={contextValue}>
        <Footer />
      </newContext.Provider>,
    );
    const contactLink = screen.getByText('Contact us');
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest('a')).toBeInTheDocument();
  });
});