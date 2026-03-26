import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Footer from './Footer';

function renderWithStore(preloadedState = {}) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [], displayDrawer: true },
      courses: { courses: [] },
      ...preloadedState,
    },
  });
  return render(
    <Provider store={store}>
      <Footer />
    </Provider>,
  );
}

test('Footer renders copyright text', () => {
  renderWithStore();

  const footerText = screen.getByText(/copyright/i);
  expect(footerText).toHaveTextContent(
    new RegExp(`Copyright ${new Date().getFullYear()}`, 'i'),
  );
  expect(footerText).toHaveTextContent(/holberton school/i);
});

test('Contact us link is displayed when isLoggedIn is true', () => {
  renderWithStore({
    auth: {
      user: { email: 'test@test.com', password: 'pass' },
      isLoggedIn: true,
    },
  });

  expect(screen.getByText(/contact us/i)).toBeInTheDocument();
});

test('Contact us link is not displayed when isLoggedIn is false', () => {
  renderWithStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
  });

  expect(screen.queryByText(/contact us/i)).not.toBeInTheDocument();
});
