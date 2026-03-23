import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  displayDrawer: true,
  notifications: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    toggleDrawer: (state) => {
      state.displayDrawer = !state.displayDrawer;
    },
    markNotificationRead: (state, action) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { setNotifications, toggleDrawer, markNotificationRead } =
  notificationsSlice.actions;
export default notificationsSlice.reducer;
