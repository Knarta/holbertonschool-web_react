import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import Notifications from './Notifications';
import mockAxios from 'jest-mock-axios';
import { fetchNotifications } from '../../features/notifications/notificationsSlice';
import { StyleSheetTestUtils } from 'aphrodite';

beforeEach(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterEach(() => {
  mockAxios.reset();
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

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

test('Clicking "Your notifications" toggles the visible class on the drawer', () => {
  const store = createStore({
    notifications: {
      notifications: [{ id: 1, type: 'default', value: 'Test notification' }],
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  const drawer = screen.getByText(/here is the list of notifications/i).closest('div');
  const initialClassCount = drawer.classList.length;

  fireEvent.click(screen.getByText(/your notifications/i));

  expect(drawer.classList.length).toBeGreaterThan(initialClassCount);
});

test('Clicking close button toggles the visible class off the drawer', () => {
  const store = createStore({
    notifications: {
      notifications: [{ id: 1, type: 'default', value: 'Test notification' }],
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  fireEvent.click(screen.getByText(/your notifications/i));

  const drawer = screen.getByText(/here is the list of notifications/i).closest('div');
  const classCountAfterOpen = drawer.classList.length;

  fireEvent.click(screen.getByRole('button', { name: /close/i }));

  expect(drawer.classList.length).toBeLessThan(classCountAfterOpen);
});

test('Marking a notification as read removes it from the list', () => {
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  const store = createStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
      ],
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

test('Drawer is hidden by default (no visible class)', () => {
  const store = createStore({
    notifications: {
      notifications: [{ id: 1, type: 'default', value: 'Test notification' }],
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  const drawer = screen.getByText(/here is the list of notifications/i).closest('div');
  expect(drawer.classList.length).toBe(1);
});

test('"Your notifications" text is always displayed', () => {
  const store = createStore({
    notifications: { notifications: [] },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});
