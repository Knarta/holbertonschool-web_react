import { createSlice } from '@reduxjs/toolkit';
import { logout } from '../auth/authSlice';

const coursesSlice = createSlice({
  name: 'courses',
  initialState: [],
  reducers: {
    setCourses: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => []);
  },
});

export const { setCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
