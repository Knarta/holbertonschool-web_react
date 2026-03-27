import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import notificationsReducer, {
  fetchNotifications,
  markNotificationAsRead,
} from '../notifications/notificationsSlice';

afterEach(() => {
  mockAxios.reset();
});

describe('notificationsSlice', () => {
  const initialState = {
    notifications: [],
    loading: false,
  };

  it('should return the correct initial state by default', () => {
    expect(notificationsReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should set loading to true when fetchNotifications is pending', () => {
    const state = notificationsReducer(initialState, {
      type: fetchNotifications.pending.type,
    });
    expect(state.loading).toBe(true);
  });

  it('should set loading to false when fetchNotifications is rejected', () => {
    const loadingState = { ...initialState, loading: true };
    const state = notificationsReducer(loadingState, {
      type: fetchNotifications.rejected.type,
    });
    expect(state.loading).toBe(false);
  });

  it('should fetch and filter unread notifications correctly', async () => {
    const mockNotifications = [
      {
        id: 1,
        type: 'default',
        context: { guid: 'abc', isRead: true, value: 'New course available' },
      },
      {
        id: 2,
        type: 'urgent',
        context: { guid: 'def', isRead: false, value: 'New resume available' },
      },
      {
        id: 3,
        type: 'urgent',
        context: {
          guid: 'ghi',
          isRead: false,
          value: 'Urgent requirement - complete by EOD',
        },
      },
      {
        id: 4,
        type: 'default',
        context: {
          guid: 'jkl',
          isRead: false,
          value: 'Project review available',
        },
      },
    ];

    const store = configureStore({ reducer: notificationsReducer });
    const promise = store.dispatch(fetchNotifications());

    mockAxios.mockResponse({ data: { notifications: mockNotifications } });

    await promise;

    const state = store.getState();
    expect(state.notifications).toHaveLength(3);
    expect(state.notifications[0]).toEqual({
      id: 2,
      type: 'urgent',
      isRead: false,
      value: 'New resume available',
    });
    expect(state.notifications[1]).toEqual({
      id: 3,
      type: 'urgent',
      isRead: false,
      value: 'Urgent requirement - complete by EOD',
    });
    expect(state.notifications[2]).toEqual({
      id: 4,
      type: 'default',
      isRead: false,
      value: 'Project review available',
    });
  });

  it('should remove a notification when markNotificationAsRead is dispatched', () => {
    const stateWithNotifications = {
      ...initialState,
      notifications: [
        { id: 1, type: 'default', isRead: false, value: 'New course available' },
        { id: 2, type: 'urgent', isRead: false, value: 'New resume available' },
      ],
    };

    const state = notificationsReducer(
      stateWithNotifications,
      markNotificationAsRead(2),
    );

    expect(state.notifications).toHaveLength(1);
    expect(state.notifications.find((n) => n.id === 2)).toBeUndefined();
  });
});
