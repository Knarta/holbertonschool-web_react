import '@testing-library/jest-dom';
import axios from 'axios';

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

axios.useRequestHandler((req) => {
  const url = req.config?.url || req.url || '';
  if (url.includes('notifications.json')) {
    axios.mockResponse({ data: mockNotifications }, req);
  } else if (url.includes('courses.json')) {
    axios.mockResponse({ data: mockCourses }, req);
  }
});

afterEach(() => {
  axios.reset();
});
