import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header.jsx';

describe('Header component', () => {
  test('renders without crashing', () => {
    render(<Header />);
    const title = screen.getByText(/school dashboard/i);
    expect(title).toBeInTheDocument();
  });

  test('should render title', () => {
    render(<Header />);
    expect(screen.getByRole('heading')).toHaveTextContent(/School dashboard/i);
  });

  test('should contain a Holberton logo component', () => {
    render(<Header />);
    expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
  });

  test('should not render logoutSection with default props', () => {
    render(<Header />);
    expect(screen.queryByText(/Welcome/i)).not.toBeInTheDocument();
    expect(document.getElementById('logoutSection')).toBeNull();
  });

  test('should render logoutSection when user isLoggedIn is true', () => {
    const user = {
      email: 'test@test.com',
      password: 'password123',
      isLoggedIn: true,
    };
    const logOut = () => {};

    render(<Header user={user} logOut={logOut} />);

    expect(document.getElementById('logoutSection')).toBeInTheDocument();
    expect(screen.getByText(/test@test\.com/i)).toBeInTheDocument();
  });

  test('should call logOut spy when clicking logout link', () => {
    const logOutSpy = jest.fn();
    const user = {
      email: 'test@test.com',
      password: 'password123',
      isLoggedIn: true,
    };

    render(<Header user={user} logOut={logOutSpy} />);

    fireEvent.click(screen.getByText(/\(logout\)/i));
    expect(logOutSpy).toHaveBeenCalled();
  });
});
