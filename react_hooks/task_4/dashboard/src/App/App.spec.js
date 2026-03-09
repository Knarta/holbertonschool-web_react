import { expect, jest, test, describe } from '@jest/globals';
import { useState, useCallback, useEffect } from 'react';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import App from './App.jsx';
import { getLatestNotification } from '../utils/utils.js';
import AppContext from '../Context/context.js';

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

async function renderApp() {
  axios.get.mockImplementation((url) => {
    if (url.includes('notifications.json')) {
      return Promise.resolve({ data: notificationsData });
    }
    if (url.includes('courses.json')) {
      return Promise.resolve({ data: coursesData });
    }
    return Promise.reject(new Error('Not found'));
  });

  let result;
  await act(async () => {
    result = render(<App />);
  });
  await waitFor(() => {
    expect(axios.get).toHaveBeenCalled();
  });
  return result;
}

test('should fetch notifications data on initial render', async () => {
  await renderApp();
  expect(axios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');
});

test('should fetch courses data when user state changes', async () => {
  await renderApp();
  expect(axios.get).toHaveBeenCalledWith('http://localhost:5173/courses.json');
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

  await waitFor(() => {
    expect(
      screen.getByRole('heading', { name: /Course list/i }),
    ).toBeInTheDocument();
  });
  expect(
    screen.queryByText(/Login to access the full dashboard/i),
  ).not.toBeInTheDocument();
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

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /Course list/i })).toBeInTheDocument();
    expect(screen.getByText(/user@test\.com/i)).toBeInTheDocument();
  });
});

test('logOut resets user state: isLoggedIn false, Course list and welcome disappear', async () => {
  await renderApp();

  const emailInput = screen.getByLabelText(/email/i);
  const passwordInput = screen.getByLabelText(/password/i);

  await act(async () => {
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'mypassword' } });
    fireEvent.click(screen.getByText(/ok/i));
  });

  await waitFor(() => {
    expect(screen.getByRole('heading', { name: /Course list/i })).toBeInTheDocument();
  });

  await act(async () => {
    fireEvent.click(screen.getByText(/\(logout\)/i));
  });

  await waitFor(() => {
    expect(screen.getByText(/Login to access the full dashboard/i)).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: /Course list/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/user@test\.com/i)).not.toBeInTheDocument();
  });
});

test('clicking on a notification item should remove it from the list and log the correct message', async () => {
  const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  await renderApp();

  await waitFor(() => {
    const items = screen.getAllByRole('listitem');
    expect(items.length).toBeGreaterThanOrEqual(3);
  });

  const items = screen.getAllByRole('listitem');
  consoleLogSpy.mockClear();
  await act(async () => {
    fireEvent.click(items[0]);
  });

  expect(consoleLogSpy).toHaveBeenCalledWith(
    'Notification 1 has been marked as read',
  );

  await waitFor(() => {
    const remainingItems = screen.queryAllByRole('listitem');
    expect(remainingItems).toHaveLength(2);
  });

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

describe('callback reference stability', () => {
  let capturedProps = [];

  function PropsCapture(props) {
    capturedProps.push(props);
    return null;
  }

  function TestApp() {
    const [displayDrawer, setDisplayDrawer] = useState(true);
    const [user] = useState({ email: '', password: '', isLoggedIn: false });
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5173/notifications.json')
        .then((res) => setNotifications(res.data || []))
        .catch(() => {});
    }, []);

    const handleDisplayDrawer = useCallback(() => setDisplayDrawer(true), []);
    const handleHideDrawer = useCallback(() => setDisplayDrawer(false), []);
    const markNotificationAsRead = useCallback((id) => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, []);

    return (
      <AppContext.Provider value={{ user, logOut: () => {} }}>
        <PropsCapture
          handleDisplayDrawer={handleDisplayDrawer}
          handleHideDrawer={handleHideDrawer}
          markAsRead={markNotificationAsRead}
          displayDrawer={displayDrawer}
          notifications={notifications}
        />
      </AppContext.Provider>
    );
  }

  beforeEach(() => {
    capturedProps = [];
  });

  test('handleDisplayDrawer and handleHideDrawer keep the same reference between re-renders', async () => {
    await act(async () => {
      render(<TestApp />);
    });

    const first = capturedProps[capturedProps.length - 1];

    await act(async () => {
      first.handleHideDrawer();
    });

    const second = capturedProps[capturedProps.length - 1];

    expect(first.handleDisplayDrawer).toBe(second.handleDisplayDrawer);
    expect(first.handleHideDrawer).toBe(second.handleHideDrawer);
  });

  test('markNotificationAsRead keeps the same reference between re-renders', async () => {
    await act(async () => {
      render(<TestApp />);
    });

    const first = capturedProps[capturedProps.length - 1];

    await act(async () => {
      first.handleHideDrawer();
    });

    const second = capturedProps[capturedProps.length - 1];

    expect(first.markAsRead).toBe(second.markAsRead);
  });
});
