import { configureStore } from '@reduxjs/toolkit';
import mockAxios from 'jest-mock-axios';
import coursesReducer, {
  fetchCourses,
  selectCourse,
  unSelectCourse,
} from '../courses/coursesSlice';
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

  test('fetches correctly the courses data with isSelected defaulting to false', async () => {
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
    state.courses.forEach((course, i) => {
      expect(course.id).toBe(mockCourses[i].id);
      expect(course.name).toBe(mockCourses[i].name);
      expect(course.credit).toBe(mockCourses[i].credit);
      expect(course.isSelected).toBe(false);
    });
  });

  test('selectCourse sets isSelected to true for the given course', () => {
    const stateWithCourses = {
      courses: [
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      ],
    };

    const state = coursesReducer(stateWithCourses, selectCourse(1));

    expect(state.courses[0].isSelected).toBe(true);
    expect(state.courses[1].isSelected).toBe(false);
  });

  test('unSelectCourse sets isSelected to false for the given course', () => {
    const stateWithCourses = {
      courses: [
        { id: 1, name: 'ES6', credit: 60, isSelected: true },
        { id: 2, name: 'Webpack', credit: 20, isSelected: true },
      ],
    };

    const state = coursesReducer(stateWithCourses, unSelectCourse(2));

    expect(state.courses[0].isSelected).toBe(true);
    expect(state.courses[1].isSelected).toBe(false);
  });

  test('resets the courses array to empty when logout', () => {
    const stateWithCourses = {
      courses: [
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      ],
    };

    const state = coursesReducer(stateWithCourses, logout());

    expect(state).toEqual(initialState);
    expect(state.courses).toHaveLength(0);
  });
});
