import { render, screen } from '@testing-library/react';
import { expect, test, jest } from "@jest/globals";
import Notifications from './Notifications';


test("Notifications exists", () => {
    render(<Notifications />);
    const notifications = screen.getByText(/Here is the list of notifications/i);
    expect(notifications).toBeInTheDocument();
});

test("Button element exists", () => {
    render(<Notifications />);
    const buttons = screen.getAllByRole('button', { name: /Close/i });
    expect(buttons).toHaveLength(1);
});

test("renders 3 li elements as notifications", () => {
    render(<Notifications />);
    const notifications = screen.getAllByRole('listitem');
    expect(notifications).toHaveLength(3);
});

test('clicking close button logs "Close button has been clicked"', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    render(<Notifications />);
    const button = screen.getAllByRole('button', { name: /Close/i })[0];
    button.click();
    expect(consoleSpy).toHaveBeenCalledWith('Close button has been clicked');
    consoleSpy.mockRestore();
});
