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
      notifications: { notifications: [], loading: false },
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
        {
          id: 1,
          type: 'default',
          context: { isRead: false, value: 'New course available' },
        },
        {
          id: 2,
          type: 'urgent',
          context: { isRead: false, value: 'New resume available' },
        },
        {
          id: 3,
          type: 'default',
          context: { isRead: true, value: 'Already read' },
        },
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
  expect(screen.queryByText('Already read')).not.toBeInTheDocument();
});

test('Clicking "Your notifications" toggles the visible class on the drawer', () => {
  const store = createStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', isRead: false, value: 'Test notification' },
      ],
      loading: false,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  const drawer = screen
    .getByText(/here is the list of notifications/i)
    .closest('div');
  const initialClassCount = drawer.classList.length;

  fireEvent.click(screen.getByText(/your notifications/i));

  expect(drawer.classList.length).toBeGreaterThan(initialClassCount);
});

test('Clicking close button toggles the visible class off the drawer', () => {
  const store = createStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', isRead: false, value: 'Test notification' },
      ],
      loading: false,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  fireEvent.click(screen.getByText(/your notifications/i));

  const drawer = screen
    .getByText(/here is the list of notifications/i)
    .closest('div');
  const classCountAfterOpen = drawer.classList.length;

  fireEvent.click(screen.getByRole('button', { name: /close/i }));

  expect(drawer.classList.length).toBeLessThan(classCountAfterOpen);
});

test('Marking a notification as read removes it from the list', () => {
  const store = createStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', isRead: false, value: 'New course available' },
        { id: 2, type: 'urgent', isRead: false, value: 'New resume available' },
      ],
      loading: false,
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
});

test('Drawer is hidden by default (no visible class)', () => {
  const store = createStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', isRead: false, value: 'Test notification' },
      ],
      loading: false,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  const drawer = screen
    .getByText(/here is the list of notifications/i)
    .closest('div');
  expect(drawer.classList.length).toBe(1);
});

test('"Your notifications" text is always displayed', () => {
  const store = createStore({
    notifications: { notifications: [], loading: false },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  expect(screen.getByText(/your notifications/i)).toBeInTheDocument();
});

test('Displays "Loading..." when loading is true', () => {
  const store = createStore({
    notifications: { notifications: [], loading: true },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  expect(
    screen.queryByText(/no new notifications for now/i),
  ).not.toBeInTheDocument();
});

test('Displays notifications after loading completes', () => {
  const store = createStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', isRead: false, value: 'New course available' },
      ],
      loading: false,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  expect(screen.queryByText(/loading.../i)).not.toBeInTheDocument();
  expect(screen.getByText('New course available')).toBeInTheDocument();
});

test('Filtering by urgent shows only urgent notifications', () => {
  const store = createStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', isRead: false, value: 'Default notification' },
        { id: 2, type: 'urgent', isRead: false, value: 'Urgent notification' },
        { id: 3, type: 'default', isRead: false, value: 'Another default' },
      ],
      loading: false,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  expect(screen.getAllByRole('listitem')).toHaveLength(3);

  fireEvent.click(screen.getByRole('button', { name: /filter urgent/i }));

  expect(screen.getAllByRole('listitem')).toHaveLength(1);
  expect(screen.getByText('Urgent notification')).toBeInTheDocument();
  expect(screen.queryByText('Default notification')).not.toBeInTheDocument();
});

test('Filtering by default shows only default notifications', () => {
  const store = createStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', isRead: false, value: 'Default notification' },
        { id: 2, type: 'urgent', isRead: false, value: 'Urgent notification' },
        { id: 3, type: 'default', isRead: false, value: 'Another default' },
      ],
      loading: false,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  expect(screen.getAllByRole('listitem')).toHaveLength(3);

  fireEvent.click(screen.getByRole('button', { name: /filter default/i }));

  expect(screen.getAllByRole('listitem')).toHaveLength(2);
  expect(screen.getByText('Default notification')).toBeInTheDocument();
  expect(screen.getByText('Another default')).toBeInTheDocument();
  expect(screen.queryByText('Urgent notification')).not.toBeInTheDocument();
});

test('Toggling filter back shows all notifications', () => {
  const store = createStore({
    notifications: {
      notifications: [
        { id: 1, type: 'default', isRead: false, value: 'Default notification' },
        { id: 2, type: 'urgent', isRead: false, value: 'Urgent notification' },
      ],
      loading: false,
    },
  });

  render(
    <Provider store={store}>
      <Notifications />
    </Provider>,
  );

  fireEvent.click(screen.getByRole('button', { name: /filter urgent/i }));
  expect(screen.getAllByRole('listitem')).toHaveLength(1);

  fireEvent.click(screen.getByRole('button', { name: /filter urgent/i }));
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});
