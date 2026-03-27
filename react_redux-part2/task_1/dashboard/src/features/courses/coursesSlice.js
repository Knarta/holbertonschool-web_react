import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from '../auth/authSlice';

const initialState = {
  courses: [],
};

const API_BASE_URL = 'http://localhost:5173';
const ENDPOINTS = {
  courses: `${API_BASE_URL}/courses.json`,
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const response = await axios.get(ENDPOINTS.courses);
    const data = response.data.courses || response.data;
    const courses = data.map((course) => {
      return course;
    });
    return courses;
  },
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state) => {
        return state;
      })
      .addCase(logout, () => {
        return initialState;
      });
  },
});

export default courseSlice.reducer;
