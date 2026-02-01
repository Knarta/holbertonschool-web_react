import { render, screen } from '@testing-library/react';
import Notifications from './Notifications';


jest.mock('./utils.js', () => ({
    getLatestNotification: () => '<strong>Urgent requirement</strong> - complete by EOD'
}));


test("Notifications exists", () => {
    render(<Notifications />);
    const notifications = screen.getByText(/Here is the list of notifications/i);
    expect(notifications).toBeInTheDocument();
});

test("Button element exists", () => {
    render(<Notifications />);
    const button = screen.getByRole('button', { name: /Close/i });
    expect(button).toBeInTheDocument();
});

test("renders 3 li elements as notifications", () => {
    render(<Notifications />);
    const notifications = screen.getAllByRole('listitem');
    expect(notifications).toHaveLength(3);
});

test('clicking close button logs "Close button has been clicked"', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<Notifications />);
    const button = screen.getByRole('button', { name: /Close/i });
    button.click();
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
    consoleSpy.mockRestore();
});