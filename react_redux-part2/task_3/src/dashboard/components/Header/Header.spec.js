import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Header from './Header';
import { login } from '../../features/auth/authSlice';

function createStore(preloadedState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [] },
      courses: { courses: [] },
      ...preloadedState,
    },
  });
}

function renderWithStore(store) {
  return render(
    <Provider store={store}>
      <Header />
    </Provider>,
  );
}

test('Logout link is displayed when isLoggedIn is true', () => {
  const store = createStore({
    auth: {
      user: { email: 'test@test.com', password: 'pass' },
      isLoggedIn: true,
    },
  });
  renderWithStore(store);

  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});

test('Welcome message with email is displayed after login dispatch', () => {
  const store = createStore();
  store.dispatch(login({ email: 'user@example.com', password: 'password123' }));

  renderWithStore(store);

  expect(screen.getByText('user@example.com')).toBeInTheDocument();
  expect(screen.getByText(/logout/i)).toBeInTheDocument();
});

test('Clicking logout sets isLoggedIn to false', () => {
  const store = createStore({
    auth: {
      user: { email: 'test@test.com', password: 'pass' },
      isLoggedIn: true,
    },
  });
  renderWithStore(store);

  fireEvent.click(screen.getByText(/logout/i));

  expect(store.getState().auth.isLoggedIn).toBe(false);
});
