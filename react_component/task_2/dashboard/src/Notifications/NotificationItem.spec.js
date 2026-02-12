import NotificationItem from './NotificationItem';
import { render, screen, fireEvent } from '@testing-library/react';

describe('NotificationItem', () => {
    test('li element has the color blue when type is default', () => {
        render(<NotificationItem type="default" value="New course available" />);
        expect(screen.getByText('New course available')).toHaveStyle({ color: 'blue' });
    });

    test('li element has the color red when type is urgent', () => {
        render(<NotificationItem type="urgent" value="New resume available" />);
        expect(screen.getByText('New resume available')).toHaveStyle({ color: 'red' });
    });

    test('calls markAsRead prop when clicked', () => {
        const markAsRead = jest.fn();

        render(
            <NotificationItem
                id={1}
                type="default"
                value="New course available"
                markAsRead={markAsRead}
            />
        );

        fireEvent.click(screen.getByText('New course available'));
        expect(markAsRead).toHaveBeenCalledWith(1);
    });
});