import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Login from './Login';

function renderWithStore(preloadedState = {}) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [] },
      courses: { courses: [] },
      ...preloadedState,
    },
  });
  return {
    store,
    ...render(
      <Provider store={store}>
        <Login />
      </Provider>,
    ),
  };
}

test('Login form displays email, password fields and submit button', () => {
  renderWithStore();

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /ok/i })).toBeInTheDocument();
});

test('Submitting valid credentials sets isLoggedIn to true', () => {
  const { store } = renderWithStore();

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: 'password123' },
  });
  fireEvent.click(screen.getByRole('button', { name: /ok/i }));

  expect(store.getState().auth.isLoggedIn).toBe(true);
});

test('Submitting invalid credentials keeps isLoggedIn false', () => {
  const { store } = renderWithStore();

  fireEvent.change(screen.getByLabelText(/email/i), {
    target: { value: 'bad' },
  });
  fireEvent.change(screen.getByLabelText(/password/i), {
    target: { value: '123' },
  });

  const submitButton = screen.getByRole('button', { name: /ok/i });
  expect(submitButton).toBeDisabled();

  expect(store.getState().auth.isLoggedIn).toBe(false);
});
