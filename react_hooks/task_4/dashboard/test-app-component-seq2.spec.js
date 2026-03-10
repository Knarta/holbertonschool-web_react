import '@testing-library/jest-dom';
import { expect, jest, test, describe } from '@jest/globals';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import App, { resetNotificationsCache } from './src/App/App.jsx';

const mockNotifications = [
  { id: 1, type: 'default', value: 'New course available' },
  { id: 2, type: 'urgent', value: 'New resume available' },
  { id: 3, type: 'urgent', html: '<strong>Urgent requirement</strong> - complete by EOD' },
];

axios.useRequestHandler((req) => {
  const url = req.config?.url || req.url || '';
  if (url.includes('notifications.json')) {
    axios.mockResponse({ data: mockNotifications }, req);
  }
});

afterEach(() => {
  axios.reset();
  resetNotificationsCache();
});

describe('App Component Tests', () => {
  test('verify notification item deletion', async () => {
    let result;
    await act(async () => {
      result = render(<App />);
    });

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:5173/notifications.json');
    });

    await waitFor(() => {
      const items = screen.getAllByRole('listitem');
      expect(items.length).toBeGreaterThanOrEqual(3);
    });

    const itemsBefore = screen.getAllByRole('listitem');
    const firstItemText = itemsBefore[0].textContent || itemsBefore[0].innerHTML;

    await act(async () => {
      fireEvent.click(itemsBefore[0]);
    });

    await waitFor(() => {
      const itemsAfter = screen.queryAllByRole('listitem');
      expect(itemsAfter).toHaveLength(2);
    });

    const remainingItems = screen.queryAllByRole('listitem');
    const stillVisible = remainingItems.some(
      (el) => (el.textContent || el.innerHTML) === firstItemText
    );
    expect(stillVisible).toBe(false);
  });
});
