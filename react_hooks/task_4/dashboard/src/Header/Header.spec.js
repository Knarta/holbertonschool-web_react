import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import AppContext from '../Context/context';

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

  test('should not render logoutSection with default context', () => {
    render(<Header />);
    expect(screen.queryByText(/Welcome/i)).not.toBeInTheDocument();
    expect(document.getElementById('logoutSection')).toBeNull();
  });

  test('should render logoutSection when user isLoggedIn is true', () => {
    const contextValue = {
      user: { email: 'test@test.com', password: 'password123', isLoggedIn: true },
      logOut: () => {},
    };

    render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );

    expect(document.getElementById('logoutSection')).toBeInTheDocument();
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
  });

  test('should call logOut spy when clicking logout link', () => {
    const logOutSpy = jest.fn();
    const contextValue = {
      user: { email: 'test@test.com', password: 'password123', isLoggedIn: true },
      logOut: logOutSpy,
    };

    render(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );

    fireEvent.click(screen.getByText(/\(logout\)/i));
    expect(logOutSpy).toHaveBeenCalled();
  });
});