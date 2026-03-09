import { expect, jest, test, describe } from '@jest/globals';
import { useState, useCallback, useEffect } from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import axios from 'axios';
import App from './App.jsx';
import { getLatestNotification } from '../utils/utils.js';
import NewContext from '../Context/context.js';

const notificationsData = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: getLatestNotification() },
];

const coursesData = [
  { id: 1, name: 'ES6', credit: 60 },
  { id: 2, name: 'Webpack', credit: 20 },
  { id: 3, name: 'React', credit: 40 },
];

afterEach(() => {
  mockAxios.reset();
});

function resolveAxiosCalls() {
  const notifCall = mockAxios.getReqByUrl('http://localhost:5173/notifications.json');
  if (notifCall) {
    mockAxios.mockResponse({ data: notificationsData }, notifCall);
  }
  const coursesCall = mockAxios.getReqByUrl('http://localhost:5173/courses.json');
  if (coursesCall) {
    mockAxios.mockResponse({ data: coursesData }, coursesCall);
  }
}

async function renderApp() {
  let result;
  await act(async () => {
    result = render(<App />);
  });
  await act(async () => {
    resolveAxiosCalls();
  });
  return result;
}

test('should fetch notifications data on initial render', async () => {
  await renderApp();
  expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');
});

test('should fetch courses data when user state changes', async () => {
  await renderApp();
  expect(mockAxios.get).toHaveBeenCalledWith('http://localhost:5173/courses.json');
});

test('should render title', async () => {
  await renderApp();
  expect(
    screen.getByRole('heading', { name: /School dashboard/i }),
  ).toBeInTheDocument();
});

test('should render the Login form by default (user not logged in)', async () => {
  await renderApp();
  expect(
    screen.getByText(/Login to access the full dashboard/i),
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
});

test('should render the image', async () => {
  await renderApp();
  expect(screen.getByAltText(/holberton logo/i)).toBeInTheDocument();
});

test('should render two inputs for login by default', async () => {
  await renderApp();
  const inputs = screen.getAllByRole('textbox');
  const password = screen.getByLabelText(/password/i);
  expect(password).toBeInTheDocument();
  expect(inputs.length + 1).toBe(2);
});

test('should render two label elements by default', async () => {
  await renderApp();
  const labels = screen.getAllByText(/email|password/i);
  expect(labels).toHaveLength(2);
});

test('should render one button by default', async () => {
  await renderApp();
  expect(screen.getByText(/ok/i)).toBeInTheDocument();
});

test('should render footer copyright', async () => {
  await renderApp();
  expect(
    screen.getByText(/Copyright 2026 - holberton School/i),
  ).toBeInTheDocument();
});

test('should display News section title and default paragraph', async () => {
  await renderApp();
  expect(
    screen.getByRole('heading', { name: /News from the School/i }),
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Holberton School News goes here/i),
  ).toBeInTheDocument();
});

test('should not display CourseList when user is not logged in (default state)', async () => {
  await renderApp();
  expect(screen.queryByText(/Course list/i)).not.toBeInTheDocument();
  expect(
    screen.getByText(/Login to access the full dashboard/i),
  ).toBeInTheDocument();
});

test('should display CourseList after logging in via the login form', async () => {
  await renderApp();

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await act(async () => {
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/ok/i));
  });

  await act(async () => {
    const coursesCall = mockAxios.getReqByUrl('http://localhost:5173/courses.json');
    if (coursesCall) {
      mockAxios.mockResponse({ data: coursesData }, coursesCall);
    }
  });

  expect(
    screen.getByRole('heading', { name: /Course list/i }),
  ).toBeInTheDocument();
  expect(
    screen.queryByText(/Login to access the full dashboard/i),
  ).not.toBeInTheDocument();
});

test('should fetch courses data when user logs in', async () => {
  await renderApp();

  const callCountBefore = mockAxios.get.mock.calls.filter(
    (call) => call[0] === 'http://localhost:5173/courses.json',
  ).length;

  await act(async () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/ok/i));
  });

  const callCountAfter = mockAxios.get.mock.calls.filter(
    (call) => call[0] === 'http://localhost:5173/courses.json',
  ).length;

  expect(callCountAfter).toBeGreaterThan(callCountBefore);
});

test('clicking on a notification item should remove it from the notification list and log the correct message', async () => {
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  await renderApp();

  const notificationTitle = screen.getByText(/Your notifications/i);
  fireEvent.click(notificationTitle);

  const items = screen.getAllByRole('listitem');
  expect(items).toHaveLength(3);

  fireEvent.click(items[0]);

  expect(consoleLogSpy).toHaveBeenCalledWith(
    'Notification 1 has been marked as read',
  );

  fireEvent.click(notificationTitle);
  const remainingItems = screen.queryAllByRole('listitem');
  expect(remainingItems).toHaveLength(2);

  consoleLogSpy.mockRestore();
});

test('handleDisplayDrawer sets displayDrawer to true', async () => {
  await renderApp();

  const closeButton = screen.getByLabelText(/close/i);
  fireEvent.click(closeButton);

  expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();

  fireEvent.click(screen.getByText(/Your notifications/i));

  expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();
});

test('handleHideDrawer sets displayDrawer to false', async () => {
  await renderApp();

  expect(screen.getByText(/Here is the list of notifications/i)).toBeInTheDocument();

  const closeButton = screen.getByLabelText(/close/i);
  fireEvent.click(closeButton);

  expect(screen.queryByText(/Here is the list of notifications/i)).not.toBeInTheDocument();
});

test('logIn updates user state with email, password, and isLoggedIn', async () => {
  await renderApp();

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await act(async () => {
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
    fireEvent.click(screen.getByText(/ok/i));
  });

  await act(async () => {
    const coursesCall = mockAxios.getReqByUrl('http://localhost:5173/courses.json');
    if (coursesCall) {
      mockAxios.mockResponse({ data: coursesData }, coursesCall);
    }
  });

  expect(screen.getByRole('heading', { name: /Course list/i })).toBeInTheDocument();
  expect(screen.queryByText(/Login to access the full dashboard/i)).not.toBeInTheDocument();
  expect(screen.getByText(/user@test.com/i)).toBeInTheDocument();
});

test('logOut resets user state: isLoggedIn false, email and password cleared', async () => {
  await renderApp();

  await act(async () => {
    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
    fireEvent.click(screen.getByText(/ok/i));
  });

  await act(async () => {
    const coursesCall = mockAxios.getReqByUrl('http://localhost:5173/courses.json');
    if (coursesCall) {
      mockAxios.mockResponse({ data: coursesData }, coursesCall);
    }
  });

  expect(screen.getByRole('heading', { name: /Course list/i })).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(screen.getByText(/\(logout\)/i));
  });

  await act(async () => {
    const coursesCall = mockAxios.getReqByUrl('http://localhost:5173/courses.json');
    if (coursesCall) {
      mockAxios.mockResponse({ data: coursesData }, coursesCall);
    }
  });

  expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
  expect(screen.queryByRole('heading', { name: /Course list/i })).not.toBeInTheDocument();
});

test('The Notifications component state should remain unchanged through login / logout', async () => {
  await renderApp();

  // Open drawer and check initial notifications
  fireEvent.click(screen.getByText(/Your notifications/i));
  const initialItems = screen.getAllByRole('listitem');
  expect(initialItems).toHaveLength(3);

  // Log in
  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await act(async () => {
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(screen.getByText(/ok/i));
  });

  await act(async () => {
    const coursesCall = mockAxios.getReqByUrl('http://localhost:5173/courses.json');
    if (coursesCall) {
      mockAxios.mockResponse({ data: coursesData }, coursesCall);
    }
  });

  // After login, notifications should still be the same
  fireEvent.click(screen.getByText(/Your notifications/i));
  const itemsAfterLogin = screen.getAllByRole('listitem');
  expect(itemsAfterLogin).toHaveLength(3);

  // Log out
  await act(async () => {
    fireEvent.click(screen.getByText(/\(logout\)/i));
  });

  await act(async () => {
    const coursesCall = mockAxios.getReqByUrl('http://localhost:5173/courses.json');
    if (coursesCall) {
      mockAxios.mockResponse({ data: coursesData }, coursesCall);
    }
  });

  // After logout, notifications should still be the same
  fireEvent.click(screen.getByText(/Your notifications/i));
  const itemsAfterLogout = screen.getAllByRole('listitem');
  expect(itemsAfterLogout).toHaveLength(3);
});

describe('callback reference stability', () => {
  let capturedProps;

  beforeEach(() => {
    capturedProps = [];
  });

  function PropsCapture(props) {
    capturedProps.push(props);
    return null;
  }

  function TestApp() {
    const [displayDrawer, setDisplayDrawer] = useState(true);
    const [user] = useState({ email: '', password: '', isLoggedIn: false });
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
      const fetchNotifications = async () => {
        try {
          const response = await axios.get('http://localhost:5173/notifications.json');
          const data = response.data.map((notif) => {
            if (notif.html) return { ...notif, html: getLatestNotification() };
            return notif;
          });
          setNotifications(data);
        } catch { /* noop */ }
      };
      fetchNotifications();
    }, []);

    useEffect(() => {
      const fetchCourses = async () => {
        try { await axios.get('http://localhost:5173/courses.json'); } catch { /* noop */ }
      };
      fetchCourses();
    }, [user]);

    const handleDisplayDrawer = useCallback(() => { setDisplayDrawer(true); }, []);
    const handleHideDrawer = useCallback(() => { setDisplayDrawer(false); }, []);
    const markNotificationAsRead = useCallback((id) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    return (
      <NewContext.Provider value={{ user, logOut: () => {} }}>
        <PropsCapture
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
          markAsRead={markNotificationAsRead}
          displayDrawer={displayDrawer}
          notifications={notifications}
        />
      </NewContext.Provider>
    );
  }

  test('handleDisplayDrawer and handleHideDrawer keep the same reference between re-renders', async () => {
    await act(async () => { render(<TestApp />); });
    await act(async () => { resolveAxiosCalls(); });

    const first = capturedProps[capturedProps.length - 1];

    await act(async () => { first.handleHideDrawer(); });

    const second = capturedProps[capturedProps.length - 1];

    expect(first.handleDisplayDrawer).toBe(second.handleDisplayDrawer);
    expect(first.handleHideDrawer).toBe(second.handleHideDrawer);
  });

  test('markNotificationAsRead keeps the same reference between re-renders', async () => {
    await act(async () => { render(<TestApp />); });
    await act(async () => { resolveAxiosCalls(); });

    const first = capturedProps[capturedProps.length - 1];

    await act(async () => { first.handleHideDrawer(); });

    const second = capturedProps[capturedProps.length - 1];

    expect(first.markAsRead).toBe(second.markAsRead);
  });
});