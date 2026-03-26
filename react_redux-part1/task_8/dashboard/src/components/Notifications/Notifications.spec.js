import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Notifications from './Notifications';
import mockAxios from 'jest-mock-axios';
import { fetchNotifications } from '../../features/notifications/notificationsSlice';

afterEach(() => {
  mockAxios.reset();
});

function createStore(preloadedState = {}) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {
      auth: { user: { email: '', password: '' }, isLoggedIn: false },
      notifications: { notifications: [], displayDrawer: true },
      courses: { courses: [] },
      ...preloadedState,
    },
  });
}

test('Notification items are displayed after fetchNotifications', async () => {
  const store = createStore();

  const promise = store.dispatch(fetchNotifications());

  mockAxios.mockResponse({
    data: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ],
    },
  });

  await promise;

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  expect(screen.getByText('New course available')).toBeInTheDocument();
  expect(screen.getByText('New resume available')).toBeInTheDocument();
});

test('Closing the drawer sets displayDrawer to false', () => {
  const store = createStore({
    notifications: {
      notifications: [{ id: 1, type: 'default', value: 'Test notification' }],
      displayDrawer: true,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  expect(
    screen.getByText(/here is the list of notifications/i),
  ).toBeInTheDocument();

  fireEvent.click(screen.getByRole('button', { name: /close/i }));

  expect(store.getState().notifications.displayDrawer).toBe(false);
  expect(
    screen.queryByText(/here is the list of notifications/i),
  ).not.toBeInTheDocument();
});

test('Opening the drawer sets displayDrawer to true', () => {
  const store = createStore({
    notifications: {
      notifications: [{ id: 1, type: 'default', value: 'Test notification' }],
      displayDrawer: false,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  expect(
    screen.queryByText(/here is the list of notifications/i),
  ).not.toBeInTheDocument();

  fireEvent.click(screen.getByText(/your notifications/i));

  expect(store.getState().notifications.displayDrawer).toBe(true);
  expect(
    screen.getByText(/here is the list of notifications/i),
  ).toBeInTheDocument();
});

test('Marking a notification as read removes it from the list', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  const store = createStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ],
      displayDrawer: true,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(2);

  fireEvent.click(items[0]);

  expect(screen.getAllByRole('listitem')).toHaveLength(1);
  expect(screen.queryByText('New course available')).not.toBeInTheDocument();
  expect(screen.getByText('New resume available')).toBeInTheDocument();

  consoleSpy.mockRestore();
});
