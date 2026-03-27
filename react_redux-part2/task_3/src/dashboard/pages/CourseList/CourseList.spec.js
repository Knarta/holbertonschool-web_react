import { render, screen, act, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../../app/rootReducer';
import CourseList from './CourseList';
import { logout } from '../../features/auth/authSlice';

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

test('CourseList displays courses from mock fetchCourses', async () => {
  const store = createStore({
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
        { id: 3, name: 'React', credit: 40, isSelected: false },
      ],
    },
  });

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>,
  );

  expect(screen.getByText('ES6')).toBeInTheDocument();
  expect(screen.getByText('Webpack')).toBeInTheDocument();
  expect(screen.getByText('React')).toBeInTheDocument();
});

test('Dispatching logout resets the courses array', () => {
  const store = createStore({
    auth: {
      user: { email: 'test@test.com', password: 'pass' },
      isLoggedIn: true,
    },
    courses: {
      courses: [{ id: 1, name: 'ES6', credit: 60, isSelected: false }],
    },
  });

  const { rerender } = render(
    <Provider store={store}>
      <CourseList />
    </Provider>,
  );

  expect(screen.getByText('ES6')).toBeInTheDocument();

  act(() => {
    store.dispatch(logout());
  });

  rerender(
    <Provider store={store}>
      <CourseList />
    </Provider>,
  );

  expect(screen.queryByText('ES6')).not.toBeInTheDocument();
  expect(screen.getByText(/no course available yet/i)).toBeInTheDocument();
});

test('Checking a checkbox dispatches selectCourse and updates the store', () => {
  const store = createStore({
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60, isSelected: false },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      ],
    },
  });

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>,
  );

  const checkboxes = screen.getAllByRole('checkbox');
  fireEvent.click(checkboxes[0]);

  expect(store.getState().courses.courses[0].isSelected).toBe(true);
  expect(store.getState().courses.courses[1].isSelected).toBe(false);
});

test('Unchecking a checkbox dispatches unSelectCourse and updates the store', () => {
  const store = createStore({
    courses: {
      courses: [
        { id: 1, name: 'ES6', credit: 60, isSelected: true },
        { id: 2, name: 'Webpack', credit: 20, isSelected: false },
      ],
    },
  });

  render(
    <Provider store={store}>
      <CourseList />
    </Provider>,
  );

  const checkboxes = screen.getAllByRole('checkbox');
  expect(checkboxes[0].checked).toBe(true);

  fireEvent.click(checkboxes[0]);

  expect(store.getState().courses.courses[0].isSelected).toBe(false);
});
