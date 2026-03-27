import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from '../App';
import rootReducer from '../app/rootReducer';
import mockAxios from 'jest-mock-axios';

afterEach(() => {
  mockAxios.reset();
});

function renderWithStore(preloadedState = {}) {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <App />
    </Provider>,
  );
}

test('App renders Login when isLoggedIn is false', () => {
  renderWithStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: { notifications: [] },
    courses: { courses: [] },
  });

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: /log in to continue/i }),
  ).toBeInTheDocument();
});

test('App renders CourseList when isLoggedIn is true', () => {
  renderWithStore({
    auth: {
      user: { email: 'test@test.com', password: 'pass' },
      isLoggedIn: true,
    },
    notifications: { notifications: [] },
    courses: { courses: [{ id: 1, name: 'ES6', credit: 60 }] },
  });

  expect(
    screen.getByRole('heading', { name: /course list/i }),
  ).toBeInTheDocument();
  expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument();
});

test('fetchNotifications is dispatched on mount and notification items are displayed', async () => {
  renderWithStore({
    auth: { user: { email: '', password: '' }, isLoggedIn: false },
    notifications: { notifications: [] },
    courses: { courses: [] },
  });

  expect(mockAxios.get).toHaveBeenCalledWith(
    'http://localhost:5173/notifications.json',
  );

  mockAxios.mockResponse({
    data: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ],
    },
  });

  await waitFor(() => {
    expect(screen.getByText('New course available')).toBeInTheDocument();
    expect(screen.getByText('New resume available')).toBeInTheDocument();
  });
});
