import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
  showDrawer,
  hideDrawer,
} from '../notifications/notificationsSlice';
import { getLatestNotification } from '../../utils/utils';

afterEach(() => {
  mockAxios.reset();
});

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    displayDrawer: true,
  };

  it('should return the correct initial state by default', () => {
    expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should fetch notifications data correctly', async () => {
    const mockNotifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '' } },
    ];

    const store = configureStore({ reducer: notificationsReducer });
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({ data: { notifications: mockNotifications } });

    await promise;

    const state = store.getState();
    expect(state.notifications).toHaveLength(3);
    expect(state.notifications[0]).toEqual(mockNotifications[0]);
    expect(state.notifications[1]).toEqual(mockNotifications[1]);
    expect(state.notifications[2]).toEqual({
      ...mockNotifications[2],
      html: { __html: getLatestNotification() },
    });
  });

  it('should remove a notification when markNotificationAsRead is dispatched', () => {
    const stateWithNotifications = {
      ...initialState,
      notifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: getLatestNotification() } },
      ],
    };

    const state = notificationsReducer(
      stateWithNotifications,
      markNotificationAsRead(2),
    );

    expect(state.notifications).toHaveLength(2);
    expect(state.notifications.find((n) => n.id === 2)).toBeUndefined();
  });

  it('should toggle displayDrawer state correctly with showDrawer and hideDrawer', () => {
    const stateDrawerVisible = { ...initialState, displayDrawer: true };

    const hiddenState = notificationsReducer(stateDrawerVisible, hideDrawer());
    expect(hiddenState.displayDrawer).toBe(false);

    const shownState = notificationsReducer(hiddenState, showDrawer());
    expect(shownState.displayDrawer).toBe(true);
  });
});
