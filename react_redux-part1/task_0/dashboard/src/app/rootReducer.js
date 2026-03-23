import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';
import coursesReducer from '../features/courses/coursesSlice';

export const rootReducer = combineReducers({
  auth: authReducer,
  notifications: notificationsReducer,
  courses: coursesReducer,
});

export default rootReducer;
