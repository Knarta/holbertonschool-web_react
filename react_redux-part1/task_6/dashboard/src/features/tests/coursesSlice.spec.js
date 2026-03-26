import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import coursesReducer, { fetchCourses } from '../courses/coursesSlice';
import { logout } from '../auth/authSlice';

afterEach(() => {
  mockAxios.reset();
});

describe('CoursesSlice tests', () => {
  const initialState = {
    courses: [],
  };

  test('should return the initial state by default', () => {
    expect(coursesReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  test('fetches correctly the courses data', async () => {
    const mockCourses = [
      { id: 1, name: 'ES6', credit: 60 },
      { id: 2, name: 'Webpack', credit: 20 },
      { id: 3, name: 'React', credit: 40 },
      { id: 4, name: 'Redux', credit: 90 },
    ];

    const store = configureStore({ reducer: coursesReducer });
    const promise = store.dispatch(fetchCourses());

    mockAxios.mockResponse({ data: { courses: mockCourses } });
    await promise;

    const state = store.getState();
    expect(state.courses).toHaveLength(4);
    expect(state.courses[0]).toEqual(mockCourses[0]);
    expect(state.courses[1]).toEqual(mockCourses[1]);
    expect(state.courses[2]).toEqual(mockCourses[2]);
    expect(state.courses[3]).toEqual(mockCourses[3]);
  });

  test('resets the courses array to empty when logout', () => {
    const stateWithCourses = {
      courses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 },
        { id: 4, name: 'Redux', credit: 90 },
      ],
    };

    const state = coursesReducer(stateWithCourses, logout());

    expect(state).toEqual(initialState);
    expect(state.courses).toHaveLength(0);
  });
});
