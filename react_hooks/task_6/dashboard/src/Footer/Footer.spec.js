import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from './Footer.jsx';

describe('Footer component', () => {
  test('should render Copyright with current year and Holberton School', () => {
    render(<Footer />);
    const copyright = screen.getByText(/Copyright \d{4} - Holberton School/i);
    expect(copyright).toBeInTheDocument();
  });

  test('should not display "Contact us" link when user is logged out', () => {
    const user = {
      email: '',
      password: '',
      isLoggedIn: false,
    };
    render(<Footer user={user} />);
    expect(screen.queryByText('Contact us')).not.toBeInTheDocument();
  });

  test('should display "Contact us" link when user is logged in', () => {
    const user = {
      email: 'test@test.com',
      password: 'password',
      isLoggedIn: true,
    };
    render(<Footer user={user} />);
    const contactLink = screen.getByText('Contact us');
    expect(contactLink).toBeInTheDocument();
    expect(contactLink.closest('a')).toBeInTheDocument();
  });
});
