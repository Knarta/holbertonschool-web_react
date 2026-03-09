import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: '<strong>Urgent requirement</strong> - complete by EOD' },
];

const mockCourses = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

axios.get.mockImplementation((url) => {
  if (url && url.includes('notifications.json')) {
    return Promise.resolve({ data: mockNotifications });
  }
  if (url && url.includes('courses.json')) {
    return Promise.resolve({ data: mockCourses });
  }
  return Promise.reject(new Error('Not found'));
});
