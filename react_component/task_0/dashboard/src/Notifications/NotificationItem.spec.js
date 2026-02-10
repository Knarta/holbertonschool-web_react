import NotificationItem from './NotificationItem';
import { render, screen } from '@testing-library/react';

describe('NotificationItem', () => {
    test('li element has the color blue when type is default', () => {
        render(<NotificationItem type="default" value="New course available" />);
        expect(screen.getByText('New course available')).toHaveStyle({ color: 'blue' });
    });

    test('li element has the color red when type is urgent', () => {
        render(<NotificationItem type="urgent" value="New resume available" />);
        expect(screen.getByText('New resume available')).toHaveStyle({ color: 'red' });
    });
});